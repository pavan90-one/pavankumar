const Patient = require("../Schema/patientSchema");
const Joi = require('joi');
const validatePatient = require("../Healper/patient.Healper");
const {
    AddPatient,
    GetPatients,
    DeletePatientsById,
    UpdatePatientById,
    GetPatient
} = require("../Models/patient.Model")
 /*  
    Get Patients details 
    @Method : Get
 */
exports.GetPatients= async(req,resp,next)=>{
    let  result = await GetPatients();     
    if(result["status"]=="success"){
         const myObject = Object.assign({}, result);
           resp.status(200).json(myObject);
       }else{
        const myObject = Object.assign({}, result);
          return resp.status(200).json(myObject);
       }

}
/* Describ : Save the Patinet details  
      @Param 
         patientName,PatientEmail,PatientAge,patientsAddress,patientPhone
    */
exports.SavePatient=async(req,resp,next)=>{ 
 const patientSchema = Joi.object({
        patientName: Joi.string().min(0).max(30).required(),
        patientEmail: Joi.string().email().required(),
        patientAge: Joi.number().integer().min(0).max(100),
        patientAddress: Joi.string().required(),
        patientPhone: Joi.string().length(10).pattern(/^[0-9]+$/).required()  
    });
      const Objpatient = {
        patientName: req.body.patientName,
        patientEmail: req.body.patientEmail,
        patientAge: req.body.patientAge,
        patientAddress: req.body.patientAddress,
        patientPhone:   req.body.patientPhone
    }
    const { error, value } =  validatePatient.validate(Objpatient);
   
    if (error) {
        const obj={}
         obj.status="fail"
         obj.message="validation is failture"
         obj.err = error.details[0].message;
      return  resp.status(400).json(obj);
    }
        Objpatient.patientAge = parseInt(req.body.patientAge)
        Objpatient.patientPhone= parseInt(req.body.patientPhone); 
        const result = await AddPatient(Objpatient)

        if(result["status"]=="success"){
         const myObject = Object.assign({}, result);
           resp.status(200).json(myObject);
       }else{
        const myObject = Object.assign({}, result);
          return resp.status(200).json(myObject);
       }
    
    
    
}
/* Describ : the methos is used to get the Patient details By Patient Id 
      @Param 
         Patient Id
    */
exports.GetPatient=async(req,resp,next)=>{
    const partientId = req.params["id"];
    const result = await GetPatient(partientId);
      if(result["status"]=="success"){
         const myObject = Object.assign({}, result);
         return  resp.status(200).json(myObject);
       }else{
         const myObject = Object.assign({}, result);
          return resp.status(200).json(myObject);
    
       }
}
/* Describ : the methos is update Patient Details by patient Id  
      @Param 
       patientName,PatientEmail,PatientAge,patientsAddress,patientPhone  
    */
exports.UpdatePatient=async(req,resp,next)=>{
      const Objpatient = {
        patientName: req.body?.patientName,
        patientEmail: req.body?.patientEmail,
        patientAge: req.body?.patientAge,
        patientAddress: req.body?.patientAddress,
        patientPhone:   req.body?.patientPhone
    }
    const { error, value } =  validatePatient.validate(Objpatient);
   
    if (error) {
        const obj={}
         obj.status="fail"
         obj.message="validation is failture"
         obj.err = error.details[0].message;
      return  resp.status(400).json(obj);
    }
        const id = req.params?.id;
        Objpatient.patientAge = parseInt(req.body.patientAge)
        Objpatient.patientPhone= parseInt(req.body.patientPhone); 
        const result = await UpdatePatientById(Objpatient,id)
       if(result["status"]=="success"){
         const myObject = Object.assign({}, result);
         return  resp.status(200).json(myObject);
       }else{
         const myObject = Object.assign({}, result);
          return resp.status(200).json(myObject);
    
       }
}
/* Describ : the methos is used to get the Patient delete By Patient Id 
      @Param 
         Patient Id
    */
exports.DeletePatient=async(req,resp,next)=>{
     const partientId = req.params["id"];
     const result =await DeletePatientsById(partientId);
     console.log(result);
      if(result["status"]=="success"){
         const myObject = Object.assign({}, result);
         return  resp.status(200).json(myObject);
       }else{
         const myObject = Object.assign({}, result);
          return resp.status(200).json(myObject);
       }
  
}
exports.updatePatientImage=(req,resp,next)=>{
          resp.send("update Patient Image ")
}