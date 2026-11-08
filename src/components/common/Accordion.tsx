import React, { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export interface AccordionItem {
  id: string;
  title: React.ReactNode;
  content: React.ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  /** Index open on first render; omit for all closed. */
  defaultOpenIndex?: number;
  className?: string;
}

/** Title rows with a + button. Only one row is open at a time. */
export const Accordion: React.FC<AccordionProps> = ({ items, defaultOpenIndex, className = '' }) => {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenIndex !== undefined ? items[defaultOpenIndex]?.id ?? null : null
  );

  return (
    <div className={`divide-y divide-slate-200 border-y border-slate-200 ${className}`}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `${baseId}-${item.id}`;
        return (
          <div key={item.id}>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="w-full flex items-center justify-between gap-4 py-4 text-left text-[#15233A] hover:text-[#A57D22] cursor-pointer"
            >
              <span className="font-medium text-base">{item.title}</span>
              <span
                className={`w-8 h-8 shrink-0 rounded-lg border border-[#C99A2E]/50 flex items-center justify-center text-[#C99A2E] transition-transform ${
                  isOpen ? 'rotate-45' : ''
                }`}
              >
                <Plus className="w-4 h-4" />
              </span>
            </button>
            {isOpen && (
              <div id={panelId} className="pb-5 text-[15px] leading-relaxed text-slate-700">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
