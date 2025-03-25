import { useState } from "react";
import axios from "axios";
import { useSentOTP } from "../../hooks/useSendOTP";

const OtpStep = ({ setStep, email }) => {
    const { verifyOTP, loading, error }  = useSentOTP();
  const [otp, setOtp] = useState("");

  const handleVerifyOtp = async (e) => {
    e.preventDefault()

    await verifyOTP({ email, otp, setStep })
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Verify OTP
        </h2>
        <form onSubmit={handleVerifyOtp}>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
            maxLength={6}
            placeholder="XXXXXX"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition mb-4"
          />
          <button
          type="submit"
          disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded transition"
          >
            {!loading ? "Verify" : "Verifying..."}
          </button>
          {error && (
            <div className="mt-4 text-center text-red-500">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default OtpStep;
