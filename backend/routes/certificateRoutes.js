import express from "express";
import upload from "../middleware/multer.js";
import { addCertificate, getCertificateDetail, getCertificatesForReview } from "../controllers/certificateController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.use(requireAuth)

router.post("/", upload.single("certificateFile"), addCertificate);

router.get("/", getCertificatesForReview)

router.get("/:id", getCertificateDetail)

export default router