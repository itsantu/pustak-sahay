import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// Function to delete images
const deleteImage = async (imageUrl) => {
  if (!imageUrl) {
    throw Error("URL of image required");
  }
  try {
    const folderAndImage = imageUrl.split("/").slice(-2).join("/");
    const publicIdFromUrl = folderAndImage.split(".").slice(0, -1).join(".");
    await cloudinary.uploader.destroy(publicIdFromUrl);
  } catch (error) {
    throw Error("Error deleting the image");
  }
};

export { cloudinary, deleteImage };
