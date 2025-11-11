const validateDoctors = require("../Helper/doctor.Helper");
const bcrypt = require('bcryptjs');
const {createTokensForUser} = require("../Helper/jwttoken");
const {  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken} = require("../Utilities/jwt")

const {
     Add,
    GetAllDoctors,
    deleteDoctor,
    updateDoctor,
    doctorByID,
    doctorByEmail
    } = require("../Models/doctor.Model");

exports.addDoctor=async(req,resp,next)=>{  
  const {
    doctorName,
    doctorEmail,
    doctorPhone,
    doctorExperince,
    doctorSpecializations,
    doctorLocation,
    doctorAddress,
    doctorPassword,
    doctorRoll }= req.body;
    let   doctor={
        doctorName:doctorName,
        doctorEmail:doctorEmail,
        doctorPhone:doctorPhone,
        doctorExperince:doctorExperince,
        doctorSpecializations:doctorSpecializations,
        doctorLocation:doctorLocation,
        doctorAddress:doctorAddress,
        doctorPassword: doctorPassword,
        doctorRoll:doctorRoll 
    }         
        const { error, value } =  validateDoctors.validate(doctor);
        
    if (error) {
        const obj={}
         obj.status="fail"
         obj.message="validation is failture"
         obj.err = error.details[0].message;
      return  resp.status(400).json(obj);
    }
       const result = await Add(doctor);

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
    const result = await doctorByID(id)
     if(result.status=="success"){
            resp.status(200).json(result);
       }else{
         resp.status(400).json(result);
       }
}
exports.updateDoctor=async(req,resp,next)=>{
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
        const { error, value } =  validateDoctors.validate(objDoctor);
    if (error) {
        const obj={}
         obj.status="fail"
         obj.message="validation is failture"
         obj.err = error.details[0].message;
      return  resp.status(400).json(obj);
    }
      const id = req.params?.id;
        const result = await updateDoctor(objDoctor,id)
           if(result["status"]=="success"){
             const myObject = Object.assign({}, result);
             return  resp.status(200).json(myObject);
           }else{
             const myObject = Object.assign({}, result);
              return resp.status(200).json(myObject);
        
           }
   
}
exports.deleteDoctor=async(req,resp,next)=>{
         const doctorId = req.params["id"];
         const result =await deleteDoctor(doctorId);
         if(result["status"]=="success"){
             const myObject = Object.assign({}, result);
             return  resp.status(200).json(myObject);
           }else{
             const myObject = Object.assign({}, result);
              return resp.status(200).json(myObject);
           }

}
exports.doctorLogin = async(req,resp,next)=>{
       const {doctorEmail,doctorPassword} = {...req.body}
       const result =  await doctorByEmail(doctorEmail);
       if(result.status =="success"){
             const validPasswod = await bcrypt.compare(doctorPassword,result.doctor[0].passwordHash);
             if(validPasswod == true){
                const tokens = createTokensForUser(result.doctor[0])
                 const res = {}
                  res.message="User is validates successfully !",
                  res.status="success";
                  res.doctor = result.doctor[0];     
                  res.token=tokens;         
                  resp.cookie('refreshToken', tokens.refresh, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
                 return resp.status(200).json(res);
             }
       }else{      
        const res = {}
            res.message="Invalid doctor ",
            res.status="fail";    
            return resp.status(400).json(res);
       }  

}

exports.doctorProfile =async (req,resp,next)=>{
     const myCookieValue = req.cookies?.refreshToken;
    if(myCookieValue && myCookieValue !=""){
          const tokenValue =  verifyRefreshToken(myCookieValue);
          const result = await doctorByID(tokenValue.userId);
        if(result.status=="success"){
            resp.status(200).json(result);
       }else{
         resp.status(400).json(result);
       }  
    }else{
          const res = {}
          res.message="Invalid Token ",
          res.status="fail";    
          return resp.status(400).json(res);
    }
}
