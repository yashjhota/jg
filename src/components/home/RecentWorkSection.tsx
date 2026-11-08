import React from 'react';
import { Language, NavigateFn, PageId } from '../../types';
import { HScroller } from '../common/HScroller';
import { ARTICLE_IDS, UPDATE_IMAGES } from '../../data/nov2026Content';
import { ArrowRight, PlayCircle } from 'lucide-react';

interface RecentWorkSectionProps {
  lang: Language;
  onNavigate: NavigateFn;
}

interface RecentWorkCard {
  title: string;
  line: string;
  image: string;
  imagePosition?: string;
  page: PageId;
  param?: string;
}

const CARDS: RecentWorkCard[] = [
  {
    title: 'Aadi Sparsh Ghar Ghar Abhiyaan',
    line: '13 areas. 50+ apartments. 1,500+ families joined.',
    image: UPDATE_IMAGES.sevarthi,
    page: 'aadi-sparsh',
  },
  {
    title: '3-Day Youth Shivir',
    line: 'Three days, five pillars, one more purposeful you.',
    image: UPDATE_IMAGES.youthPresenting,
    imagePosition: 'object-[50%_25%]',
    page: 'youth-shivir',
  },
  {
    title: 'Meeting with Bengaluru City Police',
    line: 'Our youth at the Commissioner of Police office.',
    image: UPDATE_IMAGES.police,
    imagePosition: 'object-[50%_70%]',
    page: 'news-article',
    param: ARTICLE_IDS.police,
  },
];

/** Home section 2: three photo cards and a link to the videos page. */
export const RecentWorkSection: React.FC<RecentWorkSectionProps> = ({ lang, onNavigate }) => (
  <section className="py-14 md:py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <h2 className="section-heading text-[#15233A]">{lang === 'hi' ? 'हमारे हालिया कार्य' : 'Our Recent Work'}</h2>
        <button onClick={() => onNavigate('videos')} className="btn-primary self-start sm:self-auto">
          <PlayCircle className="w-4 h-4" />
          Watch Our Best Videos
        </button>
      </div>

      <HScroller
        ariaLabel="Our recent work"
        items={CARDS}
        getKey={(c) => c.title}
        renderItem={(card) => (
          <button
            onClick={() => onNavigate(card.page, card.param)}
            className="group w-full h-full text-left rounded-lg overflow-hidden bg-white border border-slate-200 hover:border-[#C99A2E] hover:shadow-md transition cursor-pointer"
          >
            <div className="aspect-[4/3] overflow-hidden bg-slate-100">
              <img
                src={card.image}
                alt={card.title}
                loading="lazy"
                className={`w-full h-full object-cover ${card.imagePosition ?? ''} group-hover:scale-[1.03] transition-transform duration-300`}
              />
            </div>
            <div className="p-5">
              <h3 className="card-title text-[#15233A]">{card.title}</h3>
              <p className="mt-1 text-[15px] text-slate-600">{card.line}</p>
              <span className="mt-3 inline-flex items-center gap-1 caption font-medium text-[#A57D22]">
                {lang === 'hi' ? 'और पढ़ें' : 'Read more'}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </button>
        )}
      />
    </div>
  </section>
);
