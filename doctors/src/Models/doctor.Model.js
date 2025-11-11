const Doctor = require("../Schema/doctor.Schema");
const {createTokensForUser} = require("../Helper/jwttoken");
exports.GetAllDoctors= async()=>{
   try {
       const doctors =await Doctor.find({});
        let result = {};
        if(doctors && (typeof doctors === 'object' && doctors !== null))
        {
            result.message="doctorlist",
            result.status="success";
            result.newDoctor=doctors;
            return result;
        }else{
            result.message="No Data found ",
            result.status="fail";
            return result
        }

   } catch (error) {
        const result = {};
           result.message=error.message,
           result.status="fail";
           return result
   }
   
}
exports.Add=async (doc)=>{

   try {
        const doctor = new Doctor(doc);
        await  doctor.setPassword(doc.doctorPassword);
        const insertId = await  doctor.save(doc);
       // console.log(insertId);process.exit();
        let result = {};
        if(insertId && (typeof insertId === 'object' && insertId !== null))
        {
            const tokens = createTokensForUser(insertId);
            result.message="doctor is added successfully",
            result.status="success";
            result.newDoctor=insertId;
            result.token=tokens;
            return result;
        }else{
            result.message="doctor is not added ",
            result.status="fail";
            return result
        }
       
   } catch (error) {
           const result = {};
           result.message=error.message,
           result.status="fail";
           return result
         
   }

}
exports.doctorByID = async(id)=>{
try {
       const doctors =await Doctor.find({"_id":id});
        let result = {};
        if(doctors && (typeof doctors === 'object' && doctors !== null))
        {
            result.message="doctor",
            result.status="success";
            result.doctor=doctors;
            return result;
        }else{
            result.message="No Data found ",
            result.status="fail";
            return result
        }

   } catch (error) {
        const result = {};
           result.message=error.message,
           result.status="fail";
           return result
   }
}
exports.updateDoctor=async (doc,id)=>{
    try {
         const now = new Date();
         const isoDate = now.toISOString();
         doc.updatedAt=isoDate;
         const  updateDoctor= await Doctor.findByIdAndUpdate({"_id":id},doc,  { new: true });
         const result =[];
             if(updateDoctor && (typeof updateDoctor === 'object' && updateDoctor !== null))
                            {
                                result.message="updated  successfully",
                                result.status="success";
                                result.doctor=updateDoctor;
                                return result;
                            }else{
                                result.message="Doctors is not update ",
                                result.status="fail";
                                return result
                            }
        } catch (error) {
            const result =[];
            result.message=error.message,
            result.status="fail";
            return result
        }                  
}
exports.deleteDoctor= async(id)=>{
      try{
          const doctor = await Doctor.findById({"_id":id});
          doctor.doctorStatus=false;
          const now = new Date();
          const isoDate = now.toISOString();
          doctor.updatedAt=isoDate;
          const deleteDoctor = await Doctor.findByIdAndUpdate({"_id":id},doctor,  { new: true });
          const result =[];
              if(deleteDoctor) {
                 result.message="updated  successfully",
                 result.status="success";
                 result.patients=deleteDoctor;
                 return result;
              }else{
                 result.status="fail";
                 return result;
              }
         } catch (error) {
             const result =[];
             result.message=error.message,
             result.status="fail";
             return result
         }
    
}
exports.doctorByEmail = async(emailId)=>{
try {
  
       const doctors =await Doctor.find({doctorEmail:emailId});
        let result = {};
        if(doctors && doctors.length>0   && (typeof doctors === 'object' && doctors !== null))
        {       
            result.message="doctor",
            result.status="success";
            result.doctor=doctors;
            return result;
        }else{
            result.message="No Data found ",
            result.status="fail";
            return result
        }

   } catch (error) {
        const result = {};
           result.message=error.message,
           result.status="fail";
           return result
   }
}