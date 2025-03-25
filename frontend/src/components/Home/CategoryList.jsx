import { MdOutlineScience, MdOutlineMedicalServices, MdOutlineEngineering, MdSelfImprovement } from "react-icons/md";
import { RiGovernmentLine, RiMoneyRupeeCircleLine } from "react-icons/ri";
import { GiMagicSwirl, GiDramaMasks } from "react-icons/gi";
import { Link } from "react-router-dom";

const ShopByCategory = () => {
  return (
    <div className="px-10 py-14 border-b border-gray-600">
      <h1 className="text-3xl font-bold  mb-6">Our Featured Category</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 justify-center">
        {[
          { icon: <MdOutlineScience />, label: "Science" },
          { icon: <RiGovernmentLine />, label: "Competitive Exams" },
          { icon: <GiMagicSwirl />, label: "Fiction" },
          { icon: <MdOutlineMedicalServices />, label: "Medical" },
          { icon: <MdOutlineEngineering />, label: "Engineering" },
          { icon: <RiMoneyRupeeCircleLine />, label: "Finance" },
          { icon: <MdSelfImprovement />, label: "Self-Help" },
          { icon: <GiDramaMasks />, label: "Drama" },
        ].map((category, index) => (
          <Link to={`/books/${category.label.trim().toLowerCase()}`}
            key={index}
            className="flex flex-col items-center p-4 bg-gray-100 rounded-lg shadow-md transition-transform duration-200  hover:scale-105 hover:transform hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
          >
            <div className="text-4xl ">{category.icon}</div>
            <p className="text-lg font-semibold mt-2">{category.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
