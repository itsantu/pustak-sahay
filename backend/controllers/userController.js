import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";
import {
  generateOTP,
  sendOtpEmail,
  saveOTP,
  verifyOTP,
} from "../utils/verifyEmail.js";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, { expiresIn: "3d" });
};

const handleSendingOtp = async (email) => {
  const otp = generateOTP();
  if (!otp) throw new Error("Failed to generate OTP.");
  // console.log(otp);

  saveOTP(email, otp);

  const otpSend = await sendOtpEmail(email, otp);
  if (!otpSend) throw new Error("Failed to send OTP email");
};

const sendSignupOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format." });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(302)
        .json({ message: "User already exist with this email!" });
    }

    await handleSendingOtp(email);

    return res
      .status(201)
      .json({ message: "OTP send successfully for signup" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const sendLoginOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "No user found." });
    }

    // Send OTP
    await handleSendingOtp(email);

    res.status(201).json({ message: "OTP sent." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOTPRequest = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const verifiedOTP = verifyOTP(email, otp);

    res.status(200).json({ verifiedOTP });
  } catch (error) {
    res.status(200).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const {
    name,
    email,
    isStudent,
    educationLevel,
    stream,
    phone,
    password,
    role,
  } = req.body;

  if (!name || !password || !email) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hash,
      isStudent,
      educationLevel,
      stream,
      phone,
      role: role || undefined,
    });

    if (!user) {
      return res.status(500).json({ message: "Failed to create user" });
    }

    const token = createToken(user._id);
    const sendUserDetails = {
      name: user.name,
      email: user.email,
      role: user.role,
      cartItemCount: user.cartItems,
      isStudent: user.isStudent,
      educationLevel: user.educationLevel,
      stream: user.stream,
      token,
    };
    return res.status(201).json({
      sendUserDetails,
      message: "Signed Up successfully",
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Password is incorrect!" });
    }

    const token = createToken(user._id);

    const sendUserDetails = {
      name: user.name,
      email: user.email,
      role: user.role,
      cartItems: user.cartItems,
      isStudent: user.isStudent,
      educationLevel: user.educationLevel,
      stream: user.stream,
      token,
    };
    return res.status(200).json({ sendUserDetails, message: "User Logged In" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error!", error: error.message });
  }
};

const updatePassword = async (req, res) => {
  const { email, newPassword } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    await User.updateOne({ email }, { password: hash });

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: "Error occured" });
  }
}

const deleteUser = async (req, res) => {
  try {
    const id = req.params;

    const user = await User.findByIdAndDelete({ _id: id });

    return res.status(200).json({ message: "User deleted " });
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Server error", error: error.message });
  }
};


export { signupUser, sendSignupOTP, sendLoginOtp, loginUser, updatePassword, verifyOTPRequest };
