  const express = require("express");
  const mongoose = require("mongoose");
  const cors = require("cors");
  const session = require("express-session");
  const MongoStore = require("connect-mongo");  
  const { connectDB } = require("./db/db");

  const authRoutes = require("./routes/authRoutes");
  const departmentRoute = require("./routes/departmentsRoutes");
  const employeeRoutes = require("./routes/employeeRoutes");

  const app = express();

  app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

  connectDB();


  app.use(session({
    secret: "MY_SECRET_KEY",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
      mongoUrl: "mongodb://127.0.0.1:27017/office_management"  
    }),
    cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 } 
  }));

    
  app.use("/auth", authRoutes);
  app.use("/department" , departmentRoute);
  app.use("/employees", employeeRoutes);


  app.listen(5000, () => console.log("Server running at http://localhost:5000"));
