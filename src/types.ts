export type Language = 'en' | 'hi';

export type PageId =
  | 'home'
  | 'about'
  | 'what-we-do'
  | 'programmes'
  | 'events'
  | 'gallery'
  | 'impact'
  | 'membership'
  | 'news'
  | 'contact'
  | 'admin'
  | 'walkthrough'
  | 'exploration'
  // Added in the Nov 2026 site update
  | 'skill-topics'
  | 'dac'
  | 'member-journey'
  | 'aadi-sparsh'
  | 'youth-shivir'
  | 'videos'
  | 'social-feed'
  | 'news-article';

/** Navigate to a page; `param` carries e.g. the article id for 'news-article'. */
export type NavigateFn = (page: PageId, param?: string) => void;

export interface NavItem {
  id: PageId;
  labelEn: string;
  labelHi: string;
  /** Present on the three dropdown menus. */
  children?: NavItem[];
}

export interface HolisticPillar {
  id: string;
  titleEn: string;
  titleHi: string;
  subtitleEn: string;
  descriptionEn: string;
  descriptionHi: string;
  keyActivitiesEn: string[];
  keyActivitiesHi: string[];
  icon: string;
}

export type TopicStatus = 'Ongoing' | 'Completed' | 'Coming Soon';

export interface TopicItem {
  id: string;
  title: string;
  titleHi: string;
  status: TopicStatus;
  category: string;
  description: string;
}

export interface MemberJourneyStep {
  step: number;
  stage: string;
  stageHi: string;
  whatHappens: string;
  whatHappensHi: string;
  badge?: string;
}

export interface DacTask {
  number: number;
  taskEn: string;
  taskHi: string;
  noteTargetEn: string;
  noteTargetHi: string;
  category: 'Spiritual' | 'Physical' | 'Intellectual' | 'Conduct & Service';
}

export interface Programme {
  id: string;
  title: string;
  titleHi: string;
  category: 'CAREER / FINANCE / PROFESSIONAL' | 'DIGITAL / CREATIVE' | 'HEALTH / WELLNESS' | 'SPIRITUAL / PERSONAL GROWTH';
  whatWasCovered: string;
  formatReach: string;
  duration?: string;
  participants?: string;
  status: 'Ongoing' | 'Completed' | 'Upcoming' | 'Coming Soon';
  outcomes?: string[];
  imagePlaceholderText: string;
}

export interface CareerTrack {
  id: number;
  title: string;
  coreSkills: string[];
  foundation: string[];
  interviewPrep: string[];
  suggestedCertifications: string[];
}

export interface EventItem {
  id: string;
  title: string;
  subtitle?: string;
  date: string;
  time: string;
  venue: string;
  ageGroup: string;
  entry: string;
  conductor: string;
  status: 'upcoming' | 'past';
  description: string;
  keyTopics?: string[];
  posterTheme?: string;
  posterImage?: string;
  recap?: string;
  googleFormUrl?: string;
  /** Page holding the full story, e.g. 'aadi-sparsh'. The card shows a "Read the full story" link. */
  linkTo?: PageId;
  /** ISO date used only for ordering when `date` is free text such as "Sep 2026". */
  sortDate?: string;
  createdAt?: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
  deletedBy?: string;
}

export type VideoKind = 'youtube' | 'instagram' | 'mp4' | '';

/** One of the five fixed slots on Media > Videos. */
export interface VideoSlot {
  slotId: number;
  url: string;
  kind: VideoKind;
  title: string;
  description: string;
  editedBy: string;
  isFeatured?: boolean;
  /** 9:16 video (reel / short / phone MP4). Kept vertical, never cropped to landscape. */
  vertical?: boolean;
  updatedAt?: string;
}

export interface TestimonialSlot {
  slotId: number;
  label: string;
  gender: 'boy' | 'girl';
  status: 'to_supply' | 'ready';
  studentName?: string;
  name?: string;
  trackOrProgramme?: string;
  experienceText?: string;
  quote?: string;
  avatarUrl?: string;
  cohort?: string;
  yearOrCohort?: string;
  createdAt?: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
  deletedBy?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  year: string;
  category: 'Shivir' | 'Workshop' | 'Discourse' | 'Youth Session';
  caption: string;
  url?: string;
  type?: 'image' | 'video';
  event?: string;
  createdAt?: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
  deletedBy?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  readTime: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  category: 'Philosophy' | 'Career' | 'Youth Stories' | 'Announcements';
  date: string;
  readTime: string;
  excerpt: string;
  fullBody: string[];
  author: string;
  imageUrl?: string;
  featured?: boolean;
  createdAt?: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
  deletedBy?: string;
}

export interface SiteSettings {
  bannerEnabled: boolean;
  bannerText: string;
  bannerLinkText: string;
  bannerLinkPage: PageId;
  phone: string;
  phoneDisplay: string;
  email: string;
  whatsappGroupUrl: string;
  whatsappCommunityUrl?: string;
  membershipDeposit: string;
  currentTraineesCount: number;
  programsCount: string;
  eventsCount: string;
  googleFormUrl: string;
  tagline: string;
  subTagline: string;
  initiativeOf: string;
  // Hero section live customization fields
  heroTitle?: string;
  heroHighlightWord?: string;
  heroDescription?: string;
  heroBadgeText?: string;
  heroTargetAge?: string;
  heroPrimaryBtnText?: string;
  heroSecondaryBtnText?: string;
  // Social media handles & URLs for public viewing
  instagramUrl: string;
  instagramHandle: string;
  youtubeUrl: string;
  youtubeHandle?: string;
  telegramUrl: string;
  twitterUrl?: string;
  linkedinUrl?: string;
  memberPortalUrl?: string;
  // Attribution & Venue details
  designerCreditName?: string;
  designerCreditUrl?: string;
  address?: string;
  targetAge?: string;
}

export type SocialPlatform =
  | 'instagram'
  | 'youtube'
  | 'twitter'
  | 'linkedin'
  | 'facebook'
  | 'telegram'
  | 'whatsapp';

export interface SocialPost {
  id: string;
  platform: SocialPlatform;
  postUrl: string;
  caption: string;
  authorName: string;
  authorHandle?: string;
  date: string;
  imageUrl?: string;
  videoEmbedUrl?: string;
  likesOrEngagement?: string;
  tags?: string[];
  isPinned?: boolean;
  isPublished?: boolean;
  createdAt?: string;
  isDeleted?: boolean;
  deletedAt?: string | null;
  deletedBy?: string;
}

export interface AdminActivityLog {
  id: string;
  timestamp: string;
  action: 'create' | 'update' | 'delete' | 'reset' | 'import' | 'auth';
  module: 'events' | 'gallery' | 'news' | 'testimonials' | 'settings' | 'social' | 'videos' | 'system';
  description: string;
}

export interface FAQItem {
  questionEn: string;
  questionHi: string;
  answerEn: string;
  answerHi: string;
  category: string;
}

export interface TrashItem {
  id: string;
  module: 'social' | 'events' | 'gallery' | 'news' | 'testimonials';
  title: string;
  subtitle?: string;
  deletedAt: string;
  platform?: SocialPlatform;
  originalData: any;
}

