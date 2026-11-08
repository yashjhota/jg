import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  maxWidthClass?: string;
}

/** Generic pop-up: Esc or a backdrop click closes it, and page scroll is locked while open. */
export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidthClass = 'max-w-xl',
}) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    closeRef.current?.focus();
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#15233A]/70 backdrop-blur-sm"
      onClick={(e) => {
        // Don't let the click reach a clickable card the modal was opened from.
        e.stopPropagation();
        onClose();
      }}
    >
      <div
        className={`relative w-full ${maxWidthClass} max-h-[85vh] overflow-y-auto bg-white rounded-lg shadow-2xl text-[#15233A]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white flex items-start justify-between gap-4 px-6 pt-5 pb-3 border-b border-slate-100">
          <div className="font-display text-xl leading-tight">{title}</div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-slate-500 hover:text-[#15233A] hover:bg-slate-100 shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 py-5 text-base leading-relaxed text-slate-700 space-y-3">{children}</div>
      </div>
    </div>
  );
};
