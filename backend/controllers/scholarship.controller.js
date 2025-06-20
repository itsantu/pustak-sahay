import Scholarship from "../models/Scholarship.js";
import mongoose from "mongoose";

const addScholarship = async (req, res) => {
  try {
    const {
      title,
      applicationDeadline,
      description,
      imageUrl,
      applyUrl,
      eligibleCandidate,
      eligibility,
      documents,
      howCanApply,
      award,
      termsAndConditions,
    } = req.body;

    if (
      !title ||
      !applicationDeadline ||
      !description ||
      !applyUrl ||
      !eligibleCandidate ||
      !eligibility ||
      !documents ||
      !howCanApply ||
      !award ||
      !termsAndConditions
    ) {
      // console.log(req.body);
      return res.status(400).json({ message: "All fields are required" });
    }
    const newScholarship = new Scholarship({
      title,
      applicationDeadline,
      description,
      imageUrl:
        imageUrl ||
        "https://res.cloudinary.com/antumallick/image/upload/v1727639085/SocialMedia/k3pm8qb6ooiwlujvne7q.jpg",
      applyUrl,
      eligibleCandidate,
      eligibility,
      documents,
      howCanApply,
      award,
      termsAndConditions,
      uploadedBy: "12345",
    });
    const savedSchol = await newScholarship.save();
    if (!savedSchol) {
      return res
        .status(500)
        .json({ message: "Error ocurRed during Scholarship uploading" });
    }
    return res
      .status(201)
      .json({ savedSchol, message: "Scholarship successfully uploaded" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllScholarships = async (req, res) => {
  try {
    const scholarships = await Scholarship.find()
      .select("_id title applicationDeadline eligibleCandidate")
      .limit(10)
      .sort({ createdAt: -1 });

    return res.status(200).json(scholarships);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getScholarshipDetails = async (req, res) => {
  const { id } = req.params;
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }
  try {
    const scholarshipDetail = await Scholarship.findById(id).select("-__v -updatedAt");

    if (!scholarshipDetail) {
      return res.status(400).json({ message: "No scholarship found" });
    }

    return res.status(200).json(scholarshipDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export { addScholarship, getAllScholarships,getScholarshipDetails };
