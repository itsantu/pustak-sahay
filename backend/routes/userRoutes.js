import express from "express";
import {
  loginUser,
  signupUser,
  verifyOTPRequest,
  sendSignupOTP,
  sendLoginOtp,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/otp/signup", sendSignupOTP);

router.post("/otp/login", sendLoginOtp);

router.post("/verify-otp", verifyOTPRequest);

router.post("/signup", signupUser);

export default router;
