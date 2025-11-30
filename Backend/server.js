import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js"; // ✅ Use this one

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("AI Resume Generator API running..."));

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes); // ✅ This is correct for POST /api/resume/
app.use('/api/resumes', resumeRoutes); // ✅ Add this too for frontend compatibility

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
