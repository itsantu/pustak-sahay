import axios from "axios";
import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Title from "../../components/Route/Title";
import Navbar from "../../components/Navbar/Navbar";

const BooksManagement = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1); // Initial page
  const [hasMore, setHasMore] = useState(true); // Optional: to stop when no more books
  const hasFetched = useRef(false);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/books/books-management?page=${page}&limit=5`
      );
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setBooks((prev) => [...prev, ...res.data]);
      }
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return; // 👈 Prevents second call
    hasFetched.current = true;
    fetchBooks();
  }, [page]);

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    axios
      .get(
        `http://localhost:8000/api/books/books-management?page=${nextPage}&limit=5`
      )
      .then((res) => {
        if (res.data.length === 0) {
          setHasMore(false);
        } else {
          setBooks((prev) => [...prev, ...res.data]);
        }
      });
  };

  return (
    <Title titleText="Books Management - Pustak Sahay">
      <Navbar />
      <div className="p-4 max-w-3xl mx-auto">
        {books.map((book) => (
          <div
            key={book._id}
            className="mb-2 p-2 flex items-center gap-3 border rounded"
          >
            <div className="relative w-14 h-20">
              <img
                src={book.imageUrl}
                alt={book.title}
                className="w-full h-full object-cover rounded"
              />
              <p className="absolute bottom-0 left-1 right-1 text-sm text-center font-semibold bg-yellow-400 bg-opacity-60 px-1 rounded">
                {book.condition}
              </p>
            </div>

            <div className="flex-1">
              <h3 className="font-bold">{book.title}</h3>
              <p>{book.author}</p>
              <p>₹{book.sellingPrice}</p>
            </div>
            <Link
              to={`./book-management/${book._id}`}
              target="_blank"
              className="bg-black hover:bg-white text-white hover:text-black hover:shadow-xl px-4 py-2 rounded-lg cursor-pointer transition"
            >
              Review
            </Link>
          </div>
        ))}

        {hasMore ? (
          <div className="text-center">
            <button
              onClick={handleLoadMore}
              className="mt-4 px-4 py-2 border border-black hover:bg-black hover:text-white hover:shadow-2xl duration-150 transition cursor-pointer rounded"
            >
              Load More
            </button>
          </div>
        ) : (
          <p className="mt-4 text-gray-500">No more books.</p>
        )}
      </div>
    </Title>
  );
};

export default BooksManagement;
