import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { fetchDriveVideos, getVideoMetadata } from "../../../lib/drive";

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get("fileId");

    if (fileId) {
      // Get metadata for a specific video
      const metadata = await getVideoMetadata(fileId, session.accessToken);
      return NextResponse.json(metadata);
    } else {
      // Get all videos
      const videos = await fetchDriveVideos(session.accessToken);
      return NextResponse.json(videos);
    }
  } catch (error) {
    console.error("Drive API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from Drive API" },
      { status: 500 }
    );
  }
}