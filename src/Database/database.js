const mongoose = require("mongoose");

const connectDB = async()=>{
   await mongoose.connect("mongodb:// 192.168.1.2:27017/healthGoals");       
}
module.exports = connectDB
