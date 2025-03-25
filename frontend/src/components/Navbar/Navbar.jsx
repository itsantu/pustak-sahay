import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useLogout } from "../../hooks/useLogout";
import { IoPerson, IoPersonCircle } from "react-icons/io5";

const Navbar = () => {
  const user = useSelector((state) => state.user.user);
  const { logoutUser } = useLogout();
  const [menuOpen, setMenuOpen] = useState(false);
  const [type, setType] = useState("author");
  const [query, setQuery] = useState("");
  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <nav className="bg-white sticky top-0 z-30">
      <div className="container mx-auto flex justify-between items-center p-3">
        {/* Logo */}
        <h1 className="text-2xl font-bold">PUSTAK SAHAY</h1>

        {/* Search Bar (Hidden in Mobile, Shown in Medium Screens and Above) */}
        <div className=" flex items-center space-x-1">
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-3 py-2 bg-white text-black rounded-l border border-black focus:outline-none"
          >
            <option value="author">Author</option>
            <option value="title">Book Name</option>
            <option value="category">Category</option>
          </select>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search books..."
            className="px-3 py-2 bg-white text-black border border-black focus:outline-none focus:ring-2 focus:ring-zinc-600"
          />
          <Link to={`/search/${type}/${query}`}>
            <button className="bg-zinc-800 text-white px-3 py-2 rounded-r hover:bg-zinc-600 cursor-pointer">
              Search
            </button>
          </Link>
        </div>

        {/* Buttons (Login & Cart) */}
        <div className="hidden md:flex items-center space-x-3">
          {!user ? (
            <Link to="/login">
              <button className="bg-gray-200 text-gray-800 px-3 py-2 rounded-xl font-semibold flex items-center hover:bg-gray-300 cursor-pointer">
                <IoPersonCircle  className="text-2xl mr-1"/> Login
              </button>
            </Link>
          ) : (
            <button
              onClick={logoutUser}
              className="bg-gray-100 text-gray-500 px-4 py-2 rounded-lg font-semibold cursor-pointer hover:bg-gray-200"
            >
              Logout
            </button>
          )}
          <Link to="/cart">
            <button className="relative text-white text-xl px-3 py-2 rounded-xl flex items-center hover:bg-gray-200 cursor-pointer ">
              <FaShoppingCart className="mr-2 text-black" />
              <p className="absolute h-5 w-5 text-sm font-bold text-center -top-1.5 right-1.5 bg-green-500 rounded-full flex items-center justify-center">
                {cartItems?.length}
              </p>
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu (Collapsible) */}
      <div
        className={`md:hidden bg-blue-500 ${
          menuOpen ? "block" : "hidden"
        } text-center`}
      >
        <ul className="space-y-4 py-4">
          <li>
            <a href="#" className="hover:text-yellow-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400">
              Free Books
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-yellow-400">
              New Books
            </a>
          </li>
          <li>
            <Link to="/donatebooks" className="hover:text-yellow-400">
              Donate Book
            </Link>
          </li>
          <li>
            <Link to="/login">
              <button className="bg-gray-100 text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200">
                Login
              </button>
            </Link>
          </li>
          <li>
            <button className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 flex items-center mx-auto">
              <FaShoppingCart className="mr-2" />
              Cart
            </button>
          </li>
        </ul>
      </div>

      {/* Second Row - Main Navigation (Always Visible) */}
      <div className="hidden md:block">
        <ul className="flex justify-center space-x-6 text-[1rem] py-2 pt-0">
          <li>
            <a href="#" className=" hover:text-rose-600">
              Scholarships
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-rose-600 transition-transform duration-200 hover:translate-y-1">
              Free Resources
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-rose-600 hover:translate-y-0.5">
              New Books
            </a>
          </li>
          <li>
            <Link to="/donatebooks" className="hover:text-rose-600 hover:translate-y-0.5">
              Donate Books
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
