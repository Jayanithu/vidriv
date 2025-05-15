"use client";

import { useState } from "react";

interface ShareModalProps {
  videoId: string;
  videoName: string;
  onClose: () => void;
}

export default function ShareModal({ videoId, videoName, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  
  const directLink = `${window.location.origin}/player/${videoId}`;
  const embedCode = `<iframe width="560" height="315" src="${window.location.origin}/player/${videoId}?embed=true" frameborder="0" allowfullscreen></iframe>`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Share "{videoName}"</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Direct Link</label>
            <div className="flex">
              <input 
                type="text" 
                value={directLink} 
                readOnly 
                className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-l focus:outline-none"
              />
              <button 
                onClick={() => copyToClipboard(directLink)}
                className="px-3 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">Embed Code</label>
            <div className="flex">
              <input 
                type="text" 
                value={embedCode} 
                readOnly 
                className="flex-grow px-3 py-2 bg-gray-700 text-white rounded-l focus:outline-none"
              />
              <button 
                onClick={() => copyToClipboard(embedCode)}
                className="px-3 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
        
        {copied && (
          <div className="mt-4 p-2 bg-green-600 text-white text-center rounded">
            Copied to clipboard!
          </div>
        )}
      </div>
    </div>
  );
}