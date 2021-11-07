const Robot = require("../../database/models/robots");
const {
  getRobots,
  getRobotById,
  deleteRobotById,
} = require("./robotsController");

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

describe("Given a getRobotById function", () => {
  describe("When it receives a request with an id 1, a res object and a next function", () => {
    test("Then it should invoke Robot.findById with a 1", async () => {
      Robot.findById = jest.fn().mockResolvedValue({});
      const idRobot = 1;
      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};

      await getRobotById(req, res, next);

      expect(Robot.findById).toHaveBeenCalledWith(idRobot);
    });
    describe("And Robot.findById rejects", () => {
      test("Then it should invoke next function with the error rejected", async () => {
        const error = {};
        Robot.findById = jest.fn().mockRejectedValue(error);
        const req = {
          params: {
            idRobot: 0,
          },
        };
        const res = {};
        const next = jest.fn();

        await getRobotById(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(error).toHaveProperty("code");
        expect(error.code).toBe(400);
      });
    });
    describe("And Robot.findById resolves to Mecha Koopa", () => {
      test("Then it should invoke res.json with Mecha Koopa", async () => {
        const idRobot = "618579be9712904c2b990e1";
        const MechaKoopa = {
          idRobot,
          name: "Mecha Koopa",
        };
        Robot.findById = jest.fn().mockResolvedValue(MechaKoopa);
        const req = {
          params: {
            idRobot,
          },
        };
        const res = {
          json: jest.fn(),
        };

        await getRobotById(req, res);

        expect(res.json).toHaveBeenCalledWith(MechaKoopa);
      });
    });
  });
});

describe("Given a deleteRobotById function", () => {
  describe("When it receives a request with an id 1, a res object and a next function", () => {
    test("Then it should invoke Robot.findByIdAndDelete with a 1", async () => {
      Robot.findByIdAndDelete = jest.fn().mockResolvedValue({});
      const idRobot = 1;

      const req = {
        params: {
          idRobot,
        },
      };
      const res = {
        json: () => {},
      };
      const next = () => {};

      await deleteRobotById(req, res, next);

      expect(Robot.findByIdAndDelete).toHaveBeenCalledWith(idRobot);
    });
    describe("And Robot.deleteById rejects", () => {
      test("Then it should invoke next function with the error rejected", async () => {
        const error = {};
        Robot.findByIdAndDelete = jest.fn().mockRejectedValue(error);
        const req = {
          params: {
            idRobot: 0,
          },
        };
        const res = {};
        const next = jest.fn();

        await deleteRobotById(req, res, next);

        expect(next).toHaveBeenCalledWith(error);
        expect(error).toHaveProperty("code");
        expect(error.code).toBe(400);
      });
    });
    describe("And Robot.findByIdAndDelete resolves to Mecha Koopa", () => {
      test("Then it should invoke res.json with Mecha Koopa", async () => {
        const idRobot = "618579be9712904c2b990e1";
        const MechaKoopa = {
          idRobot,
          name: "Mecha Koopa",
        };
        Robot.findByIdAndDelete = jest.fn().mockResolvedValue(MechaKoopa);
        const req = {
          params: {
            idRobot,
          },
        };
        const res = {
          json: jest.fn(),
        };

        await deleteRobotById(req, res);

        expect(res.json).toHaveBeenCalledWith(MechaKoopa);
      });
    });
  });
});
