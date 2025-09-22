The Office Employee Management System is a full-stack MERN application designed to manage organizational departments and employees. It provides a complete solution for handling employee records, department assignments, and supervisor relationships with modern features like search, filters, and pagination.

Backend (Node.js + Express + MongoDB):

CRUD operations for Departments and Employees

Employee belongs to a Department

Employee can have a Supervisor (self-referencing relationship)

Employee Listing API with pagination, search by name/email, and filters (by department/job title)

External API integration for dynamic Country → State → City dropdowns

Frontend (React.js):

User-friendly interface to manage departments and employees

Forms for adding/editing employees and departments

Dropdowns for department selection and dynamic location loading

Employee listing with pagination, search, and filters

Database (MongoDB + Mongoose):

Stores department and employee data with schema validation

Auto timestamps for createdAt & updatedAt
