import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { useUploadBook } from "../hooks/useUploadBook";
import Title from "../components/Route/Title";

export default function DonateBook() {
  const { loading, error, uploadBook } = useUploadBook();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publisher: "",
    price: "",
    condition: "New",
    category: "Engineering",
    image: null,
    isFree: false,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: name === "isFree" ? value === "true" : value 
    });
  };
  

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const { image, imagePreview, ...dataToSubmit } = formData;
    // console.log(formData);
    await uploadBook(formData)
  };

  return (
    <Title titleText="Donate book - Pustak Sahay">
      <Navbar />
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
        <h1 className="text-2xl font-bold mb-4 text-center">Donate or Sell a Book</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Book Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Author */}
          <div>
            <label className="block text-sm font-medium">Author</label>
            <input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Publisher */}
          <div>
            <label className="block text-sm font-medium">Publisher</label>
            <input
              type="text"
              name="publisher"
              value={formData.publisher}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Donation Field */}
          <div>
            <label className="block text-sm font-medium">Is this book for free?</label>
            <div className="flex space-x-4">
              <label>
                <input
                  type="radio"
                  name="isFree"
                  value="true"
                  checked={formData.isFree === true}
                  onChange={handleChange}
                  className="mr-1"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isFree"
                  value="false"
                  checked={formData.isFree === false}
                  onChange={handleChange}
                  className="mr-1"
                />
                No
              </label>
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium">Price (₹)</label>
            <input
              type="number"
              name="price"
              value={formData.isFree ? 0 : formData.price}
              onChange={handleChange}
              disabled={formData.isFree}
              required={!formData.isFree}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 disabled:bg-gray-200"
            />
          </div>

          {/* Condition */}
          <div>
            <label className="block text-sm font-medium">Condition</label>
            <select
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
            >
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Used">Used</option>
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
            >
              {["Engineering", "Medical", "Finance", "Science", "School", "Competitive Exams", "Literature", "Reference", "Self-Help","Fiction", "Others"].map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Book Preview"
                className="mt-2 w-full h-80 object-contain border rounded-lg"
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`${!loading ? "text-white" : "text-gray-400"} w-full bg-blue-500 py-2 rounded-lg hover:bg-blue-600 transition`}
            disabled={loading}
          >
            {!loading ? "Submit" : "Waiting for response"}
          </button>
          {error && <div className="mt-4 text-red-500">{error}</div>}
        </form>
      </div>
    </Title>
  );
}