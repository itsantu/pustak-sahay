import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* About Us */}
        <div>
          <h3 className="text-xl font-semibold mb-3">About Us</h3>
          <p className="text-gray-300 text-sm">
            We are dedicated to providing a platform where book lovers can find,
            buy, and donate books with ease. Our goal is to make knowledge
            accessible to everyone!
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Categories</h3>
          <ul className="text-gray-300 space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-400">
                Medical
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Engineering
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Self-Help
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Finance
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Drama
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Fiction
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="text-gray-300 space-y-2">
            <li>
              <a href="#" className="hover:text-yellow-400">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Shop
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Donate Books
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                Contact Us
              </a>
            </li>
            <li>
              <Link to="/pages/books-condition-guidlines" className="hover:text-yellow-400">
                Book Condition Guidelines
              </Link>
            </li>
            <li>
              <a href="#" className="hover:text-yellow-400">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-2xl hover:text-cyan-400 duration-100">
              <FaFacebook />
            </a>
            <a href="#" className="text-2xl hover:text-cyan-400 duration-100">
              <FaTwitter />
            </a>
            <a href="#" className="text-2xl hover:text-cyan-400 duration-100">
              <FaInstagram />
            </a>
            <a href="#" className="text-2xl hover:text-cyan-400 duration-100">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-6 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} BookStore. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
