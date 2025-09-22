const express = require("express");
const { getDepartments, createDepartment, updateDepartment, deleteDepartment } = require("../controllers/departmentController");
const { requireAuth } = require("../middlewares/authMiddleware");

const departmentRoute = express.Router();

departmentRoute.get("/", requireAuth, getDepartments);
departmentRoute.post("/", requireAuth, createDepartment);
departmentRoute.put("/:id", requireAuth, updateDepartment);
departmentRoute.delete("/:id", requireAuth, deleteDepartment);

module.exports = departmentRoute;
