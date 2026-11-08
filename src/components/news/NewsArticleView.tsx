import React from 'react';
import { useCMS } from '../../services/cmsStore';
import { Language, NavigateFn } from '../../types';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { sortNews } from './NewsView';
import { NOV2026_NEWS } from '../../data/nov2026Content';

interface NewsArticleViewProps {
  articleId: string;
  lang: Language;
  onNavigate: NavigateFn;
}

/** A single news article on its own page (#news/<id>). */
export const NewsArticleView: React.FC<NewsArticleViewProps> = ({ articleId, onNavigate }) => {
  const { news } = useCMS();
  // Fall back to the brief's articles so links work before the admin runs the Nov 2026 update.
  const article =
    news.find((a) => a.id === articleId && !a.isDeleted) ?? NOV2026_NEWS.find((a) => a.id === articleId);
  const more = sortNews(news)
    .filter((a) => a.id !== articleId)
    .slice(0, 3);

  const backLink = (
    <button
      onClick={() => onNavigate('news')}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-[#A57D22] hover:text-[#15233A] cursor-pointer"
    >
      <ArrowLeft className="w-4 h-4" />
      All news
    </button>
  );

  if (!article) {
    return (
      <div className="bg-white min-h-[60vh] max-w-3xl mx-auto px-4 sm:px-6 py-20 space-y-4">
        {backLink}
        <h1 className="page-title text-[#15233A]">Article not found</h1>
        <p className="text-slate-600">This article may have been moved or removed.</p>
      </div>
    );
  }

  return (
    <article className="bg-white text-[#15233A] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        {backLink}

        <p className="caption font-medium text-[#A57D22] mt-8">{article.category}</p>
        <h1 className="page-title mt-2">{article.title}</h1>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 caption text-slate-500">
          <span className="inline-flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" />
            By {article.author}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {article.date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {article.readTime}
          </span>
        </div>

        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt=""
            className="mt-8 w-full max-h-[70vh] object-contain rounded-lg bg-slate-100"
          />
        )}

        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-slate-800">
          {article.fullBody.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </div>

      {more.length > 0 && (
        <aside className="bg-[#FBF5E8] py-12">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="section-heading mb-6">More news</h2>
            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {more.map((a) => (
                <li key={a.id}>
                  <a
                    href={`#news/${encodeURIComponent(a.id)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate('news-article', a.id);
                    }}
                    className="block h-full rounded-lg bg-white border border-slate-200 hover:border-[#C99A2E] p-5"
                  >
                    <span className="caption text-slate-500">{a.date}</span>
                    <span className="card-title block mt-1 line-clamp-2">{a.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      )}
    </article>
  );
};
