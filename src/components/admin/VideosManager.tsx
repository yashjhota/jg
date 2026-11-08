import React, { useEffect, useState } from 'react';
import { PageId, VideoSlot } from '../../types';
import { useCMS } from '../../services/cmsStore';
import { parseVideoUrl } from '../../services/videoEmbed';
import { Video, Save, Eraser, Eye, Star } from 'lucide-react';

interface VideosManagerProps {
  onNavigate: (page: PageId) => void;
  showToast: (msg: string) => void;
}

type Orientation = 'auto' | 'vertical' | 'landscape';

const toOrientation = (v?: boolean): Orientation => (v === undefined ? 'auto' : v ? 'vertical' : 'landscape');
const fromOrientation = (o: Orientation): boolean | undefined => (o === 'auto' ? undefined : o === 'vertical');

const KIND_LABEL: Record<string, string> = {
  youtube: 'YouTube',
  instagram: 'Instagram',
  mp4: 'MP4 file',
  '': 'Not recognised',
};

const SlotEditor: React.FC<{
  slot: VideoSlot;
  onSave: (slotId: number, updates: Partial<VideoSlot>) => Promise<void>;
  onMakeFeatured: (slotId: number) => Promise<void>;
}> = ({ slot, onSave, onMakeFeatured }) => {
  const [url, setUrl] = useState(slot.url);
  const [title, setTitle] = useState(slot.title);
  const [description, setDescription] = useState(slot.description);
  const [editedBy, setEditedBy] = useState(slot.editedBy);
  const [orientation, setOrientation] = useState<Orientation>(toOrientation(slot.vertical));
  const [saving, setSaving] = useState(false);

  // Pick up changes that arrive from Firestore
  useEffect(() => {
    setUrl(slot.url);
    setTitle(slot.title);
    setDescription(slot.description);
    setEditedBy(slot.editedBy);
    setOrientation(toOrientation(slot.vertical));
  }, [slot]);

  const embed = parseVideoUrl(url);
  const isDirty =
    url !== slot.url ||
    title !== slot.title ||
    description !== slot.description ||
    editedBy !== slot.editedBy ||
    orientation !== toOrientation(slot.vertical);
  const vertical = fromOrientation(orientation) ?? embed.vertical;

  const save = async (updates: Partial<VideoSlot>) => {
    setSaving(true);
    try {
      await onSave(slot.slotId, updates);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    'w-full px-3 py-2 rounded-lg bg-white border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#C99A2E]';

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 grid grid-cols-1 lg:grid-cols-5 gap-5">
      <div className="lg:col-span-3 space-y-3">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-sans font-medium text-base text-[#15233A]">
            Slot {slot.slotId}
            {slot.isFeatured && (
              <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#FBF5E8] text-[#A57D22] text-xs">
                <Star className="w-3 h-3" /> Featured
              </span>
            )}
          </h3>
          {!slot.isFeatured && (
            <button
              onClick={() => onMakeFeatured(slot.slotId)}
              className="text-xs font-medium text-[#A57D22] hover:underline cursor-pointer"
            >
              Make featured
            </button>
          )}
        </div>

        <label className="block text-xs font-medium text-slate-600">
          Video link (YouTube, Instagram or .mp4)
          <input
            className={`${inputClass} mt-1`}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://youtu.be/… or https://www.instagram.com/reel/…"
          />
        </label>
        {url && (
          <p className={`text-xs ${embed.kind ? 'text-emerald-700' : 'text-red-600'}`}>
            Detected: {KIND_LABEL[embed.kind]}
            {embed.kind && ` · ${vertical ? 'vertical (9:16)' : 'landscape'}`}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block text-xs font-medium text-slate-600">
            Title
            <input className={`${inputClass} mt-1`} value={title} maxLength={200} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className="block text-xs font-medium text-slate-600">
            Edited by
            <input className={`${inputClass} mt-1`} value={editedBy} maxLength={200} onChange={(e) => setEditedBy(e.target.value)} />
          </label>
        </div>
        <label className="block text-xs font-medium text-slate-600">
          One-line description
          <input
            className={`${inputClass} mt-1`}
            value={description}
            maxLength={500}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="block text-xs font-medium text-slate-600">
          Shape
          <select
            className={`${inputClass} mt-1`}
            value={orientation}
            onChange={(e) => setOrientation(e.target.value as Orientation)}
          >
            <option value="auto">Automatic</option>
            <option value="vertical">Vertical (9:16 reel / short)</option>
            <option value="landscape">Landscape (16:9)</option>
          </select>
        </label>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            disabled={!isDirty || saving || (url !== '' && !embed.kind)}
            onClick={() =>
              save({ url: url.trim(), title: title.trim(), description: description.trim(), editedBy: editedBy.trim(), vertical: fromOrientation(orientation) })
            }
            className="btn-primary !py-2 !px-4 !text-sm disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving…' : 'Save slot'}
          </button>
          {slot.url && (
            <button
              disabled={saving}
              onClick={() => save({ url: '', title: '', description: '', editedBy: '', vertical: undefined })}
              className="btn-secondary !py-2 !px-4 !text-sm text-slate-600"
            >
              <Eraser className="w-4 h-4" />
              Clear slot
            </button>
          )}
        </div>
      </div>

      {/* Live preview */}
      <div className="lg:col-span-2">
        <p className="text-xs font-medium text-slate-500 mb-2 flex items-center gap-1">
          <Eye className="w-3.5 h-3.5" /> Preview
        </p>
        {embed.src ? (
          <div className="bg-[#0E1828] rounded-lg overflow-hidden flex justify-center">
            <div className={vertical ? 'aspect-[9/16] h-[360px] max-w-full' : 'aspect-video w-full'}>
              {embed.kind === 'mp4' ? (
                <video src={embed.src} controls preload="metadata" className="w-full h-full object-contain bg-black" />
              ) : (
                <iframe src={embed.src} title="Preview" className="w-full h-full border-0" allowFullScreen />
              )}
            </div>
          </div>
        ) : (
          <div className="aspect-video rounded-lg bg-[#15233A] text-[#D9B25A] text-sm flex items-center justify-center">
            Video coming soon
          </div>
        )}
      </div>
    </div>
  );
};

/** Admin tab for the 5 fixed video slots on Media > Videos. */
export const VideosManager: React.FC<VideosManagerProps> = ({ onNavigate, showToast }) => {
  const { videos, updateVideoSlot } = useCMS();
  const slots = [...videos].sort((a, b) => a.slotId - b.slotId);

  const handleSave = async (slotId: number, updates: Partial<VideoSlot>) => {
    await updateVideoSlot(slotId, updates);
    showToast(updates.url ? `Video slot ${slotId} saved.` : `Video slot ${slotId} cleared.`);
  };

  const handleMakeFeatured = async (slotId: number) => {
    await Promise.all(
      slots
        .filter((s) => s.isFeatured !== (s.slotId === slotId))
        .map((s) => updateVideoSlot(s.slotId, { isFeatured: s.slotId === slotId }))
    );
    showToast(`Slot ${slotId} is now the featured video.`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-display text-[#15233A] flex items-center gap-2">
            <Video className="w-6 h-6 text-[#C99A2E]" />
            Videos
          </h2>
          <p className="text-sm text-slate-500">
            Five slots on Media › Videos. Paste a YouTube, Instagram or .mp4 link; empty slots show "Video coming soon".
          </p>
        </div>
        <button onClick={() => onNavigate('videos')} className="btn-secondary !py-2 !px-4 !text-sm text-[#15233A]">
          <Eye className="w-4 h-4" />
          View page
        </button>
      </div>
      {slots.map((slot) => (
        <SlotEditor key={slot.slotId} slot={slot} onSave={handleSave} onMakeFeatured={handleMakeFeatured} />
      ))}
    </div>
  );
};
