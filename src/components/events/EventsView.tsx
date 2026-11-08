import React, { useState } from 'react';
import { useCMS, autoSyncEventStatuses } from '../../services/cmsStore';
import { EventItem, Language, PageId } from '../../types';
import { SITE_CONFIG } from '../../data/siteConfig';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Phone,
  Sparkles,
  Filter,
  QrCode,
  ArrowRight,
  X,
  Settings,
  Edit3,
  Trash2,
  Plus,
} from 'lucide-react';

import { EventRegistrationModal } from './EventRegistrationModal';
import { HScroller } from '../common/HScroller';
import { ClampText } from '../common/ClampText';

const REGULAR_SESSIONS = [
  'Ratri Pravachan for boys',
  'TTS session for girls',
  'Sunday Youth Shabhās, 2:15 – 4:00 PM',
];

/** Link text for cards that point to a page holding the full story. */
const linkLabel = (page: PageId) =>
  page === 'contact' ? 'Join as a volunteer' : page === 'youth-shivir' ? 'Read more' : 'Read the full story';

interface EventsViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenRegister: (eventTitle?: string) => void;
  onOpenEditEvent?: (ev: EventItem) => void;
  onOpenAddEvent?: () => void;
  onShowToast?: (msg: string) => void;
}

export const EventsView: React.FC<EventsViewProps> = ({
  lang,
  onNavigate,
  onOpenRegister,
  onOpenEditEvent,
  onOpenAddEvent,
  onShowToast,
}) => {
  const { events, isAuthenticated, isLiveEditMode, moveToTrash, sortEventsByDate } = useCMS();
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [registeringEvent, setRegisteringEvent] = useState<EventItem | null>(null);

  // Auto-sync completed events from upcoming to past
  const activeEvents = autoSyncEventStatuses(
    events.filter((ev) => !ev.isDeleted),
    true
  );

  const upcomingEvents = sortEventsByDate(activeEvents.filter((ev) => ev.status === 'upcoming'), 'upcoming');
  // Past events: newest first
  const pastEvents = sortEventsByDate(activeEvents.filter((ev) => ev.status === 'past'), 'past');

  return (
    <div className="bg-[#FFFFFF] text-[#15233A] min-h-screen">
      {/* Header */}
      <section className="bg-[#15233A] text-white py-20 border-b border-[#C99A2E]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C99A2E]/15 border border-[#C99A2E]/30 text-[#C99A2E] text-xs font-bold ">
            <Calendar className="w-3.5 h-3.5 text-[#C99A2E]" />
            <span>Community Assemblies</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight font-display">
            Events & Youth Shabhās
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            Real youth gatherings addressing life's deepest emotional, philosophical, and national questions.
            Conducted at Pathshala Hall, Chickpet Jain Temple, Bangalore.
          </p>
        </div>
      </section>

      {/* Regular sessions strip */}
      <section className="py-4 bg-[#FBF5E8] border-b border-[#C99A2E]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <p className="text-[15px] text-[#15233A]">
            <span className="font-medium text-[#A57D22] mr-2">Regular sessions:</span>
            {REGULAR_SESSIONS.join(' · ')}
          </p>
          <div className="flex items-center gap-2 shrink-0">
            {isLiveEditMode && isAuthenticated && (
              <button
                onClick={onOpenAddEvent}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#C99A2E] text-[#15233A] text-xs font-medium cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add event</span>
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
        </div>
      </section>

      {/* Upcoming and Past scrollers */}
      {[
        { key: 'upcoming', title: `Upcoming (${upcomingEvents.length})`, list: upcomingEvents },
        { key: 'past', title: `Past (${pastEvents.length})`, list: pastEvents },
      ].map((group) => (
      <section key={group.key} className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-heading mb-6">{group.title}</h2>
        {group.list.length === 0 ? (
          <p className="text-slate-500">No events here yet.</p>
        ) : (
        <HScroller
          ariaLabel={`${group.key} events`}
          items={group.list}
          getKey={(ev) => ev.id}
          renderItem={(ev) => {
            const isUpcoming = ev.status === 'upcoming';
            return (
              <div
                className="h-full bg-white border border-slate-200/90 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                {/* Admin Live Action Ribbon */}
                {isLiveEditMode && isAuthenticated && (
                  <div className="bg-[#15233A] text-white px-3 py-1.5 flex items-center justify-between text-[11px] border-b border-[#C99A2E]/30">
                    <span className="text-[#C99A2E] font-bold flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-[#C99A2E]" />
                      <span>Live Event</span>
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => onOpenEditEvent?.(ev)}
                        className="px-2 py-0.5 rounded bg-white/10 hover:bg-[#C99A2E] hover:text-[#15233A] text-[10px] font-semibold transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          await moveToTrash('events', ev.id);
                          onShowToast?.(`Event "${ev.title}" moved to Trash.`);
                        }}
                        className="px-2 py-0.5 rounded bg-red-500/20 hover:bg-red-600 text-red-300 hover:text-white text-[10px] font-semibold transition-colors cursor-pointer flex items-center gap-0.5"
                      >
                        <Trash2 className="w-2.5 h-2.5" />
                        <span>Trash</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Event Poster Card Banner */}
                <div className="bg-gradient-to-br from-[#15233A] via-[#1E3050] to-[#1E3050] p-6 text-white relative overflow-hidden">
                  {ev.posterImage && (
                    <div className="mb-4 rounded-lg overflow-hidden aspect-video border border-white/15 bg-black/40">
                      <img
                        src={ev.posterImage}
                        alt={ev.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                        isUpcoming
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : 'bg-white/10 text-slate-300'
                      }`}
                    >
                      {isUpcoming ? 'Upcoming' : 'Concluded'}
                    </span>
                    <span className="text-xs font-bold text-[#C99A2E] bg-[#C99A2E]/20 px-2.5 py-0.5 rounded-md">
                      {ev.entry}
                    </span>
                  </div>

                  <h3 className="card-title text-[#FFFFFF]">
                    {ev.title}
                  </h3>
                  <p className="text-xs text-[#C99A2E] font-medium mt-1">
                    Conducted by {ev.conductor}
                  </p>

                  {/* Date & Time pills */}
                  <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#C99A2E]" />
                      {ev.date}
                    </span>
                    {ev.time && (
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#C99A2E]" />
                        {ev.time}
                      </span>
                    )}
                  </div>
                </div>

                {/* Event Details Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    <ClampText text={ev.description} lines={2} title={ev.title} className="text-sm text-slate-600" />
                    {ev.linkTo && (
                      <button
                        onClick={() => onNavigate(ev.linkTo as PageId)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-[#A57D22] hover:text-[#15233A] cursor-pointer"
                      >
                        {linkLabel(ev.linkTo)}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <div className="space-y-2 pt-2 text-xs text-slate-700">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-[#C99A2E] shrink-0 mt-0.5" />
                        <span className="leading-snug">{ev.venue}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#C99A2E] shrink-0" />
                        <span>Eligible Age Group: {ev.ageGroup}</span>
                      </div>
                    </div>
                  </div>

                  {isUpcoming && !ev.linkTo && (
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedEvent(ev)}
                      className="text-xs font-bold text-[#15233A] hover:text-[#A57D22] flex items-center gap-1"
                    >
                      <QrCode className="w-4 h-4 text-[#C99A2E]" />
                      <span>View Pass QR</span>
                    </button>

                    <button
                      onClick={() => setRegisteringEvent(ev)}
                      className="px-4 py-2 rounded-lg text-xs font-bold text-[#15233A] bg-[#C99A2E] hover:bg-[#C99A2E] transition-colors cursor-pointer shadow-xs"
                      title={`Reserve Seat for ${ev.title}`}
                    >
                      Reserve Seat
                    </button>
                  </div>
                  )}
                </div>
              </div>
            );
          }}
        />
        )}
      </section>
      ))}

      {/* QR Code & Detail Modal */}
      {selectedEvent && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 overflow-y-auto bg-[#0E1828]/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-md bg-[#15233A] border border-[#C99A2E]/50 rounded-lg p-6 sm:p-8 shadow-2xl text-slate-200 text-center space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-bold text-[#C99A2E] ">
                Event Pass & Verification
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <h3 className="text-xl font-bold text-[#FFFFFF] font-display">
                {selectedEvent.title}
              </h3>
              <p className="text-xs text-[#C99A2E] mt-0.5">
                {selectedEvent.date} • {selectedEvent.time}
              </p>
            </div>

            {/* Generated SVG QR Code representation */}
            <div className="p-4 bg-white rounded-lg inline-block mx-auto border-2 border-[#C99A2E]">
              <svg className="w-36 h-36 mx-auto" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                <rect x="10" y="10" width="25" height="25" fill="#15233A" />
                <rect x="15" y="15" width="15" height="15" fill="white" />
                <rect x="18" y="18" width="9" height="9" fill="#15233A" />

                <rect x="65" y="10" width="25" height="25" fill="#15233A" />
                <rect x="70" y="15" width="15" height="15" fill="white" />
                <rect x="73" y="18" width="9" height="9" fill="#15233A" />

                <rect x="10" y="65" width="25" height="25" fill="#15233A" />
                <rect x="15" y="70" width="15" height="15" fill="white" />
                <rect x="18" y="73" width="9" height="9" fill="#15233A" />

                <rect x="42" y="12" width="6" height="20" fill="#15233A" />
                <rect x="52" y="24" width="8" height="8" fill="#C99A2E" />
                <rect x="42" y="42" width="16" height="16" fill="#15233A" />
                <rect x="46" y="46" width="8" height="8" fill="#C99A2E" />
                <rect x="65" y="45" width="10" height="6" fill="#15233A" />
                <rect x="80" y="55" width="10" height="20" fill="#15233A" />
                <rect x="42" y="70" width="18" height="18" fill="#15233A" />
                <rect x="65" y="80" width="20" height="10" fill="#15233A" />
              </svg>
              <span className="text-[10px] font-bold text-[#15233A] block mt-1 ">
                Scan for Spot Entry
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Venue: {selectedEvent.venue}. Entry is {selectedEvent.entry} for youth {selectedEvent.ageGroup}.
              For seating confirmation, reach Gaurav at{' '}
              <a href={`tel:${SITE_CONFIG.contact.phone}`} className="text-[#C99A2E] underline">
                {SITE_CONFIG.contact.phoneDisplay}
              </a>
            </p>

            <button
              onClick={() => {
                const ev = selectedEvent;
                setSelectedEvent(null);
                setRegisteringEvent(ev);
              }}
              className="w-full py-3 rounded-lg bg-[#C99A2E] text-[#15233A] text-xs font-bold hover:bg-[#C99A2E] transition-colors cursor-pointer"
            >
              Confirm Admission
            </button>
          </div>
        </div>
      )}

      {/* Event-Specific Google Form Registration Modal */}
      <EventRegistrationModal
        isOpen={!!registeringEvent}
        onClose={() => setRegisteringEvent(null)}
        event={registeringEvent}
        lang={lang}
      />
    </div>
  );
};
