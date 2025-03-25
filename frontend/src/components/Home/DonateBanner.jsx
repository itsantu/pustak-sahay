import { Link } from "react-router-dom";

            // "url('https://images.unsplash.com/photo-1514894780887-121968d00567')",
const DonateBanner = () => {
  return (
    <div className="relative w-full bg-gray-900 text-white py-16 px-6 flex items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{
          backgroundImage:
            "url('/donatebg.webp')"
        }}
      ></div>

      {/* Content */}
      <div className="relative text-center max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold">
          Give the Gift of Knowledge
        </h2>
        <p className="text-lg text-gray-200 mt-2">
          Donate your old books and help someone in need. Every book can light
          up a mind!
        </p>
        <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
          <Link to="/donatebooks">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-2 rounded-lg cursor-pointer transition duration-300">
              Donate Book
            </button>
          </Link>
          <button className="bg-transparent border border-white hover:bg-white hover:text-gray-900 text-white font-semibold px-6 py-2 cursor-pointer rounded-lg transition duration-300">
            Proud Donors
          </button>
        </div>
      </div>
    </div>
  );
};

export default DonateBanner;
