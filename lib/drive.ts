import { VideoFile } from "@/types/drive";

export async function fetchDriveVideos(accessToken: string): Promise<VideoFile[]> {
  try {
    // Query for video files
    const query = "mimeType contains 'video/'";
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(
      query
    )}&fields=files(id,name,mimeType,thumbnailLink,webContentLink,size,createdTime)&pageSize=100`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch videos: ${response.statusText}`);
    }

    const data = await response.json();
    return data.files as VideoFile[];
  } catch (error) {
    console.error("Error fetching Drive videos:", error);
    throw error;
  }
}

export async function getVideoStreamUrl(fileId: string, accessToken: string): Promise<string> {
  // For direct streaming, we'll use the files.get method with alt=media
  return `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&access_token=${accessToken}`;
}

export async function getVideoMetadata(fileId: string, accessToken: string) {
  try {
    const url = `https://www.googleapis.com/drive/v3/files/${fileId}?fields=id,name,mimeType,thumbnailLink,webContentLink,size,createdTime`;
    
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch video metadata: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching video metadata:", error);
    throw error;
  }
}