const express = require("express");
const { getEmployees, createEmployee, updateEmployee, deleteEmployee } = require("../controllers/employeeController");
const { requireAuth } = require("../middlewares/authMiddleware");

const employeeRoutes = express.Router();

employeeRoutes.get("/", requireAuth, getEmployees);       
employeeRoutes.post("/", requireAuth, createEmployee);    
employeeRoutes.put("/:id", requireAuth, updateEmployee);  
employeeRoutes.delete("/:id", requireAuth, deleteEmployee); 

module.exports = employeeRoutes;
