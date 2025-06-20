import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/Route/Title";
import Navbar from "../../components/Navbar/Navbar";

const BookListForReview = ({ status }) => {
  const navigate = useNavigate();
  const [bookList, setBookList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const isReviewd = status == "Accepted";

  useEffect(() => {
    const fetchBookDetail = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/booksubmission/books/${status}`
        );
        setBookList(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetail();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Title titleText="Books for Review - Pustak Sahay">
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-bold mb-4">{status} Books</h1>
        <div className="space-y-4">
          {bookList?.map((book) => (
            <div
              key={book._id}
              className="bg-white shadow-md rounded-lg p-4 flex items-center gap-4"
            >
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-20 h-28 object-cover rounded"
              />
              <div className="flex-1">
                {isReviewd ? (
                  <h2 className="text-lg font-semibold w-fit">{book.title}</h2>
                ) : (
                  <Link to={`/book-review/${book._id}`}>
                    {" "}
                    <h2 className="text-lg font-semibold w-fit hover:underline">
                      {book.title}
                    </h2>
                  </Link>
                )}
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-600">Category: {book.category}</p>
                <p className="text-gray-600">Condition: {book.condition}</p>
                <p className="text-gray-600">
                  {book.isFree ? "Free" : `Price: ₹${book.price}`}
                </p>
              </div>
              {!isReviewd && (
                <button
                  onClick={() => navigate(`/book-review/${book._id}`)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer transition"
                >
                  Review
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </Title>
  );
};

export default BookListForReview;
