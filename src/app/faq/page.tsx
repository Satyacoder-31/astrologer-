'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

const FAQS_LIST = [
  {
    category: 'Consultation & Billing',
    q: 'How does per-minute consultation billing work?',
    a: 'Consultations are billed from your digital wallet only while a session is actively running. For example, if an astrologer charges ₹20/min, a 5-minute consultation automatically deducts ₹100 from your wallet. Unused wallet balances never expire.',
  },
  {
    category: 'Consultation & Billing',
    q: 'What happens if my wallet balance runs low during a consultation?',
    a: 'When your remaining balance falls below 2 minutes, you will receive an in-session notification. You can tap "Quick Recharge" to add funds seamlessly without disconnecting your active chat or call.',
  },
  {
    category: 'Astrology Calculations',
    q: 'How are Kundli and planetary positions calculated?',
    a: 'Krishna Jyotish uses a real astronomical ephemeris engine following the classical Lahiri (Chitrapaksha) Ayanamsa. We calculate true Julian Day, Local Sidereal Time (RAMC), and Nirayana longitudes for the Ascendant (Lagna) and all nine Grahas.',
  },
  {
    category: 'Astrologer Quality',
    q: 'How are astrologers verified on Krishna Jyotish?',
    a: 'All astrologers undergo rigorous credential checks, verifying their degrees (e.g. Jyotish Praveena, Acharya), years of practical horary experience, and conduct test sessions before they are approved to accept client consultations.',
  },
  {
    category: 'Payments & Refunds',
    q: 'What payment methods are supported via Razorpay?',
    a: 'We support all major payment modes including UPI (Google Pay, PhonePe, Paytm, BHIM), Debit/Credit Cards (Visa, Mastercard, RuPay), Net Banking for 50+ Indian banks, and supported mobile wallets.',
  },
  {
    category: 'Privacy & Security',
    q: 'Is my birth information and consultation chat private?',
    a: 'Yes, 100%. All chats and calls are private between you and the astrologer. We never sell or share your birth data, charts, or personal inquiries with any third party.',
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-10">
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
          Frequently Asked Questions
        </h1>
        <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins">
          Everything you need to know about Vedic consultations, wallet recharges, and chart generation.
        </p>
      </div>

      <div className="space-y-4">
        {FAQS_LIST.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 overflow-hidden transition-all backdrop-blur-sm"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-cinzel font-bold text-sm md:text-base text-cosmic-white hover:text-cosmic-gold transition-colors"
              >
                <span>{faq.q}</span>
                {isOpen ? (
                  <ChevronUp className="w-5 h-5 text-cosmic-gold flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-cosmic-white/50 flex-shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs md:text-sm text-cosmic-white/80 font-poppins leading-relaxed border-t border-cosmic-border/20">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="p-6 rounded-3xl bg-cosmic-galaxy/60 border border-cosmic-border/30 text-center space-y-3">
        <div className="font-cinzel font-bold text-base text-cosmic-gold">Still have questions?</div>
        <p className="text-xs text-cosmic-white/70">
          Our round-the-clock Vedic support team is happy to assist you anytime.
        </p>
        <Link
          href="/contact"
          className="inline-block px-6 py-2.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs shadow-goldGlow"
        >
          Contact Customer Support
        </Link>
      </div>
    </div>
  );
}
