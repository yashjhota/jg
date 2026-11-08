import React from 'react';
import { PageId } from '../../types';
import { YOUTH_SHIVIR } from '../../data/youthShivir';
import { UPDATE_IMAGES } from '../../data/nov2026Content';
import { PageHeader } from '../common/PageHeader';
import { HScroller } from '../common/HScroller';
import { ClampText } from '../common/ClampText';
import { Tabs } from '../common/Tabs';
import { ArrowRight } from 'lucide-react';

interface YouthShivirViewProps {
  onNavigate: (page: PageId) => void;
}

/** Our Work > 3-Day Youth Shivir (#youth-shivir). English copy in both languages, as the brief allows. */
export const YouthShivirView: React.FC<YouthShivirViewProps> = ({ onNavigate }) => {
  const s = YOUTH_SHIVIR;

  const dayTabs = [0, 1, 2].map((dayIndex) => ({
    id: `day-${dayIndex + 1}`,
    label: `Day ${dayIndex + 1}`,
    content: (
      <dl className="divide-y divide-slate-200 border-y border-slate-200">
        {s.schedule.map((row) => (
          <div key={row.slot} className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-4 py-3">
            <dt className="caption font-medium text-[#A57D22] sm:text-[15px]">{row.slot}</dt>
            <dd className="sm:col-span-2 text-[15px] text-slate-700">{row.days[dayIndex]}</dd>
          </div>
        ))}
      </dl>
    ),
  }));

  return (
    <div className="bg-white text-[#15233A] min-h-screen">
      {/* 1. Header */}
      <PageHeader
        eyebrow="Our Work"
        title={s.heading}
        intro={
          <>
            <p className="caption text-[#D9B25A] mb-3">{s.detailLine}</p>
            <ClampText text={s.intro} lines={3} title={s.heading} tone="dark" />
          </>
        }
      />

      {/* 2. Day by day */}
      <section className="py-14 md:py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading mb-6">Day by day</h2>
        <Tabs tabs={dayTabs} ariaLabel="Shivir schedule by day" />
      </section>

      {/* 3. Mentors */}
      <section className="py-14 md:py-20 bg-[#FBF5E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-heading mb-8">Mentors</h2>
          <HScroller
            ariaLabel="Mentors"
            items={s.mentors}
            getKey={(m) => m.name}
            itemClassName="w-[60%] sm:w-[calc((100%-2.5rem)/3)] lg:w-[calc((100%-6.25rem)/6)]"
            renderItem={(m) => (
              <div className="h-full rounded-lg bg-white border border-slate-200 p-5 text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#15233A] text-[#D9B25A] font-display text-lg flex items-center justify-center">
                  {m.name.charAt(0)}
                </div>
                <p className="card-title mt-3 text-[16px]">{m.name}</p>
                {m.role && <p className="caption text-slate-500 mt-0.5">{m.role}</p>}
              </div>
            )}
          />
        </div>
      </section>

      {/* 4. Photo + closing line */}
      <section className="py-14 md:py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <img
            src={UPDATE_IMAGES.youthPresenting}
            alt="A Shivir participant giving his individual presentation"
            loading="lazy"
            className="w-full max-w-sm mx-auto rounded-lg"
          />
          <div className="space-y-6">
            <blockquote className="font-display text-2xl leading-snug text-[#15233A]">“{s.closingLine}”</blockquote>
            <button onClick={() => onNavigate('events')} className="btn-primary">
              See all events
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
