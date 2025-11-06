const express = require("express");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
dotenv.config();
app.use(bodyParser.json());
const connectDb = require("./src/Database/database")
const port = process.env._PORT || 6000;
const patientRoutes = require("./src/Routes/patient.Routes");

app.use(patientRoutes);

// app.all("*",(req,resp,next)=>{
//   const err =  new Error(`Can't find ${req.originalUrl} on server !`)
//   err.status="fail";
//   err.statusCode =404;
//   next(err)
// })

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


