import React from 'react';
import { Language, PageId } from '../../types';
import { PageHeader } from '../common/PageHeader';
import { JourneySection } from '../home/JourneySection';
import { CTASection } from '../layout/CTASection';

interface MemberJourneyViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenRegister: () => void;
}

/** What We Do > Member Journey: the 6-step journey moved from Home, unchanged. */
export const MemberJourneyView: React.FC<MemberJourneyViewProps> = ({ lang, onNavigate, onOpenRegister }) => {
  const isHi = lang === 'hi';
  return (
    <div className="bg-white text-[#15233A] min-h-screen">
      <PageHeader
        title={isHi ? 'सदस्य विकास की ६-चरणीय यात्रा' : 'The Member Development Journey'}
        intro={
          isHi
            ? 'एक प्रामाणिक, सुव्यवस्थित मार्ग जो युवाओं को आध्यात्मिक पुनर्जागरण से लेकर करियर ट्रैक और इंटर्नशिप तक ले जाता है।'
            : 'A proven, structured pathway guiding youth from spiritual reconnection to a certified career track and professional placement.'
        }
      />
      <JourneySection lang={lang} onNavigate={onNavigate} onOpenRegister={onOpenRegister} showHeader={false} />
      <CTASection lang={lang} onNavigate={onNavigate} />
    </div>
  );
};
