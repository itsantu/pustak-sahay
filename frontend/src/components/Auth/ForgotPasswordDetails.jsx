import React from "react";
import Title from "../Route/Title";
import { useState } from "react";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";
import { useForgotPassword } from "../../hooks/useForgotPassword";

const ForgotPasswordDetails = ({ email }) => {
  const { updatePassword, loading, error } = useForgotPassword();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updatePassword({ email, newPassword: password, confirmPassword });
  };

  return (
    <Title titleText={"Forgot Password - Pustak Sahay"}>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Update Passoword
          </h2>
          <form className="mt-4" onSubmit={handleSubmit}>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">
                New Password
              </label>
              <div className="flex items-center ">
                <input
                  type={showPassword1 ? "text" : "password"}
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                ></input>
                <span
                  onClick={() => setShowPassword1((prev) => !prev)}
                  className={`p-2 text-xl cursor-pointer`}
                >
                  {showPassword1 ? <IoEye /> : <IoEyeOffSharp />}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600">
                Confirm Password
              </label>
              <div className="flex items-center ">
                <input
                  type={showPassword2 ? "text" : "password"}
                  value={confirmPassword}
                  placeholder="Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                ></input>
                <span
                  onClick={() => setShowPassword2((prev) => !prev)}
                  className={`p-2 text-xl cursor-pointer`}
                >
                  {showPassword2 ? <IoEye /> : <IoEyeOffSharp />}
                </span>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-2 mt-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
            >
              {!loading ? "Update Password" : "Waiting for response..."}
            </button>
            {error && (
              <div className="mt-4 text-center text-red-500">{error}</div>
            )}
          </form>
        </div>
      </div>
    </Title>
  );
};

export default ForgotPasswordDetails;
