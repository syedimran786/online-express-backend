const express = require('express');
const cors = require('cors');
 require('dotenv').config();
const connectDB = require('./helpers/dbConnect');
const EmployeeRoutes = require('./routes//employee.routes');



let app=express();

app.use(cors({origin: true}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/api/v1",EmployeeRoutes)

//! page not Found
app.use("*",(req,res)=>
{
res.status(404).json({error:true,message:"Page NOt Found!!!!!!!!!!"})
})


//! error Handling
app.use("*",(err,req,res,next)=>
{
res.status(500).json({error:true,message:err.message})
})
    

let startServer=async ()=>
{
    try
    {
        await connectDB(process.env.MONGO_DEV_URL);
        console.log("MongoDB coneected Successfully")
        app.listen(process.env.PORT, ()=>
        {
            console.log(`Server is runnung on PORT ${process.env.PORT}`)
        })
    }
    catch(err)
    {
        console.log("ERROR: ",err.message)
    }
}

startServer()