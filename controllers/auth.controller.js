const createJwt = require('../helpers/createJwt');
const Employee = require('../models/employee.model');


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

    module.exports={
    checkUser
    }