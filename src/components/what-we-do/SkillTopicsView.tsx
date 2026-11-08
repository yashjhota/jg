import React from 'react';
import { TOPICS_WE_TEACH } from '../../data/topics';
import { Language, PageId, TopicItem } from '../../types';
import { PageHeader } from '../common/PageHeader';
import { HScroller } from '../common/HScroller';
import { ClampText } from '../common/ClampText';
import { CTASection } from '../layout/CTASection';
import { CheckCircle2, Clock } from 'lucide-react';

interface SkillTopicsViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
}

const StatusBadge: React.FC<{ status: TopicItem['status'] }> = ({ status }) => {
  const styles: Record<TopicItem['status'], string> = {
    Ongoing: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Completed: 'bg-blue-50 text-blue-700 border-blue-200',
    'Coming Soon': 'bg-[#FBF5E8] text-[#A57D22] border-[#C99A2E]/40',
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full caption font-medium border ${styles[status]}`}>
      {status === 'Completed' ? <CheckCircle2 className="w-3 h-3" /> : status === 'Coming Soon' ? <Clock className="w-3 h-3" /> : null}
      {status}
    </span>
  );
};

/** What We Do > Skill Topics: the "Topics We Teach" cards moved from Home. */
export const SkillTopicsView: React.FC<SkillTopicsViewProps> = ({ lang, onNavigate }) => {
  const isHi = lang === 'hi';
  return (
    <div className="bg-white text-[#15233A] min-h-screen">
      <PageHeader
        title={isHi ? 'हम क्या सिखाते हैं' : 'Topics We Teach'}
        intro={
          isHi
            ? 'व्यावहारिक कौशल जो युवाओं को आर्थिक व व्यावसायिक रूप से आत्मनिर्भर और दक्ष बनाते हैं।'
            : 'Continuous hands-on skill modules designed to make youth financially capable and professionally self-reliant.'
        }
      />

      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <HScroller
          ariaLabel="Skill topics"
          items={TOPICS_WE_TEACH}
          getKey={(t) => t.id}
          renderItem={(topic) => (
            <article className="h-full rounded-lg bg-white border border-slate-200 p-6 flex flex-col">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="caption text-slate-500">{topic.category}</span>
                <StatusBadge status={topic.status} />
              </div>
              <h2 className="card-title text-[#15233A]">{isHi ? topic.titleHi : topic.title}</h2>
              <ClampText
                text={topic.description}
                lines={2}
                title={topic.title}
                className="mt-2 text-[15px] text-slate-600"
              />
            </article>
          )}
        />
      </section>

      <CTASection lang={lang} onNavigate={onNavigate} />
    </div>
  );
};
