import React, { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HScrollerProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => React.Key;
  ariaLabel: string;
  /** Show one card at a time (used for testimonials). */
  oneAtATime?: boolean;
  /** Advance to the next card every N ms; pauses on hover/focus. */
  autoAdvanceMs?: number;
  /** Override card widths, e.g. for small name cards. */
  itemClassName?: string;
  tone?: 'light' | 'dark';
}

// 1.2 cards on mobile (the next one peeks in), 2 on tablet, 3 on desktop.
const DEFAULT_ITEM_WIDTH =
  'w-[80%] sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]';

/**
 * Horizontal row of cards: swipe on mobile, arrows on desktop, dots underneath.
 */
export function HScroller<T>({
  items,
  renderItem,
  getKey,
  ariaLabel,
  oneAtATime = false,
  autoAdvanceMs,
  itemClassName,
  tone = 'light',
}: HScrollerProps<T>) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pageCount, setPageCount] = useState(1);
  const [paused, setPaused] = useState(false);

  const stepWidth = useCallback(() => {
    const track = trackRef.current;
    const first = track?.firstElementChild as HTMLElement | null;
    if (!track || !first) return 1;
    const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0;
    return first.offsetWidth + gap;
  }, []);

  const measure = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const step = stepWidth();
    const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0;
    // n cards fit when n*width + (n-1)*gap <= clientWidth
    const visible = Math.max(1, Math.floor((track.clientWidth + gap + 2) / step));
    setPageCount(Math.max(1, items.length - visible + 1));
    setActive(Math.round(track.scrollLeft / step));
  }, [items.length, stepWidth]);

  useEffect(() => {
    measure();
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(measure);
    observer.observe(track);
    return () => observer.disconnect();
  }, [measure]);

  const goTo = useCallback(
    (index: number) => {
      const track = trackRef.current;
      if (!track) return;
      track.scrollTo({ left: index * stepWidth(), behavior: 'smooth' });
    },
    [stepWidth]
  );

  useEffect(() => {
    if (!autoAdvanceMs || paused || pageCount <= 1) return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const id = window.setInterval(() => {
      goTo(active + 1 >= pageCount ? 0 : active + 1);
    }, autoAdvanceMs);
    return () => window.clearInterval(id);
  }, [autoAdvanceMs, paused, pageCount, active, goTo]);

  if (items.length === 0) return null;

  const hasControls = pageCount > 1;
  const widthClass = itemClassName ?? (oneAtATime ? 'w-full' : DEFAULT_ITEM_WIDTH);
  const arrowClass =
    tone === 'dark'
      ? 'bg-white/10 text-white border-white/20 hover:bg-white/20'
      : 'bg-white text-[#15233A] border-slate-200 hover:border-[#C99A2E] shadow-sm';
  const dotIdle = tone === 'dark' ? 'bg-white/30' : 'bg-slate-300';

  return (
    <div
      className="relative"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        ref={trackRef}
        onScroll={() => {
          const track = trackRef.current;
          if (track) setActive(Math.round(track.scrollLeft / stepWidth()));
        }}
        className="flex gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-none touch-pan-x pb-1"
      >
        {items.map((item, i) => (
          <div key={getKey ? getKey(item, i) : i} className={`${widthClass} shrink-0 snap-start flex`}>
            <div className="w-full">{renderItem(item, i)}</div>
          </div>
        ))}
      </div>

      {hasControls && (
        <>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(Math.max(0, active - 1))}
            disabled={active === 0}
            className={`hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border items-center justify-center transition disabled:opacity-0 cursor-pointer ${arrowClass}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(Math.min(pageCount - 1, active + 1))}
            disabled={active >= pageCount - 1}
            className={`hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border items-center justify-center transition disabled:opacity-0 cursor-pointer ${arrowClass}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-5">
            {Array.from({ length: pageCount }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to item ${i + 1}`}
                aria-current={i === active}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === active ? 'w-6 bg-[#C99A2E]' : `w-2 ${dotIdle}`
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
