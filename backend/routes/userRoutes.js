import express from "express";
import {
  loginUser,
  signupUser,
  verifyOTPRequest,
  sendSignupOTP,
  sendLoginOtp,
  updatePassword,
} from "../controllers/userController.js";
import { createRewardForUser, getRewards } from "../controllers/rewardController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/otp/signup", sendSignupOTP);

router.post("/otp/login", sendLoginOtp);

router.post("/verify-otp", verifyOTPRequest);

router.post("/signup", signupUser);

router.post("/update-password", updatePassword)

// reward routes

router.post("/create-reward", createRewardForUser)

router.get("/get-reward", getRewards)

export default router;
