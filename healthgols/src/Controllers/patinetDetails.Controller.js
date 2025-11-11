const {
     Add,
     GetAllPatientsDetails,
    } = require("../Models/patinetDetails.Model");

exports.addPatinetDetails=async(req,resp,next)=>{
  
    let   objPatient={}
        objPatient.patientId=req.body.patientId
        objPatient.patientExercises=req.body.patientExercises,
        objPatient.patientNutrition=req.body.patientNutrition,
        objPatient.patientHydration=req.body.patientHydration,
        objPatient.patientWeight=req.body.patientWeight;
        const result = await Add(objPatient);
       if(result.status=="success"){
            resp.status(200).json(result);
       }else{
         resp.status(400).json(result);
       }
}
exports.getPatientLists=async(req,resp,next)=>{
 // console.log("Testing the patient details ");process.exit();
    
    const result =await GetAllPatientsDetails();
    if(result.status=="success"){
            resp.status(200).json(result);
       }else{
         resp.status(400).json(result);
       }
}
exports.getPatinetDetailsById=async(req,resp,next)=>{
    const id = req.params["id"];
    //console.log(id);process.exit();
    const result = await doctorByID(id)
     if(result.status=="success"){
            resp.status(200).json(result);
       }else{
         resp.status(400).json(result);
       }
}
exports.updateDoctor=async(req,resp,next)=>{
    updateDoctor("data","id")
     console.log("update Users Controller");
}
exports.deleteDoctor=async(req,resp,next)=>{
    deleteDoctor("id")
     console.log("delete Users Controller");
}
