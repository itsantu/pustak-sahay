import {
  FaCheckCircle,
  FaBoxOpen,
  FaShieldAlt,
  FaShippingFast,
} from "react-icons/fa";
import { LuHeartHandshake } from "react-icons/lu";

const features = [
  {
    icon: <FaCheckCircle className="text-yellow-500 text-5xl mb-4" />,
    title: "Verified Quality",
    description: "We carefully check each book's condition before shipping.",
  },
  {
    icon: <FaBoxOpen className="text-yellow-500 text-5xl mb-4" />,
    title: "Secure Packaging",
    description: "Every book is packed with care to prevent damage in transit.",
  },
  {
    icon: <LuHeartHandshake className="text-yellow-500 text-5xl mb-4" />,
    title: "Donors Commitment",
    description:
      "Donor ensures the quality of books as per Book Condition Guidelines",
  },
  {
    icon: <FaShieldAlt className="text-yellow-500 text-5xl mb-4" />,
    title: "Trusted Service",
    description:
      "Your satisfaction is our priority, with a hassle-free process.",
  },
];

const WhyUs = () => {
  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Why Choose Us?
        </h2>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 shadow-lg rounded-lg bg-gray-100 transform transition-transform duration-300 hover:-translate-y-2"
            >
              {feature.icon}
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
