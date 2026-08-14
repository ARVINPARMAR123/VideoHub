import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{ videoId: string }>;
  },
) {
  try {
    const { videoId } = await params;

    const video = await prisma.video.findUnique({
      where: {
        id: videoId,
      },
    });

    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;

    if (!cloudName) {
      console.error("CLOUDINARY_CLOUD_NAME is missing");

      return NextResponse.json(
        { error: "Cloudinary is not configured" },
        { status: 500 },
      );
    }

    const videoUrl =
      `https://res.cloudinary.com/${cloudName}` +
      `/video/upload/${video.publicId}.mp4`;

    console.log("Downloading from Cloudinary:", videoUrl);

    const response = await fetch(videoUrl);

    if (!response.ok) {
      console.error(
        "Cloudinary response:",
        response.status,
        response.statusText,
      );

      console.log("Video publicId:", video.publicId);
      if (response.status === 404) {
        return NextResponse.json(
          {
            error: "Video no longer exists on Cloudinary",
          },
          { status: 404 },
        );
      }

      return NextResponse.json(
        {
          error: "Failed to fetch video from Cloudinary",
        },
        { status: 500 },
      );
    }

    const videoBuffer = await response.arrayBuffer();

    return new NextResponse(videoBuffer, {
      status: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="${video.title}.mp4"`,
        "Content-Length": videoBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("Error downloading video:", error);

    return NextResponse.json(
      {
        error: "Failed to download video",
      },
      { status: 500 },
    );
  }
}
