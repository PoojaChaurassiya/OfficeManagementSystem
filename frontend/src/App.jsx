import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/Login"
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";
import Departments from  "./Components/Departments";
import Employees from "./Components/Employees";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/departments" element={<Departments />} />
        <Route path="/employees" element={<Employees />} />
      </Routes>
    </Router>
  );
}

export default App;