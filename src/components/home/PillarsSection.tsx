import React from 'react';
import { HOLISTIC_PILLARS } from '../../data/pillars';
import { Language, PageId } from '../../types';
import { HScroller } from '../common/HScroller';
import { Sparkles, Briefcase, Activity, HeartHandshake, ArrowRight } from 'lucide-react';

interface PillarsSectionProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

export const PILLAR_ICONS: Record<string, React.ReactNode> = {
  Sparkles: <Sparkles className="w-5 h-5" />,
  Briefcase: <Briefcase className="w-5 h-5" />,
  Activity: <Activity className="w-5 h-5" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5" />,
};

// Short tile names from the brief: Spiritual, Financial, Physical, Mental
const SHORT_TITLE: Record<string, { en: string; hi: string }> = {
  spiritual: { en: 'Spiritual', hi: 'आध्यात्मिक' },
  financial: { en: 'Financial', hi: 'आर्थिक' },
  physical: { en: 'Physical', hi: 'शारीरिक' },
  mental: { en: 'Mental', hi: 'मानसिक' },
};

/** Home section 3: the four pillar tiles, one line each, no expanding details. */
export const PillarsSection: React.FC<PillarsSectionProps> = ({ lang, onNavigate }) => (
  <section className="py-14 md:py-20 bg-[#FBF5E8]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <h2 className="section-heading text-[#15233A]">{lang === 'hi' ? 'हम क्या करते हैं' : 'What We Do'}</h2>
        <button onClick={() => onNavigate('programmes')} className="btn-primary self-start sm:self-auto">
          Explore Programmes
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      <HScroller
        ariaLabel="Four pillars"
        items={HOLISTIC_PILLARS}
        getKey={(p) => p.id}
        itemClassName="w-[80%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-3.75rem)/4)]"
        renderItem={(pillar) => (
          <div className="h-full rounded-lg bg-white border border-slate-200 p-6">
            <div className="w-11 h-11 rounded-lg bg-[#15233A] text-[#D9B25A] flex items-center justify-center mb-4">
              {PILLAR_ICONS[pillar.icon]}
            </div>
            <h3 className="card-title text-[#15233A]">
              {lang === 'hi' ? SHORT_TITLE[pillar.id]?.hi : SHORT_TITLE[pillar.id]?.en ?? pillar.titleEn}
            </h3>
            <p className="mt-1 text-[15px] text-slate-600">{pillar.subtitleEn}</p>
          </div>
        )}
      />
    </div>
  </section>
);
