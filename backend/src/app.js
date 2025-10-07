import express from "express";
import cors from "cors";
import userRoutes from "./routes/authRoutes.js";     // 👤 User auth routes
import expenseRoutes from "./routes/expenseRoutes.js"; // 💰 Expense routes
import aiRoutes from "./routes/aiRoutes.js";


const app = express();

app.use(cors());
app.use(express.json());

// ✅ Health check routes
app.get("/", (req, res) => {
  res.send("✅ Backend API is running!");
});

app.post("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ✅ Test Supabase connection
app.post("/test-supabase", (req, res) => {
  res.json({ message: "Supabase connection successful!" });
});

// 👤 Mount user routes
app.use("/api/users", userRoutes);

// 💰 Mount expense routes
app.use("/api/expenses", expenseRoutes); // 👈 Added this line

//api for gemini

app.use("/api/ai", aiRoutes);

// Export app for use in server.js or testing
export default app;
