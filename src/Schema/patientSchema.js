const { required } = require('joi');
const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: [true, 'Please provide a name for the patient.'],
        trim: true // Automatically trims whitespace
    },
    patientEmail: {
        type: String,
        unique: true, // Ensures email is unique across documents
    },
    patientPhone: {
       type: Number,
        required: true
    },
    patientAge: {
        type: Number,
        required:true,
        min: 0, // Minimum age allowed
        max: 99 // Maximum age allowed
    },
    patientAddress: {
        type: String,
        required:true
    },
    patientStatus: {
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

module.exports = mongoose.model('patients', userSchema);
