import React from 'react';
import { Language, PageId, TestimonialSlot } from '../../types';
import { useCMS } from '../../services/cmsStore';
import { HScroller } from '../common/HScroller';
import { ClampText } from '../common/ClampText';
import { ArrowRight, Quote } from 'lucide-react';

interface TestimonialsSectionProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

const nameOf = (t: TestimonialSlot) => (t.studentName || t.name || '').trim();
const quoteOf = (t: TestimonialSlot) => (t.experienceText || t.quote || '').trim();

/** Published testimonials only: status "ready" with a name and a quote. */
export function usePublishedTestimonials(): TestimonialSlot[] {
  const { testimonials } = useCMS();
  return testimonials
    .filter((t) => !t.isDeleted && t.status === 'ready' && nameOf(t) && quoteOf(t))
    .sort((a, b) => a.slotId - b.slotId);
}

/** One testimonial at a time, auto-advancing every 6 seconds. Each quote shows 2 lines + "Read full story". */
export const TestimonialScroller: React.FC<{ items: TestimonialSlot[] }> = ({ items }) => (
  <HScroller
    ariaLabel="Member testimonials"
    items={items}
    oneAtATime
    autoAdvanceMs={6000}
    getKey={(t) => t.slotId}
    renderItem={(t) => (
      <figure className="h-full rounded-lg bg-white border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex items-center gap-4 md:w-56 shrink-0">
          {t.avatarUrl ? (
            <img src={t.avatarUrl} alt={nameOf(t)} className="w-14 h-14 rounded-full object-cover border-2 border-[#C99A2E]/40" />
          ) : (
            <div className="w-14 h-14 rounded-full bg-[#15233A] text-[#D9B25A] font-display text-xl flex items-center justify-center">
              {nameOf(t).charAt(0).toUpperCase()}
            </div>
          )}
          <figcaption>
            <span className="card-title block text-[#15233A]">{nameOf(t)}</span>
            {t.trackOrProgramme && <span className="caption text-slate-500">{t.trackOrProgramme}</span>}
          </figcaption>
        </div>
        <blockquote className="flex-1 relative pl-7 text-[16px] text-slate-700 italic">
          <Quote className="w-5 h-5 text-[#C99A2E]/50 absolute left-0 top-0.5" />
          <ClampText
            text={quoteOf(t)}
            lines={2}
            title={nameOf(t)}
            readMoreLabel="Read full story"
          />
        </blockquote>
      </figure>
    )}
  />
);

/** Home section 4: Member Voices. */
export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ lang, onNavigate }) => {
  const items = usePublishedTestimonials();

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <h2 className="section-heading text-[#15233A]">{lang === 'hi' ? 'सदस्यों की आवाज़' : 'Member Voices'}</h2>
          <button onClick={() => onNavigate('impact')} className="btn-primary self-start sm:self-auto">
            Read More Stories
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {items.length > 0 ? (
          <TestimonialScroller items={items} />
        ) : (
          <p className="rounded-lg bg-[#FBF5E8] p-6 text-slate-600">
            {lang === 'hi' ? 'सदस्यों के अनुभव जल्द ही यहाँ होंगे।' : 'Member stories will appear here soon.'}
          </p>
        )}
      </div>
    </section>
  );
};
