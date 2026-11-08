import React, { useState } from 'react';
import { PageId } from '../../types';
import { AADI_SPARSH } from '../../data/aadiSparsh';
import { UPDATE_IMAGES } from '../../data/nov2026Content';
import { PageHeader } from '../common/PageHeader';
import { HScroller } from '../common/HScroller';
import { ClampText } from '../common/ClampText';
import {
  ClipboardList,
  DoorOpen,
  Store,
  PhoneCall,
  Landmark,
  Drama,
  Palette,
  Clapperboard,
  Award,
  Plus,
  ArrowRight,
} from 'lucide-react';

interface AadiSparshViewProps {
  onNavigate: (page: PageId) => void;
}

const ICONS: Record<string, React.ReactNode> = {
  ClipboardList: <ClipboardList className="w-5 h-5" />,
  DoorOpen: <DoorOpen className="w-5 h-5" />,
  Store: <Store className="w-5 h-5" />,
  PhoneCall: <PhoneCall className="w-5 h-5" />,
  Landmark: <Landmark className="w-5 h-5" />,
  Drama: <Drama className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  Clapperboard: <Clapperboard className="w-5 h-5" />,
  Award: <Award className="w-5 h-5" />,
};

const IconCard: React.FC<{ icon: string; title: string; text: string }> = ({ icon, title, text }) => (
  <div className="h-full rounded-lg bg-white border border-slate-200 p-6">
    <div className="w-11 h-11 rounded-lg bg-[#15233A] text-[#D9B25A] flex items-center justify-center mb-4">
      {ICONS[icon]}
    </div>
    <h3 className="card-title text-[#15233A]">{title}</h3>
    <ClampText
      text={text.charAt(0).toUpperCase() + text.slice(1)}
      lines={2}
      title={title}
      className="mt-1 text-[15px] text-slate-600"
    />
  </div>
);

/** Our Work > Aadi Sparsh Abhiyaan (#aadi-sparsh). English copy in both languages, as the brief allows. */
export const AadiSparshView: React.FC<AadiSparshViewProps> = ({ onNavigate }) => {
  const [showAllAreas, setShowAllAreas] = useState(false);
  const a = AADI_SPARSH;

  return (
    <div className="bg-white text-[#15233A] min-h-screen">
      {/* 1. Page header */}
      <PageHeader
        eyebrow="Our Work"
        title={a.heading}
        subtitle={a.subheading}
        intro={<ClampText text={a.intro} lines={3} title={a.heading} tone="dark" />}
      />

      {/* 2. Stat row */}
      <section className="py-10 md:py-14 bg-[#FBF5E8]">
        <dl className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {a.stats.map((s) => (
            <div key={s.label} className="rounded-lg bg-white border border-slate-200 p-4 text-center">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-display text-3xl text-[#A57D22]">{s.value}</span>
                <span className="block caption text-slate-600 mt-1">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      {/* 3. Where we went: map beside the table on desktop, stacked on mobile */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading mb-8">Where we went</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <img
            src={UPDATE_IMAGES.map}
            alt="Map of the 13 Bengaluru areas covered by Aadi Sparsh: 12 in the city centre and Whitefield in the east"
            loading="lazy"
            className="w-full rounded-lg border border-slate-200"
          />
          <div>
            <table className="w-full text-left text-[15px] border-collapse">
              <thead>
                <tr className="border-b-2 border-[#C99A2E]">
                  <th scope="col" className="py-2 pr-4 font-medium">Zone</th>
                  <th scope="col" className="py-2 font-medium">Areas</th>
                </tr>
              </thead>
              <tbody>
                {a.zones.map((z) => (
                  <tr key={z.zone} className="border-b border-slate-200 align-top">
                    <th scope="row" className="py-3 pr-4 font-medium whitespace-nowrap">{z.zone}</th>
                    <td className="py-3 text-slate-700">{z.areas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="caption text-slate-600 mt-4">{a.bestDay}</p>
          </div>
        </div>
      </section>

      {/* 4. How we did it */}
      <section className="py-14 md:py-20 bg-[#FBF5E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">How we did it</h2>
          <HScroller
            ariaLabel="How we did it"
            items={a.howWeDidIt}
            getKey={(c) => c.title}
            renderItem={(c) => <IconCard {...c} />}
          />
          <figure className="mt-10 max-w-4xl mx-auto">
            <img
              src={UPDATE_IMAGES.sevarthi}
              alt="Jain Genius sevarthis in yellow lanyards, group photo"
              loading="lazy"
              className="w-full rounded-lg"
            />
            <figcaption className="caption text-slate-600 mt-2 text-center">{a.sevarthiCaption}</figcaption>
          </figure>
        </div>
      </section>

      {/* 5. What we created */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading mb-8">What we created</h2>
        <HScroller
          ariaLabel="What we created"
          items={a.whatWeCreated}
          getKey={(c) => c.title}
          renderItem={(c) => <IconCard {...c} />}
        />
      </section>

      {/* 6. The day we went together + Thank you */}
      <section className="py-14 md:py-20 bg-[#FBF5E8]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <h2 className="section-heading mb-3">The day we went together</h2>
            <ClampText text={a.togetherText} lines={3} title="The day we went together" className="text-slate-700" />
          </div>
          <div>
            <h2 className="section-heading mb-3">Thank you</h2>
            <ClampText text={a.thankYouText} lines={3} title="Thank you" className="text-slate-700" />
          </div>
          <img
            src={UPDATE_IMAGES.certificates}
            alt="Certificates of Appreciation for the Aadi Sparsh volunteers"
            loading="lazy"
            className="w-full rounded-lg border border-slate-200 bg-white"
          />
        </div>
      </section>

      {/* 7. Coming next: Phase 2 */}
      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto rounded-lg bg-[#15233A] text-white border-2 border-[#C99A2E] p-6 md:p-10">
          <h2 className="section-heading text-white">{a.phase2Heading}</h2>
          <p className="mt-3 text-slate-200">{a.phase2Text}</p>

          <button
            type="button"
            onClick={() => setShowAllAreas((v) => !v)}
            aria-expanded={showAllAreas}
            className="mt-5 inline-flex items-center gap-2 text-[#D9B25A] font-medium cursor-pointer"
          >
            See all areas
            <Plus className={`w-4 h-4 transition-transform ${showAllAreas ? 'rotate-45' : ''}`} />
          </button>

          {showAllAreas && (
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-[15px] border-collapse">
                <thead>
                  <tr className="border-b border-[#C99A2E]">
                    <th scope="col" className="py-2 pr-4 font-medium text-[#D9B25A]">Area</th>
                    <th scope="col" className="py-2 font-medium text-[#D9B25A]">Buildings / coverage</th>
                  </tr>
                </thead>
                <tbody>
                  {a.phase2Areas.map((r) => (
                    <tr key={r.area} className="border-b border-white/10 align-top">
                      <th scope="row" className="py-2.5 pr-4 font-medium whitespace-nowrap">{r.area}</th>
                      <td className="py-2.5 text-slate-300">{r.coverage}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <button onClick={() => onNavigate('contact')} className="btn-primary mt-8">
            Volunteer with us
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
