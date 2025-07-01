import mongoose from "mongoose";
import { cloudinary } from "../utils/cloudinary.js";
import Certificate from "../models/CertificateSubmission.js";
import { sendCertificateVerificationEmail } from "../utils/verifyEmail.js";

const addCertificate = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      dob,
      institution,
      certificateName,
      issuedBy,
      issueYear,
    } = req.body;
    if (
      !name ||
      !phone ||
      !dob ||
      !institution ||
      !certificateName ||
      !issuedBy ||
      !issueYear
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    let certificateUrl = null;
    if (req.file) {
      const allowedMimeTypes = ["application/pdf"];
      if (!allowedMimeTypes.includes(req.file.mimetype)) {
        return res.status(400).json({ message: "Only PDF files are allowed." });
      }
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "Certificates",
          resource_type: "auto",
        });
        certificateUrl = uploadResult.secure_url;
      } catch (error) {
        // console.log("Cloudinary Error:", error);
        return res
          .status(500)
          .json({ message: "Error in uploading certificate" });
      }
    }

    const certificateSubmitted = await Certificate.create({
      name,
      email,
      phone,
      dob,
      certificateName,
      institution,
      issuedBy,
      issueYear,
      certificateUrl,
      uploadedBy: req.user._id
    });

    if (!certificateSubmitted) {
      return res
        .status(500)
        .json({ message: "Error in saving certificate details" });
    }

    await sendCertificateVerificationEmail(
      "mallickantu19@gmail.com",
      name,
      certificateName
    );
    return res
      .status(201)
      .json({ message: "Certificate submitted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCertificatesForReview = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });

    if (!certificates) {
      return res.status(404).json({ message: "Certificates not found" });
    }

    return res.status(200).json(certificates);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCertificateDetail = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "Provide a valid id" });
  }

  try {
    const certificate = await Certificate.findById(id);

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    res.status(200).json(certificate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { addCertificate, getCertificatesForReview, getCertificateDetail };
