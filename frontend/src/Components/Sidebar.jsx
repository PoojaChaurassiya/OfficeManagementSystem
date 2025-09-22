import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../api";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      await logout();
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const linkClass = ({ isActive }) =>
    `nav-link text-white ${isActive ? "bg-secondary rounded" : ""}`;

  return (
    <div
      className="d-flex flex-column p-3 bg-dark text-white vh-100"
      style={{ width: "250px" }}
    >
      <h3 className="text-center mb-4">Admin Panel</h3>
      
      <ul className="nav flex-column mb-auto">
        <li className="nav-item mb-2">
          <NavLink to="/" className={linkClass}>
            Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/departments" className={linkClass}>
            Departments
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/employees" className={linkClass}>
            Employees
          </NavLink>
        </li>
      </ul>

      <hr className="bg-light" />

      <button className="btn btn-outline-light w-100 mt-auto" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
