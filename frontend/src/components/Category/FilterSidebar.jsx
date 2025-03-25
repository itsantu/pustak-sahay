import React, { useState } from "react";

const FilterSidebar = ({ showFilters }) => {
  const [showFree, setShowFree] = useState(false);

  const handleCheckboxChange = () => {
    setShowFree((prev) => !prev);
  };
  return (
    <div
      className={`absolute md:relative z-10 bg-gray-200 p-4 shadow-lg md:shadow-none md:block transition-transform duration-300 ease-in-out h-screen overflow-y-auto ${
        showFilters ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      }`}
    >
      <h2 className="text-xl font-bold mb-4">Filters</h2>

      <div className="space-y-2.5">
        <label className="block">
          <span className="text-gray-700">Sort By:</span>
          <select className="w-full p-2 border rounded cursor-pointer">
            <option value="Relevance">Relevance</option>
            <option value="PriceHL">Price - High to Low</option>
            <option value="PriceLH">Price - Low to High</option>
            <option value="NewestFirst">Newest First</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Condition:</span>
          <select className="w-full p-2 border rounded cursor-pointer">
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
          </select>
        </label>
        <label className="block text-sm font-medium">
          Free books?
          <input
            type="checkbox"
            checked={showFree}
            onChange={handleCheckboxChange}
            className="scale-125 ml-2 cursor-pointer"
          />
        </label>

        <label className="block">
          <span className="text-gray-700">Price range:</span>
          <select
            className={`${
              showFree && "text-gray-400"
            } w-full p-2 border rounded cursor-pointer`}
            disabled={showFree}
          >
            <option value="All">All</option>
            <option value="200">0-200</option>
            <option value="500">201-500 </option>
            <option value="1000">500-1000</option>
            <option value="1500">1000-1500</option>
            <option value="2000+">1500 & above</option>
          </select>
        </label>
        <label className="block">
          <span className="text-gray-700">Binding:</span>
          <select className="w-full p-2 border rounded cursor-pointer">
            <option value="Paperback">Paperback</option>
            <option value="Hardcover">Hardcover</option>
            <option value="Board Book">Board Book</option>
            <option value="Leather Bound">Leather Bound</option>
          </select>
        </label>
        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded cursor-pointer hover:bg-blue-700 transition-all duration-300">
          Apply filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
