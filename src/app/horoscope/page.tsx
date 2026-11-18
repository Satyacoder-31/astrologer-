'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ZODIAC_HOROSCOPES, ZodiacSignHoroscope } from '@/lib/data/horoscope';
import { Sparkles, Heart, Briefcase, Activity, Calendar, Compass } from 'lucide-react';

export default function HoroscopePage() {
  const [selectedSignKey, setSelectedSignKey] = useState<string>('aries');
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'monthly' | 'yearly'>('daily');

  const signsList = Object.entries(ZODIAC_HOROSCOPES);
  const currentSign: ZodiacSignHoroscope = ZODIAC_HOROSCOPES[selectedSignKey] || ZODIAC_HOROSCOPES.aries;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cosmic-gold/15 border border-cosmic-gold/30 text-cosmic-gold text-xs font-semibold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
          Vedic Transit Foresight
        </div>
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
          Zodiac Horoscope & Planetary Forecast
        </h1>
        <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins">
          Daily, weekly, monthly, and 2026 yearly forecasts for all 12 Rashi signs.
        </p>
      </div>

      {/* 12 Zodiac Sign Selector Pill Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        {signsList.map(([key, item]) => {
          const isSelected = selectedSignKey === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedSignKey(key)}
              className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center ${
                isSelected
                  ? 'bg-cosmic-gold/20 border-cosmic-gold shadow-goldGlow scale-105'
                  : 'bg-cosmic-galaxy/80 border-cosmic-border/30 hover:border-cosmic-gold/50'
              }`}
            >
              <span className="text-2xl mb-0.5">{item.symbol}</span>
              <span className="font-cinzel font-bold text-xs text-cosmic-white">{item.sign}</span>
              <span className="text-[10px] text-cosmic-gold font-devanagari">{item.sanskrit.split(' ')[0]}</span>
              <span className="text-[9px] text-cosmic-white/40 mt-0.5">{item.dates}</span>
            </button>
          );
        })}
      </div>

      {/* Timeframe Selector */}
      <div className="flex justify-center">
        <div className="flex p-1 rounded-2xl bg-cosmic-galaxy border border-cosmic-gold/30 text-xs font-cinzel font-bold">
          {(['daily', 'weekly', 'monthly', 'yearly'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-5 py-2 rounded-xl capitalize transition-all ${
                timeframe === tf
                  ? 'bg-cosmic-gold text-cosmic-midnight shadow-sm'
                  : 'text-cosmic-white/70 hover:text-cosmic-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Sign Details Card */}
      <div className="rounded-3xl bg-cosmic-galaxy/90 border-2 border-cosmic-gold/40 p-6 md:p-10 shadow-2xl space-y-8 backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cosmic-border/30 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-cosmic-midnight border border-cosmic-gold/40 flex items-center justify-center text-4xl text-cosmic-gold shadow-sm">
              {currentSign.symbol}
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-cosmic-white">
                {currentSign.sign}{' '}
                <span className="text-cosmic-gold text-lg md:text-xl font-devanagari">
                  ({currentSign.sanskrit})
                </span>
              </h2>
              <div className="text-xs text-cosmic-white/60">
                Ruling Planet: <strong className="text-cosmic-white">{currentSign.rulingPlanet}</strong> • Element: {currentSign.element}
              </div>
            </div>
          </div>

          <Link
            href="/astrologers"
            className="px-5 py-2.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs shadow-goldGlow hover:opacity-90 self-start sm:self-center"
          >
            Consult Astrologer for {currentSign.sign}
          </Link>
        </div>

        {/* Content based on timeframe */}
        {timeframe === 'daily' && (
          <div className="space-y-6">
            <p className="text-sm md:text-base text-cosmic-white/90 font-poppins leading-relaxed">
              {currentSign.daily.overview}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-border/30 space-y-1">
                <div className="text-xs font-semibold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5" /> Love & Romance
                </div>
                <p className="text-xs text-cosmic-white/80 font-poppins">{currentSign.daily.love}</p>
              </div>

              <div className="p-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-border/30 space-y-1">
                <div className="text-xs font-semibold text-cosmic-peacock uppercase tracking-wider flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Career & Business
                </div>
                <p className="text-xs text-cosmic-white/80 font-poppins">{currentSign.daily.career}</p>
              </div>

              <div className="p-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-border/30 space-y-1">
                <div className="text-xs font-semibold text-emerald-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Health & Energy
                </div>
                <p className="text-xs text-cosmic-white/80 font-poppins">{currentSign.daily.health}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-cosmic-midnight/50 border border-cosmic-border/20">
                <div className="text-cosmic-white/50 text-[10px] uppercase">Lucky Number</div>
                <div className="font-bold text-cosmic-gold text-lg font-cinzel">{currentSign.daily.luckyNumber}</div>
              </div>
              <div className="p-3 rounded-xl bg-cosmic-midnight/50 border border-cosmic-border/20">
                <div className="text-cosmic-white/50 text-[10px] uppercase">Lucky Color</div>
                <div className="font-bold text-cosmic-white">{currentSign.daily.luckyColor}</div>
              </div>
              <div className="p-3 rounded-xl bg-cosmic-midnight/50 border border-cosmic-border/20">
                <div className="text-cosmic-white/50 text-[10px] uppercase">High Affinity</div>
                <div className="font-bold text-cosmic-peacock">{currentSign.daily.compatibility}</div>
              </div>
              <div className="p-3 rounded-xl bg-cosmic-midnight/50 border border-cosmic-border/20">
                <div className="text-cosmic-white/50 text-[10px] uppercase">Spiritual Focus</div>
                <div className="font-bold text-amber-200">Shri Krishna Japa</div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-midnight/90 border border-cosmic-gold/30 text-xs text-amber-200">
              <span className="font-bold text-cosmic-gold uppercase">Cosmic Advice: </span>
              {currentSign.daily.cosmicTip}
            </div>
          </div>
        )}

        {timeframe === 'weekly' && (
          <div className="space-y-4">
            <h3 className="font-cinzel font-bold text-lg text-cosmic-gold">Weekly Transit Outlook</h3>
            <p className="text-sm text-cosmic-white/90 leading-relaxed font-poppins">
              {currentSign.weekly.summary}
            </p>
            <div className="pt-2">
              <div className="text-xs text-cosmic-white/60 uppercase mb-2">Key Weekly Themes:</div>
              <div className="flex flex-wrap gap-2">
                {currentSign.weekly.keyThemes.map((t) => (
                  <span key={t} className="px-3 py-1 rounded-xl bg-cosmic-peacock/20 border border-cosmic-peacock/50 text-xs text-cosmic-white">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {timeframe === 'monthly' && (
          <div className="space-y-4">
            <h3 className="font-cinzel font-bold text-lg text-cosmic-gold">Monthly Planetary Trajectory</h3>
            <p className="text-sm text-cosmic-white/90 leading-relaxed font-poppins">
              {currentSign.monthly.summary}
            </p>
            <div className="p-4 rounded-2xl bg-cosmic-midnight/70 border border-cosmic-border/30 text-xs text-cosmic-white/80">
              <strong className="text-cosmic-gold">Financial Outlook: </strong>
              {currentSign.monthly.financialOutlook}
            </div>
          </div>
        )}

        {timeframe === 'yearly' && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-cosmic-saffron text-cosmic-midnight font-bold text-xs font-cinzel">
                Year {currentSign.yearly.year}
              </span>
              <h3 className="font-cinzel font-bold text-lg text-cosmic-gold">
                Theme: {currentSign.yearly.theme}
              </h3>
            </div>
            <p className="text-sm text-cosmic-white/90 leading-relaxed font-poppins">
              {currentSign.yearly.prediction}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
