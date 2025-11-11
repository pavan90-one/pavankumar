const express = require("express");
const Routes = express.Router();
const {
    addDoctor,
    deleteDoctor,
    getDoctorById,
    updateDoctor,
    getAllDoctor,
    doctorLogin,
    doctorProfile
     } =require("../Controllers/doctors.Controller");
const {validateJwt} = require("../middleware/auth");
Routes.use("/doctor",validateJwt);
Routes.get("/doctor/All",getAllDoctor);
Routes.get("/doctor/profile",doctorProfile);
Routes.get("/doctor/:id",getDoctorById)
Routes.post("/doctor/Add",addDoctor);
Routes.put("/doctor/:id",updateDoctor)
Routes.delete("/doctor/:id",deleteDoctor);
Routes.post("/login",doctorLogin);

//Routes.post("/doctor/updateImage",updatePatientImage)

module.exports = Routes