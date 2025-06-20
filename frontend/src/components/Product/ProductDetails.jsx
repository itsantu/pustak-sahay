import React, { useState } from "react";
import { LiaStarSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductDetails = ({ book }) => {
  const { email, loading } = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false)
  
  const rating = 3.8;
  const reviews = [
    { id: 1, rating: 5 },
    { id: 2, rating: 4 },
    { id: 3, rating: 3 },
    { id: 4, rating: 4 },
    { id: 5, rating: 4 },
  ];
  const warrantyInformation = "Not Covered";
  const returnPolicy = "No Returns Accepted";
  const minimumOrderQuantity = 1;
  const shippingInformation = "Ships within 3 days";

  const {
    _id,
    imageUrl,
    title,
    author,
    publisher,
    category,
    subCategory,
    condition,
    originalPrice,
    sellingPrice,
    discount,
    description,
    status,
  } = book;

  const handleAddToCart = async () => {
    const item = {
      bookId: _id,
      title,
      author,
      condition,
      price: sellingPrice,
      imageUrl: imageUrl,
      count: 1
    };

    try {
      const res = await axios.post(`http://localhost:8000/api/user/cart`, {
        email,
        bookId: book._id,
      });

      if (res.status >= 200 && res.status < 300) {
        alert(res.data?.message);
        dispatch(addToCart(item));
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const updatedCartitems = userInfo?.cartItems
        ? [item, ...userInfo.cartItems]
        : [item];
        userInfo.cartItems = updatedCartitems;
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        setAddedToCart(true)
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }

  };

  if (loading) return <div>Loading...</div>
  return (
    <div className=" mt-2 md:mt-0 ml-1 md:ml-2 lg:ml-4 w-full sm:w-[90%] md:w-6/12">
      <h1 className="font-semibold text-xl lg:text-2xl">{title}</h1>
      <p className="text-zinc-500 font-semibold text-sm">
        By,{" "}
        <a
          href={`https://www.google.com/search?q=${encodeURIComponent(author)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 hover:underline cursor-pointer"
        >
          {author}
        </a>
      </p>
      <p className="text-zinc-500 font-semibold text-sm">
        {publisher}
        <span className="text-gray-500 ml-1 font-normal">(Publication)</span>
      </p>

      <div>
        <p className="mt-3 text-[1rem] rounded-sm w-fit">
          Condition:{" "}
          <span
            className={`${
              condition === "New"
                ? "bg-green-400"
                : condition === "Like New"
                ? "bg-orange-400"
                : "bg-gray-300"
            } px-2  font-semibold rounded-sm`}
          >
            {condition}
          </span>
        </p>
      </div>
      <div className="flex my-3">
        <div
          className={`rounded-md px-1 lg:px-1.5 py-0.5 text-white text-xs lg:text-sm font-semibold flex items-center w-max 
            ${rating >= 4 ? "bg-emerald-600" : "bg-orange-400"}`}
        >
          {Math.round(rating * 10) / 10} <LiaStarSolid className="ml-0.5" />
        </div>
        <p className="font-semibold text-zinc-500 text-sm lg:text-base ml-2">
          {reviews.length + " Reviews"}
        </p>
      </div>

      <div>
        <p className="text-green-600 text-3xl font-semibold mt-1">
          ₹{sellingPrice}{" "}
          <span className="text-gray-400 text-lg line-through">
            {" "}
            ₹{originalPrice}
          </span>
          <span className="text-green-600 text-[1rem] ml-3 ">
            {Math.round(discount)}% off
          </span>
        </p>
      </div>

      <div className="my-3">
        <p className="mb-3 text-sm font-normal">{description}</p>
        <div className="font-semibold text-sky-800 flex text-sm lg:text-base">
          <span className="mr-4">{warrantyInformation}</span>
          <li type="disc">
            <span>{returnPolicy}</span>
          </li>
        </div>
      </div>

      <div className="border rounded-md -ml-1.5 md:ml-0">
        <p className="bg-zinc-200 font-semibold p-2">
          {"Minimum order quantiity: " + minimumOrderQuantity}
        </p>
        <div className="px-2 py-1">
          <p
            className={
              "lg:text-xl font-semibold " +
              (status === "Sold" ? "text-red-600" : "text-emerald-700")
            }
          >
            {status}
          </p>
          <p className="text-sky-800 my-1">{shippingInformation}</p>

          {!(status === "Sold") && (
            <div className="my-2">
              <button
                className="bg-emerald-600 w-40 py-2 font-semibold lg:text-lg text-white rounded hover:bg-emerald-700 cursor-pointer"
                onClick={() => handleAddToCart()}
              >
                {!addedToCart ? "Add to Cart" : "Added to cart"}
              </button>
              <Link to="/checkout">
                <button className="bg-yellow-500 w-40 py-2 ml-1.5 font-semibold lg:text-lg text-white rounded hover:bg-yellow-600 cursor-pointer">
                  Buy Now
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
