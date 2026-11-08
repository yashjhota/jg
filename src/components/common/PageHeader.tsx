import React from 'react';

interface PageHeaderProps {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  intro?: React.ReactNode;
  children?: React.ReactNode;
}

/** One consistent navy page header used by the new pages. */
export const PageHeader: React.FC<PageHeaderProps> = ({ eyebrow, title, subtitle, intro, children }) => (
  <section className="bg-[#15233A] text-white py-14 md:py-20 border-b border-[#C99A2E]/30">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
      {eyebrow && <p className="caption text-[#D9B25A] font-medium">{eyebrow}</p>}
      <h1 className="page-title text-white">{title}</h1>
      {subtitle && <p className="font-display text-lg md:text-xl text-[#D9B25A]">{subtitle}</p>}
      {intro && <div className="text-slate-300 text-base leading-relaxed">{intro}</div>}
      {children}
    </div>
  </section>
);
