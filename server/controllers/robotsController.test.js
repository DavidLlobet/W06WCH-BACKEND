const Robot = require("../../database/models/robots");
const { getRobots } = require("./robotsController");

jest.mock("../../database/models/robots");

describe("Given a getRobots function", () => {
  describe("When it receives an object res", () => {
    test("Then it should invoke the method json", async () => {
      const robots = [
        {
          _id: "1",
          name: "Mecha Koopa",
          url: "https://static.wikia.nocookie.net/mario/images/9/9d/Mecakoopa.jpg/revision/latest?cb=20171229002147&path-prefix=es",
          characteristics: {
            speed: 3,
            stamina: 6,
            creationDate: 4189,
          },
        },
      ];
      Robot.find = jest.fn().mockResolvedValue(robots);
      const res = {
        json: jest.fn(),
      };

      await getRobots(null, res);

      expect(Robot.find).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(robots);
    });
  });
});
