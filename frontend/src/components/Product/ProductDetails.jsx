import React from "react";
import { LiaStarSolid } from "react-icons/lia";
import { matchPath } from "react-router-dom";
const ProductDetails = ({ book }) => {
  // const title = "Geetanjali";
  // const brand = "Rabindra";
  const rating = 3.8;
  const reviews = [
    { id: 1, rating: 5 },
    { id: 2, rating: 4 },
    { id: 3, rating: 3 },
    { id: 4, rating: 4 },
    { id: 5, rating: 4 },
  ];
  // const originalPrice = 250;
  // const price = 200;
  // const discount = 20;
  // const description =
  //   "The book is a collection of poems by the Indian poet Rabindranath Tagore.";
  const warrantyInformation = "Not Covered";
  const returnPolicy = "No Returns Accepted";
  const minimumOrderQuantity = 1;
  const shippingInformation = "Ships within 3 days";

  const {
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

  const handleAddToCart = () => {};

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
      <p className="text-zinc-500 font-semibold text-sm">{publisher}<span className="text-gray-500 ml-1 font-normal">(Publication)</span></p>

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
        {/* <p className="font-semibold text-emerald-600 text-sm lg:text-base">
          Special price
        </p>
        <div className="flex items-center">
          <h1 className="text-2xl lg:text-3xl font-semibold">
            {"₹ " + price.toLocaleString("en-IN")}
          </h1>
          <p className="ml-3 text-zinc-500 line-through">
            {"₹" + originalPrice}
          </p>
          <p className="ml-3 text-emerald-600 font-semibold">
            {discount + "% off"}
          </p>
        </div> */}

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
                className="bg-emerald-600 w-40 py-2 font-semibold lg:text-lg text-white rounded hover:bg-emerald-700"
                onClick={() => handleAddToCart()}
              >
                Add to Cart
              </button>
              <button className="bg-sky-900 w-40 py-2 ml-1.5 font-semibold lg:text-lg text-white rounded hover:bg-sky-950">
                Buy Now
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
