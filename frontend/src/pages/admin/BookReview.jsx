import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookReviewForm from "../../components/Admin/BookReviewForm";

const BookReview = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/booksubmission/book/${id}`
        );
        setBook(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetail();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center mt-2">
        Review the Book
      </h1>
      <div className="flex flex-col md:flex-row p-2 sm:p-8">
        <div className="w-full sm-[90%] md:w-6/12">
          <div className="w-full border border-zinc-300 h-[350px] md:h-[450px] flex justify-center">
            <img
              src={book.imageUrl}
              alt="Image of the book for review"
              className="h-full p-1 border-zinc-300 object-cover"
            />
          </div>
        </div>
        <BookReviewForm book={book} bookId={id} />
      </div>
    </div>
  );
};

export default BookReview;
