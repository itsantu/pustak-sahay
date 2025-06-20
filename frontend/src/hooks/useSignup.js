import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/slices/authSlice";

export const useSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const signup = async (
    name,
    email,
    isStudent,
    educationLevel,
    stream,
    phone,
    password
  ) => {
    setLoading(true);
    setError(null);
    console.log(
      name,
      email,
      isStudent,
      educationLevel,
      stream,
      phone,
      password
    );
    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/signup",
        {
          name,
          email,
          isStudent,
          educationLevel,
          stream,
          phone,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      // console.log(res);
      if (res.status >= 200 && res.status < 300) {
        alert(res.data.message);

        localStorage.setItem(
          "userInfo",
          JSON.stringify(res.data?.sendUserDetails)
        );

        dispatch(loginUser(res.data?.sendUserDetails));
        navigate("/");
      } else {
        setError(res.data?.message);
      }
    } catch (error) {
      setError(error.message);
      console.log(error);
      alert("Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};
