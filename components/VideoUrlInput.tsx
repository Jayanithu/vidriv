'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function VideoUrlInput() {
  const { data: session } = useSession();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });

      if (!response.ok) throw new Error('Failed to extract video');

      const videoInfo = await response.json();
      // Here you can handle the video info, e.g., save to Google Drive
      console.log('Video info:', videoInfo);
    } catch (err) {
      setError('Failed to extract video. Please check the URL and try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!session) return null;

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-xl mx-auto p-4">
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter video URL (YouTube, Vimeo, or any website)"
          className="flex-1 px-4 py-2 rounded-l border border-gray-300 focus:outline-none focus:border-blue-500"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-r hover:bg-blue-700 disabled:bg-blue-400"
        >
          {loading ? 'Extracting...' : 'Extract'}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-red-500 text-sm">{error}</p>
      )}
    </form>
  );
}