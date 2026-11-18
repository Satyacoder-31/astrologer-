'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  GITA_VERSES,
  DAILY_MANTRAS,
  MEDITATION_STEPS,
  KRISHNA_WALLPAPERS,
  GitaVerse,
} from '@/lib/data/krishna';
import {
  Sparkles,
  Flame,
  Volume2,
  Download,
  Heart,
  ChevronRight,
  BookOpen,
  Compass,
  CheckCircle2,
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function KrishnaWisdomPage() {
  const [selectedDilemma, setSelectedDilemma] = useState<string>('all');
  const [activeOracleVerse, setActiveOracleVerse] = useState<GitaVerse>(GITA_VERSES[0]);
  const [isOracleSpinning, setIsOracleSpinning] = useState<boolean>(false);
  const [activeAudioMantra, setActiveAudioMantra] = useState<string | null>(null);

  // Filter Gita verses
  const filteredVerses = selectedDilemma === 'all'
    ? GITA_VERSES
    : GITA_VERSES.filter((v) => v.lifeDilemma.toLowerCase().includes(selectedDilemma.toLowerCase()));

  // Interactive "Krishna's Wisdom for Today" Oracle draw
  const handleDrawDivineWisdom = () => {
    setIsOracleSpinning(true);
    setTimeout(() => {
      const randomIdx = Math.floor(Math.random() * GITA_VERSES.length);
      setActiveOracleVerse(GITA_VERSES[randomIdx]);
      setIsOracleSpinning(false);
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#D4AF62', '#087E8B', '#E6A64A'],
      });
    }, 700);
  };

  // Simulated ambient chime audio
  const handlePlayChime = (mantraTitle: string) => {
    setActiveAudioMantra(activeAudioMantra === mantraTitle ? null : mantraTitle);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* 1. Divine Shrine Header Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-cosmic-purpleDark via-cosmic-galaxy to-cosmic-midnight border-2 border-cosmic-gold/50 p-8 md:p-14 shadow-goldGlowLg overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cosmic-peacock/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cosmic-gold/15 border border-cosmic-gold/40 text-cosmic-gold text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
              Sacred Divine Consciousness • Krishna Cosmic Universe
            </div>
            <h1 className="text-3xl md:text-5xl font-cinzel font-extrabold text-cosmic-white leading-tight">
              Lord Krishna Spiritual Sanctuary
            </h1>
            <p className="text-sm md:text-base text-cosmic-white/80 max-w-2xl font-poppins leading-relaxed">
              Immerse your soul in the timeless philosophy of Srimad Bhagavad Gita, authentic Sanskrit mantras, guided Vedic meditation, and divine high-resolution cosmic wallpapers.
            </p>
          </div>

          <div className="lg:col-span-4 flex justify-center">
            <div className="relative w-44 h-56 md:w-56 md:h-64 rounded-3xl overflow-hidden border-2 border-cosmic-gold shadow-goldGlow">
              <Image
                src="/images/krishna-cosmic-blend.jpg"
                alt="Lord Krishna Divine Portrait"
                fill
                className="object-cover object-center"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmic-midnight/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 inset-x-0 text-center">
                <span className="font-devanagari text-cosmic-gold text-sm font-bold">
                  श्री कृष्णाय शरणं मम
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Feature: "Krishna's Wisdom for Today" */}
      <div className="rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/40 p-6 md:p-10 shadow-2xl backdrop-blur-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs text-cosmic-saffron uppercase font-bold tracking-wider mb-1">
              <Flame className="w-4 h-4 text-cosmic-saffron" />
              Divine Consultation Oracle
            </div>
            <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-cosmic-white">
              Krishna&apos;s Wisdom for Today
            </h2>
            <p className="text-xs text-cosmic-white/60 font-poppins">
              Draw an inspirational teaching from the Bhagavad Gita for your present life crossroads.
            </p>
          </div>

          <button
            onClick={handleDrawDivineWisdom}
            disabled={isOracleSpinning}
            className="px-6 py-3 rounded-2xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs uppercase tracking-wider shadow-goldGlow hover:scale-105 transition-transform flex items-center gap-2 self-start sm:self-center"
          >
            <Sparkles className={`w-4 h-4 ${isOracleSpinning ? 'animate-spin' : ''}`} />
            {isOracleSpinning ? 'Receiving Grace...' : 'Draw Today\'s Divine Shloka'}
          </button>
        </div>

        {/* Oracle Verse Presentation Card */}
        <div className="p-6 md:p-8 rounded-2xl bg-cosmic-midnight/80 border-2 border-cosmic-gold/50 shadow-inner space-y-4">
          <div className="flex items-center justify-between border-b border-cosmic-border/30 pb-3">
            <span className="text-xs font-semibold text-cosmic-gold uppercase tracking-wider">
              Srimad Bhagavad Gita • Chapter {activeOracleVerse.chapter}, Verse {activeOracleVerse.verse}
            </span>
            <span className="px-3 py-0.5 rounded-full bg-cosmic-peacock/20 text-cosmic-peacock text-xs font-semibold">
              Theme: {activeOracleVerse.lifeDilemma}
            </span>
          </div>

          <div className="font-devanagari text-xl md:text-2xl text-amber-200 font-bold leading-relaxed whitespace-pre-line text-center">
            {activeOracleVerse.sanskrit}
          </div>

          <div className="text-xs md:text-sm text-cosmic-white/60 italic font-poppins text-center">
            {activeOracleVerse.transliteration}
          </div>

          <div className="pt-4 border-t border-cosmic-border/30 space-y-2 text-xs md:text-sm">
            <div>
              <strong className="text-cosmic-gold">Direct Translation: </strong>
              <span className="text-cosmic-white/90">{activeOracleVerse.englishMeaning}</span>
            </div>
            <div>
              <strong className="text-cosmic-saffron">Practical Life Application: </strong>
              <span className="text-cosmic-white/80 font-poppins leading-relaxed">
                {activeOracleVerse.practicalWisdom}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Daily Vedic Mantras with Chime Player */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-cinzel font-bold text-cosmic-gold">
            Daily Sacred Mantras for Planetary Peace
          </h2>
          <p className="text-xs text-cosmic-white/60 font-poppins">
            Traditional Vedic vibrations to purify thoughts and dissolve malefic planetary energies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DAILY_MANTRAS.map((mantra) => {
            const isPlaying = activeAudioMantra === mantra.title;
            return (
              <div
                key={mantra.title}
                className="p-6 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 backdrop-blur-xl flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-cinzel font-bold text-cosmic-gold">
                      {mantra.title}
                    </span>
                    <button
                      onClick={() => handlePlayChime(mantra.title)}
                      className={`p-2 rounded-xl transition-colors ${
                        isPlaying
                          ? 'bg-cosmic-gold text-cosmic-midnight'
                          : 'bg-cosmic-midnight text-cosmic-white/60 hover:text-cosmic-white'
                      }`}
                      title="Play Chime Vibration"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="font-devanagari text-base md:text-lg text-amber-200 font-semibold leading-relaxed whitespace-pre-line mb-3">
                    {mantra.sanskrit}
                  </div>

                  <div className="text-[11px] text-cosmic-white/60 italic font-poppins mb-3">
                    {mantra.transliteration}
                  </div>

                  <p className="text-xs text-cosmic-white/80 font-poppins">
                    {mantra.significance}
                  </p>
                </div>

                <div className="pt-3 border-t border-cosmic-border/30 text-[11px] text-cosmic-peacock font-medium">
                  Recommendation: {mantra.recommendedCount}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Five-Step Krishna Flute Meditation Guide */}
      <div className="rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 p-6 md:p-10 backdrop-blur-xl space-y-6">
        <div>
          <h2 className="text-2xl font-cinzel font-bold text-cosmic-white">
            Guided Krishna Flute Meditation (Dhyana)
          </h2>
          <p className="text-xs text-cosmic-white/60 font-poppins">
            A step-by-step five-phase practice to quiet the mind and connect with the transcendental source of love.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {MEDITATION_STEPS.map((m) => (
            <div
              key={m.step}
              className="p-4 rounded-2xl bg-cosmic-midnight/70 border border-cosmic-border/30 space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className="w-7 h-7 rounded-full bg-cosmic-gold/20 text-cosmic-gold font-bold text-xs flex items-center justify-center font-cinzel mb-2">
                  {m.step}
                </span>
                <h4 className="font-cinzel font-bold text-sm text-cosmic-white">{m.title}</h4>
                <p className="text-[11px] text-cosmic-white/70 font-poppins mt-2 leading-relaxed">
                  {m.instruction}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 4K Divine Krishna Wallpapers Gallery */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-cinzel font-bold text-cosmic-gold">
            4K Ultra HD Divine Cosmic Wallpapers
          </h2>
          <p className="text-xs text-cosmic-white/60 font-poppins">
            High-resolution sacred artwork for your desktop and mobile background sanctuary.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {KRISHNA_WALLPAPERS.map((wp) => (
            <div
              key={wp.id}
              className="rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 overflow-hidden group shadow-xl"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={wp.imageUrl}
                  alt={wp.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] bg-cosmic-midnight/80 text-cosmic-gold font-bold">
                  {wp.resolution.split(' ')[0]}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-cinzel font-bold text-sm text-cosmic-white truncate">
                  {wp.title}
                </h4>
                <p className="text-[11px] text-cosmic-white/60 line-clamp-2 font-poppins">
                  {wp.description}
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-cosmic-peacock uppercase font-semibold">
                    {wp.category}
                  </span>
                  <a
                    href={wp.imageUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1.5 rounded-lg bg-cosmic-midnight text-cosmic-gold hover:bg-cosmic-gold hover:text-cosmic-midnight transition-colors"
                    title="Download Wallpaper"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
