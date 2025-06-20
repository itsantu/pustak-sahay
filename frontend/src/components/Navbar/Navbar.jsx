import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useLogout } from "../../hooks/useLogout";
import { IoPerson, IoPersonCircle } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const { logoutUser } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);
  const [type, setType] = useState("author");
  const [query, setQuery] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <nav className="bg-white sticky top-0 z-50 overflow-hidden">
      <div className="container mx-auto flex flex-col md:flex-row justify-between md:items-center p-3">
        {/* Logo */}
        <div className="flex justify-between py-2">
          <Link to="/">
            <h1 className="text-lg md:text-2xl font-bold">PUSTAK SAHAY</h1>
          </Link>
          <button
            className="md:hidden text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Search Bar (Hidden in Mobile, Shown in Medium Screens and Above) */}
        <div className="flex items-center space-x-1 max-w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (query.trim()) {
                window.location.href = `/search/${type}/${query}`;
              }
            }}
            className="flex items-center space-x-1 w-full"
          >
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-[25%] px-2 py-1 bg-white text-black text-sm md:text-lg rounded-l border border-black focus:outline-none"
            >
              <option value="author">Author</option>
              <option value="title">Book Name</option>
              <option value="category">Category</option>
              <option value="isbn">ISBN</option>
            </select>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={"Search by " + type}
              className="w-[55%] px-2 py-1 bg-white text-black text-sm md:text-lg border border-black focus:outline-none focus:ring-2 focus:ring-zinc-600"
            />
            <button
              type="submit"
              className="w-[20%] bg-zinc-800 text-white text-sm md:text-lg md:px-2 py-1 rounded-r hover:bg-zinc-600 cursor-pointer"
            >
              Search
            </button>
          </form>

          <Link to="/cart" className="block md:hidden">
            <button className="relative text-white text-xl p-1 rounded-xl flex items-center hover:bg-gray-200 cursor-pointer ">
              <FaShoppingCart className="mr-2 text-black" />
              <p className="absolute h-5 w-5 text-sm font-bold text-center -top-1.5 right-0 md:right-1.5 bg-green-500 rounded-full flex items-center justify-center">
                {cartItems?.length}
              </p>
            </button>
          </Link>
        </div>

        {/* Buttons (Login & Cart) */}
        <div className="hidden md:flex items-center space-x-3">
          {!user?.email ? (
            <Link to="/login">
              <button className="bg-gray-200 text-gray-800 px-3 py-2 rounded-xl font-semibold flex items-center hover:bg-gray-300 cursor-pointer">
                <IoPersonCircle className="text-2xl mr-1" /> Login
              </button>
            </Link>
          ) : (
            <Link to="/userdash">
              <button
                className={`flex items-center gap-2 text-lg px-2 py-2 rounded-lg font-semibold cursor-pointer transition
    ${
      user.role === "admin"
        ? "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700"
        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
    }
  `}
              >
                <CgProfile />
                <span className="text-sm">{user.name.split(" ")[0]}</span>
              </button>
            </Link>
          )}
          <Link to="/cart">
            <button className="relative text-white text-xl px-3 py-2 rounded-xl flex items-center hover:bg-gray-200 cursor-pointer ">
              <FaShoppingCart className="mr-2 text-black" />
              <p className="absolute h-5 w-5 text-sm font-bold text-center -top-1.5 right-1.5 bg-green-500 rounded-full flex items-center justify-center">
                {cartItems ? cartItems.length : 0}
              </p>
            </button>
          </Link>
        </div>
      </div>

      {/* Mobile Menu (Collapsible) */}
      <div
        className={`sm:hidden absolute w-full transition bg-gray-200 ${
          menuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        } text-center transition-transform duration-300 ease-in-out`}
      >
        <ul className="space-y-4 py-4">
          <li>
            <a href="#" className="hover:text-yellow-400">
              Home
            </a>
          </li>
          <li>
            <Link to="/donatebooks" className="hover:text-yellow-400">
              Donate Book
            </Link>
          </li>
          <li>
            {!user?.email ? (
              <Link to="/login">
                <button className="bg-gray-200 text-gray-800 px-3 py-2 rounded-xl font-semibold flex items-center hover:bg-gray-300 cursor-pointer">
                  <IoPersonCircle className="text-2xl mr-1" /> Login
                </button>
              </Link>
            ) : (
              <button
                onClick={logoutUser}
                className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold cursor-pointer hover:bg-gray-200"
              >
                Logout
              </button>
            )}
          </li>
        </ul>
      </div>

      {/* Second Row - Main Navigation (Always Visible) */}
      <div className="">
        <ul className="flex justify-center space-x-6 text-[1rem] py-2 pt-0">
          <li>
            <Link
              to="/scholarships"
              target="_blank"
              className="text-[0.7rem] md:text-lg hover:text-rose-600"
            >
              Scholarships
            </Link>
          </li>
          <li>
            <Link
              to="/certificate-form"
              className="text-[0.7rem] md:text-lg hover:text-rose-600 transition-transform duration-200 hover:translate-y-1"
            >
              Submit Certificate
            </Link>
          </li>
          <li>
            <Link
              to="/donatebooks"
              className="text-[0.7rem] md:text-lg hover:text-rose-600 hover:translate-y-0.5"
            >
              Donate Books
            </Link>
          </li>
        </ul>
      </div>

      {user && user.role == "admin" && (
        <div className="hidden md:block mb-3 bg-gradient-to-br from-yellow-200 to-yellow-500">
          <ul className="flex justify-center  space-x-6 text-[1rem] p-2">
            <li>
              <Link
                to="/books-management"
                target="_blank"
                className="text-[0.7rem] md:text-[1.1rem] hover:text-rose-600"
              >
                Book Store
              </Link>
            </li>
            <li>
              <Link
                to="/booklist-for-review"
                target="_blank"
                className="text-[0.7rem] md:text-[1.1rem] hover:text-rose-600"
              >
                Books For Review
              </Link>
            </li>
            <li>
              <Link
                to="/certificate-review"
                target="_blank"
                className="text-[0.7rem] md:text-[1.1rem] hover:text-rose-600 transition-transform duration-200 hover:translate-y-1"
              >
                Certificates for review
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
