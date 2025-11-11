const PatientDetails = require("../Schema/patientDetails.Schema.js");
exports.GetAllPatientsDetails= async()=>{
   
   try {
       const doctors =await PatientDetails.find({});
        let result = {};
        if(doctors && (typeof doctors === 'object' && doctors !== null))
        {
            result.message="list",
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

exports.Add=async (pDetails)=>{

   try {
            const patientDetails = new PatientDetails(pDetails);
            const insertId= await patientDetails.save();
        let result = {};
        if(insertId && (typeof insertId === 'object' && insertId !== null))
        {
            result.message=" added successfully",
            result.status="success";
            result.newDoctor=insertId;
            return result;
        }else{
            result.message=" not added ",
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