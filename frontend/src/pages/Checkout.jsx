import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Title from "../components/Route/Title";
import Navbar from "../components/Navbar/Navbar";

const Checkout = () => {
  // const dispatch = useDispatch();
  const { email, loading: authLoading } = useSelector(
    (state) => state.user.user
  );
  const { cartItems, loading, error } = useSelector((state) => state.cart);

  const [orderItems, setOrderItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [rewards, setRewards] = useState([]);
  const [rewardLoading, setRewardLoading] = useState(true);

  useEffect(() => {
    setOrderItems(cartItems);
  }, [cartItems]);

  useEffect(() => {
    let totalPriceCalc = orderItems?.reduce(
      (acc, book) => acc + Number(book.price * book.count),
      0
    );
    setTotalPrice(totalPriceCalc);
  }, [orderItems]);

  useEffect(() => {
    const fetchReward = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/auth/get-reward?email=${email}`
        );
        if (res.status >= 200 && res.status < 300) {
          setRewards(res.data);
          // console.log(res.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setRewardLoading(false);
      }
    };
    fetchReward();
  });

  const handleRemoveFromOrder = (id) => {
    const finalItems = orderItems.filter((item) => item.bookId != id);
    setOrderItems(finalItems);
  };

  const handleCouponApplied = (value, isPercentage) => {
    const num = parseInt(value);

    if (isPercentage) {
      setTotalPrice(totalPrice - (totalPrice * num) / 100);
    } else {
      setTotalPrice(totalPrice - num);
    }
  };

  if (loading || rewardLoading) return <div>Loading...</div>;
  // console.log(totalPrice);
  return (
    <Title titleText="Checkout - Pustak Sahay">
      <Navbar />
      <div className="max-w-2xl mx-auto bg-gray-200 p-6 shadow-md rounded-lg animate-fade-in">
        <div className="mb-6 p-4 bg-gray-100 rounded-lg animate-slide-in">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          <div id="cart-items" className="space-y-2">
            {orderItems &&
              orderItems.map((item) => (
                <div
                  key={item.bookId}
                  className="flex justify-between items-center p-2 border-b border-gray-700"
                >
                  <span>{item.title}</span>
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded cursor-pointer"
                    onClick={() => handleRemoveFromOrder(item.bookId)}
                  >
                    X
                  </button>
                </div>
              ))}
          </div>
        </div>
        <div className="mb-6 p-4 bg-gray-100 rounded-lg animate-fade-in">
          <h2 className="text-xl font-bold mb-2">Order Summary</h2>
          <p>Total Price: ₹{totalPrice}</p>
          <p>Delivery Charges: ₹ {totalPrice > 499 ? 0 : 49}</p>

          {rewards &&
            rewards.map((reward) => (
              <div
                key={reward._id}
                className="bg-green-200 mt-2 mb-2 p-2  rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <p className="font-semibold">APPLY {reward.value} OFF</p>
                  <button
                    onClick={() =>
                      handleCouponApplied(reward.value, reward.isPercentage)
                    }
                    className="bg-green-700 hover:bg-green-800 px-2 py-1 rounded-sm text-gray-200 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                <p className="text-[0.6rem] text-red-600 hover:underline cursor-pointer w-fit">
                  Terms & Conditions
                </p>
              </div>
            ))}
          <p className="font-bold mt-2">
            Final Price: {totalPrice > 499 ? totalPrice : totalPrice + 49}
          </p>
        </div>
        <div className="mb-6 p-4 bg-gray-100 rounded-lg animate-slide-in">
          <h2 className="text-xl font-bold mb-2">Select Address</h2>
          <select className="w-full p-2 border rounded border-black">
            <option>Address 1</option>
            <option>Address 2</option>
          </select>
          {/* <input
          type="text"
          placeholder="Add new address"
          className="w-full p-2 mt-2 border rounded border-black"
        /> */}
          <div>
            <input
              placeholder="Receiver's Full Name"
              className="w-full p-2 border rounded border-black"
            />
            <input
              placeholder="Receiver's Phone Number"
              className="w-full p-2 border rounded border-black"
            />
          </div>
        </div>
        <div className="mb-6 p-4 bg-gray-100 rounded-lg animate-fade-in">
          <h2 className="text-xl font-bold mb-2">Payment Options</h2>
          <select className="w-full p-2 border rounded border-black">
            <option>Credit Card</option>
            <option>PayPal</option>
            <option>UPI</option>
          </select>
        </div>
        <button className="w-full bg-blue-500 text-white p-2 rounded transition duration-300 ease-in-out hover:border-blacke-105">
          Proceed to Payment
        </button>
      </div>
    </Title>
  );
};

export default Checkout;
