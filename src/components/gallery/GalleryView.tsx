import React, { useState } from 'react';
import { useCMS } from '../../services/cmsStore';
import { GalleryItem, Language, PageId } from '../../types';
import {
  Sparkles,
  Image,
  Video,
  Calendar,
  MapPin,
  X,
  Filter,
  Camera,
  Settings,
  Edit3,
  Trash2,
  Plus,
} from 'lucide-react';
import { CTASection } from '../layout/CTASection';
import { HScroller } from '../common/HScroller';
import { ClampText } from '../common/ClampText';

interface GalleryViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenRegister: () => void;
  onOpenEditGallery?: (item: GalleryItem) => void;
  onOpenAddGallery?: () => void;
  onShowToast?: (msg: string) => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  lang,
  onNavigate,
  onOpenRegister,
  onOpenEditGallery,
  onOpenAddGallery,
  onShowToast,
}) => {
  const { gallery, isAuthenticated, isLiveEditMode, moveToTrash } = useCMS();
  const [activeMedia, setActiveMedia] = useState<GalleryItem | null>(null);

  const categories: GalleryItem['category'][] = ['Youth Session', 'Discourse', 'Workshop', 'Shivir'];
  const activeItems = gallery.filter((item) => !item.isDeleted);
  // Newest additions first within each category
  const byCategory = categories
    .map((cat) => ({
      cat,
      items: activeItems
        .filter((item) => item.category === cat)
        .sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div className="bg-[#FFFFFF] text-[#15233A] min-h-screen">
      {/* Header */}
      <section className="bg-[#15233A] text-white py-20 border-b border-[#C99A2E]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C99A2E]/15 border border-[#C99A2E]/30 text-[#C99A2E] text-xs font-bold ">
            <Camera className="w-3.5 h-3.5 text-[#C99A2E]" />
            <span>Community Moments</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight font-display">
            Photo & Assembly Gallery
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Moments of devotion, fellowship, rigorous study, and collective growth captured across our
            Bangalore assemblies and residential youth shivirs.
          </p>
        </div>
      </section>

      {(isLiveEditMode || isAuthenticated) && (
        <section className="py-3 bg-[#FBF5E8] border-b border-[#C99A2E]/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end gap-2">
            {isLiveEditMode && isAuthenticated && (
              <button
                onClick={onOpenAddGallery}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C99A2E] text-[#15233A] text-xs font-medium cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add photo</span>
              </button>
            )}
            {isAuthenticated && (
              <button
                onClick={() => onNavigate('admin')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-[#A57D22] text-xs font-medium cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Admin manage</span>
              </button>
            )}
          </div>
        </section>
      )}

      {/* One scroller per category */}
      {byCategory.map(({ cat, items }) => (
      <section key={cat} className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading mb-6">{cat}</h2>
        <HScroller
          ariaLabel={`${cat} photos`}
          items={items}
          getKey={(item) => item.id}
          renderItem={(item) => (
            <div
              onClick={() => setActiveMedia(item)}
              className="h-full cursor-pointer group bg-white border border-slate-200/90 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              {/* Admin Live Action Ribbon */}
              {isLiveEditMode && isAuthenticated && (
                <div className="bg-[#15233A] text-white px-3 py-1.5 flex items-center justify-between text-[11px] border-b border-[#C99A2E]/30 z-20">
                  <span className="text-[#C99A2E] font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#C99A2E]" />
                    <span>Live Photo</span>
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenEditGallery?.(item);
                      }}
                      className="px-2 py-0.5 rounded bg-white/10 hover:bg-[#C99A2E] hover:text-[#15233A] text-[10px] font-semibold transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        await moveToTrash('gallery', item.id);
                        onShowToast?.(`Photo "${item.title}" moved to Trash.`);
                      }}
                      className="px-2 py-0.5 rounded bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white text-[10px] font-semibold transition-colors cursor-pointer flex items-center gap-0.5"
                    >
                      <Trash2 className="w-2.5 h-2.5" />
                      <span>Trash</span>
                    </button>
                  </div>
                </div>
              )}
              {/* Media Card Preview */}
              <div className="relative aspect-video bg-gradient-to-br from-[#15233A] to-[#1E3050] overflow-hidden">
                {item.url ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="p-6 h-full flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-md bg-[#C99A2E]/20 text-[#C99A2E] text-[11px] font-bold ">
                        {item.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-400">
                        {item.year}
                      </span>
                    </div>

                    <div className="text-white space-y-1">
                      <span className="text-[10px] text-slate-400 block font-mono ">
                        Archive Documentation
                      </span>
                      <p className="text-sm font-bold font-display line-clamp-2 text-[#FFFFFF] group-hover:text-[#C99A2E] transition-colors">
                        {item.title}
                      </p>
                    </div>
                  </div>
                )}

                {item.url && (
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-[#15233A]/80 backdrop-blur-xs text-[#C99A2E] text-[10px] font-bold border border-white/10">
                        {item.category}
                      </span>
                      <span className="text-[11px] font-semibold text-white/90 bg-black/50 px-2 py-0.5 rounded backdrop-blur-xs">
                        {item.year}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-white line-clamp-1 font-display">
                      {item.title}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-5 space-y-2">
                <ClampText text={item.caption} lines={2} title={item.title} className="text-sm text-slate-600" />
                <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#C99A2E]" />
                    {item.event || 'Pathshala Hall, Chickpet'}
                  </span>
                  <span className="text-[#A57D22] font-medium">View photo →</span>
                </div>
              </div>
            </div>
          )}
        />
      </section>
      ))}

      {/* Lightbox / Detail Modal */}
      {activeMedia && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0E1828]/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
        >
          <div className="relative w-full max-w-2xl bg-[#15233A] border border-[#C99A2E]/40 rounded-lg overflow-hidden shadow-2xl text-slate-200">
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-[#0E1828]">
              <div className="text-xs">
                <span className="text-[#C99A2E] font-bold ">{activeMedia.category}</span>
                <span className="text-slate-400 mx-2">•</span>
                <span>Assembly Year {activeMedia.year}</span>
              </div>
              <button
                onClick={() => setActiveMedia(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {activeMedia.url && (
              <div className="bg-black max-h-[60vh] overflow-hidden flex items-center justify-center">
                <img
                  src={activeMedia.url}
                  alt={activeMedia.title}
                  className="max-w-full max-h-[60vh] object-contain"
                />
              </div>
            )}

            <div className="p-8 space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#C99A2E]/20 text-[#C99A2E] text-xs font-bold inline-block">
                {activeMedia.category} Assembly Record
              </span>
              <h3 className="text-2xl font-bold text-[#FFFFFF] font-display">
                {activeMedia.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeMedia.caption}
              </p>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-[#C99A2E]" />
                  {activeMedia.event || 'Pathshala Hall, Chickpet Jain Temple'}
                </span>

                <button
                  onClick={() => {
                    setActiveMedia(null);
                    onOpenRegister();
                  }}
                  className="px-4 py-2 rounded-lg bg-[#C99A2E] text-[#15233A] font-bold hover:bg-[#C99A2E] transition-colors"
                >
                  Attend Next Assembly
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <CTASection lang={lang} onNavigate={onNavigate} />
    </div>
  );
};
