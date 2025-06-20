import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import bookSubmissionRouter from "./routes/bookSubmissionRoutes.js";
import bookRouter from "./routes/bookRoutes.js";
import userRouter from "./routes/userRoutes.js";
import cartRouter from "./routes/cartRoutes.js"
import schloRouter from "./routes/scholarship.routes.js"
import certificateRouter from './routes/certificateRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route for Testing
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});
app.use("/api/booksubmission", bookSubmissionRouter);
app.use("/api/books", bookRouter);
app.use("/api/auth", userRouter);
app.use("/api/user/cart", cartRouter)
app.use("/api/scholarship", schloRouter)
app.use("/api/user/certificates", certificateRouter)

// MongoDB Connection and Server Start
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

connectDB();
