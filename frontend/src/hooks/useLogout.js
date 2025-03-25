import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

export const useLogout = () => {
  const dispatch = useDispatch();

  const logoutUser = () => {
    localStorage.removeItem("userInfo");

    dispatch(logout());
  };

  return { logoutUser };
};
