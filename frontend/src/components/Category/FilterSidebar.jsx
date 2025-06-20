import React, { useState } from "react";

const FilterSidebar = ({ showFilters, onApplyFilters }) => {
  const [sortBy, setSortBy] = useState("Relevance");
  const [condition, setCondition] = useState("New");
  const [showFree, setShowFree] = useState(false);
  const [priceRange, setPriceRange] = useState("All");

  const handleCheckboxChange = () => {
    setShowFree((prev) => !prev);
    if (!showFree) setPriceRange("All"); // reset price if checkbox is selected
  };

  const handleApplyFilters = () => {
    const filters = {
      sortBy,
      condition,
      showFree,
      priceRange: showFree ? "Free" : priceRange,
    };
    onApplyFilters(filters); // Send to parent
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
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full p-2 border rounded cursor-pointer"
          >
            <option value="Relevance">Relevance</option>
            <option value="PriceHL">Price - High to Low</option>
            <option value="PriceLH">Price - Low to High</option>
          </select>
        </label>

        <label className="block">
          <span className="text-gray-700">Condition:</span>
          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full p-2 border rounded cursor-pointer"
          >
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
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className={`${
              showFree && "text-gray-400"
            } w-full p-2 border rounded cursor-pointer`}
            disabled={showFree}
          >
            <option value="All">All</option>
            <option value="0-200">0-200</option>
            <option value="201-500">201-500 </option>
            <option value="501-1000">501-1000</option>
            <option value="1001-1500">1001-1500</option>
            <option value="1500-10000">1500 & above</option>
          </select>
        </label>

        <button
          className="mt-2 bg-blue-600 text-white px-4 py-1 rounded cursor-pointer hover:bg-blue-700 transition-all duration-300"
          onClick={handleApplyFilters}
        >
          Apply filters
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
