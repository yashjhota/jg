import React from 'react';
import { HOLISTIC_PILLARS } from '../../data/pillars';
import { DAC_14_TASKS } from '../../data/dacTasks';
import { Language, PageId } from '../../types';
import { CTASection } from '../layout/CTASection';
import { PageHeader } from '../common/PageHeader';
import { Accordion } from '../common/Accordion';
import { PILLAR_ICONS } from '../home/PillarsSection';
import { CheckCircle2, ArrowRight } from 'lucide-react';

interface WhatWeDoViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenRegister: () => void;
}

const DAC_CATEGORY_FOR_PILLAR: Record<string, string> = {
  spiritual: 'Spiritual',
  financial: 'Intellectual',
  physical: 'Physical',
  mental: 'Conduct & Service',
};

const RELATED_PAGES: { id: PageId; en: string; hi: string }[] = [
  { id: 'programmes', en: 'Programmes & Career Tracks', hi: 'कार्यक्रम व करियर ट्रैक' },
  { id: 'skill-topics', en: 'Skill Topics', hi: 'कौशल विषय' },
  { id: 'dac', en: 'Daily Activity Card', hi: 'दैनिक गतिविधि कार्ड' },
  { id: 'member-journey', en: 'Member Journey', hi: 'सदस्य यात्रा' },
];

/** What We Do > Four Pillars: each pillar's details sit in an accordion row. */
export const WhatWeDoView: React.FC<WhatWeDoViewProps> = ({ lang, onNavigate }) => {
  const isHi = lang === 'hi';

  const items = HOLISTIC_PILLARS.map((pillar, idx) => {
    const habits = DAC_14_TASKS.filter((t) => t.category === DAC_CATEGORY_FOR_PILLAR[pillar.id]).slice(0, 3);
    return {
      id: pillar.id,
      title: (
        <span className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-lg bg-[#15233A] text-[#D9B25A] flex items-center justify-center shrink-0">
            {PILLAR_ICONS[pillar.icon]}
          </span>
          <span>
            <span className="caption text-[#A57D22] block">Pillar 0{idx + 1}</span>
            <span className="text-lg">{isHi ? pillar.titleHi : pillar.titleEn}</span>
          </span>
        </span>
      ),
      content: (
        <div className="space-y-5 pl-12">
          <p>{isHi ? pillar.descriptionHi : pillar.descriptionEn}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {(isHi ? pillar.keyActivitiesHi : pillar.keyActivitiesEn).map((act) => (
              <li key={act} className="flex items-start gap-2 text-[15px]">
                <CheckCircle2 className="w-4 h-4 text-[#C99A2E] shrink-0 mt-1" />
                <span>{act}</span>
              </li>
            ))}
          </ul>
          {habits.length > 0 && (
            <p className="caption text-slate-500">
              {isHi ? 'DAC में दैनिक अभ्यास:' : 'Practised daily in the DAC:'}{' '}
              {habits.map((h) => (isHi ? h.taskHi : h.taskEn)).join(' · ')}
            </p>
          )}
        </div>
      ),
    };
  });

  return (
    <div className="bg-white text-[#15233A] min-h-screen">
      <PageHeader
        title={isHi ? 'चार स्तंभ' : 'Four Pillars'}
        intro={
          isHi
            ? 'युवाओं के विकास के चार परस्पर जुड़े आयाम: आध्यात्मिक, आर्थिक, शारीरिक और मानसिक।'
            : 'Four connected dimensions that take youth from intention to excellence: Spiritual, Financial, Physical and Mental.'
        }
      />

      <section className="py-14 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Accordion items={items} defaultOpenIndex={0} />
      </section>

      <section className="py-14 bg-[#FBF5E8]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-6">{isHi ? 'और देखें' : 'Explore more'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {RELATED_PAGES.map((p) => (
              <button
                key={p.id}
                onClick={() => onNavigate(p.id)}
                className="group flex items-center justify-between rounded-lg bg-white border border-slate-200 hover:border-[#C99A2E] px-5 py-4 text-left cursor-pointer"
              >
                <span className="card-title">{isHi ? p.hi : p.en}</span>
                <ArrowRight className="w-4 h-4 text-[#C99A2E] group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <CTASection lang={lang} onNavigate={onNavigate} />
    </div>
  );
};
