import React, { useState } from "react";
import { IoIosInformationCircleOutline } from "react-icons/io";

const Reward = ({ reward }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      key={reward._id}
      className="bg-green-100 border border-green-600 p-2  rounded-md"
    >
      <div className="flex items-center justify-between">
        <div className="mb-1">
          <p className="font-bold text-lg text-green-600">
            {reward.value} OFF!{" "}
            <span className="font-normal text-sm text-gray-600">
              on order above ₹{reward.minimumPrice}
            </span>
          </p>
          <p className="text-[0.8rem]">{reward.name}</p>
        </div>
        <IoIosInformationCircleOutline
          className="text-xl cursor-pointer text-green-600 font-semibold hover:bg-green-200 rounded-full hover:scale-105"
          onClick={() => setShowInfo((prev) => !prev)}
        />
      </div>
      {showInfo && (
        <>
          <hr className="text-green-400" />
          <p className="text-sm">
            You have <span className="font-semibold">{reward.usageLimit}</span>{" "}
            left.
          </p>
          <p className="text-sm">
            <span className="font-semibold">Valid till: </span>
            {new Date(reward.expiresAt).toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
          {reward.terms && (
            <div className="text-red-700 text-sm">
              <p>Terms</p>
              <ul className="list-inside list-disc">
                {reward.terms.map((term, index) => (
                  <li key={index}>{term}</li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Reward;
