const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: [true, 'Please provide a name for the patient.'],
        trim: true // Automatically trims whitespace
    },

    doctorEmail: {
        type: String,
        unique: true, // Ensures email is unique across documents
    },
    doctorPhone: {
       type: Number,
        required: true
    },
    doctorExperince:{
         type: String,
         max: 99, // Ensures dateOfBirth is not in the future
         required: true
    },
    doctorSpecializations: {
        type: String,
        required:true,
        min: 0, // Minimum age allowed
        max: 99 // Maximum age allowed
    },
    doctorLocation: {
        type: String,
        required:true,
    },
    doctorAddress: {
        type: String,
        required:true
    },
    doctorStatus: {
        type: Boolean,
        required:true,
        default:1
    },
    createdAt: {
        type: Date,
        default: Date.now // Sets default value to current date/time
    },
    updatedAt: {
        type: Date        
    },
});
module.exports = mongoose.model('doctor', doctorSchema);
