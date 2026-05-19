import express from "express";

import protect from "../middleware/authMiddleware.js";

import { analyzeComplaint } from "../controllers/aiController.js";

const router = express.Router();

router.post("/analyze", protect, analyzeComplaint);

export default router;