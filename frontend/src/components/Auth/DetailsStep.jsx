import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { IoEye, IoEyeOffSharp } from "react-icons/io5";

const DetailsStep = ({ email }) => {
  const { signup, loading, error } = useSignup();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isStudent, setIsStudent] = useState(null);
  const [educationLevel, setEducationLevel] = useState("");
  const [stream, setStream] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const name = `${firstName.trim()} ${lastName.trim()}`.trim();
    await signup(
      name,
      email,
      isStudent,
      educationLevel,
      stream,
      phone,
      password
    );

    console.log(
      name,
      email,
      isStudent,
      educationLevel,
      stream,
      phone,
      password
    );
  };

  const showStreamOptions = () => {
    if (educationLevel === "Class 11" || educationLevel === "Class 12") {
      return ["Science", "Arts", "Commerce"];
    } else if (educationLevel === "Under Graduate") {
      return ["Medical", "Engineering", "Arts", "Commerce", "Law", "Others"];
    }
    return [];
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
          Enter Your Details
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <div className="flex gap-3">
            <div className="w-1/2">
              <label className="block mb-1 text-sm text-gray-600">
                First Name <span className="text-red-600 text-lg">*</span>
              </label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="John"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block mb-1 text-sm text-gray-600">
                Last Name <span className="text-red-600 text-lg">*</span>
              </label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Doe"
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm text-gray-600">
              Are you a student? <span className="text-red-600 text-lg">*</span>
            </label>
            <div className="flex items-center space-x-6">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isStudent"
                  value="true"
                  checked={isStudent === true}
                  onChange={() => setIsStudent(true)}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">Yes</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="isStudent"
                  value="false"
                  checked={isStudent === false}
                  onChange={() => {
                    setIsStudent(false);
                    setEducationLevel("");
                    setStream("");
                  }}
                  className="form-radio text-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">No</span>
              </label>
            </div>
          </div>

          {isStudent && (
            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Education Level <span className="text-red-600 text-lg">*</span>
              </label>
              <select
                value={educationLevel}
                onChange={(e) => {
                  setEducationLevel(e.target.value);
                  setStream("");
                }}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select</option>
                <option value="Class 9 and below">Class 9 and below</option>
                <option value="Class 10">Class 10</option>
                <option value="Class 11">Class 11</option>
                <option value="Class 12">Class 12</option>
                <option value="Under Graduate">Under Graduate</option>
                <option value="Post Graduate">Post Graduate</option>
              </select>
            </div>
          )}

          {["Class 11", "Class 12", "Under Graduate"].includes(
            educationLevel
          ) && (
            <div>
              <label className="block mb-1 text-sm text-gray-600">
                Stream <span className="text-red-600 text-lg">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                {showStreamOptions().map((option) => (
                  <label key={option} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="stream"
                      value={option}
                      checked={stream === option}
                      onChange={(e) => setStream(e.target.value)}
                      className="text-blue-600"
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm text-gray-600">Phone</label>
            <input
              type="text"
              value={phone}
              maxLength={10}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setPhone(value);
                }
              }}
              placeholder="Enter 10-digit number"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">
              Password <span className="text-red-600 text-lg">*</span>
            </label>
            <div className="flex items-center ">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                required
              ></input>
              <span
                onClick={handleShowPassword}
                className={`p-2 text-xl cursor-pointer`}
              >
                {showPassword ? <IoEye /> : <IoEyeOffSharp />}
              </span>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-md transition"
          >
            {!loading ? "Sign Up" : "Signing up..."}
          </button>

          {error && (
            <div className="mt-4 text-center text-red-500">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default DetailsStep;
