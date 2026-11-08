import React from 'react';
import { Language, PageId, SocialPost } from '../../types';
import { PageHeader } from '../common/PageHeader';
import { SocialFeedSection } from '../home/SocialFeedSection';

interface SocialFeedViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenAddPost?: () => void;
  onOpenEditPost?: (post: SocialPost) => void;
  onOpenEditSocials?: () => void;
  onShowToast?: (msg: string) => void;
}

/** Media > Social Feed: the "Latest from Our Social Channels" block moved from Home. */
export const SocialFeedView: React.FC<SocialFeedViewProps> = ({ lang, onNavigate, ...editHandlers }) => (
  <div className="bg-white text-[#15233A] min-h-screen">
    <PageHeader
      title={lang === 'hi' ? 'सोशल फ़ीड' : 'Social Feed'}
      intro={
        lang === 'hi'
          ? 'संडे यूथ शभा, DAC की आदतें और समुदाय की घोषणाएँ।'
          : 'Highlights from Sunday Youth Shabhās, DAC habits in action, and community announcements.'
      }
    />
    <SocialFeedSection lang={lang} onNavigate={onNavigate} showHeaderAction={false} {...editHandlers} />
  </div>
);
