import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import Navbar from "../components/Navbar/Navbar";
import Title from "../components/Route/Title";
import { RiDeleteBin6Line } from "react-icons/ri";

const Cart = () => {
  const { email, loading: authLoading } = useSelector(
    (state) => state.user.user
  );
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  let totalPrice = cartItems?.reduce(
    (acc, book) => acc + Number(book.price * book.count),
    0
  );

  const handleRemoveFromCart = async (_id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/user/cart/${_id}`,
        {
          data: { email },
        }
      );

      if (res.status >= 200 && res.status < 300) {
        alert(res.data?.message);
        dispatch(removeFromCart(_id));
      }
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (loading || authLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Title titleText="Cart - Pustak Sahay">
      <Navbar />
      <div className="relative container  md:max-w-4/5 mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">My Cart</h1>
        {cartItems?.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col md:flex-row w-full">
            <div className="grid gap-3 w-full md:w-3/4">
              {cartItems?.map((item) => (
                <div
                  key={item.bookId}
                  className="flex items-center border p-4 rounded-lg shadow-md"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-28 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <Link to={`/product/book/${item.bookId}`}>
                      <h2 className="text-xl font-semibold hover:underline">
                        {item.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600">{item.condition}</p>
                    <p className="text-gray-600">Quantity: {item.count}</p>
                    <p className="text-green-600 font-bold">
                      Price: ₹{item.price * item.count}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item.bookId)}
                    className="flex items-center gap-2 border border-red-500 hover:bg-red-700 text-red-500 hover:text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    <RiDeleteBin6Line /> Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="md:fixed md:right-14 w-full md:w-1/4">
              <div className="border border-black p-4 rounded-lg bg-white shadow-md">
                <h2 className="text-lg font-bold mb-4 border-b pb-2">
                  Cart Summary
                </h2>

                {!cartItems || cartItems?.length === 0 ? (
                  <p className="text-lg">Your cart is empty.</p>
                ) : (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Total Products:</span>
                      <span className="font-medium">{cartItems?.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Price:</span>
                      <span className="font-medium">₹{totalPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount:</span>
                      <span className="font-medium text-green-500">
                        - ₹{30}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charges:</span>
                      <span className="font-medium">₹50</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Grand Total:</span>
                      <span>₹{totalPrice + 50 - 30}</span>
                    </div>
                  </div>
                )}

                <Link to="/checkout">
                  <button className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-700 cursor-pointer transition">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Title>
  );
};

export default Cart;
