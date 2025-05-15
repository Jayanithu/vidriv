import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../lib/auth';
import { google } from 'googleapis';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  
  if (!session?.accessToken) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const fileId = searchParams.get('fileId');
  
  if (!fileId) {
    return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
  }
  
  try {
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: session.accessToken });
    
    const drive = google.drive({ version: 'v3', auth: oauth2Client });
    
    // Get file metadata
    const file = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, size',
    });
    
    // Get file content
    const response = await drive.files.get(
      {
        fileId,
        alt: 'media',
      },
      { responseType: 'stream' }
    );
    
    // Forward the stream to the client
    const headers = new Headers();
    headers.set('Content-Type', file.data.mimeType || 'video/mp4');
    
    if (file.data.size) {
      headers.set('Content-Length', file.data.size.toString());
    }
    
    // Enable CORS and range requests
    headers.set('Accept-Ranges', 'bytes');
    headers.set('Access-Control-Allow-Origin', '*');
    
    return new Response(response.data as unknown as ReadableStream, {
      headers,
    });
  } catch (error) {
    console.error('Error streaming file:', error);
    return NextResponse.json({ error: 'Failed to stream file' }, { status: 500 });
  }
}