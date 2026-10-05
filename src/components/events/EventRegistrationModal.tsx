import React, { useState, useEffect } from 'react';
import { EventItem, Language } from '../../types';
import { normalizeGoogleFormEmbedUrl, getGoogleFormViewUrl } from '../../services/googleFormService';
import { SITE_CONFIG } from '../../data/siteConfig';
import {
  X,
  ExternalLink,
  Calendar,
  Clock,
  MapPin,
  User,
  ShieldCheck,
  Loader2,
  MessageCircle,
  Sparkles,
} from 'lucide-react';

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: EventItem | null;
  lang?: Language;
}

export const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({
  isOpen,
  onClose,
  event,
  lang = 'en',
}) => {
  const [iframeLoaded, setIframeLoaded] = useState(false);

  // Close on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Reset iframe loading state when event changes
  useEffect(() => {
    if (isOpen) {
      setIframeLoaded(false);
    }
  }, [isOpen, event?.id, event?.googleFormUrl]);

  if (!isOpen || !event) return null;

  const rawUrl = event.googleFormUrl || getGoogleFormViewUrl();
  const embedUrl = normalizeGoogleFormEmbedUrl(rawUrl);
  const directUrl = rawUrl.includes('?') ? rawUrl : `${rawUrl}?usp=sf_link`;

  const whatsappMessage = encodeURIComponent(
    `Jai Jinendra,\n\nI want to inquire about seat reservation for the event: "${event.title}" conducted by ${event.conductor} on ${event.date} at ${event.venue}.`
  );
  const whatsappUrl = `https://wa.me/91${SITE_CONFIG.contact.phone}?text=${whatsappMessage}`;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="event-reg-modal-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#081320]/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl bg-[#0C1B2A] border border-[#E59A1E]/40 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden text-slate-200 flex flex-col max-h-[92vh] my-auto">
        {/* Header Bar */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-white/10 bg-[#0A1622] flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1 font-semibold text-[#F3A628] bg-[#E59A1E]/15 border border-[#E59A1E]/30 px-2.5 py-0.5 rounded-full">
                <Sparkles className="w-3 h-3 text-[#E59A1E]" />
                <span>{lang === 'hi' ? 'सीट आरक्षण फ़ॉर्म' : 'Seat Reservation Form'}</span>
              </span>
              <span className="text-slate-400 hidden sm:inline">·</span>
              <span className="text-slate-300 text-xs hidden sm:inline">{event.entry}</span>
            </div>

            <h2
              id="event-reg-modal-title"
              className="text-base sm:text-lg md:text-xl font-bold font-display text-white truncate"
            >
              {event.title}
            </h2>

            {/* Quick Event Summary Strip */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300 pt-0.5">
              {event.conductor && (
                <div className="flex items-center gap-1 text-amber-200/90 font-medium">
                  <User className="w-3.5 h-3.5 text-[#E59A1E]" />
                  <span>{event.conductor}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-[#E59A1E]" />
                <span>{event.date}</span>
              </div>
              {event.time && (
                <div className="flex items-center gap-1 text-slate-300 hidden sm:flex">
                  <Clock className="w-3.5 h-3.5 text-[#E59A1E]" />
                  <span>{event.time}</span>
                </div>
              )}
              {event.venue && (
                <div className="flex items-center gap-1 text-slate-300 truncate max-w-xs hidden md:flex">
                  <MapPin className="w-3.5 h-3.5 text-[#E59A1E] shrink-0" />
                  <span className="truncate">{event.venue}</span>
                </div>
              )}
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2 shrink-0 pt-1">
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-medium border border-white/10 transition-colors"
              title="Open Google Form in a new tab"
            >
              <span>{lang === 'hi' ? 'अलग टैब में खोलें' : 'Open in New Tab'}</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#E59A1E]" />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close registration modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Embedded Google Form Body */}
        <div className="relative flex-1 bg-slate-900 overflow-hidden flex flex-col min-h-[460px] sm:min-h-[540px]">
          {/* Loading Skeleton */}
          {!iframeLoaded && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0C1B2A] z-10 space-y-3 p-6 text-center">
              <Loader2 className="w-8 h-8 text-[#E59A1E] animate-spin" />
              <p className="text-sm font-semibold text-white">
                {lang === 'hi' ? 'गूगल फ़ॉर्म लोड हो रहा है...' : 'Loading Google Form for this event...'}
              </p>
              <p className="text-xs text-slate-400 max-w-sm">
                {lang === 'hi'
                  ? 'कृपया प्रतीक्षा करें, आपकी जानकारी सीधे सुरक्षित गूगल फ़ॉर्म में दर्ज होगी।'
                  : 'Please wait a moment while the official registration questionnaire loads.'}
              </p>
            </div>
          )}

          {/* Embedded Google Form Iframe */}
          <iframe
            src={embedUrl}
            title={`Registration Form for ${event.title}`}
            onLoad={() => setIframeLoaded(true)}
            className="w-full flex-1 border-0 bg-white min-h-[460px] sm:min-h-[540px]"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          >
            Loading registration form...
          </iframe>
        </div>

        {/* Footer Bar */}
        <div className="px-5 py-3 sm:px-6 sm:py-3.5 border-t border-white/10 bg-[#0A1622] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2 text-slate-400 text-[11px] sm:text-xs text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              {lang === 'hi'
                ? 'फ़ॉर्म सबमिट करने पर आपकी सीट सीधे आयोजकों के पास दर्ज होगी।'
                : 'Responses submit directly to the event organizer\'s official Google Form & Sheets.'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={directUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:hidden inline-flex items-center gap-1 text-xs text-[#F3A628] hover:underline"
            >
              <span>{lang === 'hi' ? 'अलग विंडो में खोलें' : 'Open in New Window'}</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-medium transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>{lang === 'hi' ? 'व्हाट्सएप सहायता' : 'WhatsApp Support'}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
