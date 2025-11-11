const {  signAccessToken,
  signRefreshToken,
  verifyAccessToken,
  verifyRefreshToken} = require("../Utilities/jwt");
 const {
    doctorByID,
    } = require("../Models/doctor.Model");

exports.validateJwt =async (req,resp,next)=>{
     const myCookieValue = req.cookies?.refreshToken;
    // console.log(myCookieValue);
     
    if(myCookieValue && myCookieValue !=""){
           const tokenValue =  verifyRefreshToken(myCookieValue);
           const result = await doctorByID(tokenValue.userId);
            if(result.status=="success"){
                //resp.status(200).json(result);
            }else{
                // resp.status(400).json(result);
            }  
            next();
    }else{
          const res = {}
          res.message="Invalid Token ",
          res.status="fail";    
          return resp.status(400).json(res);
         // next();
    }
}
 