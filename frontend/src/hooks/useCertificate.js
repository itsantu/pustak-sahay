import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useCertificate = () => {
  const { token } = useSelector(state => state.user.user)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const uploadCertificate = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/certificates",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`
          },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        alert(response.data.message);
        navigate("/");
      } else {
        setError(`Failed to upload certificate: ${response.statusText}`);
      }
    } catch (error) {
      console.log(error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { uploadCertificate, loading, error };
};
