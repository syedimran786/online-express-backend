const createJwt = require('../helpers/createJwt');
const Employee = require('../models/employee.model');
const jwt = require('jsonwebtoken');


let checkUser=async (req,res,next)=>
    {
        try
        {
            let {email,password}=req.body; 
            let employee=await Employee.findOne({email});
      

            if(employee)
            {
                if(password===employee.password)
                {
                   let token= await createJwt({name:employee.name,role:employee.role})
                    return res.json({error:false,message:"Employee Logged in Successfully",data:{name:employee.name,role:employee.role,token}});
                }
                else
                {
                    return res.json({error:true,message:"Un-Authorized Access",data:null});
                }
               
            }
            else
            {
                return res.json({error:true,message:"No Employee Found With Given Id",data:null});
            }
            
        }
        catch(err)
        {
            next(err)
        }
    }

    let isLoggedin=async (req,res,next)=>
    {
        try
        {
            let token=req.cookies.token;
            if(!token)
            {
                // return res.json({error:true,message:"Please Login First",data:null});
                return res.json(false);
            }
            
            jwt.verify(token, "123")
            return res.json(true)
            
        }
        catch(err)
        {
            return res.json(false);
        }
    }

    module.exports={
    checkUser,
    isLoggedin
    }