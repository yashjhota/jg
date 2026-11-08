import React from 'react';
import { Logo } from '../common/Logo';
import { SITE_CONFIG } from '../../data/siteConfig';
import { Language, PageId } from '../../types';
import { TRANSLATIONS } from '../../data/i18n';
import { CTASection } from '../layout/CTASection';
import { ClampText } from '../common/ClampText';
import { Sparkles, ShieldCheck, HeartHandshake, BookOpen, Compass, CheckCircle2, Award } from 'lucide-react';

interface AboutViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenRegister: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ lang, onNavigate, onOpenRegister }) => {
  const t = TRANSLATIONS[lang];

  return (
    <div className="bg-[#FFFFFF] text-[#15233A] min-h-screen">
      {/* Editorial Page Header */}
      <section className="bg-[#15233A] text-white py-20 border-b border-[#C99A2E]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C99A2E]/15 border border-[#C99A2E]/30 text-[#C99A2E] text-xs font-bold ">
            <Sparkles className="w-3.5 h-3.5 text-[#C99A2E]" />
            <span>Our Purpose & Lineage</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight font-display">
            About Jain Genius
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Building a generation of Jain youth who lead with uncompromised ethics, professional mastery,
            and enduring spiritual grounding.
          </p>
        </div>
      </section>

      {/* Origin Story & Vision Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold text-[#A57D22] ">
              <span>Why We Exist</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#15233A] font-display leading-tight">
              A Movement to Bridge Spiritual Depth and Modern Career Excellence
            </h2>

            <ClampText
              lines={3}
              title="Why we exist"
              className="text-slate-700 text-base"
              text={[
                'Jain Genius (The Change Makers) was conceived with a single, urgent purpose: to empower young Jains (aged 15 to 30) facing modern life pressures, career anxieties, and spiritual drift. Rather than leaving youth to navigate contemporary challenges alone, Jain Genius provides a nurturing, systematic ecosystem.',
                `Under the guidance of ${SITE_CONFIG.initiativeOf}, our programmes combine traditional Jain wisdom with 21st-century capabilities: financial literacy, analytical discipline, leadership, physical fitness, and mental resilience.`,
              ]}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg bg-white border border-slate-200/90 shadow-sm space-y-1">
                <span className="text-xs font-bold text-[#C99A2E] ">Our Vision</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  To nurture a global community of Jain changemakers who achieve top-tier professional heights while upholding Ahimsa, honesty, and selfless service.
                </p>
              </div>

              <div className="p-4 rounded-lg bg-white border border-slate-200/90 shadow-sm space-y-1">
                <span className="text-xs font-bold text-[#C99A2E] ">Our Mission</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  To deliver structured 6-step developmental journeys, 14-habit daily discipline (DAC), and 60-session industry tracks to every registered youth member.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-white border-2 border-[#C99A2E]/30 rounded-lg p-8 shadow-md text-center space-y-6">
              <div className="flex justify-center">
                <Logo customSize={120} />
              </div>

              <div className="pt-4 border-t border-slate-100 text-left space-y-3">
                <h4 className="text-sm font-bold text-[#15233A] ">
                  Key Operational Facts
                </h4>
                <ul className="space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99A2E]" />
                    <span>Target Age Bracket: 15–30 Years</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99A2E]" />
                    <span>Membership Deposit: {SITE_CONFIG.membershipDeposit}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99A2E]" />
                    <span>{SITE_CONFIG.stats.careerTracks} career tracks · {SITE_CONFIG.stats.dacHabits}-habit DAC</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#C99A2E]" />
                    <span>Assemblies at Chickpet Temple & Bangalore Centers</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Initiative Framework (moved from the Home hero) */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-[#15233A] text-white border border-[#C99A2E]/40 p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
            <h2 className="section-heading text-white">Initiative Framework</h2>
            <span className="caption text-[#D9B25A]">Age 15–30</span>
          </div>
          <p className="text-slate-300 max-w-3xl">
            Turning Jain youth into value-driven change-makers through spiritual anchors, practical economic
            skills, physical stamina and mental clarity.
          </p>
          <dl className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { value: SITE_CONFIG.stats.registrations, label: 'Aadi Sparsh registrations' },
              { value: SITE_CONFIG.stats.homesVisited, label: 'homes visited' },
              { value: SITE_CONFIG.stats.careerTracks, label: 'career tracks' },
            ].map((s) => (
              <div key={s.label} className="rounded-lg bg-white/5 border border-white/10 p-5">
                <dt className="sr-only">{s.label}</dt>
                <dd>
                  <span className="block font-display text-3xl text-[#D9B25A]">{s.value}</span>
                  <span className="block text-sm text-slate-300 mt-1">{s.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Spiritual Mentor & Lineage Spotlight */}
      <section className="py-16 bg-[#15233A] text-white border-y border-[#C99A2E]/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#C99A2E]/20 border border-[#C99A2E] flex items-center justify-center mx-auto text-[#C99A2E]">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-[#C99A2E] block">
              Spiritual Mentor & Inspiration
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#FFFFFF] font-display">
              {SITE_CONFIG.initiativeOf}
            </h3>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed pt-2">
              Sahebji's guidance inspires Jain Genius's spiritual foundation and its commitment to values-led youth
              development.
            </p>
          </div>
        </div>
      </section>

      {/* 5 Core Values Applied in Modern Careers */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C99A2E]/15 text-[#A57D22] text-xs font-bold ">
            <BookOpen className="w-3.5 h-3.5 text-[#C99A2E]" />
            <span>Ethical Foundation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#15233A] font-display">
            Core Values Applied to Professional Life
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            How traditional Jain principles manifest as tangible modern workplace superpowers:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-700 flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h4 className="text-lg font-bold text-[#15233A] font-display">Ahimsa (Compassion & Non-Harm)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              In business, Ahimsa translates into zero exploitation, constructive team leadership, psychological safety, and building ethical products that genuinely heal society.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-blue-500/15 text-blue-700 flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h4 className="text-lg font-bold text-[#15233A] font-display">Satya & Asteya (Integrity & Honor)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Total transparency in accounting, GST compliance, contracts, and promises. Building an unshakeable reputation where your word is as solid as gold.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm space-y-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-700 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h4 className="text-lg font-bold text-[#15233A] font-display">Anekantavada (Intellectual Humility)</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              The ability to see multiple perspectives without ego. Crucial for customer negotiations, conflict resolution, design thinking, and collaborative teamwork.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership & Coordination */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-[#15233A] font-display">
            Leadership & Coordination
          </h3>
          <p className="text-slate-600 text-sm max-w-xl mx-auto leading-relaxed">
            Run by passionate volunteers, business leaders, and educators within the Jain community.
            For direct inquiries regarding admissions and mentorship:
          </p>

          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 px-6 py-3 rounded-lg shadow-sm">
            <div className="text-left">
              <span className="text-[11px] text-slate-400 block font-semibold ">Lead Coordinator</span>
              <span className="text-sm font-bold text-[#15233A]">
                {SITE_CONFIG.contact.name} — {SITE_CONFIG.contact.phoneDisplay}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Band */}
      <CTASection lang={lang} onNavigate={onNavigate} />
    </div>
  );
};
