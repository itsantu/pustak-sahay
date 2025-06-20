import mongoose from "mongoose";
import Book from "../models/Book.js";
import BookSubmission from "../models/BookSubmission.js";
import { cloudinary, deleteImage } from "../utils/cloudinary.js";

const addBook = async (req, res) => {
  try {
    const {
      _id,
      title,
      author,
      publisher,
      category,
      subCategory,
      condition,
      originalPrice,
      sellingPrice,
      isFree,
      description,
      prevImageUrl,
      uploadedBy,
    } = req.body;

    // Basic validation
    if (
      !title ||
      !category ||
      !publisher ||
      !author ||
      !originalPrice ||
      !sellingPrice ||
      !description ||
      !prevImageUrl
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    // Uploading image to Cloudinary
    let imageUrl = prevImageUrl;
    if (req.file) {
      try {
        const uploadResult = await cloudinary.uploader.upload(req.file.path, {
          folder: "SocialMedia",
          transformation: [
            { width: 800, height: 800, crop: "limit" },
            { quality: "auto" },
            { fetch_format: "auto" },
          ],
        });
        imageUrl = uploadResult.url;
      } catch (error) {
        return res.status(500).json({ message: "Error in uploading image" });
      }
    }

    ///////// TODO: Replace with proper approvedBy once user auth is implemented /////////
    const approvedBy = "67890";

    const discount = Math.round(
      ((originalPrice - sellingPrice) / originalPrice) * 100
    );

    const newBook = new Book({
      title,
      author,
      publisher,
      category,
      subCategory,
      condition: condition || "Used",
      originalPrice,
      sellingPrice,
      isFree,
      description,
      discount,
      imageUrl,
      uploadedBy,
      approvedBy,
    });

    const savedBook = await newBook.save();

    if (!savedBook) {
      return res.status(400).json({ message: "Error in approving the Book" });
    }

    await BookSubmission.findByIdAndUpdate(_id, { status: "Accepted" });
    // await deleteImage(prevImageUrl);

    res.status(201).json({
      message: "Book reviewd and added successfully!",
      book: savedBook,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBooksForHomePage = async (req, res) => {
  try {
    const categories = ["Engineering", "Medical", "Science", "Self-Help"];

    const categoryBooks = {};

    for (const category of categories) {
      categoryBooks[category] = await Book.find({ category })
        .limit(5)
        .sort({ createAt: -1 });
    }

    res.status(200).json(categoryBooks);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

const getBookByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    if (!category)
      return res.status(400).json({ message: "Enter a category name" });

    const categoryBooks = await Book.find({ category })
      .limit(10)
      .sort({ createdAt: -1 });

    return res.status(200).json(categoryBooks);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Server error!", error: error.message });
  }
};

const getBooksForFilters = async (req, res) => {
  try {
    const { category, sortBy, condition, showFree, priceRange } = req.query;

    const query = {
      category,
      condition,
    };

    // Handle free books
    if (showFree === "true") {
      query.sellingPrice = 0;
    } else if (priceRange && priceRange !== "All") {
      const [min, max] = priceRange.split("-").map(Number);
      query.sellingPrice = { $gte: min, $lte: max };
    }

    // Sort logic
    let sortOption = {};
    if (sortBy === "PriceHL") {
      sortOption.sellingPrice = -1;
    } else if (sortBy === "PriceLH") {
      sortOption.sellingPrice = 1;
    } else {
      sortOption.createdAt = -1; // Relevance = newest first
    }

    const books = await Book.find(query).sort(sortOption);

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBookBySubCategory = async (req, res) => {};

const getBookDetails = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "Invalid book ID getbookdetails" });
    }

    const bookDetail = await Book.find({ _id: id });

    if (!bookDetail) {
      return res.status(404).json({ message: "Book not found!" });
    }

    return res.status(200).json(bookDetail[0]);
  } catch (error) {
    return res
      .status(400)
      .json({ message: "Server Error", error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID deletebook!" });
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found!" });
    }

    return res.status(200).json({ message: "Book deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID updatebook!" });
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found!" });
    }

    return res
      .status(200)
      .json({ message: "Book updated successfully!", book: updatedBook });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server Error", error: error.message });
  }
};

const searchBooks = async (req, res) => {
  try {
    const { type, query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Query is required" });
    }

    const searchWords = query
      .split(" ")
      .map((word) => word.trim())
      .filter((word) => word);
    let searchQuery = {};

    if (type === "title") {
      searchQuery = { $text: { $search: query } };
    } else if (type === "author") {
      searchQuery = { author: { $regex: query, $options: "i" } };
    } else if (type === "category") {
      // Create regex queries for each search word
      const regexQueries = searchWords.map((word) => ({
        $or: [
          { category: { $regex: word, $options: "i" } },
          { subCategory: { $regex: word, $options: "i" } },
        ],
      }));
      searchQuery = { $and: regexQueries };
    } else {
      return res.status(400).json({ message: "Invalid search type" });
    }

    const books = await Book.find(searchQuery).lean();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin Controls 

const getBooksForManagement = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 5; 
  const skip = (page - 1) * limit;

  try {
    const books = await Book.find().select("_id title author imageUrl condition sellingPrice").skip(skip).limit(limit);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }

}


export {
  addBook,
  getBooksForHomePage,
  getBookByCategory,
  getBooksForFilters,
  getBookBySubCategory,
  getBookDetails,
  deleteBook,
  updateBook,
  searchBooks,
  getBooksForManagement
};
