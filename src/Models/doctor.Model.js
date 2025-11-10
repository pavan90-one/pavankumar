const Doctor = require("../Schema/doctor.Schema");

exports.GetAllDoctors= async()=>{
   //console.log(" get all doctors ..")
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
        const insertId = await  doctor.save(doc)
        let result = {};
        if(insertId && (typeof insertId === 'object' && insertId !== null))
        {
            result.message="doctor is added successfully",
            result.status="success";
            result.newDoctor=insertId;
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
exports.updateDoctor=(doc)=>{
                  
}
exports.deleteDoctor=(id)=>{
    
}