import {
  addScholarship,
  getAllScholarships,
  getScholarshipDetails,
} from "../controllers/scholarship.controller.js";
import express from "express";

const router = express.Router();

router.post("/add-scholarship", addScholarship);

router.get("/", getAllScholarships);

router.get("/:id", getScholarshipDetails);

export default router;
