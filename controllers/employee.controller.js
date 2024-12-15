const Employee = require('../models/employee.model');

let addEmployee=async (req,res,next)=>
{
    try
    {
        let {name,email,role,password,age}=req.body;

        let isEmployee=await Employee.findOne({email})

        if(isEmployee)
        {
            return res.status(500).json({error:true,message:"Employee is Already Exist with given  Email",data:null});
        }

        let employee=await Employee.create({name,email,role,password,age});
        return res.json({error:false,message:"Employee Added Successfully",data:{name:employee.name}});
    }
    catch(err)
    {
        next(err)
    }
}

let getEmployees=async (req,res,next)=>
    {
        try
        {
            let employees=await Employee.find();
            res.json({error:false,message:"Employee Fetched Successfully",data:employees});
        }
        catch(err)
        {
            next(err)
        }
    }

    let getSingleEmployee=async (req,res,next)=>
        {
            try
            {
                let {eid}=req.params; //! eid must be _id 
                let employee=await Employee.findById(eid);

                if(employee)
                {
                    return res.json({error:false,message:"Employee Fetched Successfully",data:employee});
                }
                return res.status(500).json({error:true,message:"NO Employee Found With Given Id",data:null});
            }
            catch(err)
            {
                next(err)
            }
        }
    
        let updateEmployee=async (req,res,next)=>
            {
                try
                {
                    
                    let {eid}=req.params; //! eid must be _id 
                    let isEmployee=await Employee.findById(eid);
    
                    if(isEmployee)
                    {
                        let employee=await Employee.findByIdAndUpdate(eid, req.body, {runValidators:true,new:true})
                        return res.json({error:false,message:"Employee Updated Successfully",data:employee});
                    }
                    return res.status(500).json({error:true,message:"NO Employee Found With Given Id",data:null});
                }
                catch(err)
                {
                    next(err)
                }
            }

            let deleteEmployee=async (req,res,next)=>
                {
                    try
                    {
                        let {eid}=req.params; //! eid must be _id 
                        let isEmployee=await Employee.findById(eid);
        
                        if(isEmployee)
                        {
                            let employee=await Employee.findByIdAndDelete(eid)
                            return res.json({error:false,message:"Employee Deleted Successfully",data:employee});
                        }
                        return res.status(500).json({error:true,message:"No Employee Found With Given Id",data:null});
                    }
                    catch(err)
                    {
                        next(err)
                    }
                }
            
        

    module.exports={
        addEmployee,
        getEmployees,
        getSingleEmployee,
        updateEmployee,
        deleteEmployee
    }