import { getGoogleFormViewUrl } from '../services/googleFormService';
import type { NavItem, PageId } from '../types';

export const SITE_CONFIG = {
  name: 'Jain Genius',
  tagline: 'The Change Makers',
  subTagline: 'Build a generation of Jain change-makers who lead with values.',
  initiativeOf: 'Param Pujya Muniraj Shri Bhuvanbhushanvijayji Maharajsaheb',
  targetAge: 'Youth (Age 15–30)',
  contact: {
    name: 'Gaurav',
    phone: '9480052108',
    phoneDisplay: '+91 94800 52108',
    whatsappUrl: 'https://wa.me/919480052108?text=Jai%20Jinendra%2C%20I%20am%20interested%20in%20joining%20Jain%20Genius%20-%20The%20Change%20Makers.',
    email: 'admin@jaingenius.org',
    whatsappGroupText: 'Jain G WhatsApp Group',
    whatsappGroupUrl: 'https://chat.whatsapp.com/invite/jaingenius-tcm',
  },
  social: {
    instagram: 'https://www.instagram.com/jaingenius.tcm/',
    instagramHandle: '@jaingenius.tcm',
    youtube: 'https://www.youtube.com/@jaingenius',
    whatsappCommunity: 'https://chat.whatsapp.com/invite/jaingenius-tcm',
    telegram: 'https://t.me/Jaingeniustcm',
    twitter: 'https://x.com/JainGeniustcm',
  },
  memberPortalUrl: 'https://jaingeniusorg.lovable.app/',
  membershipDeposit: '₹1,000',
  membershipDepositNote: 'Refundable / Security Deposit towards learning resources & materials',
  // Headline numbers from the Nov 2026 brief (Aadi Sparsh, career tracks, DAC)
  stats: {
    registrations: '1,500+',
    homesVisited: '1,445+',
    careerTracks: '8',
    dacHabits: '14',
  },
  address: 'Pathshala Hall, Chickpet',
  tagline2: 'Lead with Vision. Learn with Curiosity. Lift with Purpose.',
  currentTraineesCount: 24,
  programsCount: '9+',
  eventsCount: '12+',
  googleFormUrl: getGoogleFormViewUrl(),
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', labelEn: 'Home', labelHi: 'होम' },
  { id: 'about', labelEn: 'About', labelHi: 'परिचय' },
  {
    id: 'what-we-do',
    labelEn: 'What We Do',
    labelHi: 'कार्यक्षेत्र',
    children: [
      { id: 'what-we-do', labelEn: 'Four Pillars', labelHi: 'चार स्तंभ' },
      { id: 'programmes', labelEn: 'Programmes & Career Tracks', labelHi: 'कार्यक्रम व करियर ट्रैक' },
      { id: 'skill-topics', labelEn: 'Skill Topics', labelHi: 'कौशल विषय' },
      { id: 'dac', labelEn: 'Daily Activity Card', labelHi: 'दैनिक गतिविधि कार्ड' },
      { id: 'member-journey', labelEn: 'Member Journey', labelHi: 'सदस्य यात्रा' },
    ],
  },
  {
    id: 'aadi-sparsh',
    labelEn: 'Our Work',
    labelHi: 'हमारे कार्य',
    children: [
      { id: 'aadi-sparsh', labelEn: 'Aadi Sparsh Abhiyaan', labelHi: 'आदि स्पर्श अभियान' },
      { id: 'youth-shivir', labelEn: '3-Day Youth Shivir', labelHi: '३-दिवसीय युवा शिविर' },
      { id: 'events', labelEn: 'Events', labelHi: 'आयोजन' },
      { id: 'impact', labelEn: 'Impact', labelHi: 'प्रभाव' },
    ],
  },
  {
    id: 'gallery',
    labelEn: 'Media',
    labelHi: 'मीडिया',
    children: [
      { id: 'gallery', labelEn: 'Gallery', labelHi: 'गैलरी' },
      { id: 'news', labelEn: 'News', labelHi: 'समाचार' },
      { id: 'videos', labelEn: 'Videos', labelHi: 'वीडियो' },
      { id: 'social-feed', labelEn: 'Social Feed', labelHi: 'सोशल फ़ीड' },
    ],
  },
  { id: 'membership', labelEn: 'Membership', labelHi: 'सदस्यता' },
  { id: 'contact', labelEn: 'Contact', labelHi: 'संपर्क' },
];

/** True when `page` is the item itself or one of its dropdown children. */
export function isNavItemActive(item: NavItem, page: PageId): boolean {
  if (item.children) {
    return item.children.some((c) => c.id === page) || (page === 'news-article' && item.children.some((c) => c.id === 'news'));
  }
  return item.id === page;
}
