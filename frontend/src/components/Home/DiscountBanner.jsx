import React from "react";
const DiscountBanner = () => {
  return (
    <div className="p-4 py-10">
      <div className="relative bg-gradient-to-r from-blue-500 to-green-400 text-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-200">
            "Your grades doesn't matter!"
          </h2>
          <p className="text-2xl font-bold">Actually it</p>
          <p className="text-7xl p-0 text-yellow-400 font-bold">Matters!</p>
        </div>
        <div className="w-full md:w-1/2 flex flex-col items-center text-center">
          <p className="mb-4 max-w-lg">
            Unlock exclusive discounts with your academic achievements. Show
            your certificate and enjoy special savings on our collection of old
            books. Hard work should always pay off!
          </p>
          <button className="bg-white text-blue-500 font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-100 transition-transform transform cursor-pointer hover:scale-105">
            Claim Your Discount
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiscountBanner;
