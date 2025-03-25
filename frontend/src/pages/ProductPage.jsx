import React, { useEffect, useState } from "react";
import ProductDetails from "../components/Product/ProductDetails";
import Navbar from "../components/Navbar/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";

const ProductPage = () => {
  const { _id } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true)
    setError(null)
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/books/${_id}`
        );
        setBook(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetail();
  }, [_id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <>
      <Navbar />
      <div className="flex flex-col md:flex-row p-2 sm:p-8">
        <div className="w-full sm-[90%] md:w-6/12">
          <div className="w-full border border-zinc-300 h-[350px] md:h-[450px] flex justify-center">
            <img
              src={book.imageUrl}
              alt="Book Image"
              className="h-full p-1 border-zinc-300 object-cover"
            />
          </div>
        </div>
        <ProductDetails book={book} />
      </div>
    </>
  );
};

export default ProductPage;
