import express from "express";
import { addToCart, getCartItems, removeFromCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCartItems);

router.post("/", addToCart);

router.delete("/:bookId", removeFromCart)

export default router;
