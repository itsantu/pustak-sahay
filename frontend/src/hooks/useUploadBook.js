import { useState } from "react";
import axios from "axios";

export const useUploadBook = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadBook = async (formData) => {
    setLoading(true);
    setError(null);

    console.log(formData)
    try {
      const response = await axios.post(
        "http://localhost:8000/api/booksubmission/",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      // console.log(response)
 
      if (response.status >= 200 && response.status < 300) {
        alert(response.data.message);
        console.log(response.data.book);
      } else {
        setError(`Failed to create post: ${response.statusText}`);
      }
      console.log("am i running")
    } catch (error) {
      console.log("this part running")
      setError(error.message);
      console.log(error)
    } finally {
      setLoading(false);
    }
    // console.log(formData)
  };

  return { loading, error, uploadBook }
};
