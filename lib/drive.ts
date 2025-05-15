import { google } from 'googleapis';
import { DriveFile } from '@/types/drive';

// Initialize the Google Drive API client
export const initDriveClient = (accessToken: string) => {
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });
  
  return google.drive({ version: 'v3', auth: oauth2Client });
};

// Get list of video files from Google Drive
export const getVideoFiles = async (accessToken: string): Promise<DriveFile[]> => {
  const drive = initDriveClient(accessToken);
  
  // Query for video files
  const videoMimeTypes = [
    'video/mp4',
    'video/x-matroska',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
    'video/webm',
  ];
  
  const mimeTypeQuery = videoMimeTypes.map(type => `mimeType='${type}'`).join(' or ');
  const query = `(${mimeTypeQuery}) and trashed=false`;
  
  try {
    const response = await drive.files.list({
      q: query,
      fields: 'files(id, name, mimeType, thumbnailLink, webContentLink, size, createdTime)',
      pageSize: 100,
    });
    
    return (response.data.files || []) as DriveFile[];
  } catch (error) {
    console.error('Error fetching video files:', error);
    throw error;
  }
};

// Get a specific file by ID
export const getFileById = async (accessToken: string, fileId: string): Promise<DriveFile> => {
  const drive = initDriveClient(accessToken);
  
  try {
    const response = await drive.files.get({
      fileId,
      fields: 'id, name, mimeType, thumbnailLink, webContentLink, size, createdTime',
    });
    
    return response.data as DriveFile;
  } catch (error) {
    console.error('Error fetching file:', error);
    throw error;
  }
};