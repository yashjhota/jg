import React, { useState } from 'react';
import { PROGRAMMES_DATA } from '../../data/programmes';
import { CAREER_TRACKS_DATA, COMMON_TRACK_STRUCTURE } from '../../data/careerTracks';
import { CareerTrack, Programme, Language, PageId } from '../../types';
import { CTASection } from '../layout/CTASection';
import { HScroller } from '../common/HScroller';
import { Sparkles, Briefcase, ChevronRight, CheckCircle2, Clock, Users, ArrowRight, X, Compass, Layers, Award } from 'lucide-react';

interface ProgrammesViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenRegister: (trackTitle?: string) => void;
}

export const ProgrammesView: React.FC<ProgrammesViewProps> = ({
  lang,
  onNavigate,
  onOpenRegister,
}) => {
  const [activeTab, setActiveTab] = useState<'tracks' | 'all'>('tracks');
  const [selectedTrack, setSelectedTrack] = useState<CareerTrack | null>(null);
  const [selectedProgramme, setSelectedProgramme] = useState<Programme | null>(null);

  return (
    <div className="bg-[#FFFFFF] text-[#15233A] min-h-screen">
      {/* Header */}
      <section className="bg-[#15233A] text-white py-20 border-b border-[#C99A2E]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C99A2E]/15 border border-[#C99A2E]/30 text-[#C99A2E] text-xs font-bold ">
            <Briefcase className="w-3.5 h-3.5 text-[#C99A2E]" />
            <span>Career Acceleration & Upskilling</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight font-display">
            Programmes & Career Tracks
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Rigorous 60-session industry tracks engineered to take young aspirants from zero baseline
            to verified placement readiness across 8 in-demand professional domains.
          </p>
        </div>
      </section>

      {/* Navigation Tabs (8 Career Tracks vs All Holistic Programmes) */}
      <section className="py-6 bg-white border-b border-slate-200 sticky top-[72px] z-20 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('tracks')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all border ${
                activeTab === 'tracks'
                  ? 'bg-[#15233A] text-white border-[#C99A2E]'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              8 Specialization Career Tracks
            </button>
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-lg text-xs font-bold transition-all border ${
                activeTab === 'all'
                  ? 'bg-[#15233A] text-white border-[#C99A2E]'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300'
              }`}
            >
              All Holistic & Spiritual Programmes
            </button>
          </div>

          <div className="text-xs text-[#A57D22] font-bold hidden md:block">
            Refundable Deposit: ₹1,000 Total
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {activeTab === 'tracks' ? (
          <div className="space-y-12">
            {/* 60-Session Master Architecture Explainer Banner */}
            <div className="p-8 rounded-lg bg-white border-2 border-[#C99A2E]/40 shadow-sm space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#A57D22] block">
                    Structured 60-Session Curriculum
                  </span>
                  <h3 className="text-2xl font-bold text-[#15233A] font-display mt-1">
                    Universal 3-Phase Progression Across Every Track
                  </h3>
                </div>
                <div className="px-4 py-2 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700">
                  Total Investment: ₹1,000 Security Deposit
                </div>
              </div>

              <HScroller
                ariaLabel="Curriculum phases"
                items={[
                  { name: 'Phase 1: Foundation', sessions: '10 Sessions', text: 'AI tools for daily productivity, business email drafting, and core computer office applications (Word, Excel, PPT, Canva).' },
                  { name: 'Phase 2: Domain Skills', sessions: '40 Sessions', text: 'Intensive hands-on technical labs with live assignments, software modules, commercial data entries, and practical exercises.' },
                  { name: 'Phase 3: Placement', sessions: '10 Sessions', text: 'Polished resume creation, portfolio review, mock interviews with SWOT analysis, and direct referrals to business partners.' },
                ]}
                getKey={(ph) => ph.name}
                renderItem={(ph) => (
                  <div className="h-full p-5 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-sm font-medium text-[#15233A]">{ph.name}</span>
                      <span className="caption font-medium text-[#A57D22] px-2 py-0.5 rounded bg-[#C99A2E]/10">{ph.sessions}</span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed line-clamp-3">{ph.text}</p>
                  </div>
                )}
              />
            </div>

            {/* The 8 Career Tracks Grid */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-[#15233A] font-display">
                Choose from 8 Specialized Career Tracks
              </h3>

              <HScroller
                ariaLabel="Career tracks"
                items={CAREER_TRACKS_DATA}
                getKey={(track) => track.id}
                renderItem={(track) => (
                  <div
                    onClick={() => setSelectedTrack(track)}
                    className="h-full bg-white border border-slate-200/90 rounded-lg p-6 hover:shadow-md hover:border-[#C99A2E] transition-all cursor-pointer flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="w-7 h-7 rounded-lg bg-[#15233A] text-[#C99A2E] font-bold text-xs flex items-center justify-center">
                          0{track.id}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          60 Sessions
                        </span>
                      </div>

                      <h4 className="text-lg font-bold text-[#15233A] font-display group-hover:text-[#A57D22] transition-colors">
                        {track.title}
                      </h4>

                      <div className="mt-3 space-y-1.5">
                        <span className="text-[11px] font-bold text-slate-400 block">
                          Core Modules:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {track.coreSkills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#A57D22]">
                      <span>View Full Track</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                )}
              />
            </div>
          </div>
        ) : (
          /* All Holistic & Spiritual Programmes */
          <HScroller
            ariaLabel="Programmes"
            items={PROGRAMMES_DATA}
            getKey={(prog) => prog.id}
            renderItem={(prog) => (
              <div
                onClick={() => setSelectedProgramme(prog)}
                className="h-full bg-white border border-slate-200/90 rounded-lg p-6 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold text-[#A57D22]">
                      {prog.category}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {prog.duration || prog.formatReach}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#15233A] font-display">
                    {prog.title}
                  </h3>

                  <p className="text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2">
                    {prog.whatWasCovered}
                  </p>
                  <span className="mt-1 inline-block caption font-medium text-[#A57D22] underline underline-offset-2">
                    Read more
                  </span>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500 font-semibold">
                    Format: {prog.formatReach}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenRegister(prog.title);
                    }}
                    className="px-4 py-2 rounded-lg text-xs font-bold text-[#15233A] bg-[#C99A2E] hover:bg-[#C99A2E] transition-colors"
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            )}
          />
        )}
      </section>

      {/* Selected Career Track Detail Modal */}
      {selectedTrack && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0E1828]/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <div className="relative w-full max-w-3xl bg-[#15233A] border border-[#C99A2E]/50 rounded-lg p-6 sm:p-10 shadow-2xl text-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-[#C99A2E] text-[#15233A] font-bold text-sm flex items-center justify-center">
                  0{selectedTrack.id}
                </span>
                <div>
                  <h3 className="text-xl font-bold text-[#FFFFFF] font-display">
                    {selectedTrack.title}
                  </h3>
                  <span className="text-xs text-[#C99A2E]">
                    60-Session Master Specialization • Complete Industry Readiness
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTrack(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="py-6 space-y-6 max-h-[68vh] overflow-y-auto">
              {/* Core Specialized Skills */}
              <div>
                <h4 className="text-xs font-bold text-[#C99A2E] mb-2">
                  Specialized Skills (40 Sessions)
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedTrack.coreSkills.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 text-xs text-white font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Foundation Module (10 Sessions) */}
              <div className="p-4 rounded-lg bg-[#1E3050] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#C99A2E]">
                  <span>Foundation Training (10 Sessions)</span>
                  <span className="text-slate-400 font-normal">Common to all tracks</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {selectedTrack.foundation.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A2E]" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interview Preparation (10 Sessions) */}
              <div className="p-4 rounded-lg bg-[#1E3050] border border-white/10 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-[#C99A2E]">
                  <span>Interview & Placement Readiness (10 Sessions)</span>
                  <span className="text-slate-400 font-normal">Direct Employer Referrals</span>
                </div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {selectedTrack.interviewPrep.map((ip, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A2E]" />
                      <span>{ip}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Certifications Recommended */}
              <div className="bg-[#0E1828] p-4 rounded-lg border border-white/10">
                <span className="text-xs font-bold text-[#C99A2E] block mb-2 ">
                  Aligned Industry Certifications:
                </span>
                <div className="flex flex-wrap gap-2">
                  {selectedTrack.suggestedCertifications.map((cert, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-[#C99A2E]/15 text-[#C99A2E] text-xs font-semibold"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-slate-400">
                Deposit: ₹1,000 includes all 60 sessions & placement guidance.
              </span>

              <button
                onClick={() => {
                  const trackName = selectedTrack.title;
                  setSelectedTrack(null);
                  onOpenRegister(trackName);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-lg text-xs font-bold text-[#15233A] bg-[#C99A2E] hover:bg-[#B88A24] shadow-md transition-all"
              >
                Apply for {selectedTrack.title}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Selected Programme Modal */}
      {selectedProgramme && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0E1828]/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-xl bg-[#15233A] border border-[#C99A2E]/50 rounded-lg p-6 sm:p-8 shadow-2xl text-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-[#FFFFFF] font-display">
                {selectedProgramme.title}
              </h3>
              <button
                onClick={() => setSelectedProgramme(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-5 space-y-4 max-h-[60vh] overflow-y-auto">
              <p className="text-xs text-[#C99A2E] font-semibold">
                Category: {selectedProgramme.category} • Format: {selectedProgramme.formatReach}
              </p>
              <p className="text-sm text-slate-300 leading-relaxed">
                {selectedProgramme.whatWasCovered}
              </p>

              {selectedProgramme.outcomes && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 mb-2">
                    Learning Outcomes
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {selectedProgramme.outcomes.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C99A2E]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                onClick={() => {
                  const progTitle = selectedProgramme.title;
                  setSelectedProgramme(null);
                  onOpenRegister(progTitle);
                }}
                className="px-5 py-2.5 rounded-lg bg-[#C99A2E] text-[#15233A] text-xs font-bold"
              >
                Register for Programme
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom CTA Band */}
      <CTASection lang={lang} onNavigate={onNavigate} />
    </div>
  );
};
