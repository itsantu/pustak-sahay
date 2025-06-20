import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Title from "../../components/Route/Title";
import Navbar from "../../components/Navbar/Navbar";

const UserEditProfile = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    educationLevel: user.educationLevel,
    stream: user.stream,
    isStudent: user.isStudent,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <Title titleText="Edit your details - Pustak Sahay">
      <Navbar />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-4 py-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="w-full border px-4 py-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Education Level
            </label>
            <input
              type="text"
              name="educationLevel"
              className="w-full border px-4 py-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.educationLevel}
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">Stream</label>
            <input
              type="text"
              name="stream"
              className="w-full border px-4 py-2 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.stream}
              onChange={handleChange}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isStudent"
              checked={formData.isStudent}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <label className="text-gray-700">Currently a student</label>
          </div>

          <div className="flex gap-4 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </Title>
  );
};

export default UserEditProfile;
