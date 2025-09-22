const Employee = require("../models/Employee");

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("department", "name");
    res.json({ employees });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createEmployee = async (req, res) => {
  try {
    const { name, email, department, country, state, city } = req.body;

    if (!name || !email) return res.status(400).json({ error: "Name and Email are required" });

    const employee = new Employee({
      name,
      email,
      department: department || null,
      country,
      state,
      city
    });

    await employee.save();
    const populatedEmployee = await Employee.findById(employee._id).populate("department", "name");
    res.status(201).json(populatedEmployee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const { name, email, department, country, state, city } = req.body;

    if (!name || !email) return res.status(400).json({ error: "Name and Email are required" });

    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, department: department || null, country, state, city },
      { new: true, runValidators: true }
    ).populate("department", "name");

    res.json(employee);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
