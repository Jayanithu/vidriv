"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
interface DriveFile {
  id: string;
  name: string;
  size?: string;
  thumbnailLink?: string;
  createdTime?: string;
}
import ShareModal from "../ShareModal";

interface VideoCardProps {
  video: DriveFile;
}

export default function VideoCard({ video }: VideoCardProps) {
  const router = useRouter();
  const [showShareModal, setShowShareModal] = useState(false);

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

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Unknown date";
    return new Date(dateString).toLocaleDateString();
  };

  const handlePlay = () => {
    router.push(`/player/${video.id}`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowShareModal(true);
  };

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      <div 
        className="relative aspect-video bg-gray-900 cursor-pointer" 
        onClick={handlePlay}
      >
        {video.thumbnailLink ? (
          <img 
            src={video.thumbnailLink} 
            alt={video.name} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <svg className="w-16 h-16 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="bg-blue-600 rounded-full p-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white truncate" title={video.name}>
          {video.name}
        </h3>
        <div className="flex justify-between items-center mt-2 text-sm text-gray-400">
          <span>{formatFileSize(video.size || "0")}</span>
          <span>{formatDate(video.createdTime)}</span>
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleShare}
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684" />
            </svg>
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