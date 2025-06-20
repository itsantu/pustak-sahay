import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { FaEdit, FaTrashAlt, FaBan } from "react-icons/fa";
import { useParams } from "react-router-dom";
import Title from "../../components/Route/Title";
import Navbar from "../../components/Navbar/Navbar";

const AdminBookDetails = () => {
  const { _id } = useParams();
  const [book, setBook] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setLoading(true);
    setError(null);
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
  const stock = Math.floor(Math.random() * 10) + 1;

  const handleEdit = () => {
    // Navigate to edit form or open modal
    alert("Edit functionality goes here");
  };

  const handleDelete = () => {
    // Confirm and delete logic
    const confirm = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (confirm) {
      alert("Delete logic goes here");
    }
  };

  const handleMarkUnavailable = () => {
    alert("Mark as unavailable logic goes here");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Title titleText={`${book.title} - ${book.author} - Pustak Sahay`}>
      <Navbar />
      <section className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
        <div className="flex flex-col md:flex-row gap-6">
          <img
            src={book.imageUrl}
            alt={book.title}
            className="w-full md:w-60 h-auto object-cover rounded-lg"
          />
          <div className="flex-1 space-y-3">
            <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
            <p>
              <strong>Author:</strong> {book.author?.trim()}
            </p>
            <p>
              <strong>Publisher:</strong> {book.publisher}
            </p>
            <p>
              <strong>Category:</strong> {book.category}
            </p>
            {book.subCategory && (
              <p>
                <strong>Sub-category:</strong> {book.subCategory}
              </p>
            )}
            <p>
              <strong>Condition:</strong> {book.condition}
            </p>
            <p>
              <strong>Status:</strong> {book.status}
            </p>
            <p>
              <strong>Stock:</strong> {stock} copies
            </p>

            <div className="flex gap-4 mt-4 flex-wrap">
              <p className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
                Original: ₹{book.originalPrice}
              </p>
              <p className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-sm">
                Selling: ₹{book.sellingPrice}
              </p>
              <p className="bg-blue-100 text-blue-800 px-3 py-1 rounded-md text-sm">
                Discount: {Math.floor(book.discount)}%
              </p>
            </div>

            <p className="text-gray-600 mt-4">
              <strong>Description:</strong> {book.description}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Uploaded on: {new Date(book.createdAt).toLocaleString()}
            </p>
          </div>
        </div>

        {/* Admin Controls */}
        <div className="mt-6 flex flex-wrap gap-4 justify-end">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-md transition"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={handleMarkUnavailable}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
          >
            <FaBan /> Mark Unavailable
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
          >
            <FaTrashAlt /> Delete
          </button>
        </div>
      </section>
    </Title>
  );
};

export default AdminBookDetails;
