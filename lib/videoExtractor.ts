import ytdl from 'ytdl-core';
import axios from 'axios';
import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

interface VideoInfo {
  url: string;
  title: string;
  thumbnail?: string;
  duration?: string;
  quality?: string;
  format?: string;
}

export async function extractVideoInfo(url: string): Promise<VideoInfo> {
  // YouTube
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return await extractYouTubeVideo(url);
  }
  // Vimeo
  else if (url.includes('vimeo.com')) {
    return await extractVimeoVideo(url);
  }
  // Other websites
  else {
    return await extractGenericVideo(url);
  }
}

async function extractYouTubeVideo(url: string): Promise<VideoInfo> {
  const info = await ytdl.getInfo(url);
  return {
    url: ytdl.chooseFormat(info.formats, { quality: 'highest' }).url,
    title: info.videoDetails.title,
    thumbnail: info.videoDetails.thumbnails[0].url,
    duration: info.videoDetails.lengthSeconds,
    quality: 'highest',
    format: 'mp4'
  };
}

async function extractVimeoVideo(url: string): Promise<VideoInfo> {
  const response = await axios.get(url);
  const $ = cheerio.load(response.data);
  const configStr = $('script[type="application/ld+json"]').html() || '';
  const config = JSON.parse(configStr);

  return {
    url: config.contentUrl,
    title: config.name,
    thumbnail: config.thumbnailUrl,
    duration: config.duration,
    quality: 'highest',
    format: 'mp4'
  };
}

async function extractGenericVideo(url: string): Promise<VideoInfo> {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(url);

  // Find video elements
  const videoElements = await page.$$eval('video', (videos) =>
    videos.map((video) => ({
      url: video.src,
      poster: video.poster,
    }))
  );

  await browser.close();

  if (videoElements.length === 0) {
    throw new Error('No video found on the page');
  }

  return {
    url: videoElements[0].url,
    title: await page.title(),
    thumbnail: videoElements[0].poster,
    quality: 'original',
    format: 'mp4'
  };
}