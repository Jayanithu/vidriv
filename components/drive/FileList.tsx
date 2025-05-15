"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { VideoFile } from "@/types/drive";
import VideoCard from "./VideoCard";

export default function FileList() {
  const { data: session } = useSession();
  const [videos, setVideos] = useState<VideoFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVideos() {
      if (!session?.accessToken) return;

      try {
        setLoading(true);
        const response = await fetch("/api/drive");
        
        if (!response.ok) {
          throw new Error("Failed to fetch videos");
        }
        
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to load videos from Google Drive");
      } finally {
        setLoading(false);
      }
    }

    fetchVideos();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500 text-white p-4 rounded-md">
        {error}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-800 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">No videos found</h3>
        <p className="text-gray-400">
          No video files were found in your Google Drive. Upload some videos to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}