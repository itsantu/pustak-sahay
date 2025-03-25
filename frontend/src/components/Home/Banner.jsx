import React from "react";

const Banner = () => {
  return (
    <div className="px-4">
      <header
        className="relative text-center py-16 bg-blue-400 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute top-0 h-full w-full bg-black opacity-40 z-10"></div>
        <div className="relative z-20">
          <h2 className="text-7xl font-bold text-gray-200">
            Find the Best Old Books
          </h2>
          <p className="mt-2 text-xl text-white">
            Explore a collection of free and useful books.
          </p>
          <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-3xl hover:bg-gray-700 cursor-pointer transition-all duration-300">
            Shop Now
          </button>
        </div>
      </header>
    </div>
  );
};

export default Banner;
