"use client";

import { VideoFile } from "@/types/drive";
import Link from "next/link";
import { useState } from "react";
import ShareModal from "../ShareModal";

interface VideoCardProps {
  video: VideoFile;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [showShareModal, setShowShareModal] = useState(false);
  
  // Format file size
  const formatFileSize = (sizeInBytes: string) => {
    const size = parseInt(sizeInBytes, 10);
    if (isNaN(size)) return "Unknown size";
    
    const kb = size / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(1)} MB`;
    
    const gb = mb / 1024;
    return `${gb.toFixed(1)} GB`;
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Default thumbnail if none provided
  const thumbnailSrc = video.thumbnailLink || "/images/default-thumbnail.jpg";

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
      <Link href={`/player/${video.id}`}>
        <div className="relative aspect-video">
          <img 
            src={thumbnailSrc} 
            alt={video.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <svg 
              className="w-16 h-16 text-white" 
              fill="currentColor" 
              viewBox="0 0 20 20"
            >
              <path 
                fillRule="evenodd" 
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" 
                clipRule="evenodd" 
              />
            </svg>
          </div>
        </div>
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate">{video.name}</h3>
        <div className="mt-2 flex justify-between text-sm text-gray-400">
          <span>{video.size ? formatFileSize(video.size) : "Unknown size"}</span>
          <span>{formatDate(video.createdTime)}</span>
        </div>
        <div className="mt-4 flex justify-end">
          <button 
            onClick={() => setShowShareModal(true)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Share
          </button>
        </div>
      </div>

      {showShareModal && (
        <ShareModal 
          videoId={video.id}
          videoName={video.name}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}