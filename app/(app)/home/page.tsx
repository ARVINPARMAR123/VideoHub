"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Video } from "@/types";
import OperationModal from "@/components/OperationModal";
import Loader from "@/app/(app)/home/loader";
import {
  Video as VideoIcon,
  Upload,
  Film,
  Sparkles,
  Library,
} from "lucide-react";

export default function Homepage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [modal, setModal] = useState<{
    isOpen: boolean;
    type: "success" | "error" | "confirm";
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
  }>({
    isOpen: false,
    type: "success",
    title: "",
    message: "",
  });

  const fetchVideos = useCallback(async () => {
    try {
      const response = await axios.get("/api/videos");

      if (Array.isArray(response.data)) {
        setVideos(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error: any) {
      console.error("Error fetching videos:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const handleDownload = useCallback(async (videoId: string, title: string) => {
    try {
      const response = await axios.get(`/api/videos/${videoId}/download`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");

      link.href = url;
      link.download = `${title}.mp4`;

      document.body.appendChild(link);
      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error("Error downloading video:", error);

      setError(error?.response?.data?.error || "Failed to download video");
    }
  }, []);

  const handleDelete = (videoId: string) => {
    setModal({
      isOpen: true,
      type: "confirm",
      title: "Delete Video?",
      message:
        "Are you sure you want to delete this video? This action will permanently remove the video from your library and Cloudinary.",
      confirmText: "Delete Video",
      cancelText: "Cancel",

      onConfirm: async () => {
        closeModal();

        try {
          await axios.delete(`/api/videos/${videoId}`);

          setVideos((prevVideos) =>
            prevVideos.filter((video) => video.id !== videoId),
          );

          showSuccess(
            "Video Deleted",
            "The video has been successfully removed from your library.",
          );
        } catch (error) {
          console.error("Delete video error:", error);

          showError(
            "Delete Failed",
            "We couldn't delete the video. Please try again.",
          );
        }
      },
    });
  };

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
      confirmText: "Done",
    });
  };

  const showError = (title: string, message: string) => {
    setModal({
      isOpen: true,
      type: "error",
      title,
      message,
      confirmText: "OK",
    });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-sm">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-56 w-56 rounded-full bg-secondary/10 blur-3xl" />

        <div className="relative flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Your media workspace
            </div>

            <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
              Video Library
            </h1>

            <p className="mt-2 max-w-2xl text-base-content/60">
              Manage, preview, download and organize all your uploaded videos
              from one place.
            </p>
          </div>

          <button
            onClick={() => (window.location.href = "/video-upload")}
            className="btn btn-primary gap-2 rounded-xl px-5 shadow-lg shadow-primary/20"
          >
            <Upload className="h-5 w-5" />
            Upload Video
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/50">Total Videos</p>
              <p className="mt-1 text-3xl font-bold">{videos.length}</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <VideoIcon className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/50">Media Library</p>
              <p className="mt-1 text-xl font-bold">Cloud Storage</p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
              <Library className="h-6 w-6" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-base-content/50">Status</p>
              <p className="mt-1 flex items-center gap-2 text-xl font-bold">
                <span className="h-2.5 w-2.5 rounded-full bg-success" />
                Ready
              </p>
            </div>

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-success/10 text-success">
              <Film className="h-6 w-6" />
            </div>
          </div>
        </div>
      </section>

      {/* Error */}
      {error && (
        <div className="alert alert-error rounded-2xl">
          <span>
            {typeof error === "string"
              ? error
              : "Something went wrong while loading videos."}
          </span>
        </div>
      )}

      {/* Videos */}
      {videos.length === 0 ? (
        <section className="flex min-h-105 items-center justify-center rounded-3xl border border-dashed border-base-300 bg-base-100 p-6 shadow-sm">
          <div className="w-full max-w-xl text-center">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/10 text-primary">
              <VideoIcon className="h-10 w-10" />
            </div>

            <h2 className="text-2xl font-bold sm:text-3xl">
              Your Video Library is Empty
            </h2>

            <p className="mx-auto mt-3 max-w-md text-base-content/60">
              No videos are available right now. Upload your first video to
              start building your personal video library.
            </p>

            <button
              onClick={() => (window.location.href = "/video-upload")}
              className="btn btn-primary mt-7 gap-2 rounded-xl px-6 shadow-lg shadow-primary/20"
            >
              <Upload className="h-5 w-5" />
              Upload Your First Video
            </button>
          </div>
        </section>
      ) : (
        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Your Videos</h2>
              <p className="mt-1 text-sm text-base-content/50">
                Browse and manage your uploaded videos.
              </p>
            </div>

            <span className="badge badge-primary badge-lg">
              {videos.length} {videos.length === 1 ? "Video" : "Videos"}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onDownload={handleDownload}
                onDelete={handleDelete}
              />
            ))}
          </div>
        </section>
      )}

      <OperationModal
        isOpen={modal.isOpen}
        type={modal.type}
        title={modal.title}
        message={modal.message}
        confirmText={modal.confirmText}
        cancelText={modal.cancelText}
        onConfirm={modal.onConfirm}
        onClose={closeModal}
      />
    </div>
  );
}
