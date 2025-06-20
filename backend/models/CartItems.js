import mongoose from "mongoose";

const CartItemsSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  imageUrl: String,
  title: String,
  condition: String,
  price: Number,
  count: {
    type: Number,
    default: 1,
  },
});

export default CartItemsSchema;
