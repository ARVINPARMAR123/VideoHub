"use client";

import React, { useState } from "react";
import axios from "axios";
import OperationModal from "@/components/OperationModal";
import {
  UploadCloud,
  FileVideo,
  Type,
  AlignLeft,
  CheckCircle2,
  HardDrive,
} from "lucide-react";

export default function VideoUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setUploading] = useState(false);

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
  };

  const showError = (title: string, message: string) => {
    setModal({
      isOpen: true,
      type: "error",
      title,
      message,
    });
  };

  const MAX_FILE_SIZE = 100 * 1024 * 1024;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a video file to upload.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      alert("File size exceeds the maximum limit of 100MB.");
      return;
    }

    setUploading(true);

    const formData = new FormData();

    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", description);
    formData.append("originalSize", file.size.toString());

    try {
      await axios.post("/api/video-upload", formData);

      showSuccess(
        "Upload Complete",
        "Your video has been uploaded and processed successfully.",
      );
    } catch (error) {
      console.error("Upload error:", error);

      showError(
        "Upload Failed",
        "Something went wrong while uploading your video. Please try again.",
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      {/* Page heading */}
      <div className="mb-5 sm:mb-8">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary">
          <UploadCloud className="h-3.5 w-3.5" />
          Cloud Video Upload
        </div>

        <h1 className="text-2xl font-black tracking-tight sm:text-4xl">
          Upload Your Video
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-base-content/60 sm:text-base">
          Add a video to your Cloudinary library. Provide some details and we'll
          handle the upload and processing for you.
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="grid w-full gap-5 lg:grid-cols-[1fr_320px]"
      >
        {/* Main form */}
        <div className="card w-full border border-base-300 bg-base-100 shadow-xl">
          <div className="card-body p-4 sm:p-6 lg:p-8">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <FileVideo className="h-5 w-5" />
              </div>

              <div>
                <h2 className="font-bold">Video Details</h2>
                <p className="text-xs text-base-content/50">
                  Enter information about your video.
                </p>
              </div>
            </div>

            {/* Title */}
            <div className="form-control">
              <label className="label px-0">
                <span className="label-text flex items-center gap-2 font-semibold">
                  <Type className="h-4 w-4 text-primary" />
                  Video Title
                </span>
              </label>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter your video title"
                className="input input-bordered w-full"
                required
              />
            </div>

            {/* Description */}
            <div className="form-control mt-4">
              <label className="label px-0">
                <span className="label-text flex items-center gap-2 font-semibold">
                  <AlignLeft className="h-4 w-4 text-primary" />
                  Description
                  <span className="text-xs font-normal text-base-content/40">
                    (Optional)
                  </span>
                </span>
              </label>

              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a short description about your video..."
                className="textarea textarea-bordered min-h-32 w-full resize-y"
              />
            </div>

            {/* File */}
            <div className="form-control mt-4">
              <label className="label px-0">
                <span className="label-text flex items-center gap-2 font-semibold">
                  <FileVideo className="h-4 w-4 text-primary" />
                  Video File
                </span>
              </label>

              <label className="flex min-h-40 w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-base-300 bg-base-200/40 px-4 text-center transition hover:border-primary hover:bg-primary/5">
                <UploadCloud className="mb-3 h-9 w-9 text-primary" />

                {file ? (
                  <>
                    <p className="max-w-full truncate text-sm font-semibold">
                      {file.name}
                    </p>

                    <p className="mt-1 text-xs text-base-content/50">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </>
                ) : (
                  <>
                    <p className="text-sm font-semibold">Choose a video</p>

                    <p className="mt-1 text-xs text-base-content/50">
                      MP4, MOV, AVI and other video formats
                    </p>
                  </>
                )}

                <input
                  type="file"
                  accept="video/*"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  required
                />
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-primary mt-6 w-full"
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <span className="loading loading-spinner loading-sm" />
                  Uploading...
                </>
              ) : (
                <>
                  <UploadCloud className="h-5 w-5" />
                  Upload Video
                </>
              )}
            </button>
          </div>
        </div>

        {/* Information card */}
        <div className="card h-fit border border-base-300 bg-base-100 shadow-xl">
          <div className="card-body p-5 sm:p-6">
            <h3 className="font-bold">Upload Information</h3>

            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <HardDrive className="mt-0.5 h-5 w-5 shrink-0 text-primary" />

                <div>
                  <p className="text-sm font-semibold">Maximum file size</p>

                  <p className="text-xs text-base-content/50">
                    Videos up to 100MB are supported.
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />

                <div>
                  <p className="text-sm font-semibold">Automatic processing</p>

                  <p className="text-xs text-base-content/50">
                    Your video is processed after uploading.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>

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
