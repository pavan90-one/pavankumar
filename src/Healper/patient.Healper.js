const Joi = require('joi');

// Define a schema for user data
const patientSchema = Joi.object({
    patientName: Joi.string().min(0).max(30).required(),
    patientEmail: Joi.string().email().required(),
    patientAge: Joi.number().integer().min(0).max(100),
    patientAddress: Joi.string().required(),
    patientPhone: Joi.string().length(10).pattern(/^[0-9]+$/).required()  
});
module.exports = patientSchema;