import React, { useState, useEffect, useRef } from 'react';
import { Logo } from '../common/Logo';
import { PageId, Language, NavItem } from '../../types';
import { NAV_ITEMS, SITE_CONFIG, isNavItemActive } from '../../data/siteConfig';
import { TRANSLATIONS } from '../../data/i18n';
import { useCMS } from '../../services/cmsStore';
import { Menu, X, ExternalLink, Globe, Phone, UserCheck, ShieldCheck, Lock, ChevronDown, Plus } from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  lang: Language;
  onToggleLang: () => void;
  onOpenRegister: () => void;
}

const label = (item: NavItem, lang: Language) => (lang === 'en' ? item.labelEn : item.labelHi);

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  lang,
  onToggleLang,
  onOpenRegister,
}) => {
  const { settings, isAuthenticated } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Desktop: which dropdown is open. Mobile: which accordion group is open.
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const t = TRANSLATIONS[lang];
  const memberPortalUrl = settings.memberPortalUrl || SITE_CONFIG.memberPortalUrl;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  // Close the desktop dropdown on outside click or Escape
  useEffect(() => {
    if (!openDropdown) return;
    const onDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenDropdown(null);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [openDropdown]);

  // Open the mobile group that holds the current page
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const group = NAV_ITEMS.find((i) => i.children && isNavItemActive(i, currentPage));
    setOpenMobileGroup(group ? group.labelEn : null);
  }, [mobileMenuOpen, currentPage]);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top strip with helpline and member portal */}
      <div className="bg-[#0E1828] text-slate-300 text-xs py-1.5 px-4 border-b border-[#C99A2E]/20 relative z-50">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <span className="font-medium text-white truncate">
              {settings.bannerText ||
                (lang === 'en' ? 'Youth initiative (age 15–30)' : 'युवाओं का समग्र विकास उपक्रम (आयु १५–३० वर्ष)')}
            </span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <a
              href={`tel:${settings.phone || SITE_CONFIG.contact.phone}`}
              className="inline-flex items-center gap-1.5 text-slate-300 hover:text-[#D9B25A] transition-colors"
            >
              <Phone className="w-3 h-3 text-[#C99A2E]" />
              <span>{settings.phoneDisplay || SITE_CONFIG.contact.phoneDisplay}</span>
            </a>
            <a
              href={memberPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-[#D9B25A] hover:underline font-medium"
            >
              <span>{t.openMemberPortal}</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky header */}
      <header
        id="main-header"
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#15233A]/95 backdrop-blur-md shadow-md border-b border-[#C99A2E]/25 py-2.5'
            : 'bg-[#15233A] py-3.5 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A2E] rounded-full shrink-0 cursor-pointer"
            aria-label="Jain Genius Home"
          >
            <Logo size="md" />
            <div className="flex flex-col">
              <span className="text-white text-sm sm:text-base font-display leading-tight">Jain Genius</span>
              <span className="text-[10px] sm:text-[11px] text-white/80 hidden min-[380px]:block">
                The Change Makers
              </span>
            </div>
          </button>

          {/* Desktop navigation: 7 items, 3 with dropdowns */}
          <nav ref={navRef} aria-label="Main navigation" className="hidden xl:flex items-center gap-0.5">
            {NAV_ITEMS.map((item) => {
              const isActive = isNavItemActive(item, currentPage);
              const baseClass = `px-3 py-2 rounded-md text-[14px] font-medium whitespace-nowrap transition-colors inline-flex items-center gap-1 cursor-pointer ${
                isActive ? 'text-[#D9B25A] bg-white/10' : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`;

              if (!item.children) {
                return (
                  <button
                    key={item.labelEn}
                    onClick={() => handleNavClick(item.id)}
                    className={baseClass}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label(item, lang)}
                  </button>
                );
              }

              const isOpen = openDropdown === item.labelEn;
              return (
                <div
                  key={item.labelEn}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(item.labelEn)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button
                    type="button"
                    className={baseClass}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    onClick={() => setOpenDropdown(isOpen ? null : item.labelEn)}
                    onFocus={() => setOpenDropdown(item.labelEn)}
                  >
                    {label(item, lang)}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {isOpen && (
                    <div className="absolute left-0 top-full pt-2 min-w-[240px]">
                      <ul className="bg-white rounded-lg shadow-xl border border-slate-200 py-2">
                        {item.children.map((child) => {
                          const childActive = child.id === currentPage;
                          return (
                            <li key={child.id + child.labelEn}>
                              <button
                                onClick={() => handleNavClick(child.id)}
                                aria-current={childActive ? 'page' : undefined}
                                className={`w-full text-left px-4 py-2.5 text-[14px] transition-colors cursor-pointer ${
                                  childActive
                                    ? 'text-[#A57D22] bg-[#FBF5E8] font-medium'
                                    : 'text-[#15233A] hover:bg-[#FBF5E8]'
                                }`}
                              >
                                {label(child, lang)}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <button
              onClick={() => handleNavClick('admin')}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white border border-white/10 hover:border-white/25 cursor-pointer"
              title="Admin CMS"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-[#C99A2E]" />
              <span>Admin</span>
              {isAuthenticated && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" title="Admin active" />}
            </button>

            <button
              onClick={onToggleLang}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white border border-white/20 hover:border-[#C99A2E]/60 transition-colors cursor-pointer"
              title="Switch language (English / हिंदी)"
              aria-label="Toggle language"
            >
              <Globe className="w-3.5 h-3.5 text-[#C99A2E]" />
              <span>{lang === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>

            <a
              href={memberPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium text-white border border-[#C99A2E]/50 hover:border-[#C99A2E] transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-[#D9B25A]" />
              <span>{t.memberLogin}</span>
            </a>

            <button onClick={onOpenRegister} className="btn-primary !py-2 !px-4 !text-[13px]">
              {t.becomeMember}
            </button>
          </div>

          {/* Mobile controls */}
          <div className="flex xl:hidden items-center gap-1.5 sm:gap-2">
            <button
              onClick={onToggleLang}
              className="px-2 py-1 rounded text-xs font-medium text-[#D9B25A] border border-white/20 hover:bg-white/5 cursor-pointer"
              aria-label="Toggle language"
            >
              {lang === 'en' ? 'हिं' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 sm:p-2 rounded-md text-slate-200 hover:text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C99A2E] cursor-pointer"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-drawer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer: same structure as an accordion. Same breakpoint (xl) as the hamburger. */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-50 xl:hidden flex flex-col bg-[#15233A]"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Logo size="md" />
              <div className="flex flex-col">
                <span className="text-white text-base font-display leading-tight">Jain Genius</span>
                <span className="text-[11px] text-white/80">The Change Makers</span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg text-slate-300 hover:text-white bg-white/5 cursor-pointer"
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <nav aria-label="Mobile navigation" className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="divide-y divide-white/10">
              {NAV_ITEMS.map((item) => {
                const isActive = isNavItemActive(item, currentPage);
                if (!item.children) {
                  return (
                    <li key={item.labelEn}>
                      <button
                        onClick={() => handleNavClick(item.id)}
                        className={`w-full text-left py-3.5 text-base font-medium cursor-pointer ${
                          isActive ? 'text-[#D9B25A]' : 'text-slate-100'
                        }`}
                      >
                        {label(item, lang)}
                      </button>
                    </li>
                  );
                }
                const isOpen = openMobileGroup === item.labelEn;
                return (
                  <li key={item.labelEn}>
                    <button
                      onClick={() => setOpenMobileGroup(isOpen ? null : item.labelEn)}
                      aria-expanded={isOpen}
                      className={`w-full flex items-center justify-between py-3.5 text-base font-medium cursor-pointer ${
                        isActive ? 'text-[#D9B25A]' : 'text-slate-100'
                      }`}
                    >
                      <span>{label(item, lang)}</span>
                      <Plus className={`w-5 h-5 text-[#C99A2E] transition-transform ${isOpen ? 'rotate-45' : ''}`} />
                    </button>
                    {isOpen && (
                      <ul className="pb-3 pl-3 space-y-1">
                        {item.children.map((child) => (
                          <li key={child.id + child.labelEn}>
                            <button
                              onClick={() => handleNavClick(child.id)}
                              className={`w-full text-left py-2 px-3 rounded-lg text-[15px] cursor-pointer ${
                                child.id === currentPage
                                  ? 'bg-white/10 text-[#D9B25A]'
                                  : 'text-slate-300 hover:bg-white/5'
                              }`}
                            >
                              {label(child, lang)}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
              <li>
                <button
                  onClick={() => handleNavClick('admin')}
                  className="w-full flex items-center justify-between py-3.5 text-base font-medium text-slate-100 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#C99A2E]" />
                    Admin
                  </span>
                  {isAuthenticated ? (
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">Unlocked</span>
                  ) : (
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                  )}
                </button>
              </li>
            </ul>
          </nav>

          <div className="p-5 border-t border-white/10 bg-[#0E1828] space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegister();
              }}
              className="btn-primary w-full"
            >
              {t.becomeMember}
            </button>
            <a
              href={memberPortalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-white border-[#C99A2E]/60"
            >
              <UserCheck className="w-4 h-4 text-[#D9B25A]" />
              <span>{t.memberLogin}</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <p className="pt-1 text-center text-xs text-slate-400">
              {t.registrationHelpline}:{' '}
              <a href={`tel:${settings.phone || SITE_CONFIG.contact.phone}`} className="text-[#D9B25A] underline">
                {settings.phoneDisplay || SITE_CONFIG.contact.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
};
