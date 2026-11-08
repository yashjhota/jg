import { VideoKind } from '../types';

export interface VideoEmbed {
  kind: VideoKind;
  /** iframe src for YouTube/Instagram, file URL for MP4, '' when the link is not recognised. */
  src: string;
  /** Best guess from the link: Shorts and Reels are vertical. MP4 is checked when it loads. */
  vertical: boolean;
}

const YOUTUBE_ID = /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/i;
const INSTAGRAM_CODE = /instagram\.com\/(?:[A-Za-z0-9_.]+\/)?(p|reel|reels|tv)\/([A-Za-z0-9_-]+)/i;

/** Turns a pasted YouTube, Instagram or .mp4 link into something the Videos page can embed. */
export function parseVideoUrl(rawUrl: string): VideoEmbed {
  const url = (rawUrl || '').trim();
  if (!url) return { kind: '', src: '', vertical: false };

  const yt = url.match(YOUTUBE_ID);
  if (yt) {
    return {
      kind: 'youtube',
      src: `https://www.youtube-nocookie.com/embed/${yt[1]}?rel=0`,
      vertical: /\/shorts\//i.test(url),
    };
  }

  const ig = url.match(INSTAGRAM_CODE);
  if (ig) {
    const type = ig[1].toLowerCase() === 'reels' ? 'reel' : ig[1].toLowerCase();
    return {
      kind: 'instagram',
      src: `https://www.instagram.com/${type}/${ig[2]}/embed`,
      vertical: type === 'reel',
    };
  }

  if (/^https?:\/\/.+\.mp4(\?.*)?$/i.test(url) || /^\/.+\.mp4$/i.test(url)) {
    return { kind: 'mp4', src: url, vertical: false };
  }

  return { kind: '', src: '', vertical: false };
}
