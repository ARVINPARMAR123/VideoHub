import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ videoId: string }>;
  },
) {
  try {
    const { videoId } = await params;

    // 1. Find video in database
    const video = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
    });

    if (!video) {
      return NextResponse.json(
        {
          error: "Video not found",
        },
        {
          status: 404,
        },
      );
    }

    // 2. Delete video from Cloudinary
    const cloudinaryResult = await cloudinary.uploader.destroy(video.publicId, {
      resource_type: "video",
      type: "upload",
    });

    console.log("Cloudinary delete result:", cloudinaryResult);

    // Cloudinary can return "not found" if the file was already deleted
    if (
      cloudinaryResult.result !== "ok" &&
      cloudinaryResult.result !== "not found"
    ) {
      return NextResponse.json(
        {
          error: "Failed to delete video from Cloudinary",
          details: cloudinaryResult,
        },
        {
          status: 500,
        },
      );
    }

    // 3. Delete video from Prisma database
    await prisma.video.delete({
      where: {
        id: videoId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Video deleted successfully",
      videoId,
    });
  } catch (error) {
    console.error("Delete video error:", error);

    return NextResponse.json(
      {
        error: "Failed to delete video",
      },
      {
        status: 500,
      },
    );
  }
}
