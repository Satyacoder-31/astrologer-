'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Sparkles, Briefcase, Award, CheckCircle2, ShieldCheck, ChevronLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AstrologerRegisterPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('5+ Years');
  const [specializations, setSpecializations] = useState('Vedic Astrology, Prashna Kundali');
  const [languages, setLanguages] = useState('Hindi, English');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF62', '#087E8B'],
    });
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      <Link
        href="/astrologers"
        className="inline-flex items-center gap-1.5 text-xs text-cosmic-gold hover:underline font-semibold"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Astrologers
      </Link>

      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cosmic-peacock/15 border border-cosmic-peacock/30 text-cosmic-peacock text-xs font-semibold uppercase">
          <Briefcase className="w-3.5 h-3.5 text-cosmic-peacock" />
          Join Verified Astrologer Community
        </div>
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
          Apply as a Verified Astrologer
        </h1>
        <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins">
          Share your sacred Vedic knowledge with millions of seekers worldwide. Earn per-minute rates with automated bank payouts.
        </p>
      </div>

      <div className="rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 p-6 md:p-10 shadow-2xl backdrop-blur-xl">
        {isSubmitted ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-cinzel font-bold text-cosmic-gold">
              Application Submitted Successfully!
            </h3>
            <p className="text-xs md:text-sm text-cosmic-white/80 max-w-md mx-auto font-poppins">
              Thank you, Acharya {name}. Our Vedic Verification Board will review your credentials and interview you within 24–48 hours.
            </p>
            <div className="pt-4">
              <Link
                href="/astrologer-dashboard"
                className="px-6 py-3 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs"
              >
                Preview Astrologer Portal →
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-cosmic-gold uppercase font-semibold block mb-1">
                  Full Name with Title (e.g. Pt. / Dr. / Acharya)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acharya Rameshwar Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
                  required
                />
              </div>

              <div>
                <label className="text-cosmic-gold uppercase font-semibold block mb-1">
                  Mobile Number (WhatsApp Enabled)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-cosmic-gold uppercase font-semibold block mb-1">
                  Official Email Address
                </label>
                <input
                  type="email"
                  placeholder="acharya@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
                  required
                />
              </div>

              <div>
                <label className="text-cosmic-gold uppercase font-semibold block mb-1">
                  Total Years of Professional Practice
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
                >
                  <option value="3+ Years">3+ Years</option>
                  <option value="5+ Years">5+ Years</option>
                  <option value="8+ Years">8+ Years</option>
                  <option value="12+ Years">12+ Years</option>
                  <option value="20+ Years">20+ Years</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-cosmic-gold uppercase font-semibold block mb-1">
                  Primary Specializations
                </label>
                <input
                  type="text"
                  placeholder="e.g. Prashna Kundali, Vedic Astrology, Vastu Shastra"
                  value={specializations}
                  onChange={(e) => setSpecializations(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
                  required
                />
              </div>

              <div>
                <label className="text-cosmic-gold uppercase font-semibold block mb-1">
                  Languages Spoken
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hindi, English, Sanskrit, Marathi"
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
                  required
                />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 space-y-1">
              <span className="font-semibold text-cosmic-gold">Vedic Verification Standards:</span>
              <p className="text-cosmic-white/60">
                You will be requested to provide educational credentials (e.g. Jyotish Praveena, Acharya, or Sampradaya lineage) and conduct an assessment consultation before paid status is granted.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs uppercase tracking-wider shadow-goldGlow hover:scale-[1.01] transition-transform"
            >
              Submit Astrologer Application →
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
