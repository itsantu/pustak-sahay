import express from "express";
import upload from "../middleware/multer.js";
import {
  addBookSubmission,
  deleteBookSubmission,
  getBookDetail,
  getSubmittedBooks,
  updateBookSubmission,
} from "../controllers/BookSubmissionController.js";

const router = express.Router();

router.post("/", upload.single("image"), addBookSubmission);

router.get("/books/:status", getSubmittedBooks)

router.get("/book/:id", getBookDetail)

router.patch("/book/:id", updateBookSubmission);

router.delete("/book/:id", deleteBookSubmission);

export default router;