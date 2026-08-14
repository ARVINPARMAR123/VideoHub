import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

try {
  const result = await cloudinary.uploader.upload(
    "https://res.cloudinary.com/demo/image/upload/sample.jpg",
    {
      folder: "test-upload",
    },
  );

  console.log("SUCCESS:");
  console.log(result.secure_url);
} catch (error) {
  console.error("CLOUDINARY TEST ERROR:");
  console.error(error);
}
