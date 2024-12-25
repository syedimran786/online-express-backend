const jwt = require('jsonwebtoken');
const Employee = require('../models/employee.model');


let authorization=async (req,res,next)=>
{
    try
    {
         
        let token=req.headers.authorization;//!false

        if(!token || !token.startsWith("Bearer") )
        {
            throw new Error("Token Required");
        }

        token=token.split(" ")[1]
        let decoded=jwt.verify(token, "123")//! decoded is the object which is having the data which is passed at time of token creation
        let user=await Employee.findById(decoded.userId);
        req.user=user; //! getting the respective user and assigining the user to req object
      
        next()
    }
    catch(err)
    {
        next(err)
    }
}

module.exports=authorization