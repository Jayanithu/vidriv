import LoginButton from "@/components/auth/LoginButton";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="text-center max-w-3xl px-4">
        <h1 className="text-5xl font-bold mb-6">VDriv</h1>
        <p className="text-xl mb-8">
          Stream your Google Drive videos with a YouTube-like experience.
          Connect your Google account to get started.
        </p>
        <div className="mb-12">
          <LoginButton />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gray-800 rounded-lg">
            <svg className="w-12 h-12 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Access Your Files</h3>
            <p className="text-gray-400">Connect to your Google Drive and access all your video files in one place.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <svg className="w-12 h-12 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Stream Instantly</h3>
            <p className="text-gray-400">Watch your videos with a smooth streaming experience, no downloads needed.</p>
          </div>
          <div className="p-6 bg-gray-800 rounded-lg">
            <svg className="w-12 h-12 mx-auto mb-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">Share Easily</h3>
            <p className="text-gray-400">Generate shareable links and embed codes for your videos.</p>
          </div>
        </div>
      </div>
    </div>
  );
}