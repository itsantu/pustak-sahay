import mongoose from "mongoose";
import CartItemsSchema from "./CartItems.js";
import RewardSchema from "./Schemas/RewardSchema.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"], // Email validation
      index: true, // Faster searches
    },
    isStudent: {
      type: Boolean,
      default: false,
      required: true,
    },
    educationLevel: {
      type: String,
      enum: [
        "Class 9 and below",
        "Class 10",
        "Class 11",
        "Class 12",
        "Under Graduate",
        "Post Graduate",
      ],
    },
    stream: {
      type: String,
      enum: [
        "Science",
        "Arts",
        "Commerce",
        "Medical",
        "Engineering",
        "Arts",
        "Commerce",
        "Law",
        "Others",
      ],
    },
    phone: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Prevents password from being returned by default in queries
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    cartItems: [CartItemsSchema],
    rewards: [RewardSchema],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  { timestamps: true }
);

// Indexing for faster login/authentication lookups
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);
export default User;
