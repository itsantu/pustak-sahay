import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBooks } from "../redux/slices/bookListSlice";
import CategoryBooklist from "../components/Category/CategoryBooklist";
import Navbar from "../components/Navbar/Navbar";
import FilterSidebar from "../components/Category/FilterSidebar";
import { MdOutlineFilterAlt, MdOutlineFilterAltOff } from "react-icons/md";

const SearchedBooks = () => {
  const dispatch = useDispatch();
  let { type, query } = useParams();

  const { books, booksLoading, booksError } = useSelector(
    (state) => state.books
  );

  useEffect(() => {
    const url = `http://localhost:8000/api/books/search?type=${type}&query=${query}`;
    dispatch(fetchBooks(url));
  }, [type, query, dispatch]);

  const [showFilters, setShowFilters] = useState(false);
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        {/* Mobile Filter Button */}
        <button
          className="md:hidden bg-gray-300 text-slate-700 text-2xl p-1 md:px-4 md:py-2 rounded mb-4"
          onClick={() => setShowFilters(!showFilters)}
        >
          {showFilters ? <MdOutlineFilterAltOff/> : <MdOutlineFilterAlt/>}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Filter Sidebar */}
          <FilterSidebar showFilters={showFilters} />

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
    </>
  );
};

export default SearchedBooks;
