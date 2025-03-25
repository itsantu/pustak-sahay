import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart } from "../../redux/slices/cartSlice";

const ProductBox = ({ book }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    const item = {
      _id: book._id,
      title: book.title,
      author: book.author,
      condition: book.condition,
      sellingPrice: book.sellingPrice,
      imageUrl: book.imageUrl,
    };
    dispatch(addToCart(item));
  };

  return (
    <div className="bg-white flex flex-col justify-between h-[400px] shadow-md rounded p-2 transform transition-transform hover:-translate-y-1.5 hover:border hover:border-black hover:shadow-xl">
      <div>
        <Link to={`/product/book/${book._id}`} target="_blank"></Link>
        <img
          src={book.imageUrl || "https://via.placeholder.com/150"}
          alt={book.title}
          className="w-full h-40 md:h-48 object-contain rounded mb-2 cursor-pointer"
        />
        <Link />
        <p className="text-white px-1 bg-gray-400 rounded-sm w-fit">
          {book.condition}
        </p>
        <Link to={`/product/book/${book._id}`} target="_blank">
          <h3 className="text-lg font-semibold hover:underline">
            {book.title}
          </h3>
        </Link>
        <p className="text-gray-600">{book.author}</p>

        <p className="text-green-600 text-[1.2rem] font-semibold mt-1">
          ₹{book.sellingPrice}{" "}
          <span className="text-gray-400 text-sm line-through">
            {" "}
            {book.originalPrice}
          </span>
        </p>
      </div>
      <button
        onClick={handleAddToCart}
        className="mt-2 px-4 py-1 rounded cursor-pointer border border-black hover:bg-zinc-800 hover:text-white transition-all duration-300"
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductBox;
