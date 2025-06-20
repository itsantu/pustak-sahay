import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useSelector((state) => state.user);

  if (!loading) {
    return user ? children : <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
