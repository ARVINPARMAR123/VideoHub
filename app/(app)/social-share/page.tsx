"use client";

import React, { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";
import OperationModal from "@/components/OperationModal";
import {
  Download,
  ImageIcon,
  Sparkles,
  Upload,
  Wand2,
  CheckCircle2,
} from "lucide-react";

const socialFormats = {
  "Instagram Square (1:1)": {
    width: 1080,
    height: 1080,
    aspectRatio: "1:1",
  },
  "Instagram Portrait (4:5)": {
    width: 1080,
    height: 1350,
    aspectRatio: "4:5",
  },
  "Twitter Post (16:9)": {
    width: 1200,
    height: 675,
    aspectRatio: "16:9",
  },
  "Twitter Header (3:1)": {
    width: 1500,
    height: 500,
    aspectRatio: "3:1",
  },
  "Facebook Cover (205:78)": {
    width: 820,
    height: 312,
    aspectRatio: "205:78",
  },
};

type SocialFormat = keyof typeof socialFormats;

export default function SocialSharePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<SocialFormat>(
    "Instagram Square (1:1)",
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [modal, setModal] = useState({
    isOpen: false,
    type: "success" as "success" | "error" | "confirm",
    title: "",
    message: "",
  });

  const closeModal = () => {
    setModal((prev) => ({
      ...prev,
      isOpen: false,
    }));
  };

  const showSuccess = (title: string, message: string) => {
    setModal({
      isOpen: true,
      type: "success",
      title,
      message,
    });

    setTimeout(() => {
      setModal((prev) => ({
        ...prev,
        isOpen: false,
      }));
    }, 2500);
  };

  const showError = (title: string, message: string) => {
    setModal({
      isOpen: true,
      type: "error",
      title,
      message,
    });
  };

  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [selectedFormat, uploadedImage]);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();

        console.error("Upload API Error:", errorData);

        throw new Error(errorData.error || "Image upload failed");
      }

      const data = await response.json();
      setUploadedImage(data.imageUrl);

      showSuccess(
        "Image Uploaded",
        "Your image has been uploaded successfully.",
      );
    } catch (error) {
      console.error("Image upload error:", error);

      showError(
        "Upload Failed",
        "Something went wrong while uploading your image. Please try again.",
      );

      return;
    } finally {
      setIsUploading(false);
    }
  };

  const handleDownload = () => {
    if (!imageRef.current) return;

    fetch(imageRef.current.src)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to download image");
        }

        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Image download error:", error);

        showError(
          "Download Failed",
          "Something went wrong while downloading the image. Please try again.",
        );
      });
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
        <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-28 -left-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative p-6 sm:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-4 w-4" />
            Social Media Studio
          </div>

          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Create Social Images
          </h1>

          <p className="mt-2 max-w-2xl text-base-content/60">
            Upload one image and automatically resize it for Instagram, Twitter,
            Facebook and other social platforms.
          </p>
        </div>
      </section>

      {/* Main Editor */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[360px_1fr]">
        {/* Controls */}
        <section className="rounded-3xl border border-base-300 bg-base-100 p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ImageIcon className="h-5 w-5" />
            </div>

            <div>
              <h2 className="font-bold">Image Settings</h2>
              <p className="text-xs text-base-content/50">
                Upload and configure
              </p>
            </div>
          </div>

          {/* Upload */}
          <label
            htmlFor="social-image-upload"
            className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 bg-base-200/40 px-5 py-8 text-center transition hover:border-primary hover:bg-primary/5"
          >
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition group-hover:scale-105">
              <Upload className="h-6 w-6" />
            </div>

            <span className="font-semibold">Choose an image</span>

            <span className="mt-1 text-xs text-base-content/50">
              PNG, JPG or other supported image
            </span>

            <input
              id="social-image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>

          {isUploading && (
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-xs">
                <span>Uploading image...</span>
                <span className="text-primary">Processing</span>
              </div>

              <progress className="progress progress-primary w-full" />
            </div>
          )}

          {/* Format */}
          {uploadedImage && (
            <div className="mt-7">
              <label className="mb-2 block text-sm font-semibold">
                Social Media Format
              </label>

              <select
                className="select select-bordered w-full rounded-xl"
                value={selectedFormat}
                onChange={(e) =>
                  setSelectedFormat(e.target.value as SocialFormat)
                }
              >
                {Object.keys(socialFormats).map((format) => (
                  <option key={format} value={format}>
                    {format}
                  </option>
                ))}
              </select>

              <div className="mt-4 rounded-2xl bg-base-200/60 p-4">
                <div className="flex items-center gap-3">
                  <Wand2 className="h-5 w-5 text-primary" />

                  <div>
                    <p className="text-sm font-semibold">Automatic Crop</p>
                    <p className="text-xs text-base-content/50">
                      Cloudinary optimizes the image for this format.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-success/20 bg-success/5 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-success">
                  <CheckCircle2 className="h-4 w-4" />
                  Ready to download
                </div>

                <p className="mt-1 text-xs text-base-content/50">
                  {socialFormats[selectedFormat].width} ×{" "}
                  {socialFormats[selectedFormat].height}px
                </p>
              </div>
            </div>
          )}
        </section>

        {/* Preview */}
        <section className="min-h-140 rounded-3xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-7">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Preview</h2>
              <p className="text-sm text-base-content/50">
                See how your image will look.
              </p>
            </div>

            {uploadedImage && (
              <span className="badge badge-primary">{selectedFormat}</span>
            )}
          </div>

          {!uploadedImage ? (
            <div className="flex min-h-115 items-center justify-center rounded-2xl border border-dashed border-base-300 bg-base-200/30">
              <div className="max-w-sm px-6 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-base-300/60">
                  <ImageIcon className="h-7 w-7 text-base-content/40" />
                </div>

                <h3 className="font-bold">No image selected</h3>

                <p className="mt-2 text-sm text-base-content/50">
                  Upload an image from the settings panel to see the generated
                  social media preview here.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="relative flex min-h-115 items-center justify-center overflow-hidden rounded-2xl bg-base-200/50 p-4">
                {isTransforming && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-base-100/70 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-3">
                      <span className="loading loading-spinner loading-lg text-primary" />
                      <span className="text-sm font-medium">
                        Generating preview...
                      </span>
                    </div>
                  </div>
                )}

                <div className="max-h-110 max-w-full overflow-hidden rounded-xl shadow-2xl">
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    sizes="100vw"
                    alt="transformed image"
                    crop="fill"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity="auto"
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                    className="max-h-110 w-auto max-w-full object-contain"
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-semibold">{selectedFormat}</p>
                  <p className="text-xs text-base-content/50">
                    Optimized social media image
                  </p>
                </div>

                <button
                  className="btn btn-primary gap-2 rounded-xl px-6 shadow-lg shadow-primary/20"
                  onClick={handleDownload}
                >
                  <Download className="h-5 w-5" />
                  Download Image
                </button>
              </div>
            </>
          )}
        </section>
      </div>

      <OperationModal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        onClose={closeModal}
      />
    </div>
  );
}
