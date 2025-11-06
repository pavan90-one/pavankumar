const Patient = require("../Schema/patientSchema");
const Joi = require('joi');
const validatePatient = require("../Healper/patient.Healper");
 /* 
    Get Patients details 
    @Method : Get
 */
exports.GetPatients= async(req,resp,next)=>{
    try {
        const patinets  = await Patient.find({"patientStatus":true});
        console.log(patinets);
        if(patinets.length>0){
               return resp.status(200).json(patinets);
        }else{
             return resp.status(200).json({});
        }
        
    } catch (error) {
        console.log(error.message());
        return resp.status(200).json({});
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
        console.log(error);
        const obj={}
         obj.status="fail"
         obj.message="validation is failture"
         obj.err = error.details[0].message;
      return  resp.status(400).json(obj);
    } 

let   {
    patientName,
    patientEmail,
    patientPhone,
    patientAge,
    patientAddress
                  } = req.body;
    patientPhone = parseInt(patientPhone);
    patientAge = parseInt(patientAge);     
    const patient = new Patient({
    patientName,
    patientEmail,
    patientPhone,
    patientAge,
    patientAddress});
    const insertId =await patient.save(); 
    const result ={};
    if(insertId){
        
        result.status="success",
        result.message="patient is added successfully"
        result.data=JSON.stringify(insertId);
        //const res= JSON.stringify(result)
        return resp.status(200).json(result);
    }else{
         result.status="success",
         result.message="patient is not added "
        return  resp.status(400).json(result);
    }
    
    /* Describ : the methos is used to get the Patient details By Patient Id 
      @Param 
         Patient Id
    */
}
exports.GetPatient=async(req,resp,next)=>{
    const partientId = req.params["id"];
    try {
        const patinet  = await Patient.find({_id:partientId});
            if(patinet.length>0){
               return resp.status(200).json(patinet);
        }else{
             return resp.status(200).json({});
        }    
    } catch (error) {
        console.log(error.message);
        return resp.status(200).json({});
    }
}
/* Describ : the methos is update Patient Details by patient Id  
      @Param 
       patientName,PatientEmail,PatientAge,patientsAddress,patientPhone  
    */
exports.UpdatePatient=async(req,resp,next)=>{
     try {
        const id = req.params.id;
            let   {
    patientName,
    patientEmail,
    patientPhone,
    patientAge,
    patientAddress
                  } = req.body;
    patientPhone = parseInt(patientPhone);
    patientAge = parseInt(patientAge);
    let objPatient={patientName,patientEmail,patientPhone,patientAddress,patientAge};
    const now = new Date();
     const isoDate = now.toISOString();
     objPatient.updatedAt=isoDate;
    const updatePatient = await Patient.findById({"_id":id});
                        await Patient.findByIdAndUpdate({"_id":id},objPatient,  { new: true });
        resp.send(updatePatient);
    } catch (error) {
        resp.status(400).send("something went wrong"+error.message);
    }
}
/* Describ : the methos is used to get the Patient delete By Patient Id 
      @Param 
         Patient Id
    */
exports.DeletePatient=async(req,resp,next)=>{
     const partientId = req.params["id"];
     try{
     const patient = await Patient.findById({"_id":partientId});
     patient.patientStatus=false;
     const now = new Date();
     const isoDate = now.toISOString();
     patient.updatedAt=isoDate;
     const deletePatient = await Patient.findByIdAndUpdate({"_id":partientId},patient,  { new: true });
     return resp.send(deletePatient);
    } catch (error) {
        resp.status(400).send("something went wrong"+error.message);
    }
}
exports.updatePatientImage=(req,resp,next)=>{
          resp.send("update Patient Image ")
}