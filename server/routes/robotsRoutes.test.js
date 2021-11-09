require("dotenv").config();
const mongoose = require("mongoose");
const supertest = require("supertest");
const debug = require("debug")("robots:testing:robotsRoutes");
const chalk = require("chalk");
const { app, initializeServer } = require("..");
const connectDB = require("../../database");
const Robot = require("../../database/models/robots");

const request = supertest(app);
let server;
let token;

beforeAll(async () => {
  debug(chalk.yellow("Inside beforeAll"));
  await connectDB(process.env.MONGODB_TEST_STRING);
  server = await initializeServer(process.env.SERVER_PORT_TEST);
});

beforeEach(async () => {
  await connectDB
  server = await initializeServer(4001)
  const { body } = await request
    .post("/users/login")
    .send({ username: "luis", password: "luis" })
    .expect(200);
  debug(chalk.blue("Tengo el token!", body.token));
  token = body.token;
  await Robot.deleteMany({});
  await Robot.create({ id: "435u4938t43h4" name: "Lorenzo", age: 13 });
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
});

describe("Given a /robots router", () => {
  describe("When a GET request to /robots/ arrives", () => {
    test("Then it should respond with an array of robots and a 200 status", async () => {
      debug(chalk.yellow("Inside the test, with token", token));
      const { body } = await request
        .get("/robots/")
        .set("Authorization", `Bearer ${token}`)
        .expect(200);

      expect(body).toHaveLength(1);
      expect(body).toContainEqual({ id: "435u4938t43h4" name: "Lorenzo", age: 13})
    });
  });
  describe("When a GET request to /robots/:id with a wrong id", () => {
    test("Then it should respond with a 404 error", async () => {
      const { body } = await request.get("/robots/robot/234h34kh5lñ34h54lñk5").set("Authorization", `Bearer ${token}`).expect(404);
    const expectedError = {
      error: "Robot not found"
        };
    expect(body).toEqual(expectedError);
    });
  });
});
