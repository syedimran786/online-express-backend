const express = require('express');
const {  
    addEmployee,
    getEmployees,
    getSingleEmployee,
    updateEmployee,
    deleteEmployee } = require('../controllers/employee.controller');
const { checkUser, isLoggedin } = require('../controllers/auth.controller');
const auth = require('../helpers/auth');

let router=express.Router();

router.post("/addemp",addEmployee)
router.get("/getemps",getEmployees)
router.get("/getemp/:eid",getSingleEmployee)
router.put("/updateemp/:eid",updateEmployee)
router.delete("/deleteemp/:eid",deleteEmployee)
router.post("/emplogin",checkUser)
router.get("/isloggin",isLoggedin)


module.exports=router;

