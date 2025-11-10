const express = require("express");
const Routes = express.Router();
const {
    addDoctor,
    deleteDoctor,
    getDoctorById,
    updateDoctor,
    getAllDoctor
     } =require("../Controllers/doctors.Controller");
Routes.get("/doctor/All",getAllDoctor);
Routes.get("/doctor/:id",getDoctorById)
Routes.post("/doctor/Add",addDoctor)
Routes.put("/doctor/:id",updateDoctor)
Routes.delete("/doctor/:id",deleteDoctor);
//Routes.post("/doctor/updateImage",updatePatientImage)

module.exports = Routes