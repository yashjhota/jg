import React, { useState } from 'react';
import { Language, PageId, VideoSlot } from '../../types';
import { useCMS } from '../../services/cmsStore';
import { parseVideoUrl } from '../../services/videoEmbed';
import { PageHeader } from '../common/PageHeader';
import { HScroller } from '../common/HScroller';
import { Logo } from '../common/Logo';
import { Settings } from 'lucide-react';

interface VideosViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

/** Plays a YouTube/Instagram link or an MP4 file. 9:16 videos stay vertical. */
const VideoPlayer: React.FC<{ slot: VideoSlot; large?: boolean }> = ({ slot, large }) => {
  const embed = parseVideoUrl(slot.url);
  // MP4 orientation is only known once the file's metadata loads
  const [mp4Vertical, setMp4Vertical] = useState<boolean | null>(null);
  const vertical = slot.vertical ?? (embed.kind === 'mp4' ? mp4Vertical ?? false : embed.vertical);

  const frameClass = vertical
    ? `aspect-[9/16] mx-auto ${large ? 'h-[70vh] max-h-[640px]' : 'h-[420px]'} max-w-full`
    : 'aspect-video w-full';

  if (!embed.src) return <ComingSoon large={large} />;

  return (
    <div className="bg-[#0E1828] rounded-lg overflow-hidden flex justify-center">
      <div className={frameClass}>
        {embed.kind === 'mp4' ? (
          <video
            src={embed.src}
            controls
            preload="metadata"
            playsInline
            className="w-full h-full object-contain bg-black"
            onLoadedMetadata={(e) => {
              const v = e.currentTarget;
              setMp4Vertical(v.videoHeight > v.videoWidth);
            }}
          />
        ) : (
          <iframe
            src={embed.src}
            title={slot.title || 'Jain Genius video'}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        )}
      </div>
    </div>
  );
};

const ComingSoon: React.FC<{ large?: boolean }> = ({ large }) => (
  <div
    className={`rounded-lg bg-[#15233A] border border-[#C99A2E]/30 flex flex-col items-center justify-center gap-3 text-center ${
      large ? 'aspect-video' : 'aspect-[4/3]'
    }`}
  >
    <Logo size={large ? 'lg' : 'md'} />
    <p className="text-[#D9B25A] font-medium">Video coming soon</p>
  </div>
);

const SlotDetails: React.FC<{ slot: VideoSlot }> = ({ slot }) =>
  slot.url ? (
    <div className="mt-3">
      {slot.title && <h3 className="card-title text-[#15233A]">{slot.title}</h3>}
      {slot.description && <p className="text-[15px] text-slate-600 mt-0.5 line-clamp-1">{slot.description}</p>}
      {slot.editedBy && <p className="caption text-slate-500 mt-1">Edited by {slot.editedBy}</p>}
    </div>
  ) : null;

/** Media > Videos: the 5 best videos edited by the Jain Genius team. */
export const VideosView: React.FC<VideosViewProps> = ({ onNavigate }) => {
  const { videos, isAuthenticated } = useCMS();
  const slots = [...videos].sort((a, b) => a.slotId - b.slotId);
  const featured = slots.find((v) => v.isFeatured) ?? slots[0];
  const others = slots.filter((v) => v !== featured);

  return (
    <div className="bg-white text-[#15233A] min-h-screen">
      <PageHeader
        title="Made by Jain Genius"
        intro="Every video here was shot and edited by our own members — skills learnt in our video-editing and design sessions."
      >
        {isAuthenticated && (
          <button
            onClick={() => onNavigate('admin')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/20 text-xs font-medium text-white cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" />
            Manage videos in Admin
          </button>
        )}
      </PageHeader>

      {featured && (
        <section className="pt-14 md:pt-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <VideoPlayer slot={featured} large />
          <SlotDetails slot={featured} />
        </section>
      )}

      {others.length > 0 && (
        <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HScroller
            ariaLabel="More videos"
            items={others}
            getKey={(v) => v.slotId}
            renderItem={(slot) => (
              <div className="h-full">
                <VideoPlayer slot={slot} />
                <SlotDetails slot={slot} />
              </div>
            )}
          />
        </section>
      )}
    </div>
  );
};
