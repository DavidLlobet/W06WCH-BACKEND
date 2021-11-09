const User = require("../../database/models/users");
const loginUser = require("./userController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

jest.mock("../../database/models/user");
jest.mock("bcrypt");
jest.mock("jwt");

describe("Given a loginUser function", () => {
  describe("When it receives wrong username", () => {
    test("Then it should invoke next function with a 401 error", () => {
      User.findOne = jest.fn().mockResolvedValue(null);
      const req = {
        body: {
          username: "luis",
          password: "luis",
        },
      };

      const next = jest.fn();
      const expectedError = new Error("Wrong credentials");
      expectedError.code = 401;

      await loginUser(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]);
    });
  });
  describe("When it receives a right username and a wrong password", () => {
    test("Then is should invoke next function with a 401 error", () => {
      User.findOne = jest.fn().mockResolvedValue({
        id: "2",
        username: "luis",
        password: "luis",
      });
      bcrypt.compare = jest.fn().mockResolvedValue(false);
      const req = {
        body: {
          username: "luis",
          password: "luis",
        },
      };
      const next = jest.fn();
      const expectedError = new Error("Wrong credentials");
      expectedError.code = 401;

      await loginUser(req, null, next);

      expect(next.mock.calls[0][0]).toHaveProperty(
        "message",
        expectedError.message
      );
      expect(next.mock.calls[0][0]).toHaveProperty("code", expectedError.code);
    });
  });
  describe("When it receives right username and password", () => {
    test("Then it should invoke res.json  with an object with a brand new token inside", () => {
      User.findOne = jest.fn().mockResolvedValue({
        id: "2",
        username: "luis",
        password: "luis",
      });
      const expectedToken = "papaya";
      bcrypt.compare = jest.fn().mockResolvedValue(true);
      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      const req = {
        body: {
          username: "luis",
          password: "luis",
        },
      };
      const res = {
        json: jest.fn(),
      };

      const expectedResponse = {
        token: expectedToken,
      };

      await loginUser(req, res);

      expect(res.json).toHaveBeenCalledWith(expectedResponse);
    });
  });
});
