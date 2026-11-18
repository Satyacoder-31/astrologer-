import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck, Heart, Compass, Award } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cosmic-gold/15 border border-cosmic-gold/30 text-cosmic-gold text-xs font-semibold uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          The Cosmic Mission
        </div>
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
          About Krishna Cosmic Universe
        </h1>
        <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins">
          Where ancient Vedic wisdom meets cutting-edge real-time technology under the supreme grace of Lord Krishna.
        </p>
      </div>

      <div className="rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/40 p-8 md:p-12 shadow-2xl backdrop-blur-xl space-y-8 text-xs md:text-sm text-cosmic-white/80 font-poppins leading-relaxed">
        <div className="space-y-4">
          <h2 className="text-2xl font-cinzel font-bold text-cosmic-gold">Our Sacred Vision</h2>
          <p>
            Krishna Jyotish (Krishna Cosmic Universe) was conceived with a profound spiritual intention: to liberate Indian Vedic astrology from sensationalism and restore it to its pristine status as <strong>Vedanga Jyotisha</strong> — the sacred eye of the Vedas.
          </p>
          <p>
            Inspired by the wisdom of Lord Krishna as revealed in the Srimad Bhagavad Gita, we believe that destiny is not a rigid cage of fatalism, but a dynamic cosmic dialogue between planetary karma and human free will.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-cosmic-border/30">
          <div className="p-5 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 space-y-2">
            <Compass className="w-6 h-6 text-cosmic-gold" />
            <h3 className="font-cinzel font-bold text-base text-cosmic-white">Ephemeris Precision</h3>
            <p className="text-xs text-cosmic-white/70">
              We reject random generators. All birth charts use verified mathematical algorithms with Lahiri Chitrapaksha Ayanamsa.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 space-y-2">
            <ShieldCheck className="w-6 h-6 text-cosmic-peacock" />
            <h3 className="font-cinzel font-bold text-base text-cosmic-white">Strict Verification</h3>
            <p className="text-xs text-cosmic-white/70">
              Every astrologer on our platform is personally vetted by senior Vedic acharyas for credentials, ethics, and compassionate counseling.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 space-y-2">
            <Heart className="w-6 h-6 text-rose-400" />
            <h3 className="font-cinzel font-bold text-base text-cosmic-white">Krishna Devotion</h3>
            <p className="text-xs text-cosmic-white/70">
              Every consultation is anchored in reverence, positive solutions, and dharmic peace rather than superstitious fear-mongering.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-cosmic-border/30 text-center">
          <Link
            href="/astrologers"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-sm shadow-goldGlow"
          >
            Explore Verified Astrologers →
          </Link>
        </div>
      </div>
    </div>
  );
}
