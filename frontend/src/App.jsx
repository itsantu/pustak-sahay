import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import Navbar from "./components/Navbar/Navbar";
import BookCondGuide from "./components/Pages/BookCondGuide";
import ProductPage from "./pages/ProductPage";
import DonateBook from "./pages/DonateBook";
import BookList from "./pages/admin/BookList";
import BookReview from "./pages/admin/BookReview";
import CategoryBooksPage from "./pages/CategoryBooksPage";
import SearchedBooks from "./pages/SearchedBooks";
import Cart from "./pages/Cart";
import SignupFlow from "./pages/Auth/SignupFlow";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { loginUser, setLoading } from "./redux/slices/authSlice";
import { fetchBooks } from "./redux/slices/bookListSlice";
import Checkout from "./pages/Checkout";
import ScholarshipList from "./pages/ScholarshipList";
import ScholarshipDetail from "./pages/ScholarshipDetail";
import CertificateUpload from "./pages/CertificateUpload";
import CertificateListReview from "./pages/admin/CertificateListReview";
import CertificateForReview from "./pages/admin/CertificateForReview";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import { setCartItems } from "./redux/slices/cartSlice";
import UserEditProfile from "./pages/user/UserEditProfile";
import CertificateRewardForm from "./pages/admin/CertificateRewardForm";
import ForgotPasswordFlow from "./pages/Auth/ForgotPasswordFlow";
import BooksManagement from "./pages/admin/BooksManagement";
import AdminBookDetails from "./pages/admin/AdminBookDetails";

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const userInLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
    if (userInLocalStorage && !user?.email) {
      dispatch(loginUser(userInLocalStorage));
    }
    dispatch(setLoading(false));
    dispatch(setCartItems(user?.cartItems));
    // console.log(userInLocalStorage)
  }, [dispatch, user]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element=<Home /> />
          <Route path="/login" element=<Login /> />
          <Route path="/signup" element=<SignupFlow /> />
          <Route
            path="/login/forgot-password-email"
            element={<ForgotPasswordFlow />}
          />
          <Route path="/books/:category" element=<CategoryBooksPage /> />
          <Route path="/product/book/:_id" element=<ProductPage /> />
          <Route path="/search/:type/:query" element={<SearchedBooks />} />
          <Route path="/scholarships" element=<ScholarshipList /> />
          <Route path="/scholarships/:id" element=<ScholarshipDetail /> />
          <Route
            path="/pages/books-condition-guidlines"
            element=<BookCondGuide />
          />
          <Route path="/cart" element=<Cart /> />

          {/* Protected Routes - Authenticated users only  */}
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            }
          />
          <Route
            path="/donatebooks"
            element={
              <ProtectedRoute>
                <DonateBook />
              </ProtectedRoute>
            }
          />
          <Route
            path="/certificate-form"
            element={
              <ProtectedRoute>
                <CertificateUpload />
              </ProtectedRoute>
            }
          />

          <Route
            path="/userdash"
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/userdash-edit"
            element={
              <ProtectedRoute>
                <UserEditProfile />
              </ProtectedRoute>
            }
          />

          {/* Admin Routes */}
          <Route path="/books-management" element=<BooksManagement /> />
          <Route
            path="/books-management/book-management/:_id"
            element=<AdminBookDetails />
          />
          <Route path="/certificate-review" element=<CertificateListReview /> />
          <Route
            path="/certificate-review/:id"
            element=<CertificateForReview />
          />
          <Route
            path="/booklist-for-review"
            element=<BookList status="Pending" />
          />
          <Route
            path="/booklist-accepted"
            element=<BookList status="Accepted" />
          />
          <Route path="/book-review/:id" element=<BookReview /> />
          <Route
            path="/certificate-review/reward-allot/:id"
            element=<CertificateRewardForm />
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
