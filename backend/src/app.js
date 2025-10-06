
import express from "express";
import cors from "cors";
import userRoutes from "./routes/authRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.send("✅ Backend API is running!");
});
app.post("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.post("/test-supabase", (req, res) => {
  // Simulate a Supabase test
    res.json({ message: "Supabase connection successful!" });
});

// Mount user routes
app.use("/api/users", userRoutes);

export default app;
