'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useWallet } from '@/context/WalletContext';
import { generateKundli } from '@/lib/astrology/engine';
import { ZODIAC_HOROSCOPES } from '@/lib/data/horoscope';
import { calculatePanchang } from '@/lib/data/panchang';
import { ASTROLOGERS_DATABASE } from '@/lib/data/astrologers';
import { RechargeModal } from '@/components/wallet/RechargeModal';
import {
  Sparkles,
  Wallet,
  Compass,
  Star,
  Calendar,
  Clock,
  MessageCircle,
  Phone,
  Flame,
  Plus,
  ShieldCheck,
  ChevronRight,
  Bookmark,
  Bell,
  Heart,
  History,
} from 'lucide-react';

export default function UserDashboard() {
  const { user, birthProfile, isAstrologerSaved, toggleSaveAstrologer } = useAuth();
  const { balance } = useWallet();
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);

  // Compute real astronomical Kundli based on user's birth profile
  const userKundli = useMemo(() => {
    return generateKundli({
      dob: birthProfile?.dob || '1996-08-25',
      tob: birthProfile?.tob || '06:30',
      latitude: birthProfile?.latitude || 27.4924,
      longitude: birthProfile?.longitude || 77.6737,
      timezoneOffset: birthProfile?.timezone || 5.5,
    });
  }, [birthProfile]);

  // User's Moon Sign & Sun Sign
  const moonPlanet = userKundli.planets.find((p) => p.name === 'Moon');
  const sunPlanet = userKundli.planets.find((p) => p.name === 'Sun');
  const userSignKey = (moonPlanet?.sign.toLowerCase().split(' ')[0] || 'aries') as keyof typeof ZODIAC_HOROSCOPES;
  const horoscope = ZODIAC_HOROSCOPES[userSignKey] || ZODIAC_HOROSCOPES.aries;

  // Real-time Panchang
  const panchang = calculatePanchang(
    birthProfile?.city || 'Mathura',
    birthProfile?.latitude || 27.4924,
    birthProfile?.longitude || 77.6737,
    birthProfile?.timezone || 5.5
  );

  const recommendedAstrologers = ASTROLOGERS_DATABASE.slice(0, 3);
  const savedAstrologerObjects = ASTROLOGERS_DATABASE.filter((a) => isAstrologerSaved(a.id));

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* 1. Header Welcome & Wallet Overview */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 backdrop-blur-xl shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-gold/15 border border-cosmic-gold/30 text-cosmic-gold text-xs font-semibold uppercase">
            <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
            Personalized Vedic Dashboard
          </div>
          <h1 className="text-2xl md:text-3xl font-cinzel font-bold text-cosmic-white">
            Jai Shree Krishna, {user?.name || 'Blessed Seeker'}!
          </h1>
          <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins">
            Your cosmic energies are aligned for auspicious insight today.
          </p>
        </div>

        {/* Wallet Balance Card */}
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-gold/40 shadow-goldGlow">
          <div className="p-3 rounded-xl bg-cosmic-gold/20 text-cosmic-gold">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <div className="text-[10px] text-cosmic-white/50 uppercase tracking-wider">
              Available Consultation Wallet
            </div>
            <div className="text-2xl font-cinzel font-bold text-cosmic-white">
              ₹{balance}
            </div>
          </div>
          <button
            onClick={() => setIsRechargeModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs hover:opacity-95 transition-opacity shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Add Money
          </button>
        </div>
      </div>

      {/* 2. Personalized "Your Cosmic Journey" Section */}
      <div className="rounded-3xl bg-gradient-to-tr from-cosmic-purpleDark via-cosmic-galaxy to-cosmic-midnight border border-cosmic-gold/40 p-6 md:p-8 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-cosmic-peacock">
              Ephemeris-Calculated Coordinates
            </span>
            <h2 className="text-xl md:text-2xl font-cinzel font-bold text-cosmic-gold">
              Your Cosmic Journey (Vedic Birth Blueprint)
            </h2>
          </div>
          <Link
            href="/kundli"
            className="inline-flex items-center gap-1.5 text-xs text-cosmic-gold hover:underline font-semibold"
          >
            Open Interactive Kundli Charts & PDF →
          </Link>
        </div>

        {/* 4 Pillars of Vedic Identity */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-border/30">
            <div className="text-[10px] text-cosmic-white/50 uppercase">Lagna (Ascendant)</div>
            <div className="text-lg md:text-xl font-cinzel font-bold text-cosmic-gold">
              {userKundli.lagna.sign}
            </div>
            <div className="text-xs text-cosmic-white/60">
              Lord: {userKundli.lagna.signLord} • {userKundli.lagna.degrees}° {userKundli.lagna.minutes}&apos;
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-border/30">
            <div className="text-[10px] text-cosmic-white/50 uppercase">Chandra Rashi (Moon Sign)</div>
            <div className="text-lg md:text-xl font-cinzel font-bold text-cosmic-white">
              {userKundli.panchangSummary.rashi}
            </div>
            <div className="text-xs text-cosmic-peacock">
              Gana: {userKundli.panchangSummary.gan}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-border/30">
            <div className="text-[10px] text-cosmic-white/50 uppercase">Janma Nakshatra (Birth Star)</div>
            <div className="text-lg md:text-xl font-cinzel font-bold text-amber-200">
              {userKundli.panchangSummary.nakshatra}
            </div>
            <div className="text-xs text-cosmic-white/60">
              Pada {userKundli.lagna.nakshatraPada} • Nadi: {userKundli.panchangSummary.nadi}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-border/30">
            <div className="text-[10px] text-cosmic-white/50 uppercase">Current Mahadasha</div>
            <div className="text-lg md:text-xl font-cinzel font-bold text-cosmic-saffron">
              {userKundli.dashas[0]?.lord || 'Guru'} Dasha
            </div>
            <div className="text-xs text-cosmic-white/60">
              Active until {userKundli.dashas[0]?.endDate.split('-')[0]}
            </div>
          </div>
        </div>

        {/* Dosha & Sade Sati Status Pills */}
        <div className="mt-4 pt-4 border-t border-cosmic-border/30 flex flex-wrap items-center gap-3 text-xs">
          <span className="text-cosmic-white/60">Natal Diagnostics:</span>
          <span
            className={`px-3 py-1 rounded-full font-medium ${
              userKundli.doshas.isManglik
                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
            }`}
          >
            {userKundli.doshas.isManglik ? `Manglik (${userKundli.doshas.manglikSeverity})` : 'Kuja / Manglik Free'}
          </span>
          <span
            className={`px-3 py-1 rounded-full font-medium ${
              userKundli.doshas.isSadeSatiActive
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                : 'bg-cosmic-midnight/80 text-cosmic-white/80 border border-cosmic-border/40'
            }`}
          >
            Shani Sade Sati: {userKundli.doshas.isSadeSatiActive ? userKundli.doshas.sadeSatiPhase : 'None'}
          </span>
        </div>
      </div>

      {/* 3. Daily Horoscope & Daily Panchang Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Daily Horoscope for User */}
        <div className="lg:col-span-7 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 p-6 md:p-8 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cosmic-gold">
                Today&apos;s Forecast ({horoscope.sign})
              </span>
              <h3 className="text-xl font-cinzel font-bold text-cosmic-white">
                Personalized Horoscope
              </h3>
            </div>
            <Link
              href="/horoscope"
              className="text-xs text-cosmic-gold hover:underline font-semibold"
            >
              All 12 Signs →
            </Link>
          </div>

          <p className="text-xs md:text-sm text-cosmic-white/80 font-poppins leading-relaxed">
            {horoscope.daily.overview}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/30">
              <div className="text-[10px] text-cosmic-gold uppercase font-semibold">Love & Home</div>
              <p className="text-xs text-cosmic-white/70 mt-1 line-clamp-2">{horoscope.daily.love}</p>
            </div>
            <div className="p-3 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/30">
              <div className="text-[10px] text-cosmic-peacock uppercase font-semibold">Career & Work</div>
              <p className="text-xs text-cosmic-white/70 mt-1 line-clamp-2">{horoscope.daily.career}</p>
            </div>
            <div className="p-3 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/30">
              <div className="text-[10px] text-cosmic-saffron uppercase font-semibold">Lucky Factors</div>
              <p className="text-xs text-cosmic-white/70 mt-1">
                No: {horoscope.daily.luckyNumber} • {horoscope.daily.luckyColor}
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-cosmic-midnight/80 border border-cosmic-gold/25 text-xs text-amber-200 font-poppins">
            <span className="font-bold text-cosmic-gold">Cosmic Tip: </span>
            {horoscope.daily.cosmicTip}
          </div>
        </div>

        {/* Daily Panchang & Muhurta Snapshot */}
        <div className="lg:col-span-5 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 p-6 md:p-8 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-cosmic-peacock">
                {panchang.location.city}
              </span>
              <h3 className="text-xl font-cinzel font-bold text-cosmic-white">
                Daily Panchang & Muhurta
              </h3>
            </div>
            <Link href="/panchang" className="text-xs text-cosmic-gold hover:underline font-semibold">
              Details →
            </Link>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/20">
              <span className="text-cosmic-white/60">Tithi</span>
              <span className="font-bold text-cosmic-gold font-cinzel">{panchang.tithi.name}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/20">
              <span className="text-cosmic-white/60">Nakshatra</span>
              <span className="font-bold text-cosmic-white font-cinzel">{panchang.nakshatra.name} (P{panchang.nakshatra.pada})</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/20">
              <span className="text-cosmic-white/60">Abhijit Muhurat</span>
              <span className="font-bold text-emerald-300 font-cinzel">{panchang.muhurtas.abhijitMuhurat.start} - {panchang.muhurtas.abhijitMuhurat.end}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/20">
              <span className="text-cosmic-white/60">Rahu Kaal (Avoid)</span>
              <span className="font-bold text-rose-300 font-cinzel">{panchang.muhurtas.rahuKaal.start} - {panchang.muhurtas.rahuKaal.end}</span>
            </div>
            <div className="flex items-center justify-between p-2.5 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/20">
              <span className="text-cosmic-white/60">Moon Phase</span>
              <span className="font-bold text-cosmic-white">{panchang.lunar.moonPhase}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Recommended Astrologers & Saved Astrologers */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-cinzel font-bold text-cosmic-white">
              Recommended Astrologers for You
            </h2>
            <p className="text-xs text-cosmic-white/60 font-poppins">
              Based on your interest areas: {birthProfile?.areasOfInterest.slice(0, 2).join(', ')}
            </p>
          </div>
          <Link href="/astrologers" className="text-xs text-cosmic-gold hover:underline font-semibold">
            Browse All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendedAstrologers.map((astro) => (
            <div
              key={astro.id}
              className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between space-y-4"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-cosmic-gold/40 flex-shrink-0">
                  <Image src={astro.avatar} alt={astro.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-cinzel font-bold text-sm text-cosmic-white truncate">
                      {astro.name}
                    </h4>
                    <button
                      onClick={() => toggleSaveAstrologer(astro.id)}
                      className="text-cosmic-white/50 hover:text-cosmic-gold"
                    >
                      <Bookmark
                        className={`w-4 h-4 ${isAstrologerSaved(astro.id) ? 'fill-cosmic-gold text-cosmic-gold' : ''}`}
                      />
                    </button>
                  </div>
                  <div className="text-[11px] text-cosmic-gold truncate">{astro.title}</div>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-cosmic-white/60">
                    <span className="flex items-center gap-0.5 text-cosmic-gold font-semibold">
                      <Star className="w-3 h-3 fill-cosmic-gold" /> {astro.rating}
                    </span>
                    <span>•</span>
                    <span>₹{astro.pricePerMinute}/min</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-cosmic-border/30">
                <Link
                  href={`/consultation/chat/${astro.id}`}
                  className="flex-1 py-2 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs text-center shadow-sm hover:opacity-90"
                >
                  Chat Now
                </Link>
                <Link
                  href={`/astrologers/${astro.id}`}
                  className="px-3 py-2 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white/80 hover:text-cosmic-white text-xs"
                >
                  Profile
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Consultation History & Quick Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel font-bold text-base text-cosmic-white flex items-center gap-2">
              <History className="w-4 h-4 text-cosmic-peacock" /> Consultation History
            </h3>
            <Link href="/profile" className="text-xs text-cosmic-gold hover:underline">
              View all
            </Link>
          </div>
          <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 text-xs text-cosmic-white/70 space-y-1">
            <div className="flex justify-between font-bold text-cosmic-white">
              <span>Dr. Amit Deshmukh (Prashna Kundali)</span>
              <span className="text-cosmic-gold">₹49</span>
            </div>
            <div className="text-[11px] text-cosmic-white/50">Yesterday • 2 mins chat session</div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel font-bold text-base text-cosmic-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-cosmic-gold" /> Saved Astrologers ({savedAstrologerObjects.length})
            </h3>
            <Link href="/astrologers" className="text-xs text-cosmic-gold hover:underline">
              Browse
            </Link>
          </div>
          {savedAstrologerObjects.length > 0 ? (
            <div className="space-y-2">
              {savedAstrologerObjects.map((a) => (
                <div
                  key={a.id}
                  className="p-3 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden relative">
                      <Image src={a.avatar} alt={a.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-cosmic-white">{a.name}</div>
                      <div className="text-[10px] text-cosmic-gold">{a.experienceDisplay}</div>
                    </div>
                  </div>
                  <Link
                    href={`/consultation/chat/${a.id}`}
                    className="px-3 py-1 rounded-lg bg-gold-gradient text-cosmic-midnight font-bold text-[11px]"
                  >
                    Consult
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-cosmic-white/50 italic">No saved astrologers yet.</div>
          )}
        </div>
      </div>

      {/* Recharge Modal Portal */}
      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
      />
    </div>
  );
}
