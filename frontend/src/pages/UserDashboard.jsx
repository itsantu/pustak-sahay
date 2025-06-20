import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";
import Title from "../components/Route/Title";
import { Link } from "react-router-dom";
import { CiEdit } from "react-icons/ci";
import Navbar from "../components/Navbar/Navbar";
import { IoIosInformationCircleOutline } from "react-icons/io";
import axios from "axios";
import Reward from "../components/Reward/Reward";

const UserDashboard = () => {
  const user = useSelector((state) => state.user.user);
  const { logoutUser } = useLogout();
  const [rewards, setRewards] = useState([]);
  const [rewardLoading, setRewardLoading] = useState(true);

  const handleEditProfile = () => {};

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/auth/get-reward?email=${user?.email}`
        );
        if (res.status >= 200 && res.status < 300) {
          setRewards(res.data);
          // console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setRewardLoading(false);
      }
    };
    fetchReward();
  });

  return (
    <Title titleText="User Dashboard - Pustak Sahay">
      <Navbar />
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Welcome,{" "}
            <span className="text-blue-600">{user.name.split(" ")[0]}</span>
          </h2>
          <Link to="/userdash-edit">
            <button
              onClick={handleEditProfile}
              className="border border-black hover:bg-gray-800 flex items-center gap-1 text-black hover:text-white text-lg px-4 py-2 rounded-lg cursor-pointer transition"
            >
              <CiEdit />
              <span className="hidden md:block text-sm">Edit Profile</span>
            </button>
          </Link>
        </div>

        <div className=" text-gray-700">
          <div className="py-2 rounded-lg">
            <p className="font-semibold mb-2">Full Name:</p>
            <p className="p-2 bg-gray-300 rounded-xl">{user.name}</p>
          </div>

          <div className="py-2 rounded-lg">
            <p className="font-semibold mb-2">Email:</p>
            <p className="p-2 bg-gray-300 rounded-xl">{user.email}</p>
          </div>

          <div className="py-2 rounded-lg">
            <p className="font-semibold mb-2">Education Level:</p>
            <p className="p-2 bg-gray-300 rounded-xl">{user.educationLevel}</p>
          </div>

          <div className="py-2 rounded-lg">
            <p className="font-semibold mb-2">Stream:</p>
            <p className="p-2 bg-gray-300 rounded-xl">{user.stream}</p>
          </div>

          {/* <div className="p-2 rounded-lg">
            <p className="font-semibold mb-2">Student:</p>
            <p>{user.isStudent ? "Yes" : "No"}</p>
          </div> */}
        </div>

        <div className="">
          <p className="font-semibold mb-2">Available rewards:</p>
          {!rewardLoading ? (
            rewards && rewards.length > 0 ? (
              rewards.map((reward) => (
                <Reward key={reward._id} reward={reward} />
              ))
            ) : (
              <p className="flex items-center justify-between gap-2 p-2 border border-red-500 bg-red-100 text-red-700 rounded-md">
                <div className="flex items-center gap-2">
                  <IoIosInformationCircleOutline className="text-xl" />{" "}
                  <span>There's no active rewards for you</span>{" "}
                </div>
                <Link to="/certificate-form">
                  <button
                    title="Gain rewards by Certificates"
                    className="bg-white px-2 border border-green-700 text-green-700 cursor-pointer rounded-sm"
                  >
                    Gain
                  </button>
                </Link>
              </p>
            )
          ) : (
            <p>Loading</p>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-8 mb-5">
          <button
            onClick={logoutUser}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer transition"
          >
            Logout
          </button>

          {user.cartItemCount?.length > 0 && (
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition"
              onClick={() => alert("Redirecting to cart...")}
            >
              View Cart ({user.cartItemCount.length})
            </button>
          )}
        </div>
      </div>
    </Title>
  );
};

export default UserDashboard;
