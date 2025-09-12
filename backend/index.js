const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const UserRoutes = require("./routes/userRoutes");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/api/users", UserRoutes);

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/merncrud")
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("MongoDB Error:", err));

// Start server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
