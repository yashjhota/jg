import React from 'react';
import { Language, PageId } from '../../types';
import { PageHeader } from '../common/PageHeader';
import { ClampText } from '../common/ClampText';
import { DacSection, DAC_INTRO } from '../home/DacSection';

interface DacViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenRegister: () => void;
}

/** What We Do > Daily Activity Card: the 14-habit block moved from Home, unchanged. */
export const DacView: React.FC<DacViewProps> = ({ lang, onNavigate, onOpenRegister }) => (
  <div className="bg-white text-[#15233A] min-h-screen">
    <PageHeader
      eyebrow="Refine to Superfine"
      title="Daily Activity Card (DAC)"
      intro={<ClampText text={DAC_INTRO} lines={3} title="Daily Activity Card (DAC)" tone="dark" />}
    />
    <DacSection lang={lang} onNavigate={onNavigate} onOpenRegister={onOpenRegister} showHeader={false} />
  </div>
);
