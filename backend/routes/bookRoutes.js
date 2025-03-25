import express from "express";
import upload from "../middleware/multer.js";
import {
  addBook,
  getBookByCategory,
  getBookBySubCategory,
  getBookDetails,
  deleteBook,
  updateBook,
  searchBooks,
  getBooksForHomePage,
} from "../controllers/bookController.js";


const router = express.Router();

router.post("/", upload.single("image"), addBook);

router.get("/homepage-books", getBooksForHomePage)

router.get("/category/:category", getBookByCategory);

router.get(
  "/category/:categoryName/subcategory/:subCategoryName",
  getBookBySubCategory
);

router.get("/search", searchBooks);

router.get("/:id", getBookDetails);

router.delete("/:id", deleteBook);

router.put("/:id", updateBook);


export default router;
