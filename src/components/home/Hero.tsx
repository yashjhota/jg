import React from 'react';
import { Logo } from '../common/Logo';
import { SITE_CONFIG } from '../../data/siteConfig';
import { Language, PageId } from '../../types';
import { ArrowRight, Edit3 } from 'lucide-react';
import { useCMS } from '../../services/cmsStore';

interface HeroProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenRegister: () => void;
  onOpenQuickEdit?: () => void;
}

// Final copy from the Nov 2026 brief. Admins can still override it from the hero editor.
export const HERO_DEFAULTS = {
  badge: 'Guided by Param Pujya Muniraj Shri Bhuvanbhushanvijayji Maharajsaheb',
  title: 'Jain Genius',
  highlight: 'The Change Makers',
  description: 'Holistic growth for Jain youth aged 15–30 — spiritual, financial, physical and mental.',
  primaryBtn: 'Become a Member',
  secondaryBtn: 'Explore Our Work',
};

export const Hero: React.FC<HeroProps> = ({ lang, onNavigate, onOpenQuickEdit }) => {
  const { settings, isLiveEditMode, isAuthenticated } = useCMS();
  const isHi = lang === 'hi';

  const badge = settings.heroBadgeText || HERO_DEFAULTS.badge;
  const title = settings.heroTitle || HERO_DEFAULTS.title;
  const highlight = settings.heroHighlightWord || HERO_DEFAULTS.highlight;
  const description = settings.heroDescription || HERO_DEFAULTS.description;
  const primaryBtn = settings.heroPrimaryBtnText || HERO_DEFAULTS.primaryBtn;
  // This button always goes to the Aadi Sparsh page, so its label is fixed by the brief.
  const secondaryBtn = HERO_DEFAULTS.secondaryBtn;

  const stats = [
    { value: SITE_CONFIG.stats.registrations, label: isHi ? 'आदि स्पर्श पंजीकरण' : 'Aadi Sparsh registrations' },
    { value: SITE_CONFIG.stats.homesVisited, label: isHi ? 'घरों तक पहुँचे' : 'homes visited' },
    { value: SITE_CONFIG.stats.careerTracks, label: isHi ? 'करियर ट्रैक' : 'career tracks' },
    { value: SITE_CONFIG.stats.dacHabits, label: isHi ? 'DAC आदतें' : 'DAC habits' },
  ];

  const go = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      className={`relative bg-[#15233A] text-white overflow-hidden lg:min-h-[calc(100vh-110px)] flex items-center ${
        isLiveEditMode && isAuthenticated ? 'ring-2 ring-inset ring-[#C99A2E]/50' : ''
      }`}
    >
      {isLiveEditMode && isAuthenticated && (
        <div className="absolute top-4 right-4 z-30">
          <button
            onClick={onOpenQuickEdit}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-[#C99A2E] text-[#15233A] font-medium text-xs shadow-xl cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit hero copy</span>
          </button>
        </div>
      )}

      <div className="absolute -top-24 -right-24 w-[28rem] h-[28rem] bg-[#C99A2E]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
            <p className="caption text-[#D9B25A] font-medium">{badge}</p>

            <h1 className="text-[34px] sm:text-5xl lg:text-6xl text-white">
              {title} — <span className="text-[#D9B25A]">{highlight}</span>
            </h1>

            <p className="text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0">{description}</p>

            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto lg:mx-0">
              {stats.map((s) => (
                <div key={s.label} className="rounded-lg bg-white/5 border border-white/10 px-3 py-3 text-left">
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block font-display text-2xl text-[#D9B25A]">{s.value}</span>
                    <span className="block caption text-slate-300">{s.label}</span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-1">
              <button onClick={() => go('membership')} className="btn-primary w-full sm:w-auto">
                {primaryBtn}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => go('aadi-sparsh')} className="btn-secondary w-full sm:w-auto text-white border-white/40">
                {secondaryBtn}
              </button>
            </div>
          </div>

          <div className="hidden lg:flex lg:col-span-4 justify-center">
            <Logo size="xl" />
          </div>
        </div>
      </div>
    </section>
  );
};
