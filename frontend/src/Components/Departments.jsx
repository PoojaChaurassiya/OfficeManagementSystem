import { useEffect, useState } from "react";
import API from "../api";
import Sidebar from "./Sidebar";

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchDepartments = async () => {
    try {
      const { data } = await API.get("/department");
      setDepartments(data);
    } catch (err) {
      console.error("Error fetching departments:", err);
    }
  };

  const addOrUpdateDepartment = async () => {
    try {
      if (editId) {
        await API.put(`/department/${editId}`, { name });
        setEditId(null);
      } else {
        await API.post("/department", { name });
      }
      setName("");
      fetchDepartments();
    } catch (err) {
      console.error("Error adding/updating department:", err);
    }
  };

  const editDepartment = (dept) => {
    setName(dept.name);
    setEditId(dept._id);
  };

  const deleteDepartment = async (id) => {
    try {
      await API.delete(`/department/${id}`);
      fetchDepartments();
    } catch (err) {
      console.error("Error deleting department:", err);
    }
  };

  useEffect(() => { fetchDepartments(); }, []);

  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-4">
        <h3>Departments</h3>
        <div className="d-flex mb-3">
          <input
            className="form-control me-2"
            placeholder="Department Name"
            autoComplete="organization"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={addOrUpdateDepartment} className="btn btn-primary">
            {editId ? "Update" : "Add"}
          </button>
        </div>
        <table className="table table-bordered">
          <thead>
            <tr><th>Name</th><th>Action</th></tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d._id}>
                <td>{d.name}</td>
                <td>
                  <button onClick={() => editDepartment(d)} className="btn btn-warning btn-sm me-2">Edit</button>
                  <button onClick={() => deleteDepartment(d._id)} className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
            {departments.length === 0 && (
              <tr>
                <td colSpan="2" className="text-center text-muted">No departments found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
