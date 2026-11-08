/**
 * Content added by the Nov 2026 developer brief. Used in two places:
 *  - the seed data for fresh installs (events.ts, gallery.ts, cmsStore INITIAL_NEWS_ARTICLES)
 *  - the one-click Admin migration that writes these records to the live Firestore
 *    (services/contentUpdates.ts). Fixed ids make the migration safe to run twice.
 */
import { EventItem, GalleryItem, NewsArticle } from '../types';

export const UPDATE_IMAGES = {
  map: '/images/updates/aadi-sparsh-map.jpg',
  sevarthi: '/images/updates/sevarthi-team.jpg',
  certificates: '/images/updates/certificates.jpg',
  police: '/images/updates/police-visit.jpg',
  girls: '/images/updates/girls-session.jpg',
  youthPresenting: '/images/updates/youth-presenting.jpg',
};

const SAHEBJI = 'Param Pujya Muniraj Shri Bhuvanbhushanvijayji Maharajsaheb';

export const ARTICLE_IDS = {
  aadiSparsh: 'news-aadi-sparsh',
  police: 'news-police-meeting',
  shivir: 'news-youth-shivir',
};

// Existing live event that is renamed rather than duplicated (matched by title).
export const SHIVIR_EVENT_ID = 'ev-youth-shivir';
export const LEGACY_SHIVIR_TITLE_PATTERN = /3\s*days?\s*!*\s*youth\s*workshop/i;

export const NOV2026_EVENTS: EventItem[] = [
  {
    id: 'ev-aadi-sparsh-p2',
    title: 'Aadi Sparsh Ghar Ghar Abhiyaan — Phase 2',
    date: 'From 25 Nov 2026',
    time: '',
    venue: '16 locations across Bengaluru',
    ageGroup: 'Age 15–30',
    entry: 'Volunteers welcome',
    conductor: SAHEBJI,
    status: 'upcoming',
    description: 'Phase 2 begins! Our volunteers visit 16 more locations, from Rajajinagar to Hebbal.',
    linkTo: 'contact',
    sortDate: '2026-11-25',
  },
  {
    id: 'ev-aadi-sparsh',
    title: 'Aadi Sparsh Ghar Ghar Abhiyaan',
    date: '12–30 Oct 2026',
    time: '',
    venue: '13 areas of Bengaluru; YRS stalls; Chickpet temple',
    ageGroup: 'Age 15–30',
    entry: 'Free',
    conductor: SAHEBJI,
    status: 'past',
    description: 'Our youth took Aadi Sparsh to 1,445+ homes across 13 areas, and 1,500+ people registered.',
    linkTo: 'aadi-sparsh',
    sortDate: '2026-10-30',
  },
  {
    id: 'ev-police-meeting',
    title: 'Meeting with Bengaluru City Police',
    date: '17 Oct 2026',
    time: '',
    venue: 'Commissioner of Police office, Bengaluru',
    ageGroup: 'Age 15–30',
    entry: 'Members',
    conductor: 'Jain Genius Coordination Team',
    status: 'past',
    description:
      'Jain-G youth met Joint Commissioner Shri Kuldeep Ranka to propose youth sessions on cyber safety, legal awareness and civic responsibility.',
    sortDate: '2026-10-17',
  },
  {
    id: SHIVIR_EVENT_ID,
    title: '3-Day Youth Shivir',
    date: '10–12 Oct 2026',
    time: '8:00 AM – 7:00 PM',
    venue: 'Pathshala Hall',
    ageGroup: 'Age 15–30',
    entry: 'Free',
    conductor: SAHEBJI,
    status: 'past',
    description: 'Three days on Self, Career, Health, Mind and Community.',
    linkTo: 'youth-shivir',
    sortDate: '2026-10-12',
  },
  {
    id: 'ev-jain-gen-z',
    title: 'Jain Gen-Z (Youth Special)',
    date: '12 Sep 2026',
    time: '1:00 PM – 2:00 PM',
    venue: 'Sohan Hall, Chickpet',
    ageGroup: 'Age 15–30',
    entry: 'Free',
    conductor: SAHEBJI,
    status: 'past',
    description: 'A one-hour surprise programme curated just for Jain youth and Geniuses.',
    sortDate: '2026-09-12',
  },
  {
    id: 'ev-paryushan-aradhana',
    title: 'Paryushan Aradhana — 8 Days of Pratikraman & Samvatsari Paushadh',
    date: 'Sep 2026',
    time: '',
    venue: 'Chickpet',
    ageGroup: 'Age 15–30',
    entry: 'Free',
    conductor: SAHEBJI,
    status: 'past',
    description:
      'Jain-G youth performed Pratikraman together on all eight days of Paryushan and observed Paushadh on Samvatsari.',
    sortDate: '2026-09-08',
  },
  {
    id: 'ev-bring-your-parents',
    title: 'Bring Your Parents Along — A Step Together, A Bond Forever',
    date: '6 Sep 2026',
    time: '2:15 PM onwards',
    venue: 'Shri Adinath Jain Temple',
    ageGroup: 'Age 15–30',
    entry: 'Free',
    conductor: SAHEBJI,
    status: 'past',
    description:
      'Youth came with their parents for a session on love, respect and gratitude with Sahebji — one of our most impactful gatherings.',
    sortDate: '2026-09-06',
  },
];

export const NOV2026_GALLERY: GalleryItem[] = [
  {
    id: 'gal-aadi-sparsh',
    title: 'Aadi Sparsh — Ghar Ghar Abhiyaan',
    year: '2026',
    category: 'Youth Session',
    caption: 'Our sevarthis on duty — 1,500+ families joined Aadi Sparsh.',
    url: UPDATE_IMAGES.sevarthi,
    type: 'image',
  },
  {
    id: 'gal-thank-you-volunteers',
    title: 'Thank You, Volunteers',
    year: '2026',
    category: 'Youth Session',
    caption: 'Certificates of Appreciation for our Aadi Sparsh volunteers.',
    url: UPDATE_IMAGES.certificates,
    type: 'image',
  },
  {
    id: 'gal-police-visit',
    title: 'Meeting with Bengaluru City Police',
    year: '2026',
    category: 'Youth Session',
    caption: 'Jain-G youth at the Commissioner of Police office, Bengaluru.',
    url: UPDATE_IMAGES.police,
    type: 'image',
  },
  {
    id: 'gal-girls-session',
    title: "Girls' Session",
    year: '2026',
    category: 'Youth Session',
    caption: 'Our girls in a group session.',
    url: UPDATE_IMAGES.girls,
    type: 'image',
  },
  {
    id: 'gal-youth-shivir',
    title: '3-Day Youth Shivir',
    year: '2026',
    category: 'Shivir',
    caption: 'Three days, five pillars — labs, Pravachan and presentations.',
    url: UPDATE_IMAGES.youthPresenting,
    type: 'image',
  },
];

/** Existing gallery card whose caption changes; its image stays as it is. */
export const RATRI_PRAVACHAN_TITLE_PATTERN = /ratri\s*pravachan/i;
export const RATRI_PRAVACHAN_CAPTION = 'Evening Pravachan for our boys — Sahebji on the art of living.';

export const NOV2026_NEWS: NewsArticle[] = [
  {
    id: ARTICLE_IDS.aadiSparsh,
    title: '1,500+ Families, One Heritage: Our Aadi Sparsh Ghar Ghar Abhiyaan',
    category: 'Youth Stories',
    date: '31 Oct 2026',
    readTime: '3 min read',
    author: 'Jain Genius Volunteers',
    imageUrl: UPDATE_IMAGES.map,
    featured: true,
    createdAt: '2026-10-31T10:00:00.000Z',
    excerpt:
      'From 12 to 30 October, Jain Genius volunteers knocked on doors across 13 areas of Bengaluru, met 1,445+ families and crossed 1,500 registrations.',
    fullBody: [
      'From 12 to 30 October, Jain Genius volunteers knocked on doors across Binnypete, VV Puram, Kumara Park, Chamrajpet, Jayanagar and as far as Whitefield. Across 13 areas and 50+ apartments, we met 1,445+ families and registered 900 people on the spot. Our awareness stalls at YRS and reminder calls helped the campaign cross 1,500 registrations. Our best day, at Parkwest, Binnypete, brought 165 registrations from 180+ homes. Phase 2 begins on 25 November across 16 more locations.',
    ],
  },
  {
    id: ARTICLE_IDS.police,
    title: 'Jain Genius Meets Bengaluru City Police on Youth Safety',
    category: 'Announcements',
    date: '17 Oct 2026',
    readTime: '2 min read',
    author: 'Jain Genius Coordination Team',
    imageUrl: UPDATE_IMAGES.police,
    createdAt: '2026-10-17T10:00:00.000Z',
    excerpt:
      'Jain Genius met Joint Commissioner Shri Kuldeep Ranka to propose a collaboration on youth awareness in five areas.',
    fullBody: [
      'Jain Genius met Shri Kuldeep Ranka, Joint Commissioner of Police, Bengaluru City Police, to propose a collaboration on youth awareness in five areas: cybercrime awareness, legal awareness, youth safety and substance-abuse prevention, community engagement, and leadership and civic responsibility. These build on the cyber-crime and law sessions already run at our Youth Shivir.',
    ],
  },
  {
    id: ARTICLE_IDS.shivir,
    title: 'Three Days That Made Us More Purposeful: Youth Shivir Recap',
    category: 'Youth Stories',
    date: '13 Oct 2026',
    readTime: '4 min read',
    author: 'Jain Genius Events Team',
    imageUrl: UPDATE_IMAGES.youthPresenting,
    createdAt: '2026-10-13T10:00:00.000Z',
    excerpt:
      'From 10 to 12 October, youth aged 15–30 spent three full days at Pathshala Hall, Chickpet — and ended with an individual presentation each.',
    fullBody: [
      "From 10 to 12 October, youth aged 15–30 spent three full days at Pathshala Hall, Chickpet. Mornings began with making garlands and the Nandavarta Swastik, followed by Sahebji's Pravachan. Afternoons were hands-on: we built websites with AI, learnt Excel, Photoshop and Illustrator, and heard experts on psychology, law, insurance and cyber crime. On the final day, every participant gave an individual presentation. Each evening closed with Aarti and Bhakti.",
    ],
  },
];

/** Site settings changed by the brief (section 3). */
export const NOV2026_SETTINGS = {
  instagramUrl: 'https://www.instagram.com/jaingenius.tcm/',
  instagramHandle: '@jaingenius.tcm',
  twitterUrl: 'https://x.com/JainGeniustcm',
  telegramUrl: 'https://t.me/Jaingeniustcm',
  email: 'admin@jaingenius.org',
  heroBadgeText: 'Guided by Param Pujya Muniraj Shri Bhuvanbhushanvijayji Maharajsaheb',
  heroTitle: 'Jain Genius',
  heroHighlightWord: 'The Change Makers',
  heroDescription: 'Holistic growth for Jain youth aged 15–30 — spiritual, financial, physical and mental.',
  heroPrimaryBtnText: 'Become a Member',
  heroSecondaryBtnText: 'Explore Our Work',
};
