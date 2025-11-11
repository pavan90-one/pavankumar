const Patient = require("../Schema/patientSchema");
exports.GetPatients=async()=>{
          try {
                  const patinets  = await Patient.find({"patientStatus":true});
                   const result =[];
                   if(patinets && (typeof patinets === 'object' && patinets !== null))
                        {
                            result.message="patients details",
                            result.status="success";
                            result.patients=patinets;
                            return result;
                        }else{
                            result.message="No Data found ",
                            result.status="fail";
                            return result
                        }
                  
              } catch (error) {
                const result =[];
                result.message="No Data found ",
                result.status="fail";
                return result
              }
}
exports.AddPatient=async(objPatinet)=>{

       //  console.log(typeof(insertId));process.exit();
    try {
            const patinet = new Patient(objPatinet);
            const insertId = await patinet.save(objPatinet);       
            const result =[];
         if(insertId && (typeof insertId === 'object' && insertId !== null))
                        {
                            result.message="added successfully",
                            result.status="success";
                            result.patients=insertId;
                            return result;
                        }else{
                            result.message="Patinet is not added ",
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
exports.GetPatient=async(partientId)=>{   
    try {
        const patinet  = await Patient.find({_id:partientId});
        const result =[];
                   if(patinet && (typeof patinet === 'object' && patinet !== null))
                        {
                            result.message="patient details",
                            result.status="success";
                            result.patients=patinet;
                            return result;
                        }else{
                            result.message="No Data found ",
                            result.status="fail";
                            return result
                        }
    } catch (error) {
        const result =[];
        result.message="No Data found ",
        result.status="fail";
        return result
    }
    
}
exports.UpdatePatientById=async(objPatient,id)=>{
     try {
     const now = new Date();
     const isoDate = now.toISOString();
     objPatient.updatedAt=isoDate;
     const  updatePatient= await Patient.findByIdAndUpdate({"_id":id},objPatient,  { new: true });
     const result =[];
         if(updatePatient && (typeof updatePatient === 'object' && updatePatient !== null))
                        {
                            result.message="updated  successfully",
                            result.status="success";
                            result.patients=updatePatient;
                            return result;
                        }else{
                            result.message="Patinet is not update ",
                            result.status="fail";
                            return result
                        }
    } catch (error) {
        const result =[];
        result.message="No Data found ",
        result.status="fail";
        return result
    }

}
exports.DeletePatientsById=async(partientId)=>{
   try{
     const patient = await Patient.findById({"_id":partientId});
     patient.patientStatus=false;
     const now = new Date();
     const isoDate = now.toISOString();
     patient.updatedAt=isoDate;
     const deletePatient = await Patient.findByIdAndUpdate({"_id":partientId},patient,  { new: true });
    // console.log(typeof deletePatient);process.exit();
     const result =[];
         if(deletePatient) {
          result.message="updated  successfully",
            result.status="success";
            result.patients=deletePatient;
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


