"use client";

import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
  fileId: string;
  title?: string;
}

interface VideoPlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number; 
}

export default function VideoPlayer({ fileId, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr | null>(null); // Changed from undefined to null for better type safety

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize Plyr
    playerRef.current = new Plyr(videoRef.current, {
      controls: [
        'play-large', 'play', 'progress', 'current-time', 'mute', 
        'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen'
      ],
      seekTime: 10,
      keyboard: { focused: true, global: true },
    });

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
      }
    };
  }, []);

  const videoUrl = `/api/stream?fileId=${fileId}`;

  return (
    <div className="plyr-container w-full bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        controls
        crossOrigin="anonymous"
        playsInline
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {title && (
        <div className="mt-4">
          <h1 className="text-xl font-bold text-white">{title}</h1>
        </div>
      )}
    </div>
  );
}