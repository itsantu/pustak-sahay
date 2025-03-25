import mongoose from "mongoose";
import User from "../models/User";
import Book from "../models/Book";

const getCartItems = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "No such user found" });
  }

  try {
    const user = await User.findById(id)
      .populate({
        path: "cartItems",
        select: "title author condition sellingPrice imageUrl",
      })
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.cartItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addToCart = async (req, res) => {
  const { userId, bookId } = req.body;

  // Validate IDs
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(bookId)
  ) {
    return res.status(400).json({ message: "Invalid user or book ID" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book exists
    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check if the item is already in the cart
    const isAlreadyInCart = user.cartItems.includes(bookId);
    if (isAlreadyInCart) {
      return res.status(400).json({ message: "Book already in the cart" });
    }

    // Add to cart and save
    user.cartItems.push(bookId);
    await user.save();

    res
      .status(200)
      .json({
        message: "Book added to cart successfully",
        cartItems: user.cartItems,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const removeFromCart = async (req, res) => {
    const { userId, bookId } = req.body;

  // Validate IDs
  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(bookId)
  ) {
    return res.status(400).json({ message: "Invalid user or book ID" });
  }

  try {
    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the book is in the cart
    const bookIndex = user.cartItems.indexOf(bookId);
    if (bookIndex === -1) {
      return res.status(400).json({ message: "Book not found in the cart" });
    }

    // Remove the book from the cart
    user.cartItems.splice(bookIndex, 1);
    await user.save();

    res.status(200).json({ message: "Book removed from cart", cartItems: user.cartItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getCartItems, addToCart, removeFromCart };
