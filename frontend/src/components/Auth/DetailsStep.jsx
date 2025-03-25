import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

const DetailsStep = ({ email }) => {
  const { signup, loading, error } = useSignup();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    await signup(name, email, password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Enter Details
        </h2>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Name"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            type="password"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          />
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
