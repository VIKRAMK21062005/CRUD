// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";

dotenv.config();

const app = express();

// Middlewares
app.use(cors());            // allow cross-origin requests (frontend <> backend)
app.use(express.json());    // parse JSON request bodies
app.use(express.urlencoded({ extended: true }));
// Simple health route
app.get("/", (req, res) => res.json({ status: "ok", message: "Server is running" }));

// API routes
app.use("/api/users", userRoutes);

// Basic error handler (catches async errors forwarded with next(err))
app.use((err, req, res, next) => {
  console.error(err); // log error to console
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start function: wait for DB, then listen
const PORT = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(); // ensure DB connected before starting server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

start();
