const mongoose = require("mongoose");

const connectDB = async()=>{
   await mongoose.connect("mongodb://localhost:27017/healthGoals");       
}
module.exports = connectDB