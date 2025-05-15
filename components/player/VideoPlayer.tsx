"use client";

import { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

interface VideoPlayerProps {
  src: string;
  title: string;
}

export default function VideoPlayer({ src, title }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<Plyr>();

  useEffect(() => {
    if (!videoRef.current) return;

    // Initialize Plyr
    playerRef.current = new Plyr(videoRef.current, {
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "mute",
        "volume",
        "captions",
        "settings",
        "pip",
        "airplay",
        "fullscreen",
      ],
      seekTime: 10,
      keyboard: { focused: true, global: true },
    });

    return () => {
      playerRef.current?.destroy();
    };
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto bg-black rounded-lg overflow-hidden">
      <video
        ref={videoRef}
        className="plyr-react plyr"
        crossOrigin="anonymous"
        playsInline
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <h1 className="p-4 text-xl font-bold">{title}</h1>
    </div>
  );
}