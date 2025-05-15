"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import VideoPlayer from "../../../components/player/VideoPlayer";
interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  size: string;
}

export default function PlayerPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [video, setVideo] = useState<DriveFile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
      return;
    }

    if (status === "authenticated" && session.accessToken) {
      const fetchVideoMetadata = async () => {
        try {
          const response = await fetch(`/api/drive?fileId=${params.id}`);
          if (!response.ok) throw new Error("Failed to fetch video metadata");
          
          const data = await response.json();
          setVideo(data);
        } catch (err) {
          setError("Error loading video. Please try again.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchVideoMetadata();
    }
  }, [params.id, router, session, status]);

  if (status === "loading" || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <div className="text-center p-8 bg-gray-800 rounded-lg max-w-md">
          <h3 className="text-xl font-semibold mb-4">Error</h3>
          <p className="text-gray-400 mb-6">{error || "Video not found"}</p>
          <button 
            onClick={() => router.push("/dashboard")} 
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Back to Videos
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <button 
            onClick={() => router.push("/dashboard")} 
            className="flex items-center text-blue-400 hover:text-blue-300"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Videos
          </button>
        </div>
        
        <VideoPlayer fileId={params.id} title={video.name} />
        
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h1 className="text-2xl font-bold text-white mb-2">{video.name}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            {video.mimeType && (
              <div className="flex items-center">
                <span className="mr-2">Format:</span>
                <span className="bg-gray-700 px-2 py-1 rounded">{video.mimeType.split("/")[1].toUpperCase()}</span>
              </div>
            )}
            {video.size && (
              <div className="flex items-center">
                <span className="mr-2">Size:</span>
                <span className="bg-gray-700 px-2 py-1 rounded">
                  {(() => {
                    const size = parseInt(video.size, 10);
                    if (isNaN(size)) return "Unknown";
                    
                    const units = ['B', 'KB', 'MB', 'GB'];
                    let value = size;
                    let unitIndex = 0;
                    
                    while (value >= 1024 && unitIndex < units.length - 1) {
                      value /= 1024;
                      unitIndex++;
                    }
                    
                    return `${value.toFixed(1)} ${units[unitIndex]}`;
                  })()}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
