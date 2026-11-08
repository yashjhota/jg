import React, { useLayoutEffect, useRef, useState } from 'react';
import { Modal } from './Modal';

interface ClampTextProps {
  text: string | string[];
  lines?: 2 | 3;
  /** Title shown at the top of the "Read more" pop-up. */
  title?: React.ReactNode;
  className?: string;
  readMoreLabel?: string;
  tone?: 'light' | 'dark';
}

const CLAMP_CLASS = { 2: 'line-clamp-2', 3: 'line-clamp-3' } as const;

/**
 * Shows text cut to 2 or 3 lines. When the text is longer, a "Read more" link
 * opens the full text in a pop-up.
 */
export const ClampText: React.FC<ClampTextProps> = ({
  text,
  lines = 2,
  title,
  className = '',
  readMoreLabel = 'Read more',
  tone = 'light',
}) => {
  const paragraphs = Array.isArray(text) ? text : [text];
  const ref = useRef<HTMLParagraphElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [open, setOpen] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setIsOverflowing(el.scrollHeight > el.clientHeight + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [text, lines]);

  // A multi-paragraph text always has more to show.
  const showReadMore = isOverflowing || paragraphs.length > 1;

  return (
    <div className={className}>
      <p ref={ref} className={CLAMP_CLASS[lines]}>
        {paragraphs[0]}
      </p>
      {showReadMore && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(true);
          }}
          className={`mt-1 text-[13px] font-medium underline underline-offset-2 cursor-pointer ${
            tone === 'dark' ? 'text-[#D9B25A] hover:text-white' : 'text-[#A57D22] hover:text-[#15233A]'
          }`}
        >
          {readMoreLabel}
        </button>
      )}
      <Modal isOpen={open} onClose={() => setOpen(false)} title={title}>
        {paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Modal>
    </div>
  );
};
