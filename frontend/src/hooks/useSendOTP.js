import axios from "axios";
import { useState } from "react";

export const useSentOTP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendOTP = async ({ email, setStep }) => {
    setLoading(true);
    setError(null);
    try {
      await axios.post("http://localhost:8000/api/auth/otp/signup", {
        email,
      });
      setStep(2);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async ({ email, otp, setStep }) => {
    try {
      setLoading(true);
      setError(null);
      const res = await axios.post(
        "http://localhost:8000/api/auth/verify-otp",
        {
          email,
          otp,
        }
      );
      if (res.data.verifiedOTP) setStep(3);
      else alert("Invalid OTP");
    } catch (error) {
      setError(error.message);
      console.log(error);
      alert("OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  return { sendOTP, verifyOTP, loading, error };
};
