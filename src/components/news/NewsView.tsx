import React, { useState } from 'react';
import { useCMS } from '../../services/cmsStore';
import { Language, NavigateFn, NewsArticle } from '../../types';
import { Search, Calendar, Clock, ArrowRight, Settings } from 'lucide-react';
import { CTASection } from '../layout/CTASection';
import { PageHeader } from '../common/PageHeader';
import { HScroller } from '../common/HScroller';

interface NewsViewProps {
  lang: Language;
  onNavigate: NavigateFn;
  onOpenRegister: () => void;
}

const articleTime = (art: NewsArticle) => {
  const fromDate = new Date(art.date).getTime();
  if (!isNaN(fromDate)) return fromDate;
  return new Date(art.createdAt || 0).getTime();
};

/** Newest first, ignoring deleted articles. */
export const sortNews = (list: NewsArticle[]) =>
  list.filter((a) => !a.isDeleted).sort((a, b) => articleTime(b) - articleTime(a));

export const NewsView: React.FC<NewsViewProps> = ({ lang, onNavigate }) => {
  const { news, isAuthenticated } = useCMS();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Youth Stories', 'Announcements', 'Philosophy', 'Career'];
  const query = searchQuery.toLowerCase();

  const articles = sortNews(news).filter((art) => {
    const matchesCategory = selectedCategory === 'All' || art.category === selectedCategory;
    const matchesSearch = art.title.toLowerCase().includes(query) || art.excerpt.toLowerCase().includes(query);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white text-[#15233A] min-h-screen">
      <PageHeader
        title={lang === 'hi' ? 'समाचार' : 'News'}
        intro="Stories from our youth, event recaps and announcements."
      />

      {/* Category filter and search */}
      <section className="py-4 bg-[#FBF5E8] border-b border-[#C99A2E]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-none touch-pan-x">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-sm font-medium border shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#15233A] text-white border-[#15233A]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#C99A2E]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles…"
                aria-label="Search articles"
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-white border border-slate-200 text-sm focus:outline-none focus:border-[#C99A2E]"
              />
            </div>
            {isAuthenticated && (
              <button
                onClick={() => onNavigate('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-slate-200 text-[#A57D22] text-xs font-medium shrink-0 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                Admin post
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Article cards: title + 2-line summary; the full article opens on its own page */}
      <section className="py-14 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {articles.length === 0 ? (
          <p className="text-slate-500">No articles match your search.</p>
        ) : (
          <HScroller
            key={selectedCategory + query}
            ariaLabel="News articles"
            items={articles}
            getKey={(art) => art.id}
            renderItem={(art) => (
              <a
                href={`#news/${encodeURIComponent(art.id)}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('news-article', art.id);
                }}
                className="group h-full flex flex-col rounded-lg bg-white border border-slate-200 hover:border-[#C99A2E] hover:shadow-md overflow-hidden transition"
              >
                {art.imageUrl && (
                  <div className="aspect-video bg-slate-100 overflow-hidden">
                    <img
                      src={art.imageUrl}
                      alt=""
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 caption text-slate-500">
                    <span className="font-medium text-[#A57D22]">{art.category}</span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {art.date}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {art.readTime}
                    </span>
                  </div>
                  <h2 className="card-title mt-2 text-[#15233A] group-hover:text-[#A57D22]">{art.title}</h2>
                  <p className="mt-2 text-[15px] text-slate-600 line-clamp-2">{art.excerpt}</p>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1 text-sm font-medium text-[#A57D22]">
                    Read article
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </a>
            )}
          />
        )}
      </section>

      <CTASection lang={lang} onNavigate={onNavigate} />
    </div>
  );
};
