'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { calculateAshtakootMilan, generateKundli } from '@/lib/astrology/engine';
import { Heart, Sparkles, ChevronLeft, ShieldCheck, AlertTriangle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function KundliMatchingPage() {
  const [boyName, setBoyName] = useState('Rahul');
  const [boyDob, setBoyDob] = useState('1996-08-25');
  const [boyTob, setBoyTob] = useState('06:30');

  const [girlName, setGirlName] = useState('Priyanka');
  const [girlDob, setGirlDob] = useState('1998-11-12');
  const [girlTob, setGirlTob] = useState('14:45');

  const [matchResult, setMatchResult] = useState<any | null>(null);

  const handleMatch = (e: React.FormEvent) => {
    e.preventDefault();

    const boyKundli = generateKundli({ dob: boyDob, tob: boyTob, latitude: 28.6139, longitude: 77.2090 });
    const girlKundli = generateKundli({ dob: girlDob, tob: girlTob, latitude: 28.6139, longitude: 77.2090 });

    const boyMoon = boyKundli.planets.find((p) => p.name === 'Moon');
    const girlMoon = girlKundli.planets.find((p) => p.name === 'Moon');

    const result = calculateAshtakootMilan(
      boyMoon?.longitude || 0,
      girlMoon?.longitude || 0
    );

    setMatchResult(result);

    if (result.totalScore >= 24) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF62', '#E63946', '#E6A64A'],
      });
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      {/* Back Link */}
      <Link
        href="/kundli"
        className="inline-flex items-center gap-1.5 text-xs text-cosmic-gold hover:underline font-semibold"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Kundli Generator
      </Link>

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-semibold uppercase">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          Vedic Ashtakoot 36 Guna Milan
        </div>
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
          Kundli Marriage Compatibility
        </h1>
        <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins">
          Check marital bliss, psychological temperament, and genetic harmony based on classical Jyotish Shastra.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleMatch} className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 shadow-2xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Groom Box */}
          <div className="p-5 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-peacock/40 space-y-3">
            <h3 className="font-cinzel font-bold text-base text-cosmic-peacock">
              Groom Particulars (Var)
            </h3>
            <div>
              <label className="text-[10px] text-cosmic-white/60 uppercase">Name</label>
              <input
                type="text"
                value={boyName}
                onChange={(e) => setBoyName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-cosmic-galaxy border border-cosmic-border/30 text-xs text-cosmic-white outline-none"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-cosmic-white/60 uppercase">Date of Birth</label>
              <input
                type="date"
                value={boyDob}
                onChange={(e) => setBoyDob(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-cosmic-galaxy border border-cosmic-border/30 text-xs text-cosmic-white outline-none"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-cosmic-white/60 uppercase">Time of Birth</label>
              <input
                type="time"
                value={boyTob}
                onChange={(e) => setBoyTob(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-cosmic-galaxy border border-cosmic-border/30 text-xs text-cosmic-white outline-none"
                required
              />
            </div>
          </div>

          {/* Bride Box */}
          <div className="p-5 rounded-2xl bg-cosmic-midnight/80 border border-rose-500/40 space-y-3">
            <h3 className="font-cinzel font-bold text-base text-rose-300">
              Bride Particulars (Kanya)
            </h3>
            <div>
              <label className="text-[10px] text-cosmic-white/60 uppercase">Name</label>
              <input
                type="text"
                value={girlName}
                onChange={(e) => setGirlName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-cosmic-galaxy border border-cosmic-border/30 text-xs text-cosmic-white outline-none"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-cosmic-white/60 uppercase">Date of Birth</label>
              <input
                type="date"
                value={girlDob}
                onChange={(e) => setGirlDob(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-cosmic-galaxy border border-cosmic-border/30 text-xs text-cosmic-white outline-none"
                required
              />
            </div>
            <div>
              <label className="text-[10px] text-cosmic-white/60 uppercase">Time of Birth</label>
              <input
                type="time"
                value={girlTob}
                onChange={(e) => setGirlTob(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-cosmic-galaxy border border-cosmic-border/30 text-xs text-cosmic-white outline-none"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-sm uppercase tracking-wider shadow-goldGlow hover:opacity-95"
        >
          Calculate 36 Gunas Compatibility →
        </button>
      </form>

      {/* Match Result Display */}
      {matchResult && (
        <div className="rounded-3xl bg-cosmic-galaxy/90 border-2 border-cosmic-gold/50 p-6 md:p-10 shadow-goldGlow space-y-8 animate-fadeIn">
          {/* Top Score Banner */}
          <div className="text-center space-y-2">
            <div className="text-xs uppercase tracking-widest text-cosmic-gold">
              Ashtakoot Guna Milan Result
            </div>
            <div className="text-4xl md:text-6xl font-cinzel font-extrabold text-cosmic-white">
              <span className="text-cosmic-gold">{matchResult.totalScore}</span> / 36
            </div>
            <div className="text-lg font-cinzel font-bold text-amber-200">
              {matchResult.recommendation}
            </div>
            <div className="text-xs text-cosmic-white/60">
              {boyName} ({matchResult.boyRashi}, {matchResult.boyNakshatra}) & {girlName} ({matchResult.girlRashi}, {matchResult.girlNakshatra})
            </div>
          </div>

          {/* 8 Kootas Detailed Breakdown Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-poppins">
              <thead>
                <tr className="border-b border-cosmic-border/30 text-cosmic-gold uppercase tracking-wider text-[10px]">
                  <th className="py-2.5 px-3">Koota</th>
                  <th className="py-2.5 px-3">Significance</th>
                  <th className="py-2.5 px-3 text-right">Points Scored</th>
                  <th className="py-2.5 px-3 text-right">Max Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cosmic-border/20">
                {Object.entries(matchResult.scores).map(([koota, data]: any) => (
                  <tr key={koota}>
                    <td className="py-2.5 px-3 font-bold text-cosmic-white capitalize">
                      {koota}
                    </td>
                    <td className="py-2.5 px-3 text-cosmic-white/70">{data.description}</td>
                    <td className="py-2.5 px-3 text-right font-bold text-cosmic-gold font-cinzel text-sm">
                      {data.points}
                    </td>
                    <td className="py-2.5 px-3 text-right text-cosmic-white/50">{data.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Dosha Warnings */}
          {(matchResult.hasNadiDosha || matchResult.hasBhakootDosha) && (
            <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-200 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-amber-300">
                <AlertTriangle className="w-4 h-4" /> Note on Astrological Doshas:
              </div>
              {matchResult.hasNadiDosha && (
                <p>• Nadi Dosha detected: Both charts share identical Nadi. Astrologer consultation recommended for cancellation exceptions.</p>
              )}
              {matchResult.hasBhakootDosha && (
                <p>• Bhakoot Dosha detected: 6/8 or 2/12 distance between Moon signs. Consult an acharya for mitigating remedial mantras.</p>
              )}
            </div>
          )}

          <div className="text-center pt-2">
            <Link
              href="/astrologers/dr-amit-deshmukh"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs"
            >
              Consult Dr. Amit Deshmukh for Marriage Remedies →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
