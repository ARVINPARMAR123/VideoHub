import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  duration?: number | null;
  secure_url?: string;
  [key: string]: any;
}

export async function POST(request: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary configuration is missing" },
        { status: 500 },
      );
    }

    const formData = await request.formData();

    const file = formData.get("file") as File | null;
    const title = formData.get("title") as string | null;
    const description = formData.get("description") as string | null;
    const originalSize = formData.get("originalSize") as string | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!file.type.startsWith("video/")) {
      return NextResponse.json(
        { error: "Only video files are allowed" },
        { status: 400 },
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("Starting Cloudinary upload...");

    const result = await new Promise<CloudinaryUploadResult>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: "video",
            folder: "video-uploads",
          },
          (error, result) => {
            if (error) {
              console.error("Cloudinary upload error:", error);
              reject(error);
            } else {
              resolve(result as CloudinaryUploadResult);
            }
          },
        );

        uploadStream.end(buffer);
      },
    );

    console.log("Cloudinary upload successful:", result.public_id);
    console.log("Cloudinary bytes:", result.bytes);
    console.log("Cloudinary duration:", result.duration);

    const video = await prisma.video.create({
      data: {
        title: title?.trim() || "Untitled",
        description: description?.trim() || "",
        publicId: result.public_id,
        originalSize: originalSize || "0",
        compressedSize: String(result.bytes),
        duration: Number(result.duration) || 0,
      },
    });

    return NextResponse.json({ video }, { status: 201 });
  } catch (error) {
    console.error("Error uploading video:", error);

    return NextResponse.json(
      { error: "Failed to upload video" },
      { status: 500 },
    );
  }
}
