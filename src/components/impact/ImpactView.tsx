import React, { useState } from 'react';
import { useCMS } from '../../services/cmsStore';
import { SITE_CONFIG } from '../../data/siteConfig';
import { Language, PageId } from '../../types';
import { TRANSLATIONS } from '../../data/i18n';
import { CTASection } from '../layout/CTASection';
import { TestimonialScroller, usePublishedTestimonials } from '../home/TestimonialsSection';
import { Sparkles, Users, Award, Download, Clock, Settings, Quote, CheckCircle2 } from 'lucide-react';

interface ImpactViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenRegister: () => void;
}

export const ImpactView: React.FC<ImpactViewProps> = ({ lang, onNavigate, onOpenRegister }) => {
  const published = usePublishedTestimonials();
  const [reportNotice, setReportNotice] = useState<string | null>(null);
  const t = TRANSLATIONS[lang];

  return (
    <div className="bg-[#FFFFFF] text-[#15233A] min-h-screen">
      {/* Header */}
      <section className="bg-[#15233A] text-white py-20 border-b border-[#C99A2E]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C99A2E]/15 border border-[#C99A2E]/30 text-[#C99A2E] text-xs font-bold ">
            <Award className="w-3.5 h-3.5 text-[#C99A2E]" />
            <span>Verifiable Transformation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight font-display">
            Impact & Member Journeys
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Measuring the tangible transformation of Jain youth across spiritual grounding,
            disciplined daily routines, and professional workforce readiness.
          </p>
        </div>
      </section>

      {/* Real Verified Core Impact Stat Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#15233A] text-white border-2 border-[#C99A2E]/50 rounded-lg p-8 shadow-md space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#C99A2E] ">
                Aadi Sparsh 2026
              </span>
            </div>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#FFFFFF] font-display">
              {SITE_CONFIG.stats.registrations}
            </div>
            <h4 className="text-base font-bold text-white">Registrations</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Our volunteers visited {SITE_CONFIG.stats.homesVisited} homes across 13 areas of Bengaluru.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-lg p-8 shadow-sm space-y-3">
            <span className="text-xs font-bold text-slate-400 block">
              Discipline Engine
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-[#15233A] font-display">
              14 Habits
            </div>
            <h4 className="text-base font-bold text-[#15233A]">Daily Activity Card (DAC)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Target 5:45 AM awakening, yoga, pooja, svadhyaya, zero negative speech, and evening reflections tracked daily.
            </p>
          </div>

          <div className="bg-white border border-slate-200/90 rounded-lg p-8 shadow-sm space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-slate-400 block">
                Annual Documentation
              </span>
              <h4 className="text-lg font-bold text-[#15233A] font-display mt-2">
                Audited Annual Impact Report
              </h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Comprehensive breakdown of attendance metrics, skill benchmarks, and placement outcomes.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-medium">Edition: 2026</span>
              <button
                onClick={() => setReportNotice('The inaugural 2026 Jain Genius Annual Impact Report is in compilation. Registered members will receive an advance copy.')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Report</span>
              </button>
            </div>
            {reportNotice && (
              <div className="mt-3 p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center justify-between">
                <span>{reportNotice}</span>
                <button onClick={() => setReportNotice(null)} className="text-amber-700 font-bold ml-2">✕</button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Honest, Tasteful Testimonial Slots Section (No Fake Identities) */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-bold text-[#A57D22] block">
              Student Perspectives
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-[#15233A] font-display">
              Member Voices & First Cohort
            </h3>
          </div>

          {published.length > 0 ? (
            <div className="max-w-4xl mx-auto">
              <TestimonialScroller items={published} />
            </div>
          ) : (
            <p className="max-w-2xl mx-auto text-center rounded-lg bg-[#FBF5E8] p-5 text-slate-600">
              Member stories will appear here soon.
            </p>
          )}

          <div className="max-w-4xl mx-auto">
            {/* Mentor & Coordinator Slot */}
            <div className="p-6 rounded-lg bg-gradient-to-br from-[#15233A] to-[#1E3050] text-white border border-[#C99A2E]/40 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#C99A2E] text-[#15233A] ">
                  Coordination Note
                </span>
                <h4 className="text-base font-bold text-[#FFFFFF] font-display">
                  Gaurav — Admissions Lead
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  "Watching youth build disciplined routines and develop practical career skills shows the value of a structured learning environment."
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-[#C99A2E]">
                Enquiries: {SITE_CONFIG.contact.phoneDisplay}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Band */}
      <CTASection lang={lang} onNavigate={onNavigate} />
    </div>
  );
};
