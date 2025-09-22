const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  country: String,
  state: String,
  city: String,
}, { timestamps: true });

module.exports = mongoose.model("Employee", employeeSchema);
