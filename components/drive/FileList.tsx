"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import VideoCard from "./VideoCard";
interface DriveFile {
  id: string;
  name: string;
  thumbnailLink: string;
  webViewLink: string;
  webContentLink: string;
  size: string;
  mimeType: string;
  modifiedTime: string; 
}
export default function FileList() {
  const { data: session } = useSession();
  const [videos, setVideos] = useState<DriveFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVideos = async () => {
      if (!session?.accessToken) return;

      try {
        const response = await fetch("/api/drive");
        if (!response.ok) throw new Error("Failed to fetch videos");
        
        const data = await response.json();
        setVideos(data);
      } catch (err) {
        setError("Error loading videos. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

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
      <div className="text-center p-8 bg-red-100 text-red-700 rounded-lg">
        <p>{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-100 rounded-lg">
        <h3 className="text-xl font-semibold mb-2">No videos found</h3>
        <p className="text-gray-600">Upload videos to your Google Drive to see them here.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}