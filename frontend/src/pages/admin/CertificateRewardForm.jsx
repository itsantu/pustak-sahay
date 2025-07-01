import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CertificateRewardForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { name, certName, email } = location.state ?? {}

  const [rewardData, setRewardData] = useState({
    id,
    name: "",
    email,
    isPercentage: false,
    value: "",
    terms: "",
    minimumPrice: 0,
    usageLimit: 1,
    durationInMonths: 1,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setRewardData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Calculate expiry date
    const createdAt = new Date();
    const expiresAt = new Date();
    expiresAt.setMonth(createdAt.getMonth() + Number(rewardData.durationInMonths));

    const finalReward = {
      ...rewardData,
      terms: rewardData.terms.split("\n"),
      minimumPrice: Number(rewardData.minimumPrice),
      usageLimit: Number(rewardData.usageLimit),
      durationInMonths: Number(rewardData.durationInMonths),
      createdAt,
      expiresAt,
    };

    try {
      const token = localStorage.getItem("token"); // or get from Redux
      await axios.post(
        `http://localhost:8000/api/auth/create-reward`,
        finalReward,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Reward successfully allotted!");
      navigate(-1); // go back
    } catch (error) {
      console.error(error);
      alert("Failed to allot reward.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Allot Reward</h2>
      <p>Alloting reward to <span>{name}</span> for <span>{certName}</span></p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="font-semibold">Reward Name:</label>
          <input
            name="name"
            value={rewardData.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Reward Value:</label>
          <input
            name="value"
            value={rewardData.value}
            onChange={handleChange}
            placeholder='e.g. "₹100" or "10%"'
            required
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isPercentage"
            checked={rewardData.isPercentage}
            onChange={handleChange}
          />
          <label className="font-medium">Is Percentage?</label>
        </div>

        <div>
          <label className="font-semibold">Terms (one per line):</label>
          <textarea
            name="terms"
            value={rewardData.terms}
            onChange={handleChange}
            rows={3}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Minimum Price (₹):</label>
          <input
            name="minimumPrice"
            type="number"
            min="0"
            value={rewardData.minimumPrice}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Usage Limit:</label>
          <input
            name="usageLimit"
            type="number"
            min="1"
            value={rewardData.usageLimit}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div>
          <label className="font-semibold">Duration (Months):</label>
          <input
            name="durationInMonths"
            type="number"
            min="1"
            value={rewardData.durationInMonths}
            onChange={handleChange}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Allot Reward
          </button>
        </div>
      </form>
    </div>
  );
};

export default CertificateRewardForm;