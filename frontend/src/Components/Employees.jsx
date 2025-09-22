import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "./Sidebar";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    departmentId: "",
    country: "",
    state: "",
    city: ""
  });
  const [editId, setEditId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const { data } = await API.get("/employees");
      setEmployees(data.employees || []);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchDepartments = async () => {
    try {
      const { data } = await API.get("/department");
      setDepartments(data);
    } catch (err) {
      console.error(err);
    }
  };

  const addOrUpdateEmployee = async () => {
    try {
      const payload = {
        name: form.name.trim(),
        email: form.email.trim(),
        department: form.departmentId || null,
        country: form.country.trim(),
        state: form.state.trim(),
        city: form.city.trim()
      };

      if (!payload.name || !payload.email) {
        alert("Name and Email are required");
        return;
      }

      if (editId) {
        await API.put(`/employees/${editId}`, payload);
        setEditId(null);
      } else {
        await API.post("/employees", payload);
      }

      setForm({ name: "", email: "", departmentId: "", country: "", state: "", city: "" });
      fetchEmployees();
    } catch (err) {
      alert(err.response?.data?.error || "Failed to add/update employee");
    }
  };

  const editEmployee = (emp) => {
    setForm({
      name: emp.name,
      email: emp.email,
      departmentId: emp.department?._id || "",
      country: emp.country,
      state: emp.state,
      city: emp.city
    });
    setEditId(emp._id);
  };

  const deleteEmployee = async (id) => {
    try {
      await API.delete(`/employees/${id}`);
      fetchEmployees();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchDepartments();
  }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <h3>Employees</h3>
        <div className="mb-3">
          <input className="form-control mb-2" placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/>
          <input className="form-control mb-2" placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
          <select className="form-control mb-2" value={form.departmentId} onChange={e => setForm({ ...form, departmentId: e.target.value })}>
            <option value="">Select Department</option>
            {departments.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
          </select>
          <input className="form-control mb-2" placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}/>
          <input className="form-control mb-2" placeholder="State" value={form.state} onChange={e => setForm({ ...form, state: e.target.value })}/>
          <input className="form-control mb-2" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })}/>
          <button className="btn btn-success w-100" onClick={addOrUpdateEmployee}>{editId ? "Update" : "Add"} Employee</button>
        </div>
        <table className="table table-striped">
          <thead><tr><th>Name</th><th>Email</th><th>Department</th><th>Location</th><th>Action</th></tr></thead>
          <tbody>
            {employees.map(e => (
              <tr key={e._id}>
                <td>{e.name}</td>
                <td>{e.email}</td>
                <td>{e.department?.name || "-"}</td>
                <td>{e.country}, {e.state}, {e.city}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-2" onClick={() => editEmployee(e)}>Edit</button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteEmployee(e._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
