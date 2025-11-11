const mongoose = require("mongoose");
const config = require('../Config/index');

const connectDB = async()=>{
   await mongoose.connect("mongodb://localhost:27017/healthGoals");       
}

module.exports = connectDB
