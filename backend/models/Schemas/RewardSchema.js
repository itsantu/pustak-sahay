import mongoose from "mongoose";

const RewardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isPercentage: {
    type: Boolean,
    default: false,
  },
  value: {
    type: String, // e.g., "10%" or "₹100"
    required: true,
  },
  terms: {
    type: [String],
    default: [],
  },
  minimumPrice: {
    type: Number, 
    default: 0,
  },
  usageLimit: {
    type: Number, 
    default: 1,
  },
  durationInMonths: {
    type: Number, 
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
  },
});

export default RewardSchema