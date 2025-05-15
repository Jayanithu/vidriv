"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginButton() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          {session.user?.image && (
            <img 
              src={session.user.image} 
              alt={session.user.name || "User"} 
              className="w-8 h-8 rounded-full"
            />
          )}
          <span className="text-sm font-medium">{session.user?.name}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
        >
          Sign Out
        </button>
        <button
          onClick={() => router.push('/dashboard')}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          My Videos
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="flex items-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
    >
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
        />
      </svg>
      Sign in with Google
    </button>
  );
}