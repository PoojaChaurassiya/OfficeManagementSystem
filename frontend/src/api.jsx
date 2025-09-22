// api.jsx
import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // allow session cookie
});

// Auth APIs
export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const logout = () => API.post("/auth/logout");   // ✅ add this
export const checkAuth = () => API.get("/auth/check");

// Department APIs
export const getDepartments = () => API.get("/department");
export const addDepartment = (data) => API.post("/department", data);
export const deleteDepartment = (id) => API.delete(`/department/${id}`);

// Employee APIs
export const getEmployees = (params) => API.get("/employees", { params });
export const addEmployee = (data) => API.post("/employees", data);
export const deleteEmployee = (id) => API.delete(`/employees/${id}`);

export default API;
