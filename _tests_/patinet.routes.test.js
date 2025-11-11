const request = require('supertest');
const app = require("../app");
const patientController = require("../src/Controllers/patient.Controller")
const patinetModel = require("../src/Models/patient.Model");
jest.mock('../src/Models/patient.Model');

describe('patient.Controller', () => {
  let req, res, next;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });
  test('getAll - returns patient', async () => {
    //const users = [{ id: '1', name: 'A' }];
    //userService.findAll.mockResolvedValue(users);
    await patinetModel.GetPatients();
    await patientController.GetPatients(req, res, next);
    //await userController.getAll(req, res, next);

    expect(patinetModel.GetPatients).toHaveBeenCalled();
    expect(res.json).toHaveBeenCalledWith(users);
  });

})