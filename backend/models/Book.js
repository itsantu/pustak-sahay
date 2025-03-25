import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
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
      ],
      required: true,
      index: true,
    },
    subCategory: {
      type: String,
      required: false,
    },
    condition: {
      type: String,
      enum: ["New", "Like New", "Used"],
      default: "Used",
    },
    originalPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    discount: { type: Number, default: 0 },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    // TODO: CHANGE THE TYPES LATER
    // uploadedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true
    // },
    // approvedBy: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "User",
    //   required: true
    // },
    // binding: {
    //   type: String,
    //   enum: ["Paperback", "Hardcover", "Board Book", "Leather Bound"]
    // },
    uploadedBy: {
      type: String,
      required: true
    }, 
    approvedBy: {
      type: String, 
      required: true
    },

    status: {
      type: String,
      enum: ["Available", "Sold"],
      default: "Available",
    },
  },
  { timestamps: true }
);

bookSchema.index({ title: "text" });
bookSchema.index({ author: "text" });
bookSchema.index({ category: 1, subCategory: 1 });

const Book = mongoose.model("Book", bookSchema);

export default Book;
