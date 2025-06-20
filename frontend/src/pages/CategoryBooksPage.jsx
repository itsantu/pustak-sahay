import React, { useEffect, useState } from "react";
import FilterSidebar from "../components/Category/FilterSidebar";
import CategoryBooklist from "../components/Category/CategoryBooklist";
import Navbar from "../components/Navbar/Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBooks,
  fetchBooksWithFilters,
} from "../redux/slices/bookListSlice";
import Title from "../components/Route/Title";

const CategoryBooksPage = () => {
  const dispatch = useDispatch();
  let { category } = useParams();

  category = category
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  const { books, booksLoading, booksError } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    const url = `http://localhost:8000/api/books/category/${category}`;
    dispatch(fetchBooks(url));
  }, [category, dispatch]);

  const [showFilters, setShowFilters] = useState(false);

  const handleApplyFilters = async (filters) => {
    const queryString = new URLSearchParams(filters).toString();
    const url = `http://localhost:8000/api/books/category/filters?category=${category+'&'+queryString}`;
    dispatch(fetchBooksWithFilters(url)); 
  };

  return (
    <Title titleText={"Explore " + category + " books - Pustak Sahay"}>
      <Navbar />
      <div className="container mx-auto p-4">
        {/* Mobile Filter Button */}
        <button
          className="md:hidden bg-blue-600 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filter Sidebar */}
          <FilterSidebar
            showFilters={showFilters}
            onApplyFilters={(filters) => handleApplyFilters(filters)}
          />

          {/* Book Listing */}
          {booksLoading ? (
            <div>Loading...</div>
          ) : booksError ? (
            <div>Error: {booksError}</div>
          ) : (
            <CategoryBooklist books={books} />
          )}
        </div>
      </div>
    </Title>
  );
};

export default CategoryBooksPage;
