const mongoose = require('mongoose');
const patientDetailsSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: [true, 'Please provide a name for the patient.'],
        trim: true // Automatically trims whitespace
    },
    patientExercises: {
        type: Object // Ensures email is unique across documents
    },
    patientNutrition:{
       type:Object,
       required: [true, 'Please provide a name for the patient.'],
    },
    patientHydration:{
       type:Object,
       required: [true, 'Please provide a name for the patient.'],
    },
    patientWeight:{
       type:Object,
       required: [true, 'Please provide a name for the patient.'],
    },
    createdAt: {
        type: Date,
        default: Date.now // Sets default value to current date/time
    },
    updatedAt: {
        type: Date        
    },
});
module.exports = mongoose.model('patientDetails', patientDetailsSchema);
