import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoutUser = () => {
    localStorage.removeItem("userInfo");

    dispatch(logout());
    navigate("/")
  };

  return { logoutUser };
};
