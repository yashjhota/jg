import { VideoSlot } from '../types';

/** Five fixed slots for Media > Videos. Each shows "Video coming soon" until the team adds a link in Admin. */
export const VIDEO_SLOTS: VideoSlot[] = [1, 2, 3, 4, 5].map((slotId) => ({
  slotId,
  url: '',
  kind: '',
  title: '',
  description: '',
  editedBy: '',
  isFeatured: slotId === 1,
}));
