import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";

export const runtime = "nodejs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  secure_url: string;
  bytes: number;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  try {
    // Check Clerk authentication
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check Cloudinary configuration
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      console.error("Cloudinary environment variables are missing");

      return NextResponse.json(
        { error: "Cloudinary configuration is missing" },
        { status: 500 }
      );
    }

    // Get uploaded form data
    const formData = await request.formData();

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return NextResponse.json(
        { error: "No valid image file provided" },
        { status: 400 }
      );
    }

    // Make sure it is an image
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // Convert File -> Buffer
    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    console.log("Uploading image to Cloudinary:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Upload to Cloudinary
    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "image",
            folder: "social-share",
          },
          (error, result) => {
            if (error) {
              console.error("FULL CLOUDINARY ERROR:", error);
              reject(error);
              return;
            }

            if (!result) {
              reject(new Error("Cloudinary returned no result"));
              return;
            }

            resolve(result as CloudinaryUploadResult);
          }
        );

        uploadStream.end(fileBuffer);
      }
    );

    console.log("Cloudinary upload successful:", {
      public_id: result.public_id,
      secure_url: result.secure_url,
      bytes: result.bytes,
    });

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        imageUrl: result.secure_url,
        publicId: result.public_id,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("ERROR UPLOADING IMAGE:", {
      name: error?.name,
      message: error?.message,
      http_code: error?.http_code,
      response: error?.response,
    });

    return NextResponse.json(
      {
        error: error?.message || "Failed to upload image",
      },
      { status: 500 }
    );
  }
}