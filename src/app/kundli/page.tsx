'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { generateKundli, KundliData } from '@/lib/astrology/engine';
import { KundliChart } from '@/components/kundli/KundliChart';
import { exportKundliToPDF } from '@/lib/utils/pdfExport';
import { POPULAR_CITIES, searchCities, CityLocation } from '@/lib/astrology/cities';
import {
  Compass,
  Download,
  Share2,
  Calendar,
  Clock,
  MapPin,
  Sparkles,
  ShieldAlert,
  ShieldCheck,
  Heart,
  ChevronRight,
  Flame,
  FileText,
} from 'lucide-react';

export default function KundliPage() {
  const { user, birthProfile } = useAuth();

  // Birth details state (default to saved profile or Mathura default)
  const [dob, setDob] = useState(birthProfile?.dob || '1996-08-25');
  const [tob, setTob] = useState(birthProfile?.tob || '06:30');
  const [selectedCity, setSelectedCity] = useState<CityLocation>(
    POPULAR_CITIES.find((c) => c.city === birthProfile?.city) || POPULAR_CITIES[0]
  );
  const [citySearchQuery, setCitySearchQuery] = useState(birthProfile?.city || 'Mathura');
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'charts' | 'planets' | 'dashas' | 'doshas'>('charts');
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const citySearchResults = searchCities(citySearchQuery);

  // Compute live Kundli
  const kundli = useMemo(() => {
    return generateKundli({
      dob,
      tob,
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
      timezoneOffset: selectedCity.timezone,
    });
  }, [dob, tob, selectedCity]);

  const handleDownloadPDF = async () => {
    setIsDownloadingPdf(true);
    try {
      await exportKundliToPDF(
        kundli,
        birthProfile?.fullName || user?.name || 'Vedic Seeker',
        dob,
        tob,
        `${selectedCity.city}, ${selectedCity.state}`
      );
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-gold/15 border border-cosmic-gold/30 text-cosmic-gold text-xs font-semibold uppercase mb-2">
            <Compass className="w-3.5 h-3.5 text-cosmic-gold" />
            Authentic Vedic Jyotish Ephemeris Engine
          </div>
          <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
            Vedic Kundli Generator
          </h1>
          <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins mt-1">
            Lahiri (Chitrapaksha) Ayanamsa • D1 Lagna & D9 Navamsa • Vimshottari Dasha Cycles
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/kundli/matching"
            className="px-4 py-2.5 rounded-xl bg-cosmic-peacock/20 border border-cosmic-peacock/50 text-cosmic-white hover:bg-cosmic-peacock/40 transition-colors font-cinzel font-bold text-xs flex items-center gap-1.5"
          >
            <Heart className="w-4 h-4 text-rose-400" />
            Kundli Milan (36 Gunas)
          </Link>

          <button
            onClick={handleDownloadPDF}
            disabled={isDownloadingPdf}
            className="px-5 py-2.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs shadow-goldGlow hover:opacity-95 transition-opacity flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isDownloadingPdf ? 'Generating PDF...' : 'Download PDF Kundli'}
          </button>
        </div>
      </div>

      {/* Quick Birth Details Modifier Bar */}
      <div className="p-4 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <label className="text-[10px] text-cosmic-gold uppercase tracking-wider block mb-1">
            Date of Birth
          </label>
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
          />
        </div>

        <div>
          <label className="text-[10px] text-cosmic-gold uppercase tracking-wider block mb-1">
            Time of Birth
          </label>
          <input
            type="time"
            value={tob}
            onChange={(e) => setTob(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
          />
        </div>

        <div className="relative">
          <label className="text-[10px] text-cosmic-gold uppercase tracking-wider block mb-1">
            Birthplace
          </label>
          <input
            type="text"
            value={citySearchQuery}
            onFocus={() => setIsCityDropdownOpen(true)}
            onChange={(e) => {
              setCitySearchQuery(e.target.value);
              setIsCityDropdownOpen(true);
            }}
            className="w-full px-3 py-2 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
          />
          {isCityDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-xl bg-cosmic-midnight border border-cosmic-gold/40 shadow-2xl z-30 p-1">
              {citySearchResults.map((city) => (
                <button
                  key={`${city.city}-${city.state}`}
                  type="button"
                  onClick={() => {
                    setSelectedCity(city);
                    setCitySearchQuery(`${city.city}, ${city.state}`);
                    setIsCityDropdownOpen(false);
                  }}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-cosmic-white hover:bg-cosmic-galaxy hover:text-cosmic-gold transition-colors flex justify-between"
                >
                  <span>{city.city}, {city.state}</span>
                  <span className="text-[10px] text-cosmic-white/40">{city.latitude.toFixed(1)}°N</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tabs Row */}
      <div className="flex border-b border-cosmic-border/30 gap-2 overflow-x-auto text-xs font-cinzel font-bold">
        {[
          { id: 'charts', label: 'Lagna & Navamsha Charts' },
          { id: 'planets', label: 'Planetary Positions (Nirayana)' },
          { id: 'dashas', label: 'Vimshottari Mahadasha' },
          { id: 'doshas', label: 'Manglik & Dosha Diagnostics' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-5 rounded-t-2xl border-t border-x transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-cosmic-galaxy border-cosmic-gold text-cosmic-gold shadow-md'
                : 'border-transparent text-cosmic-white/60 hover:text-cosmic-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Charts (Both Lagna D1 and Navamsha D9 side-by-side with North/South toggle) */}
      {activeTab === 'charts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <KundliChart kundli={kundli} title="Lagna Kundli (D1 Rashi)" chartType="D1-Lagna" />
          <KundliChart kundli={kundli} title="Navamsha Kundli (D9 Soul Chart)" chartType="D9-Navamsa" />
        </div>
      )}

      {/* Tab 2: Planetary Positions Table */}
      {activeTab === 'planets' && (
        <div className="rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 p-6 md:p-8 backdrop-blur-xl overflow-x-auto">
          <h3 className="text-xl font-cinzel font-bold text-cosmic-gold mb-4">
            Planetary Longitudes & Dignities (Nirayana Sidereal)
          </h3>
          <table className="w-full text-left text-xs font-poppins">
            <thead>
              <tr className="border-b border-cosmic-border/30 text-cosmic-gold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Planet</th>
                <th className="py-3 px-4">Vedic Name</th>
                <th className="py-3 px-4">Sign (Rashi)</th>
                <th className="py-3 px-4">Degrees</th>
                <th className="py-3 px-4">Nakshatra & Pada</th>
                <th className="py-3 px-4">House</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Dignity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cosmic-border/20">
              {kundli.planets.map((p) => (
                <tr key={p.name} className="hover:bg-cosmic-midnight/40 transition-colors">
                  <td className="py-3 px-4 font-bold text-cosmic-white">
                    {p.name} {p.symbol}
                  </td>
                  <td className="py-3 px-4 font-devanagari text-amber-200">{p.sanskritName}</td>
                  <td className="py-3 px-4 text-cosmic-white">{p.sign}</td>
                  <td className="py-3 px-4 font-mono text-cosmic-gold">
                    {p.degrees}° {p.minutes}&apos; {p.seconds}&quot;
                  </td>
                  <td className="py-3 px-4 text-cosmic-white/80">
                    {p.nakshatra} (Pada {p.nakshatraPada})
                  </td>
                  <td className="py-3 px-4 font-semibold text-cosmic-peacock">House {p.house}</td>
                  <td className="py-3 px-4">
                    {p.isRetrograde ? (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 font-bold">
                        Retrograde (R)
                      </span>
                    ) : (
                      <span className="text-[10px] text-cosmic-white/50">Direct</span>
                    )}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                        p.dignity === 'Exalted'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : p.dignity === 'Debilitated'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : p.dignity === 'Own Sign'
                          ? 'bg-cosmic-gold/20 text-cosmic-gold'
                          : 'text-cosmic-white/70'
                      }`}
                    >
                      {p.dignity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 3: Vimshottari Mahadasha Timeline */}
      {activeTab === 'dashas' && (
        <div className="rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 p-6 md:p-8 backdrop-blur-xl space-y-6">
          <div>
            <h3 className="text-xl font-cinzel font-bold text-cosmic-gold">
              Vimshottari Dasha Sequence (120-Year Lifespan Cycle)
            </h3>
            <p className="text-xs text-cosmic-white/70 font-poppins mt-1">
              Calculated based on the Moon&apos;s exact degree in {kundli.panchangSummary.nakshatra} at the moment of birth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {kundli.dashas.map((dasha, idx) => (
              <div
                key={dasha.planet}
                className={`p-4 rounded-2xl border transition-all ${
                  idx === 0
                    ? 'bg-cosmic-gold/15 border-cosmic-gold shadow-goldGlow'
                    : 'bg-cosmic-midnight/60 border-cosmic-border/30'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-cinzel font-bold text-base text-cosmic-white">
                    {dasha.lord} Mahadasha
                  </div>
                  {idx === 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[9px] bg-cosmic-saffron text-cosmic-midnight font-bold">
                      Active
                    </span>
                  )}
                </div>
                <div className="text-xs text-cosmic-white/70">
                  Duration: <strong className="text-cosmic-gold">{dasha.years} Years</strong>
                </div>
                <div className="text-[11px] text-cosmic-white/50 mt-1 font-mono">
                  {dasha.startDate} → {dasha.endDate}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Dosha Analysis & Remedies */}
      {activeTab === 'doshas' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manglik Analysis Card */}
          <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-cinzel font-bold text-cosmic-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-cosmic-saffron" /> Manglik (Kuja) Dosha Analysis
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  kundli.doshas.isManglik
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {kundli.doshas.isManglik ? `Present (${kundli.doshas.manglikSeverity})` : 'Kuja Free'}
              </span>
            </div>

            <p className="text-xs md:text-sm text-cosmic-white/80 font-poppins leading-relaxed">
              {kundli.doshas.manglikReason}
            </p>

            {kundli.doshas.isManglik && (
              <div className="p-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-gold/30 space-y-2 text-xs">
                <div className="font-bold text-cosmic-gold font-cinzel">Recommended Vedic Remedies:</div>
                <ul className="list-disc list-inside space-y-1 text-cosmic-white/70">
                  <li>Chant the sacred Hanuman Chalisa or Mangala Beej Mantra on Tuesdays.</li>
                  <li>Fast on Shukla Paksha Tuesdays and donate red lentils (Masoor Dal).</li>
                  <li>Perform Kumbh Vivaha ritual if advised by a certified Vedic Acharya.</li>
                </ul>
              </div>
            )}
          </div>

          {/* Shani Sade Sati Status */}
          <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-cinzel font-bold text-cosmic-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cosmic-peacock" /> Shani Sade Sati Transit
              </h3>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold ${
                  kundli.doshas.isSadeSatiActive
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                }`}
              >
                {kundli.doshas.isSadeSatiActive ? kundli.doshas.sadeSatiPhase : 'Not Active'}
              </span>
            </div>

            <p className="text-xs md:text-sm text-cosmic-white/80 font-poppins leading-relaxed">
              {kundli.doshas.isSadeSatiActive
                ? `Saturn (Shani) is currently transiting near your natal Moon sign (${kundli.panchangSummary.rashi}), triggering the ${kundli.doshas.sadeSatiPhase} phase of the 7.5-year cycle.`
                : `Your natal Moon sign (${kundli.panchangSummary.rashi}) is currently free from the direct 7.5-year Shani Sade Sati transit.`}
            </p>

            <div className="p-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-gold/30 space-y-2 text-xs">
              <div className="font-bold text-cosmic-gold font-cinzel">Saturn Peace Rituals:</div>
              <ul className="list-disc list-inside space-y-1 text-cosmic-white/70">
                <li>Light a mustard oil lamp under a sacred Peepal tree on Saturdays at sunset.</li>
                <li>Recite the Dasharatha Shani Stotram and feed crows or black sesame seeds.</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
