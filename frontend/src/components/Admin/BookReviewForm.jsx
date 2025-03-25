import React, { useState } from "react";
import { useApproveBook } from "../../hooks/useApproveBook";

const BookReviewForm = ({ book, bookId }) => {
  const { approveBook, loading, rejectBook, rejectLoading, error } = useApproveBook();

  const {
    title,
    author,
    publisher,
    condition,
    category,
    price,
    isFree,
    imageUrl,
    status,
  } = book;

  const [formData, setFormData] = useState({
    _id: bookId,
    title,
    author,
    publisher,
    category,
    subCategory: "",
    condition,
    price,
    originalPrice: "",
    sellingPrice: "",
    isFree,
    description: "",
    uploadedBy: "12345",
    prevImageUrl: imageUrl,
    image: null,
  });
  const [uploadImage, setUploadImage] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "isFree" ? value === "true" : value,
    });
  };

  const handleCheckboxChange = () => {
    setUploadImage((prev) => !prev);
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
    await approveBook(formData);
  };

  const handleReject = async () => {
    await rejectBook(bookId);
  };

  return (
    <div className=" mt-2 md:mt-0 ml-1 md:ml-2 lg:ml-4 w-full sm:w-[90%] md:w-6/12">
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

        {/* Category */}
        <div>
          <label className="block text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
          >
            {[
              "Engineering",
              "Medical",
              "Finance",
              "Science",
              "School",
              "Competitive Exams",
              "Literature",
              "Reference",
              "Self-Help",
              "Others",
            ].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Sub category */}
        <div>
          <label className="block text-sm font-medium">Sub category <span className="text-gray-500">(Optional)</span></label> 
          <input
            type="text"
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
          ></textarea>
        </div>

        {/* Donation Field */}
        <div>
          <label className="block text-sm font-medium">
            Do you want to provide this book for free?
          </label>
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
          <label className="block text-sm font-medium">
            Price provided by seller
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            disabled
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 disabled:bg-gray-200"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">
            Original Price (₹)
          </label>
          <input
            type="number"
            name="originalPrice"
            value={formData.isFree ? 0 : formData.originalPrice}
            onChange={handleChange}
            disabled={formData.isFree}
            required={!formData.isFree}
            className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200 disabled:bg-gray-200"
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium">Selling Price (₹)</label>
          <input
            type="number"
            name="sellingPrice"
            value={formData.isFree ? 0 : formData.sellingPrice}
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
            disabled
            className="w-full p-2 border rounded-lg text-gray-600 focus:ring focus:ring-blue-200"
          >
            <option value="New">New</option>
            <option value="Like New">Like New</option>
            <option value="Used">Used</option>
          </select>
        </div>

        {/* Image Upload */}
        <div className="">
          <label className="block text-sm font-medium">
            Upload same photo as provided by the seller
          </label>
          <input
            type="checkbox"
            checked={!uploadImage}
            onChange={handleCheckboxChange}
            className="scale-125"
          />
        </div>
        {uploadImage && (
          <div>
            <label className="block text-sm font-medium">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg focus:ring focus:ring-blue-200"
              required
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Book Preview"
                className="mt-2 w-full h-80 object-contain border rounded-lg"
              />
            )}
          </div>
        )}

        {/* Submit Button */}
        <div className="flex gap-2">
          <button
            onClick={handleReject}
            className={`${
              (!loading || !rejectLoading) ? "text-white" : "text-gray-400"
            } w-1/2 bg-red-500 py-2 rounded-lg hover:bg-red-600 cursor-pointer transition`}
            disabled={loading || rejectLoading}
          >
            {!rejectLoading ? "Reject" : "Waiting for response"}
          </button>
          <button
            type="submit"
            className={`${
              !loading ? "text-white" : "text-gray-400"
            } w-1/2 bg-green-500 py-2 rounded-lg hover:bg-green-600 cursor-pointer transition`}
            disabled={loading}
          >
            {!loading ? "Approve & Submit" : "Waiting for response"}
          </button>
        </div>
        {error && <div className="mt-4 text-red-500">{error}</div>}
      </form>
    </div>
  );
};

export default BookReviewForm;
