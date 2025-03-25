import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../redux/slices/cartSlice";
import Navbar from "../components/Navbar/Navbar";

const Cart = () => {
  //   const { userId } = useParams();
  const dispatch = useDispatch();
  const { cartItems, loading, error } = useSelector((state) => state.cart);
  let totalPrice = cartItems.reduce(
    (acc, book) => acc + Number(book.sellingPrice),
    0
  );
  //   const [cartItems, setCartItems] = useState(initialCartItems);

  //   useEffect(() => {
  //     const fetchCartItems = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:8000/api/cart/${userId}`
  //         );
  //         setCartItems(response.data);
  //       } catch (error) {
  //         console.error("Error fetching cart items:", error);
  //       }
  //     };
  //     fetchCartItems();
  //   }, [userId]);

  const handleRemoveFromCart = async (_id) => {
    // try {
    //   await axios.post(`http://localhost:8000/api/cart/remove`, {
    //     userId,
    //     bookId,
    //   });
    //   setCartItems(cartItems.filter((item) => item._id !== bookId));
    //   toast.success("Book removed from cart");
    // } catch (error) {
    //   console.error("Error removing item:", error);
    //   toast.error("Failed to remove item");
    // }
    dispatch(removeFromCart(_id));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p className="text-lg">Your cart is empty.</p>
        ) : (
          <div className="flex flex-col md:flex-row w-full">
            <div className="grid gap-3 w-full md:w-3/4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center border p-4 rounded-lg shadow-md"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-20 h-28 object-cover mr-4"
                  />
                  <div className="flex-1">
                    <Link to={`/product/book/${item._id}`}>
                      <h2 className="text-xl font-semibold hover:underline">
                        {item.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600">Author: {item.author}</p>
                    <p className="text-gray-600">Condition: {item.condition}</p>
                    <p className="text-green-600 font-bold">
                      Price: ₹{item.sellingPrice}
                    </p>
                  </div>
                  <button
                    onClick={() => handleRemoveFromCart(item._id)}
                    className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <div className="w-full md:w-1/4 p-2">
              <div className="border border-black p-4 rounded-lg bg-white shadow-md">
                <h2 className="text-lg font-bold mb-4 border-b pb-2">
                  Cart Summary
                </h2>

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
                    <span>Delivery Charges:</span>
                    <span className="font-medium">₹50</span>
                  </div>
                  <hr className="my-2" />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Grand Total:</span>
                    <span>₹{totalPrice + 50}</span>
                  </div>
                </div>

                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
