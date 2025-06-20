import mongoose from "mongoose";
import User from "../models/User.js";
import Book from "../models/Book.js";

const getCartItems = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  const { email, bookId } = req.body;

  if (!email || !bookId) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  // Validate ID
  if (!mongoose.Types.ObjectId.isValid(bookId)) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book exists
    const book = await Book.findById(bookId).select("title condition sellingPrice imageUrl");
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if book already exists in cart
    const existingItem = user.cartItems.find((item) =>
      item.bookId.equals(bookId)
    );

    if (existingItem) {
      existingItem.count += 1; // Increment count
    } else {
      // Add new item
      user.cartItems.push({
        bookId,
        title: book.title,
        imageUrl: book.imageUrl,
        condition: book.condition,
        price: book.sellingPrice,
        count: 1,
      });
    }

    // Save updated user
    await user.save();

    res.status(200).json({
      message: "Book added to cart successfully",
      cartItems: user.cartItems,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
  const { email } = req.body;
  const { bookId } = req.params;
  // console.log(email, bookId)

  // Validate IDs
  if (
    !mongoose.Types.ObjectId.isValid(bookId)
  ) {
    return res.status(400).json({ message: "Invalid book ID" });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Check if the book is in the cart
    const bookIndex = user.cartItems.findIndex(
      (item) => item.bookId.toString() === bookId
    );
    
    if (bookIndex === -1) {
      return res.status(400).json({ message: "Book not found in the cart" });
    }

    // Remove the book from the cart
    user.cartItems.splice(bookIndex, 1);
    await user.save();

    res
      .status(200)
      .json({ message: "Book removed from cart", cartItems: user.cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getCartItems, addToCart, removeFromCart };
