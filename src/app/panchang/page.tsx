'use client';

import React, { useState } from 'react';
import { calculatePanchang } from '@/lib/data/panchang';
import { POPULAR_CITIES, searchCities, CityLocation } from '@/lib/astrology/cities';
import {
  Calendar,
  Clock,
  Sun,
  Moon,
  Compass,
  MapPin,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Search,
} from 'lucide-react';

export default function PanchangPage() {
  const [selectedCity, setSelectedCity] = useState<CityLocation>(POPULAR_CITIES[0]);
  const [citySearchQuery, setCitySearchQuery] = useState('New Delhi');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const panchang = calculatePanchang(
    selectedCity.city,
    selectedCity.latitude,
    selectedCity.longitude,
    selectedCity.timezone
  );

  const citySearchResults = searchCities(citySearchQuery);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cosmic-peacock/15 border border-cosmic-peacock/30 text-cosmic-peacock text-xs font-semibold uppercase">
          <Calendar className="w-3.5 h-3.5 text-cosmic-peacock" />
          Pancha-Anga (Five Limbs of Time)
        </div>
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
          Vedic Panchang & Muhurta
        </h1>
        <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins">
          Accurate solar & lunar timings calculated for your precise geographical coordinates.
        </p>
      </div>

      {/* Location Selector Bar */}
      <div className="p-4 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-2xl bg-cosmic-gold/15 text-cosmic-gold">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-cosmic-white/50 uppercase tracking-wider">Current Location</div>
            <div className="text-base font-cinzel font-bold text-cosmic-white">
              {selectedCity.city}, {selectedCity.state}, {selectedCity.country}
            </div>
            <div className="text-[10px] text-cosmic-peacock font-mono">
              Lat: {selectedCity.latitude}° N • Lon: {selectedCity.longitude}° E • UTC +{selectedCity.timezone}h
            </div>
          </div>
        </div>

        {/* Change City Input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Change city (e.g. Mumbai, Pune)..."
            value={citySearchQuery}
            onFocus={() => setIsCityDropdownOpen(true)}
            onChange={(e) => {
              setCitySearchQuery(e.target.value);
              setIsCityDropdownOpen(true);
            }}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-xs text-cosmic-white outline-none"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/40" />

          {isCityDropdownOpen && (
            <div className="absolute top-full right-0 left-0 mt-1 max-h-48 overflow-y-auto rounded-xl bg-cosmic-midnight border border-cosmic-gold/40 shadow-2xl z-30 p-1">
              {citySearchResults.map((c) => (
                <button
                  key={`${c.city}-${c.state}`}
                  type="button"
                  onClick={() => {
                    setSelectedCity(c);
                    setCitySearchQuery(c.city);
                    setIsCityDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-cosmic-white hover:bg-cosmic-galaxy hover:text-cosmic-gold transition-colors flex justify-between"
                >
                  <span>{c.city}, {c.state}</span>
                  <span className="text-[10px] text-cosmic-white/40 font-mono">{c.latitude.toFixed(1)}°</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Date & Sun/Moon Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Solar Card */}
        <div className="p-6 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 backdrop-blur-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-cosmic-gold flex items-center gap-1.5">
              <Sun className="w-4 h-4 text-cosmic-saffron" /> Solar Timings (Surya)
            </span>
            <div className="text-xl font-cinzel font-bold text-cosmic-white">
              Sunrise: {panchang.solar.sunrise}
            </div>
            <div className="text-sm text-cosmic-white/70">Sunset: {panchang.solar.sunset}</div>
            <div className="text-xs text-cosmic-peacock">Day Length: {panchang.solar.dayLength} • Sun Sign: {panchang.solar.sunSign}</div>
          </div>
          <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-300">
            <Sun className="w-8 h-8" />
          </div>
        </div>

        {/* Lunar Card */}
        <div className="p-6 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-peacock/30 backdrop-blur-xl flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase text-cosmic-peacock flex items-center gap-1.5">
              <Moon className="w-4 h-4 text-cosmic-peacock" /> Lunar Timings (Chandra)
            </span>
            <div className="text-xl font-cinzel font-bold text-cosmic-white">
              Moonrise: {panchang.lunar.moonrise}
            </div>
            <div className="text-sm text-cosmic-white/70">Moonset: {panchang.lunar.moonset}</div>
            <div className="text-xs text-cosmic-peacock">Phase: {panchang.lunar.moonPhase} • Moon Sign: {panchang.lunar.moonSign}</div>
          </div>
          <div className="w-16 h-16 rounded-full bg-cosmic-peacock/20 border border-cosmic-peacock/40 flex items-center justify-center text-cosmic-peacock">
            <Moon className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* The 5 Primary Panchang Limbs Grid */}
      <div className="space-y-4">
        <h2 className="text-2xl font-cinzel font-bold text-cosmic-gold">
          The Five Primary Limbs of Vedic Time
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="p-5 rounded-2xl bg-cosmic-galaxy/80 border border-cosmic-gold/30">
            <div className="text-[10px] text-cosmic-gold uppercase font-semibold">1. Tithi (Lunar Day)</div>
            <div className="text-lg font-cinzel font-bold text-cosmic-white mt-1">{panchang.tithi.name}</div>
            <div className="text-xs text-cosmic-white/60">{panchang.tithi.paksha}</div>
            <div className="text-[11px] text-cosmic-peacock mt-2">Up to {panchang.tithi.endTime}</div>
          </div>

          <div className="p-5 rounded-2xl bg-cosmic-galaxy/80 border border-cosmic-gold/30">
            <div className="text-[10px] text-cosmic-gold uppercase font-semibold">2. Vara (Solar Day)</div>
            <div className="text-lg font-cinzel font-bold text-cosmic-white mt-1">{panchang.dayOfWeek.split(' ')[0]}</div>
            <div className="text-xs text-cosmic-white/60">{panchang.dayOfWeek.split(' ')[1]}</div>
            <div className="text-[11px] text-cosmic-peacock mt-2">Ruled by Navagraha</div>
          </div>

          <div className="p-5 rounded-2xl bg-cosmic-galaxy/80 border border-cosmic-gold/30">
            <div className="text-[10px] text-cosmic-gold uppercase font-semibold">3. Nakshatra (Constellation)</div>
            <div className="text-lg font-cinzel font-bold text-cosmic-white mt-1">{panchang.nakshatra.name}</div>
            <div className="text-xs text-cosmic-white/60">Pada {panchang.nakshatra.pada} • Lord: {panchang.nakshatra.lord}</div>
            <div className="text-[11px] text-cosmic-peacock mt-2">Up to {panchang.nakshatra.endTime}</div>
          </div>

          <div className="p-5 rounded-2xl bg-cosmic-galaxy/80 border border-cosmic-gold/30">
            <div className="text-[10px] text-cosmic-gold uppercase font-semibold">4. Yoga (Luni-Solar)</div>
            <div className="text-lg font-cinzel font-bold text-amber-200 mt-1">{panchang.yoga.name}</div>
            <div className="text-xs text-cosmic-white/60">{panchang.yoga.significance}</div>
            <div className="text-[11px] text-cosmic-peacock mt-2">Up to {panchang.yoga.endTime}</div>
          </div>

          <div className="p-5 rounded-2xl bg-cosmic-galaxy/80 border border-cosmic-gold/30">
            <div className="text-[10px] text-cosmic-gold uppercase font-semibold">5. Karana (Half-Tithi)</div>
            <div className="text-lg font-cinzel font-bold text-cosmic-white mt-1">{panchang.karana.name}</div>
            <div className="text-xs text-cosmic-white/60">Chara (Movable) Karana</div>
            <div className="text-[11px] text-cosmic-peacock mt-2">Up to {panchang.karana.endTime}</div>
          </div>
        </div>
      </div>

      {/* Auspicious & Inauspicious Muhurta Windows */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Auspicious Timings (Shubh Muhurta) */}
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-emerald-500/30 space-y-4">
          <h3 className="text-xl font-cinzel font-bold text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Auspicious Muhurtas (Best for Beginnings)
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-cosmic-midnight/80 border border-cosmic-border/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-cosmic-white text-sm">Abhijit Muhurat</div>
                <div className="text-cosmic-white/50 text-[10px]">Destroyer of negative doshas</div>
              </div>
              <div className="text-right font-mono font-bold text-emerald-300">
                {panchang.muhurtas.abhijitMuhurat.start} - {panchang.muhurtas.abhijitMuhurat.end}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cosmic-midnight/80 border border-cosmic-border/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-cosmic-white text-sm">Brahma Muhurta</div>
                <div className="text-cosmic-white/50 text-[10px]">Supreme meditation & spiritual awakening</div>
              </div>
              <div className="text-right font-mono font-bold text-emerald-300">
                {panchang.muhurtas.brahmaMuhurta.start} - {panchang.muhurtas.brahmaMuhurta.end}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cosmic-midnight/80 border border-cosmic-border/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-cosmic-white text-sm">Amrit Kaal</div>
                <div className="text-cosmic-white/50 text-[10px]">Favorable for investments & agreements</div>
              </div>
              <div className="text-right font-mono font-bold text-emerald-300">
                {panchang.muhurtas.amritKaal.start} - {panchang.muhurtas.amritKaal.end}
              </div>
            </div>
          </div>
        </div>

        {/* Inauspicious Timings (Ashubh Muhurta to avoid) */}
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-rose-500/30 space-y-4">
          <h3 className="text-xl font-cinzel font-bold text-rose-300 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            Inauspicious Windows (Ashubh Kaal - Avoid)
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-cosmic-midnight/80 border border-cosmic-border/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-cosmic-white text-sm">Rahu Kaal</div>
                <div className="text-cosmic-white/50 text-[10px]">Avoid starting new projects, signing deals</div>
              </div>
              <div className="text-right font-mono font-bold text-rose-300">
                {panchang.muhurtas.rahuKaal.start} - {panchang.muhurtas.rahuKaal.end}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cosmic-midnight/80 border border-cosmic-border/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-cosmic-white text-sm">Yamaganda</div>
                <div className="text-cosmic-white/50 text-[10px]">Unfavorable for journeys & surgeries</div>
              </div>
              <div className="text-right font-mono font-bold text-rose-300">
                {panchang.muhurtas.yamaganda.start} - {panchang.muhurtas.yamaganda.end}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-cosmic-midnight/80 border border-cosmic-border/30 flex items-center justify-between">
              <div>
                <div className="font-bold text-cosmic-white text-sm">Gulika Kaal</div>
                <div className="text-cosmic-white/50 text-[10px]">Cautionary window; avoid ceremonies</div>
              </div>
              <div className="text-right font-mono font-bold text-rose-300">
                {panchang.muhurtas.gulikaKaal.start} - {panchang.muhurtas.gulikaKaal.end}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
