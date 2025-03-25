import {
  FaCheckCircle,
  FaBoxOpen,
  FaShippingFast,
  FaShieldAlt,
} from "react-icons/fa";
import { LuHeartHandshake } from "react-icons/lu";

const WhyUs = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Why Choose Us?
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Feature 1 */}
          <div className="flex flex-col items-center p-6 shadow-lg rounded-lg bg-gray-100">
            <FaCheckCircle className="text-blue-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Verified Quality
            </h3>
            <p className="text-gray-600 text-center">
              We carefully check each book's condition before shipping.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="flex flex-col items-center p-6 shadow-lg rounded-lg bg-gray-100">
            <FaBoxOpen className="text-blue-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Secure Packaging
            </h3>
            <p className="text-gray-600 text-center">
              Every book is packed with care to prevent damage in transit.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="flex flex-col items-center p-6 shadow-lg rounded-lg bg-gray-100">
            <LuHeartHandshake className="text-blue-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Donors Commitment
            </h3>
            <p className="text-gray-600 text-center">
            Donor ensures the quality of books as per Book Condition Guidelines
            </p>
          </div>

          {/* Feature 4 */}
          <div className="flex flex-col items-center p-6 shadow-lg rounded-lg bg-gray-100">
            <FaShieldAlt className="text-blue-600 text-5xl mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Trusted Service
            </h3>
            <p className="text-gray-600 text-center">
              Your satisfaction is our priority, with a hassle-free process.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
