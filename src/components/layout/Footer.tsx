import React, { useState } from 'react';
import { Logo } from '../common/Logo';
import { PageId, Language } from '../../types';
import { SITE_CONFIG } from '../../data/siteConfig';
import { TRANSLATIONS } from '../../data/i18n';
import { useCMS } from '../../services/cmsStore';
import { Phone, Mail, MapPin, Instagram, Youtube, Send, Twitter, MessageCircle, Edit3, Plus, Heart } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  lang: Language;
  onOpenRegister: () => void;
  onOpenQuickEdit?: () => void;
}

const QUICK_LINKS: { id: PageId; en: string; hi: string; small?: boolean }[] = [
  { id: 'about', en: 'About', hi: 'परिचय' },
  { id: 'aadi-sparsh', en: 'Our Work', hi: 'हमारे कार्य' },
  { id: 'membership', en: 'Membership', hi: 'सदस्यता' },
  { id: 'contact', en: 'Contact', hi: 'संपर्क' },
  { id: 'walkthrough', en: '3D walkthrough', hi: '3D भ्रमण', small: true },
];

export const Footer: React.FC<FooterProps> = ({ onNavigate, lang, onOpenQuickEdit }) => {
  const t = TRANSLATIONS[lang];
  const { settings, isLiveEditMode, isAuthenticated } = useCMS();
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);

  const phoneDisplay = settings.phoneDisplay || SITE_CONFIG.contact.phoneDisplay;
  const phone = settings.phone || SITE_CONFIG.contact.phone;
  const email = settings.email || SITE_CONFIG.contact.email;
  const whatsappUrl = settings.whatsappCommunityUrl || settings.whatsappGroupUrl || SITE_CONFIG.contact.whatsappUrl;

  const socials = [
    { label: 'Instagram', href: settings.instagramUrl || SITE_CONFIG.social.instagram, Icon: Instagram },
    { label: 'X', href: settings.twitterUrl || SITE_CONFIG.social.twitter, Icon: Twitter },
    { label: 'Telegram', href: settings.telegramUrl || SITE_CONFIG.social.telegram, Icon: Send },
    { label: 'YouTube', href: settings.youtubeUrl || SITE_CONFIG.social.youtube, Icon: Youtube },
    { label: 'WhatsApp', href: whatsappUrl, Icon: MessageCircle },
  ].filter((s) => Boolean(s.href));

  const designerName = settings.designerCreditName || 'jhota';
  const designerUrl = settings.designerCreditUrl || 'https://www.instagram.com/yashjhota';

  const go = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const headingClass = 'font-sans text-[13px] font-medium text-[#D9B25A] mb-4';

  return (
    <footer
      id="main-footer"
      className={`bg-[#0E1828] text-slate-300 pt-14 pb-8 border-t border-[#C99A2E]/30 relative ${
        isLiveEditMode && isAuthenticated ? 'ring-2 ring-inset ring-[#C99A2E]/50' : ''
      }`}
    >
      {isLiveEditMode && isAuthenticated && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onOpenQuickEdit}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#C99A2E] text-[#15233A] font-medium text-xs shadow-xl cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit footer & contacts</span>
          </button>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-white/10">
          {/* 1. Logo + tagline */}
          <div className="space-y-4">
            <button onClick={() => go('home')} className="inline-flex items-center gap-3 text-left cursor-pointer">
              <Logo size="lg" />
              <span className="flex flex-col">
                <span className="text-white text-xl font-display leading-tight">Jain Genius</span>
                <span className="text-xs text-white/80">The Change Makers</span>
              </span>
            </button>
            <p className="text-sm text-slate-300 leading-relaxed max-w-xs">{SITE_CONFIG.tagline2}</p>
          </div>

          {/* 2. Quick links (collapses under + on mobile) */}
          <div>
            <button
              type="button"
              onClick={() => setQuickLinksOpen((o) => !o)}
              aria-expanded={quickLinksOpen}
              className={`${headingClass} w-full flex items-center justify-between md:cursor-default cursor-pointer`}
            >
              <span>Quick links</span>
              <Plus className={`w-4 h-4 md:hidden transition-transform ${quickLinksOpen ? 'rotate-45' : ''}`} />
            </button>
            <ul className={`space-y-2.5 text-sm ${quickLinksOpen ? 'block' : 'hidden'} md:block`}>
              {QUICK_LINKS.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => go(link.id)}
                    className={`hover:text-[#D9B25A] transition-colors cursor-pointer ${
                      link.small ? 'text-xs text-slate-400 pt-1' : 'text-slate-300'
                    }`}
                  >
                    {lang === 'en' ? link.en : link.hi}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact */}
          <div>
            <h2 className={headingClass}>Contact</h2>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#C99A2E] mt-0.5 shrink-0" />
                <span>
                  {SITE_CONFIG.contact.name},{' '}
                  <a href={`tel:+91${phone}`} className="text-white hover:text-[#D9B25A]">
                    {phoneDisplay}
                  </a>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#C99A2E] mt-0.5 shrink-0" />
                <a href={`mailto:${email}`} className="text-white hover:text-[#D9B25A] break-all">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#C99A2E] mt-0.5 shrink-0" />
                <span>{SITE_CONFIG.address}</span>
              </li>
            </ul>
          </div>

          {/* 4. Social icons */}
          <div>
            <h2 className={headingClass}>Follow us</h2>
            <ul className="flex flex-wrap gap-2.5">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 hover:border-[#C99A2E] hover:text-[#D9B25A] flex items-center justify-center transition-colors"
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright line */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-slate-400 text-center md:text-left">
          <span>
            © {new Date().getFullYear()} {SITE_CONFIG.name} — {SITE_CONFIG.tagline}. {t.allRightsReserved}
          </span>
          <span className="inline-flex items-center gap-1">
            <span>Designed and developed with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>by</span>
            <a
              href={designerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D9B25A] hover:text-white underline underline-offset-2"
            >
              {designerName}
            </a>
            <span className="mx-2 text-slate-600">·</span>
            <button onClick={() => go('admin')} className="hover:text-[#D9B25A] cursor-pointer">
              Admin
            </button>
          </span>
        </div>
      </div>
    </footer>
  );
};
