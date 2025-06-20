import axios from "axios";
import { useState } from "react";

export const useSentOTP = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendOTP = async ({ email, setStep }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/otp/signup",
        { email }
      );
      console.log(res.data.message);
      setStep(2);
    } catch (error) {
      if (error.response) {
        // Backend responded with a status code not in 2xx
        setError(error.response.data.message);
      } else {
        // Other errors (network, etc.)
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const sendOTPforForgotPassword = async ({ email, setStep }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post("http://localhost:8000/api/auth/otp/login", {
        email,
      });
      alert(res.data.message);
      setStep(2);
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
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

  return { sendOTP, sendOTPforForgotPassword, verifyOTP, loading, error };
};
