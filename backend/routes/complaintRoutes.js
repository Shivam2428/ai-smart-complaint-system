import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  addComplaint,
  getComplaints,
  updateComplaint,
  deleteComplaint,
  searchByLocation,
} from "../controllers/complaintController.js";

const router = express.Router();

router.post("/", protect, addComplaint);

router.get("/", protect, getComplaints);

router.put("/:id", protect, updateComplaint);

router.delete("/:id", protect, deleteComplaint);

router.get("/search/location", protect, searchByLocation);

export default router;