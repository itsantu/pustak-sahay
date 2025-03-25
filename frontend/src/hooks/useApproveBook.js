import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useApproveBook = () => {
  const [loading, setLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const approveBook = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:8000/api/books/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status >= 200 && response.status < 300) {
        alert(response.data.message);
        console.log(response.data.book);
        navigate("/booklist-for-review");
      } else {
        setError(`Failed to create post: ${response.statusText}`);
      }
      //   console.log(formData);
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const rejectBook = async (bookId) => {
    setRejectLoading(true);
    setError(null);
    
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/booksubmission/book/${bookId}`
      );

      if (response.status >= 200 && response.status < 300) {
        alert(response.data.message);
        navigate("/booklist-for-review");
      } else {
        setError(response.data.message)
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
    } finally {
      setRejectLoading(false);
    }
  };

  return { approveBook, loading, rejectBook, rejectLoading, error };
};
