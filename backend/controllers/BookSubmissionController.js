import BookSubmission from "../models/BookSubmission.js";
import mongoose from "mongoose";
import { cloudinary, deleteImage } from "../utils/cloudinary.js";

const addBookSubmission = async (req, res) => {
  try {
    const { title, author, publisher, category, condition, price, isFree } =
      req.body;
    const isFreeBool = isFree === "true";
    // console.log("File received in backend:", req.file);
    // Basic validation
    if (!title || !author || !publisher || !category || !condition) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields." });
    }

    if (isFreeBool && price !== 0) {
      return res
        .status(400)
        .json({ message: "Free books should not have a price." });
    }

    if (!isFreeBool && !price) {
      return res.status(400).json({ message: "Price is required." });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required" });
    }

    // Uploading image to Cloudinary
    let imageUrl;
    try {
      const uploadResult = await cloudinary.uploader.upload(req.file?.path, {
        folder: "SocialMedia",
        transformation: [
          { width: 800, height: 800, crop: "limit" }, // Resize image to a max of 800x800px
          { quality: "auto" },
          { fetch_format: "auto" },
        ],
      });
      imageUrl = uploadResult.url;
    } catch (error) {
      console.log("Cloudinary Error:", error);
      return res.status(500).json({ message: "Error in uploading image" });
    }

    const userId = 12345;

    // If book is free, set price to 0
    const finalPrice = isFreeBool ? 0 : Number(price);

    const newBook = new BookSubmission({
      title,
      author,
      publisher,
      category,
      condition: condition || "Used",
      price: finalPrice,
      isFree: isFreeBool,
      imageUrl,
      uploadedBy: userId,
    });

    const savedBook = await newBook.save();
    res
      .status(201)
      .json({ message: "Book added successfully!", book: savedBook });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSubmittedBooks = async (req, res) => {
  const { status } = req.params;
  try {
    const books = await BookSubmission.find({ status });

    if (!books) {
      return res.status(404).json({ message: "Books not found" });
    }

    return res.status(200).json(books);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBookDetail = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ message: "No such item" });
    }

    const bookDetail = await BookSubmission.findById(id)
    // .populate(
    //   "uploadedBy",
    //   "name"
    // );

    if (!bookDetail) {
      return res.status(404).json({ message: "No book found" });
    }

    return res.status(200).json(bookDetail);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBookSubmission = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such item" });
  }

  try {
    const { title, author, publisher, category, condition, price, isFree } =
      req.body;

    const updatedBook = await BookSubmission.findByIdAndUpdate(
      id,
      {
        title,
        author,
        publisher,
        category,
        condition,
        price,
        isFree,
      },
      { new: true }
    );

    if (!updatedBook) {
      return res.status(404).json({ error: "No such item" });
    }

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteBookSubmission = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such post" });
  }

  try {
    const deletedBook = await BookSubmission.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ error: "No such post" });
    }

    await deleteImage(deletedBook?.imageUrl);

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  addBookSubmission,
  getSubmittedBooks,
  getBookDetail,
  updateBookSubmission,
  deleteBookSubmission,
};
