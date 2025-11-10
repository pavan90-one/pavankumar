const {
     Add,
    GetAllDoctors,
    deleteDoctor,
    updateDoctor,
    doctorByID,
    } = require("../Models/doctor.Model");

exports.addDoctor=async(req,resp,next)=>{
    let doctortPhone = parseInt(req.body.doctortPhone);
    let doctorExperince = parseInt(req.body.doctorExperince);   
    let   objDoctor={}
        objDoctor.doctorName=req.body.doctorName
        objDoctor. doctorEmail=req.body.doctorEmail,
        objDoctor.doctorPhone=req.body.doctorPhone,
        objDoctor.doctorExperince=req.body.doctorExperince,
        objDoctor.doctorSpecializations=req.body.doctorSpecializations,
        objDoctor.doctorLocation=req.body.doctorLocation,
        objDoctor.doctorAddress= req.body.doctorAddress;   
        console.log(objDoctor);
       const result = await Add(objDoctor);
       if(result.status=="success"){
            resp.status(200).json(result);
       }else{
         resp.status(400).json(result);
       }
}
exports.getAllDoctor=async(req,resp,next)=>{
    const result =await GetAllDoctors();
    if(result.status=="success"){
            resp.status(200).json(result);
       }else{
         resp.status(400).json(result);
       }
}
exports.getDoctorById=async(req,resp,next)=>{
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
