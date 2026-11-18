'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ASTROLOGERS_DATABASE, Astrologer } from '@/lib/data/astrologers';
import { useAuth } from '@/context/AuthContext';
import {
  Search,
  Filter,
  Star,
  ShieldCheck,
  MessageCircle,
  Phone,
  Video,
  Bookmark,
  SlidersHorizontal,
  X,
  ChevronDown,
} from 'lucide-react';

export default function AstrologersDirectoryPage() {
  const { isAstrologerSaved, toggleSaveAstrologer } = useAuth();

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('All');
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [selectedPriceMax, setSelectedPriceMax] = useState<number>(50);
  const [selectedMinExperience, setSelectedMinExperience] = useState<number>(0);
  const [onlyOnline, setOnlyOnline] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'popularity' | 'rating' | 'price_low' | 'price_high' | 'experience'>('popularity');

  // Extract all distinct specializations and languages
  const specializations = useMemo(() => {
    const set = new Set<string>();
    ASTROLOGERS_DATABASE.forEach((a) => a.specializations.forEach((s) => set.add(s)));
    return ['All', ...Array.from(set)];
  }, []);

  const languages = useMemo(() => {
    const set = new Set<string>();
    ASTROLOGERS_DATABASE.forEach((a) => a.languages.forEach((l) => set.add(l)));
    return ['All', ...Array.from(set)];
  }, []);

  // Filtered & sorted list
  const filteredAstrologers = useMemo(() => {
    return ASTROLOGERS_DATABASE.filter((astro) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = astro.name.toLowerCase().includes(q);
        const matchesSpec = astro.specializations.some((s) => s.toLowerCase().includes(q));
        const matchesLang = astro.languages.some((l) => l.toLowerCase().includes(q));
        if (!matchesName && !matchesSpec && !matchesLang) return false;
      }

      // Specialization
      if (selectedSpecialization !== 'All' && !astro.specializations.includes(selectedSpecialization)) {
        return false;
      }

      // Language
      if (selectedLanguage !== 'All' && !astro.languages.includes(selectedLanguage)) {
        return false;
      }

      // Price
      if (astro.pricePerMinute > selectedPriceMax) {
        return false;
      }

      // Experience
      if (astro.experienceYears < selectedMinExperience) {
        return false;
      }

      // Online status
      if (onlyOnline && astro.status !== 'online') {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_low') return a.pricePerMinute - b.pricePerMinute;
      if (sortBy === 'price_high') return b.pricePerMinute - a.pricePerMinute;
      if (sortBy === 'experience') return b.experienceYears - a.experienceYears;
      return b.consultationCount - a.consultationCount; // popularity
    });
  }, [searchQuery, selectedSpecialization, selectedLanguage, selectedPriceMax, selectedMinExperience, onlyOnline, sortBy]);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
          Verified Vedic Astrologers
        </h1>
        <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins">
          Consult real, certified Vedic scholars and astrologers directly. Filter by experience, pricing, language, and specialization.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 md:p-6 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 shadow-xl space-y-4">
        {/* Top search input & Sort */}
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-peacock" />
            <input
              type="text"
              placeholder="Search by astrologer name, Prashna, Vastu, Palmistry, Hindi, Kannada..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-cosmic-white/50 hover:text-cosmic-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <span className="text-xs text-cosmic-white/60 whitespace-nowrap">Sort by:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3.5 py-3 rounded-2xl bg-cosmic-midnight border border-cosmic-border/40 text-xs text-cosmic-white font-medium outline-none focus:border-cosmic-gold"
            >
              <option value="popularity">Most Popular</option>
              <option value="rating">Highest Rating</option>
              <option value="experience">Years of Experience</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Filter Pills row */}
        <div className="pt-2 border-t border-cosmic-border/20 flex flex-wrap items-center gap-3 text-xs">
          {/* Specialization Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-cosmic-white/50">Specialization:</span>
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-cosmic-midnight border border-cosmic-border/30 text-cosmic-gold font-medium outline-none"
            >
              {specializations.map((spec) => (
                <option key={spec} value={spec}>
                  {spec}
                </option>
              ))}
            </select>
          </div>

          {/* Language Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-cosmic-white/50">Language:</span>
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="px-2.5 py-1.5 rounded-xl bg-cosmic-midnight border border-cosmic-border/30 text-cosmic-white font-medium outline-none"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Max Price Range Slider */}
          <div className="flex items-center gap-2">
            <span className="text-cosmic-white/50">Max Price: ₹{selectedPriceMax}/min</span>
            <input
              type="range"
              min="10"
              max="60"
              step="5"
              value={selectedPriceMax}
              onChange={(e) => setSelectedPriceMax(parseInt(e.target.value, 10))}
              className="w-24 accent-cosmic-gold"
            />
          </div>

          {/* Online Only Toggle */}
          <label className="flex items-center gap-1.5 ml-auto cursor-pointer">
            <input
              type="checkbox"
              checked={onlyOnline}
              onChange={(e) => setOnlyOnline(e.target.checked)}
              className="accent-emerald-400"
            />
            <span className="text-emerald-400 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Online Only
            </span>
          </label>
        </div>
      </div>

      {/* Astrologer Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAstrologers.map((astro) => (
          <div
            key={astro.id}
            className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between space-y-5 relative"
          >
            {astro.isTopChoice && (
              <span className="absolute -top-2.5 right-6 px-3 py-0.5 rounded-full bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-[10px] uppercase tracking-wider shadow-sm">
                Top Rated Choice
              </span>
            )}

            {/* Profile Info Top */}
            <div className="flex items-start gap-4">
              <Link href={`/astrologers/${astro.id}`} className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-cosmic-gold/50 flex-shrink-0 group">
                <Image
                  src={astro.avatar}
                  alt={astro.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
                <span
                  className={`absolute bottom-1 right-1 w-3.5 h-3.5 rounded-full border-2 border-cosmic-midnight ${
                    astro.status === 'online' ? 'bg-emerald-400' : astro.status === 'busy' ? 'bg-amber-400' : 'bg-slate-500'
                  }`}
                  title={astro.status}
                />
              </Link>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <Link
                    href={`/astrologers/${astro.id}`}
                    className="font-cinzel font-bold text-base text-cosmic-white hover:text-cosmic-gold truncate transition-colors flex items-center gap-1"
                  >
                    <span>{astro.name}</span>
                    <ShieldCheck className="w-4 h-4 text-cosmic-peacock flex-shrink-0" />
                  </Link>

                  <button
                    onClick={() => toggleSaveAstrologer(astro.id)}
                    className="text-cosmic-white/50 hover:text-cosmic-gold"
                  >
                    <Bookmark
                      className={`w-4 h-4 ${isAstrologerSaved(astro.id) ? 'fill-cosmic-gold text-cosmic-gold' : ''}`}
                    />
                  </button>
                </div>

                <div className="text-xs text-cosmic-gold truncate font-medium">{astro.title}</div>
                <div className="text-[11px] text-cosmic-white/60 mt-0.5">
                  Experience: <strong className="text-cosmic-white">{astro.experienceDisplay}</strong>
                </div>

                <div className="flex items-center gap-2 mt-1.5 text-xs">
                  <span className="flex items-center gap-1 text-cosmic-gold font-bold">
                    <Star className="w-3.5 h-3.5 fill-cosmic-gold" /> {astro.rating}
                  </span>
                  <span className="text-cosmic-white/40">({astro.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Specializations & Languages */}
            <div className="space-y-2 text-xs">
              <div className="flex flex-wrap gap-1">
                {astro.specializations.map((spec) => (
                  <span
                    key={spec}
                    className="px-2 py-0.5 rounded-md bg-cosmic-midnight/80 border border-cosmic-border/30 text-[11px] text-cosmic-white/80"
                  >
                    {spec}
                  </span>
                ))}
              </div>
              <div className="text-[11px] text-cosmic-white/50 truncate">
                <span className="text-cosmic-gold font-medium">Languages: </span>
                {astro.languages.join(', ')}
              </div>
              <div className="text-[11px] text-cosmic-white/50">
                <span className="text-cosmic-peacock font-medium">Hours: </span>
                {astro.availability}
              </div>
            </div>

            {/* Bottom Pricing & Instant Consultation Buttons */}
            <div className="pt-3 border-t border-cosmic-border/30 flex items-center justify-between">
              <div>
                <span className="text-xl font-cinzel font-bold text-cosmic-white">
                  ₹{astro.pricePerMinute}
                </span>
                <span className="text-[10px] text-cosmic-white/60"> / min</span>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href={`/consultation/chat/${astro.id}`}
                  className="px-3 py-2 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs shadow-goldGlow hover:opacity-90 flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> Chat
                </Link>

                <Link
                  href={`/consultation/call/${astro.id}?mode=voice`}
                  className="p-2 rounded-xl bg-cosmic-midnight border border-cosmic-peacock/50 text-cosmic-peacock hover:bg-cosmic-peacock hover:text-cosmic-white transition-colors"
                  title="Voice Call"
                >
                  <Phone className="w-4 h-4" />
                </Link>

                <Link
                  href={`/consultation/call/${astro.id}?mode=video`}
                  className="p-2 rounded-xl bg-cosmic-midnight border border-cosmic-purple/50 text-purple-300 hover:bg-cosmic-purple hover:text-cosmic-white transition-colors"
                  title="Video Call"
                >
                  <Video className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
