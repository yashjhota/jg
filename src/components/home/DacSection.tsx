import React, { useState } from 'react';
import { DAC_14_TASKS } from '../../data/dacTasks';
import { SITE_CONFIG } from '../../data/siteConfig';
import { Language, PageId } from '../../types';
import { HScroller } from '../common/HScroller';
import { Sparkles, Calendar, CheckSquare, ExternalLink, ShieldCheck, ArrowRight, Sun, Moon } from 'lucide-react';

interface DacSectionProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenRegister: () => void;
  /** Hide the section title when the page already has a header. */
  showHeader?: boolean;
}

export const DAC_INTRO =
  'Every member is entrusted with a Daily Activity Card: 14 non-negotiable daily habits tracked every day of the month (days 1–31). It builds unshakable self-discipline across spiritual practice, health, continuous learning, and mindful conduct.';

export const DacSection: React.FC<DacSectionProps> = ({
  lang,
  onNavigate,
  onOpenRegister,
  showHeader = true,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Spiritual', 'Physical', 'Intellectual', 'Conduct & Service'];

  const filteredTasks = selectedCategory === 'All'
    ? DAC_14_TASKS
    : DAC_14_TASKS.filter((t) => t.category === selectedCategory);

  return (
    <section id="daily-activity-card" className="py-20 bg-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {showHeader && (
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C99A2E]/15 text-[#A57D22] text-xs font-bold mb-3">
            <CheckSquare className="w-3.5 h-3.5 text-[#C99A2E]" />
            <span>Refine to Superfine System</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#15233A] tracking-tight font-display">
            Daily Activity Card (DAC)
          </h2>

          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed line-clamp-3">
            {DAC_INTRO}
          </p>
        </div>
        )}

        {/* Philosophy Intro & Timing Highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border border-slate-200/90 rounded-lg p-6 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center shrink-0">
              <Sun className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 block">
                Rule 01: Dawn Regimen
              </span>
              <h4 className="text-base font-bold text-[#15233A] font-display mt-0.5">
                Target 5:45 AM Awakening
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Early rising followed by Yoga, self-defense, Pooja Darshan, and sacred Chaityavandan.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-lg p-6 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-500/15 text-indigo-700 flex items-center justify-center shrink-0">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-slate-400 block">
                Rule 14: Night Regimen
              </span>
              <h4 className="text-base font-bold text-[#15233A] font-display mt-0.5">
                Restful Sleep by 10:30 PM
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Evening Aarti, daily Sukruth reflection, zero negative phone use, and regenerative rest.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#15233A] to-[#1E3050] border border-[#C99A2E]/40 text-white rounded-lg p-6 shadow-sm flex flex-col justify-between">
            <div>
              <span className="text-[11px] font-bold text-[#C99A2E] block">
                Online Task Tracking
              </span>
              <h4 className="text-base font-bold text-[#FFFFFF] font-display mt-0.5">
                Mirrored in Member Portal
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Registered members log in daily to record habit completion, audited by our team.
              </p>
            </div>
            <a
              href={SITE_CONFIG.memberPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C99A2E] hover:underline pt-3"
            >
              <span>Launch Deployed Tracker <span className="hidden sm:inline">(jaingeniusorg.lovable.app)</span></span>
              <ExternalLink className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none touch-pan-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#15233A] text-white border-[#C99A2E] shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 14 habits in a scroller; the key resets its position when the filter changes */}
        <HScroller
          key={selectedCategory}
          ariaLabel="Daily Activity Card habits"
          items={filteredTasks}
          getKey={(task) => task.number}
          renderItem={(task) => (
            <div className="h-full bg-white border border-slate-200/90 rounded-lg p-4 flex items-start gap-3.5">
              <span className="w-8 h-8 rounded-lg bg-[#15233A] text-[#C99A2E] font-medium text-xs flex items-center justify-center shrink-0">
                {task.number < 10 ? `0${task.number}` : task.number}
              </span>
              <div className="flex-1 min-w-0">
                <span className="caption text-slate-500 block">{task.category}</span>
                <h4 className="card-title text-[#15233A] mt-0.5">{lang === 'en' ? task.taskEn : task.taskHi}</h4>
                <p className="text-sm text-slate-600 mt-1 leading-snug line-clamp-2">
                  {lang === 'en' ? task.noteTargetEn : task.noteTargetHi}
                </p>
              </div>
            </div>
          )}
        />

        {/* Bottom Callout */}
        <div className="mt-12 bg-white border border-slate-200 rounded-lg p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-[#15233A] font-display">
              Ready to experience "Refine to Superfine"?
            </h4>
            <p className="text-xs text-slate-600">
              Join the movement and receive your physical printed monthly tracker card & online portal credentials.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenRegister}
              className="px-6 py-3 rounded-lg text-xs font-bold text-[#15233A] bg-[#C99A2E] hover:bg-[#B88A24] shadow-sm transition-all"
            >
              Become a Member (Deposit: {SITE_CONFIG.membershipDeposit})
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
