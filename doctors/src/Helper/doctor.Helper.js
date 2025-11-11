const Joi = require('joi');

// Define a schema for user data
const doctorSchema = Joi.object({
    doctorName: Joi.string().min(0).max(30).required(),
    doctorEmail: Joi.string().email().required(),
    doctorExperince: Joi.number().integer().min(0).max(100),
    doctorAddress: Joi.string().required(),
    doctorPhone: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    doctorSpecializations :Joi.string().required(),
    doctorLocation:Joi.string().required(),
    doctorPassword:Joi.string().required(),
    doctorRoll:Joi.string().required(),
});
module.exports = doctorSchema;