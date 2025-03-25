import mongoose from "mongoose";

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
    cartItems: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book", 
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book"
      }
    ]
  },
  { timestamps: true } 
);

// Indexing for faster login/authentication lookups
userSchema.index({ email: 1 });

const User = mongoose.model("User", userSchema);
export default User;
