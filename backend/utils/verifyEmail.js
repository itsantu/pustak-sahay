import nodemailer from "nodemailer";
import dotenv from "dotenv";
import NodeCache from "node-cache";

dotenv.config();

// Create a transporter object using SMTP transport
const transporter = nodemailer.createTransport({
  service: "gmail", // Replace with your email provider
  secure: true,
  port: 465,
  auth: {
    user: process.env.EMAIL_ADDRESS, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password
  },
});

const sendOtpEmail = async (to, otp) => {
  const mailOptions = {
    from: `"PUSTAK SAHAY" <${process.env.EMAIL_ADDRESS}>`,
    to: to,
    subject: "OTP Verification - Pustak Sahay",
    text: `Your One-Time Password (OTP) is: ${otp}
  If you did not request this OTP, please ignore this email.
  Best regards,  
  Team Pustak Sahay`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return false;
  }
};

const sendCertificateVerificationEmail = async (to, name, certificateName) => {
  const mailOptions = {
    from: `"PUSTAK SAHAY" <${process.env.EMAIL_ADDRESS}>`, // Sender address
    to: to, // Recipient
    subject: "📚 Certificate Submission Successful - Pustak Sahay", // Subject line
    text: `Dear ${name},
  
  Thank you for submitting your certificate titled "${certificateName}" to the Pustak Sahay Loyalty Program.
  
  We have successfully received your certificate and it is now under review. You will be notified once it has been verified.
  
  If you have any questions or need assistance, feel free to reach out to us.
  
  Warm regards,  
  Team Pustak Sahay`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error("Error in submitting certificate:", error);
    return false;
  }
};

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
};

const otpCache = new NodeCache({ stdTTL: 5000 }); // TTL of 3 minutes
// Save OTP
const saveOTP = (email, otp) => {
  otpCache.set(email, otp);
};

// Verify OTP
const verifyOTP = (email, userOtp) => {
  const otp = otpCache.get(email);
  // console.log(otp);

  if (otp == userOtp) {
    otpCache.del(email); // Free up storage after successful verification
    return true;
  }
  return false;
};

export {
  sendOtpEmail,
  sendCertificateVerificationEmail,
  generateOTP,
  saveOTP,
  verifyOTP,
};
