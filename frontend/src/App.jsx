import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
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
import { loginUser } from "./redux/slices/authSlice";
import { fetchBooks } from "./redux/slices/bookListSlice";

function App() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const userInLocalStorage = JSON.parse(localStorage.getItem("userInfo"));
    if (userInLocalStorage && !user) {
      dispatch(loginUser(userInLocalStorage));
    }
  }, [dispatch, user]);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element=<Home /> />
          <Route path="/login" element=<Login /> />
          <Route path="/signup" element=<SignupFlow /> />
          <Route path="/userdash" element=<UserDashboard /> />
          <Route path="/books/:category" element=<CategoryBooksPage /> />
          <Route path="/search/:type/:query" element={<SearchedBooks />} />
          <Route path="/cart" element=<Cart /> />

          <Route
            path="/pages/books-condition-guidlines"
            element=<BookCondGuide />
          />
          <Route path="/product/book/:_id" element=<ProductPage /> />
          <Route path="/donatebooks" element=<DonateBook /> />

          <Route
            path="/booklist-for-review"
            element=<BookList status="Pending" />
          />
          <Route
            path="/booklist-accepted"
            element=<BookList status="Accepted" />
          />
          <Route path="/book-review/:id" element=<BookReview /> />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
