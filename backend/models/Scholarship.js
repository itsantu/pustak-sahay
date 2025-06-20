import mongoose from "mongoose";

const scholarshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    applicationDeadline: {
      type: Date,
      validate: {
        validator: (value) => value > new Date(),
        message: "Application deadline must be in the future.",
      },
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    applyUrl: {
      type: String,
      required: true,
    },
    eligibleCandidate: {
      type: String,
      required: true,
      index: true
    },
    eligibility: [
      {
        type: String,
      },
    ],
    documents: [
      {
        type: String,
      },
    ],
    howCanApply: [
      {
        type: String,
      },
    ],
    award: {
      type: String, // Changed from Number to String for more flexibility
      required: true,
    },
    termsAndConditions: [
      {
        type: String,
      },
    ],
    uploadedBy: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: 'User',
        // required: true
        type: String
    }
  },
  { timestamps: true }
);

// Improved searchability with text index
scholarshipSchema.index({ title: "text", description: "text" });

const Scholarship = mongoose.model("Scholarship", scholarshipSchema);
export default Scholarship;
