import express from "express";
import { chatWithAIController } from "../controllers/aiController.js";

const router = express.Router();

router.post("/chat", chatWithAIController);

export default router;
