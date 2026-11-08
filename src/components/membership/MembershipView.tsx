import React from 'react';
import { SITE_CONFIG } from '../../data/siteConfig';
import { MEMBERSHIP_FAQS } from '../../data/faqs';
import { Language, PageId } from '../../types';
import { TRANSLATIONS } from '../../data/i18n';
import { CTASection } from '../layout/CTASection';
import { Accordion } from '../common/Accordion';
import { HScroller } from '../common/HScroller';
import { Sparkles, ShieldCheck, CheckCircle2, Phone, MessageCircle, ArrowRight, HelpCircle, ChevronDown, ChevronUp, UserCheck, Award } from 'lucide-react';

interface MembershipViewProps {
  lang: Language;
  onNavigate: (page: PageId) => void;
  onOpenRegister: () => void;
}

export const MembershipView: React.FC<MembershipViewProps> = ({
  lang,
  onNavigate,
  onOpenRegister,
}) => {
  const benefits = [
    { title: '14-Habit Daily Activity Card (DAC)', desc: 'Physical and digital tracker for waking up at 5:45 AM, yoga, rituals, and daily reflections.' },
    { title: 'Full Access to 8 Career Tracks', desc: 'Complete 60-session mastery tracks across Accounting, GST, Digital Marketing, E-Commerce, etc.' },
    { title: 'Personalized Career Counselling', desc: "Assessment via Gardner's Multiple Intelligences Test and 1-on-1 industry roadmap sessions." },
    { title: 'Shivir & Youth Shabhā Eligibility', desc: 'Reserved admission to residential youth camps and priority seating at Chickpet assemblies.' },
    { title: 'Internship & Job Placement Support', desc: 'Direct placement referrals to trusted Jain-owned enterprises and professional corporate houses.' },
  ];

  const steps = [
    { num: '01', title: 'Register Online', desc: 'Complete the branded admission form with your age, education, and career interest.' },
    { num: '02', title: 'Pay ₹1,000 Deposit', desc: 'Submit the refundable security deposit to finalize your registration and seat.' },
    { num: '03', title: 'Orientation & Assessment', desc: "Receive your physical DAC card and take the Gardner's Intelligence Assessment." },
    { num: '04', title: 'Start Your Transformation', desc: 'Begin daily habit tracking and enroll in your chosen 60-session industry specialization.' },
  ];

  return (
    <div className="bg-[#FFFFFF] text-[#15233A] min-h-screen">
      {/* Header */}
      <section className="bg-[#15233A] text-white py-20 border-b border-[#C99A2E]/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C99A2E]/15 border border-[#C99A2E]/30 text-[#C99A2E] text-xs font-bold ">
            <UserCheck className="w-3.5 h-3.5 text-[#C99A2E]" />
            <span>Join The Change Makers</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FFFFFF] tracking-tight font-display">
            Membership in Jain Genius
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            One simple, transparent membership structure designed for youth aged 15 to 30.
            Zero hidden charges. Complete commitment to your holistic growth.
          </p>
        </div>
      </section>

      {/* Main Pricing & Deposit Card */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white border-2 border-[#C99A2E] rounded-lg p-8 sm:p-12 shadow-xl relative overflow-hidden">
          {/* Saffron Ribbon */}
          <div className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C99A2E]/15 text-[#A57D22] text-xs font-bold ">
            <ShieldCheck className="w-4 h-4 text-[#C99A2E]" />
            <span>Transparent Deposit</span>
          </div>

          <div className="space-y-6">
            <div>
              <span className="text-xs font-bold text-slate-400 block">
                Standard Youth Membership
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl sm:text-5xl font-extrabold text-[#15233A] font-display">
                  {SITE_CONFIG.membershipDeposit}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-500">
                  (Refundable Security Deposit)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 mt-2">
                Covers physical DAC monthly cards, 60 sessions across your chosen track, live shivir access,
                and member portal activation. Open to all students, working youth, and family members.
              </p>
            </div>

            {/* Categories note */}
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600">
              <span className="font-bold text-[#15233A] block mb-1">
                Categories (For organizational records only — same deposit applies):
              </span>
              <span>
                • <strong>Student (15–23):</strong> College & higher secondary aspirants.<br />
                • <strong>Individual (24–30):</strong> Early career professionals & entrepreneurs.<br />
                • <strong>Family Supporter:</strong> Families seeking integrated values for their youth.
              </span>
            </div>

            {/* Included Benefits Grid */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-[#15233A] ">
                What Your Membership Unlocks:
              </h4>
              <Accordion
                items={benefits.map((b, i) => ({ id: `benefit-${i}`, title: b.title, content: b.desc }))}
              />
            </div>

            {/* Action Bar */}
            <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                onClick={onOpenRegister}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg text-sm font-bold text-[#15233A] bg-[#C99A2E] hover:bg-[#B88A24] shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Become a Member Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3">
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C99A2E]" />
                  <span>Call Gaurav</span>
                </a>
                <a
                  href={SITE_CONFIG.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-xs font-semibold text-emerald-800 transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4-Step Membership Process */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#15233A] font-display">
              Simple 4-Step Onboarding
            </h3>
            <p className="text-xs sm:text-sm text-slate-600">
              Clear, structured steps to get admitted and receive your physical tracker:
            </p>
          </div>

          <HScroller
            ariaLabel="Onboarding steps"
            items={steps}
            getKey={(st) => st.num}
            renderItem={(st) => (
              <div className="h-full p-6 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
                <span className="w-8 h-8 rounded-lg bg-[#15233A] text-[#C99A2E] font-medium text-xs flex items-center justify-center">
                  {st.num}
                </span>
                <h4 className="card-title text-[#15233A] mt-2">{st.title}</h4>
                <p className="text-sm text-slate-600 leading-relaxed">{st.desc}</p>
              </div>
            )}
          />
        </div>
      </section>

      {/* Cohort 02 call-to-action (moved from Home) */}
      <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 md:p-8 rounded-lg bg-[#15233A] text-white flex flex-col sm:flex-row items-center justify-between gap-5 border border-[#C99A2E]/40">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="section-heading text-white">
              {lang === 'hi' ? 'क्या आप अगले बैच में शामिल होना चाहते हैं?' : 'Ready to start your transformation in Cohort 02?'}
            </h3>
            <p className="text-slate-300">
              {lang === 'hi'
                ? 'सीमित 24 स्थान। केवल 15–30 आयु वर्ग के युवाओं के लिए।'
                : 'Limited to 24 dedicated young change-makers (age 15–30) per cohort.'}
            </p>
          </div>
          <button onClick={onOpenRegister} className="btn-primary shrink-0">
            {lang === 'hi' ? 'अभी आवेदन करें' : 'Apply for Next Cohort'}
          </button>
        </div>
      </section>

      {/* Membership FAQ Accordion */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A57D22] ">
            <HelpCircle className="w-4 h-4 text-[#C99A2E]" />
            <span>Common Questions</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-[#15233A] font-display">
            Frequently Asked Questions
          </h3>
        </div>

        <Accordion
          items={MEMBERSHIP_FAQS.map((faq, idx) => ({
            id: `faq-${idx}`,
            title: lang === 'hi' ? faq.questionHi : faq.questionEn,
            content: lang === 'hi' ? faq.answerHi : faq.answerEn,
          }))}
        />
      </section>

      {/* Bottom CTA Band */}
      <CTASection lang={lang} onOpenRegister={onOpenRegister} />
    </div>
  );
};
