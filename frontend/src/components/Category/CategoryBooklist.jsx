import React from "react";
import { Link } from "react-router-dom";
import ProductBox from "../Product/ProductBox";

const CategoryBooklist = ({ books }) => {
  return (
    <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {books?.length > 0 ? (
        books.map((book, index) => (
          <ProductBox key={index} book={book}/>
        ))
      ) : (
        <h2 className="text-2xl font-semibold p-2">No books found</h2>
      )}
    </div>
  );
};

export default CategoryBooklist;
