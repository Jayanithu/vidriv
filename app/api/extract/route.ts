import { NextRequest, NextResponse } from 'next/server';
import { extractVideoInfo } from '@/lib/videoExtractor';

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const videoInfo = await extractVideoInfo(url);
    return NextResponse.json(videoInfo);
  } catch (error) {
    console.error('Error extracting video:', error);
    return NextResponse.json(
      { error: 'Failed to extract video information' },
      { status: 500 }
    );
  }
}