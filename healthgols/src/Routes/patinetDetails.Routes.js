const express = require("express");
const Routes = express.Router();
const {
    getPatientLists,
    addPatinetDetails
     } =require("../Controllers/patinetDetails.Controller");
Routes.get("/patientDetails/All",getPatientLists);
// Routes.get("/patientDetails/:id",getDoctorById)
 Routes.post("/patientDetails/Add",addPatinetDetails)
// Routes.put("/patientDetails/:id",updateDoctor)
// Routes.delete("/patientDetails/:id",deleteDoctor);
//Routes.post("/doctor/updateImage",updatePatientImage)

module.exports = Routes