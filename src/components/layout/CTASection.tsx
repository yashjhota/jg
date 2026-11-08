import React from 'react';
import { Language, PageId } from '../../types';
import { SITE_CONFIG } from '../../data/siteConfig';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { useCMS } from '../../services/cmsStore';

interface CTASectionProps {
  lang: Language;
  /** When given, "Join Now" goes to the Membership page. */
  onNavigate?: (page: PageId) => void;
  /** Used instead when the page has no navigation handler (e.g. already on Membership). */
  onOpenRegister?: () => void;
  className?: string;
}

/** "Join Us": Home section 5, and the closing band on other pages. */
export const CTASection: React.FC<CTASectionProps> = ({ lang, onNavigate, onOpenRegister, className = '' }) => {
  const { settings } = useCMS();
  const isHi = lang === 'hi';
  const deposit = settings.membershipDeposit || SITE_CONFIG.membershipDeposit;
  const phone = settings.phone || SITE_CONFIG.contact.phone;
  const whatsappUrl = SITE_CONFIG.contact.whatsappUrl;

  const handleJoin = () => {
    if (onNavigate) {
      onNavigate('membership');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      onOpenRegister?.();
    }
  };

  return (
    <section className={`py-14 md:py-20 px-4 sm:px-6 lg:px-8 bg-[#FBF5E8] ${className}`}>
      <div className="max-w-5xl mx-auto rounded-lg bg-[#15233A] border border-[#C99A2E]/40 p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
        <div className="space-y-3 max-w-xl">
          <h2 className="section-heading text-white">
            {isHi ? 'क्या आप अपने जीवन को उन्नत बनाना चाहते हैं?' : 'Want to upgrade your life?'}
          </h2>
          <p className="text-lg text-slate-200">
            {isHi ? 'जैन जीनियस — द चेंज मेकर्स से जुड़ें।' : 'Join Jain Genius — The Change Makers.'}
          </p>
          <p className="caption text-[#D9B25A]">
            {isHi ? 'सदस्यता जमा राशि' : 'Membership deposit'} {deposit}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto shrink-0">
          <button onClick={handleJoin} className="btn-primary">
            Join Now
            <ArrowRight className="w-4 h-4" />
          </button>
          <a href={`tel:+91${phone}`} className="btn-secondary text-white border-white/40">
            <Phone className="w-4 h-4 text-[#D9B25A]" />
            Call {SITE_CONFIG.contact.name}
          </a>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-white border-white/40"
          >
            <MessageCircle className="w-4 h-4 text-[#25D366]" />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};
