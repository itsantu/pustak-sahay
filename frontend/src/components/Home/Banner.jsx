import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="px-4">
      <header
        className="relative text-center py-8 md:py-16 bg-blue-400 bg-cover bg-center"
        style={{ backgroundImage: "url('/hero.jpg')" }}
      >
        <div className="absolute top-0 h-full w-full bg-black opacity-40 z-10"></div>
        <div className="relative z-20">
          <h2 className="text-3xl md:text-7xl font-bold text-gray-200">
            Rediscover the Wisdom of Books
          </h2>
          <p className="mt-2 text-sm md:text-xl text-white">
            Handpicked used and free books to enrich your reading journey
          </p>
          <Link to="/donatebooks">
            <button className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded-3xl hover:bg-gray-700 cursor-pointer transition-all duration-300">
              Donate a Book
            </button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Banner;
