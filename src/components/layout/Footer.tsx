import React from 'react';
import Link from 'next/link';
import { Sparkles, Shield, Heart, Lock, PhoneCall, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-black/85 border-t border-cosmic-gold/25 text-cosmic-white pt-16 pb-24 sm:pb-12 overflow-hidden z-10 backdrop-blur-2xl">
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cosmic-gold/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cosmic-peacock via-cosmic-purple to-cosmic-gold p-0.5 shadow-goldGlow">
                <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center">
                  <span className="font-devanagari text-cosmic-gold text-xl font-bold">ॐ</span>
                </div>
              </div>
              <div>
                <span className="font-cinzel font-bold text-xl tracking-wider text-cosmic-gold flex items-center gap-1.5">
                  KRISHNA JYOTISH
                  <Sparkles className="w-4 h-4 text-cosmic-saffron" />
                </span>
                <span className="block text-[10px] tracking-widest text-cosmic-white/60 uppercase">
                  Cosmic Universe Platform
                </span>
              </div>
            </div>

            <p className="text-xs md:text-sm text-cosmic-white/70 leading-relaxed font-poppins">
              A sacred sanctuary blending authentic ancient Indian Vedic astrology, Navagraha wisdom, and the divine grace of Lord Krishna with modern real-time consultation technology.
            </p>

            <div className="p-3.5 rounded-2xl bg-black/60 border border-cosmic-border/30 text-xs text-cosmic-gold/90 font-devanagari">
              &quot;यदा यदा हि धर्मस्य ग्लानिर्भवति भारत। अभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥&quot;
              <span className="block text-[10px] text-cosmic-white/60 mt-0.5 font-poppins">
                — Srimad Bhagavad Gita (4.7)
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cosmic-gold mb-4 font-cinzel">
              Consultation & Tools
            </h4>
            <ul className="space-y-2.5 text-xs text-cosmic-white/70">
              <li>
                <Link href="/astrologers" className="hover:text-cosmic-gold transition-colors">
                  Verified Astrologers
                </Link>
              </li>
              <li>
                <Link href="/astrologers/dr-amit-deshmukh" className="hover:text-cosmic-gold transition-colors">
                  Dr. Amit Deshmukh Profile
                </Link>
              </li>
              <li>
                <Link href="/consultation/chat/dr-amit-deshmukh" className="hover:text-cosmic-gold transition-colors">
                  Live Chat Consultation
                </Link>
              </li>
              <li>
                <Link href="/consultation/call/dr-amit-deshmukh" className="hover:text-cosmic-gold transition-colors">
                  Voice & Video Calling
                </Link>
              </li>
              <li>
                <Link href="/kundli" className="hover:text-cosmic-gold transition-colors">
                  Kundli Generator (D1 & D9)
                </Link>
              </li>
              <li>
                <Link href="/kundli/matching" className="hover:text-cosmic-gold transition-colors">
                  Kundli Matching (36 Gunas)
                </Link>
              </li>
              <li>
                <Link href="/wallet" className="hover:text-cosmic-gold transition-colors">
                  Wallet & Razorpay Recharge
                </Link>
              </li>
            </ul>
          </div>

          {/* Astrology & Vedic Wisdom */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cosmic-gold mb-4 font-cinzel">
              Spiritual & Daily
            </h4>
            <ul className="space-y-2.5 text-xs text-cosmic-white/70">
              <li>
                <Link href="/horoscope" className="hover:text-cosmic-gold transition-colors">
                  Daily & Yearly Horoscope
                </Link>
              </li>
              <li>
                <Link href="/panchang" className="hover:text-cosmic-gold transition-colors">
                  Location-Based Panchang
                </Link>
              </li>
              <li>
                <Link href="/krishna-wisdom" className="hover:text-cosmic-gold transition-colors">
                  Lord Krishna Sanctuary
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-cosmic-gold transition-colors">
                  12 Astrology Services
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-cosmic-gold transition-colors">
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link href="/profile" className="hover:text-cosmic-gold transition-colors">
                  My Profile & History
                </Link>
              </li>
            </ul>
          </div>

          {/* Portals & Legal */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-cosmic-gold mb-4 font-cinzel">
              Portals & Legal
            </h4>
            <ul className="space-y-2.5 text-xs text-cosmic-white/70">
              <li>
                <Link href="/astrologer-register" className="hover:text-cosmic-peacock transition-colors font-medium">
                  Join as an Astrologer
                </Link>
              </li>
              <li>
                <Link href="/astrologer-dashboard" className="hover:text-cosmic-peacock transition-colors">
                  Astrologer Portal
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-cosmic-saffron transition-colors">
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-cosmic-gold transition-colors">
                  About Krishna Jyotish
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-cosmic-gold transition-colors">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-cosmic-gold transition-colors">
                  Platform FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-cosmic-gold transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-cosmic-gold transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-cosmic-gold transition-colors">
                  Cancellation & Refund Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust & Payment Badges */}
        <div className="pt-8 border-t border-cosmic-border/30 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-cosmic-white/60">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-cosmic-gold">
              <Lock className="w-3.5 h-3.5" /> 100% Confidential Consultations
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Shield className="w-3.5 h-3.5" /> Razorpay Verified Gateway
            </span>
            <span>•</span>
            <span>Certified Vedic Ephemeris Engine</span>
          </div>

          <div className="text-center md:text-right font-poppins">
            © {new Date().getFullYear()} Krishna Cosmic Universe (Krishna Jyotish). All Sacred Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
