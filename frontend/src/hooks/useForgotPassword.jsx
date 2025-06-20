import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const useForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updatePassword = async ({ email, newPassword, confirmPassword }) => {
    setLoading(true);
    setError(null);
    if (newPassword !== confirmPassword) {
      setError("Passwords are not same");
      setLoading(false)
      return
    }
    try {
      const res = await axios.post("http://localhost:8000/api/auth/update-password", {
        email,
        newPassword,
      });
      if (res.status >= 200 && res.status < 300) {
        alert(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { updatePassword, loading, error };
};
