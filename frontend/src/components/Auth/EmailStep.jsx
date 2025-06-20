import { useState } from "react";
import axios from "axios";
import { useSentOTP } from "../../hooks/useSendOTP";

const EmailStep = ({ signupReq, setStep, setEmail }) => {
  const { sendOTP, sendOTPforForgotPassword, loading, error } = useSentOTP();
  const [emailInput, setEmailInput] = useState("");

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (signupReq) {
      await sendOTP({ email: emailInput, setStep });
    } else {
      await sendOTPforForgotPassword({ email: emailInput, setStep });
    }
    setEmail(emailInput);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg">
        {/* <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Sign Up
        </h2> */}
        <form onSubmit={handleSendOtp}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Enter Email
            </label>
            <input
              type="email"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              placeholder="Email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 text-white font-semibold rounded-lg transition-all cursor-grab ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>

          {error && (
            <div className="mt-4 text-center text-red-500">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EmailStep;
