import mongoose from "mongoose";

const certificateSubmissionSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {type: String, required: true},
    phone: { type: String, required: true, unique: true },
    dob: { type: Date },
    institution: { type: String, required: true },
    certificateName: { type: String, required: true },
    issuedBy: { type: String, required: true },
    issueYear: { type: String, required: true },
    certificateUrl: { type: String, required: true },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Certificate = mongoose.model("Certificate", certificateSubmissionSchema);

export default Certificate;
