const express = require("express");
const Routes = express.Router();
const Patient = require("../Schema/patientSchema");
const { date } = require("joi");
const { now } = require("mongoose");

const {GetPatients,GetPatient,SavePatient,UpdatePatient,DeletePatient,updatePatientImage} =require("../Controllers/patient.Controller");
Routes.get("/patient/All",GetPatients);
Routes.get("/patient/:id",GetPatient)
Routes.post("/patient/Add",SavePatient)
Routes.put("/patient/:id",UpdatePatient)
Routes.delete("/patient/:id",DeletePatient);
Routes.post("/patient/updateImage",updatePatientImage)

module.exports = Routes