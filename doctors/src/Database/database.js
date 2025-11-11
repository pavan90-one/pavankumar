const mongoose = require("mongoose");
const config = require('../Config/index');
const connectDB = async()=>{
   await mongoose.connect(config.mongoUri);       
}
module.exports = connectDB