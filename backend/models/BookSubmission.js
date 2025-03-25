import mongoose from "mongoose";

const bookSubmissionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      index: true,
    },
    author: {
      type: String,
      required: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Engineering",
        "Medical",
        "Finance",
        "Science",
        "School",
        "Competitive Exams",
        "Literature",
        "Reference",
        "Self-Help",
        "Others",
      ],
      required: true,
      index: true,
    },
    condition: {
      type: String,
      enum: ["New", "Like New", "Used"],
      default: "Used",
    },
    price: {
      type: Number,
      required: true,
    },
    isFree: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: String,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Reviewed", "Accepted", "Rejected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const BookSubmission = mongoose.model("BookSubmission", bookSubmissionSchema);

export default BookSubmission;
