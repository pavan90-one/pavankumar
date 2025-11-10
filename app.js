const express = require("express");
const app = express();
const cors = require("cors");
const helmt = require("helmet");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config();
app.use(bodyParser.json());
app.use(helmt());
app.use(cors());
const connectDb = require("./src/Database/database")
const port = process.env._PORT || 6000;
const patientRoutes = require("./src/Routes/patient.Routes");
app.use(patientRoutes);
const doctorRoutes = require("./src/Routes/doctor.Routes");
app.use(doctorRoutes);
const patientDetails = require("./src/Routes/patinetDetails.Routes")
app.use(patientDetails);
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack for debugging
  res.status(err.statusCode || 500).json({
    status: 'error',
    message: err.message || 'Something went wrong!',
  });
});

connectDb().then(()=>{
    console.log("The Database connetion is succussfully created "); 
   app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
   })
}).catch((err)=>{
    console.log("database connection is failed! please check connection details")
})


