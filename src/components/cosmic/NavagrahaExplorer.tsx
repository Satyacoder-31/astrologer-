'use client';

import React, { useState } from 'react';
import { Sparkles, Sun, Moon, Shield, Compass, Gem, Flame } from 'lucide-react';

interface PlanetInfo {
  id: string;
  name: string;
  sanskrit: string;
  deity: string;
  mantra: string;
  gemstone: string;
  metal: string;
  nature: 'Benefic' | 'Malefic' | 'Dual';
  color: string;
  iconBg: string;
  rulingSign: string;
  significance: string;
  currentTransit: string;
}

const NAVAGRAHA_LIST: PlanetInfo[] = [
  {
    id: 'surya',
    name: 'Sun',
    sanskrit: 'सूर्य (Surya)',
    deity: 'Lord Surya Narayana',
    mantra: 'ॐ ह्रां ह्रीं ह्रौं सः सूर्याय नमः॥',
    gemstone: 'Ruby (Manikya)',
    metal: 'Copper & Gold',
    nature: 'Benefic',
    color: '#E6A64A',
    iconBg: 'from-amber-500 to-orange-700',
    rulingSign: 'Leo (Simha)',
    significance: 'Soul (Atma), vitality, father, government, authority, leadership, and divine consciousness.',
    currentTransit: 'Transit in Scorpio (Vrishchika)',
  },
  {
    id: 'chandra',
    name: 'Moon',
    sanskrit: 'चन्द्र (Chandra)',
    deity: 'Soma / Lord Shiva',
    mantra: 'ॐ श्रां श्रीं श्रौं सः चन्द्रमसे नमः॥',
    gemstone: 'Pearl (Moti)',
    metal: 'Silver',
    nature: 'Benefic',
    color: '#F5F1E8',
    iconBg: 'from-slate-200 to-slate-400',
    rulingSign: 'Cancer (Karka)',
    significance: 'Mind (Manas), mother, emotional peace, intuition, fertility, and liquid nourishment.',
    currentTransit: 'Exalted in Taurus (Vrishabha)',
  },
  {
    id: 'mangala',
    name: 'Mars',
    sanskrit: 'मंगल (Mangala)',
    deity: 'Lord Kartikeya (Murugan)',
    mantra: 'ॐ क्रां क्रीं क्रौं सः भौमाय नमः॥',
    gemstone: 'Red Coral (Moonga)',
    metal: 'Copper & Brass',
    nature: 'Malefic',
    color: '#E63946',
    iconBg: 'from-red-600 to-amber-900',
    rulingSign: 'Aries & Scorpio',
    significance: 'Courage, physical vitality, land, brother, defense, engineering, and decisive action.',
    currentTransit: 'Transit in Cancer (Debilitated / Neecha)',
  },
  {
    id: 'budha',
    name: 'Mercury',
    sanskrit: 'बुध (Budha)',
    deity: 'Lord Vishnu',
    mantra: 'ॐ ब्रां ब्रीं ब्रौं सः बुधाय नमः॥',
    gemstone: 'Emerald (Panna)',
    metal: 'Bronze / Brass',
    nature: 'Benefic',
    color: '#087E8B',
    iconBg: 'from-emerald-500 to-teal-800',
    rulingSign: 'Gemini & Virgo',
    significance: 'Intellect (Buddhi), speech, mathematics, commerce, astrology, and communication.',
    currentTransit: 'Direct in Scorpio (Vrishchika)',
  },
  {
    id: 'guru',
    name: 'Jupiter',
    sanskrit: 'बृहस्पति (Guru)',
    deity: 'Brihaspati / Lord Brahma',
    mantra: 'ॐ ग्रां ग्रीं ग्रौं सः गुरवे नमः॥',
    gemstone: 'Yellow Sapphire (Pukhraj)',
    metal: 'Gold',
    nature: 'Benefic',
    color: '#D4AF62',
    iconBg: 'from-yellow-400 to-amber-600',
    rulingSign: 'Sagittarius & Pisces',
    significance: 'Guru, supreme wisdom, dharma, fortune, higher education, progeny, and spiritual liberation.',
    currentTransit: 'Retrograde in Taurus (Vrishabha)',
  },
  {
    id: 'shukra',
    name: 'Venus',
    sanskrit: 'शुक्र (Shukra)',
    deity: 'Goddess Lakshmi',
    mantra: 'ॐ द्रां द्रीं द्रौं सः शुक्राय नमः॥',
    gemstone: 'Diamond (Heera) / Opal',
    metal: 'Silver & Platinum',
    nature: 'Benefic',
    color: '#FFFFFF',
    iconBg: 'from-pink-300 to-indigo-400',
    rulingSign: 'Taurus & Libra',
    significance: 'Love, artistic elegance, beauty, marital bliss, wealth, luxury, and devotion.',
    currentTransit: 'Transit in Sagittarius (Dhanu)',
  },
  {
    id: 'shani',
    name: 'Saturn',
    sanskrit: 'शनि (Shani)',
    deity: 'Lord Shani / Kurma Avatar',
    mantra: 'ॐ प्रां प्रीं प्रौं सः शनैश्चराय नमः॥',
    gemstone: 'Blue Sapphire (Neelam)',
    metal: 'Iron & Lead',
    nature: 'Malefic',
    color: '#513B83',
    iconBg: 'from-indigo-900 to-slate-950',
    rulingSign: 'Capricorn & Aquarius',
    significance: 'Karma justice, discipline, longevity, detachment, persistence, and societal service.',
    currentTransit: 'Mooltrikona in Aquarius (Kumbha)',
  },
  {
    id: 'rahu',
    name: 'Rahu',
    sanskrit: 'राहु (North Node)',
    deity: 'Goddess Durga / Bhairava',
    mantra: 'ॐ भ्रां भ्रीं भ्रौं सः राहवे नमः॥',
    gemstone: 'Hessonite (Gomed)',
    metal: 'Mixed Alloy (Ashtadhatu)',
    nature: 'Malefic',
    color: '#3D0C02',
    iconBg: 'from-stone-800 to-neutral-950',
    rulingSign: 'Co-rules Aquarius',
    significance: 'Worldly ambition, foreign connections, technological disruption, fame, and illusion (Maya).',
    currentTransit: 'Retrograde in Pisces (Meena)',
  },
  {
    id: 'ketu',
    name: 'Ketu',
    sanskrit: 'केतु (South Node)',
    deity: 'Lord Ganesha / Matsya Avatar',
    mantra: 'ॐ स्रां स्रीं स्रौं सः केतवे नमः॥',
    gemstone: "Cat's Eye (Lehsuniya)",
    metal: 'Ashtadhatu',
    nature: 'Benefic',
    color: '#7209B7',
    iconBg: 'from-purple-900 to-stone-900',
    rulingSign: 'Co-rules Scorpio',
    significance: 'Moksha (Liberation), mysticism, detachment, occult enlightenment, and past life mastery.',
    currentTransit: 'Retrograde in Virgo (Kanya)',
  },
];

export const NavagrahaExplorer: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetInfo>(NAVAGRAHA_LIST[0]);

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 py-12">
      {/* Section Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cosmic-gold/10 border border-cosmic-gold/30 text-cosmic-gold text-xs tracking-widest uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5 text-cosmic-gold animate-spin-slow" />
          The Nine Cosmic Grahas
        </div>
        <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-cosmic-white">
          Navagraha Celestial Energies
        </h2>
        <p className="text-cosmic-white/70 max-w-2xl mx-auto mt-2 text-sm md:text-base font-poppins">
          In Vedic astrology, the nine planets are cosmic mirrors of human karma. Explore each Graha&apos;s divine attributes, sacred Vedic mantra, and current celestial transit.
        </p>
      </div>

      {/* 9 Planet Selector Pill Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-10">
        {NAVAGRAHA_LIST.map((planet) => {
          const isSelected = selectedPlanet.id === planet.id;
          return (
            <button
              key={planet.id}
              onClick={() => setSelectedPlanet(planet)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs md:text-sm font-medium transition-all duration-300 border ${
                isSelected
                  ? 'bg-cosmic-gold/20 border-cosmic-gold text-cosmic-gold shadow-goldGlow scale-105'
                  : 'bg-cosmic-galaxy/80 border-cosmic-border/30 text-cosmic-white/70 hover:text-cosmic-white hover:border-cosmic-gold/50'
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full bg-gradient-to-br ${planet.iconBg} shadow-sm`}
                style={{ boxShadow: isSelected ? `0 0 10px ${planet.color}` : 'none' }}
              />
              <span>{planet.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Planet Interactive Shrine Card */}
      <div className="relative rounded-3xl border border-cosmic-gold/30 bg-cosmic-galaxy/90 backdrop-blur-xl p-6 md:p-10 overflow-hidden shadow-2xl">
        {/* Decorative Golden Corner Accents */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cosmic-gold/50 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cosmic-gold/50 rounded-br-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Planet Sphere & Deity Visualizer */}
          <div className="lg:col-span-5 flex flex-col items-center text-center">
            <div className="relative group">
              {/* Outer Pulsing Golden Orbit Rings */}
              <div className="absolute inset-0 rounded-full border border-dashed border-cosmic-gold/40 animate-spin-slow scale-125" />
              <div className="absolute inset-0 rounded-full border border-cosmic-peacock/30 animate-spin-reverse scale-150" />

              {/* Glowing Orb */}
              <div
                className={`w-36 h-36 md:w-44 md:h-44 rounded-full bg-gradient-to-tr ${selectedPlanet.iconBg} flex items-center justify-center shadow-2xl relative z-10 transition-transform duration-500 hover:scale-105`}
                style={{
                  boxShadow: `0 0 45px ${selectedPlanet.color}55, inset 0 0 25px rgba(255,255,255,0.3)`,
                }}
              >
                <div className="text-center text-white px-2">
                  <div className="text-xs uppercase tracking-widest opacity-80">Lord</div>
                  <div className="font-cinzel font-bold text-lg md:text-xl drop-shadow-md">
                    {selectedPlanet.name}
                  </div>
                  <div className="font-devanagari text-xs text-amber-200 mt-0.5">
                    {selectedPlanet.sanskrit}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-cosmic-peacock/20 border border-cosmic-peacock/40 text-cosmic-white">
                {selectedPlanet.currentTransit}
              </span>
            </div>
          </div>

          {/* Planet Vedic Details & Sacred Mantra */}
          <div className="lg:col-span-7 space-y-5">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-cosmic-gold">
                  {selectedPlanet.name}
                </h3>
                <span className="text-lg md:text-xl font-devanagari text-cosmic-white/80">
                  {selectedPlanet.sanskrit}
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
                    selectedPlanet.nature === 'Benefic'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                  }`}
                >
                  {selectedPlanet.nature} Graha
                </span>
              </div>
              <p className="text-cosmic-white/80 text-sm md:text-base mt-2 font-poppins leading-relaxed">
                {selectedPlanet.significance}
              </p>
            </div>

            {/* Sacred Mantra Box */}
            <div className="p-4 md:p-5 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-gold/30">
              <div className="text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-cosmic-saffron" />
                Vedic Beej Mantra
              </div>
              <div className="font-devanagari text-lg md:text-xl text-amber-200 font-semibold tracking-wide">
                {selectedPlanet.mantra}
              </div>
              <div className="text-xs text-cosmic-white/60 mt-1 italic font-poppins">
                Chant 108 times facing East for planetary peace and energization.
              </div>
            </div>

            {/* Planetary Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs md:text-sm">
              <div className="p-3 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/30">
                <div className="text-cosmic-white/50 mb-0.5 flex items-center gap-1">
                  <Shield className="w-3 h-3 text-cosmic-gold" /> Ruling Deity
                </div>
                <div className="font-semibold text-cosmic-white">{selectedPlanet.deity}</div>
              </div>
              <div className="p-3 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/30">
                <div className="text-cosmic-white/50 mb-0.5 flex items-center gap-1">
                  <Compass className="w-3 h-3 text-cosmic-peacock" /> Ruling Zodiac
                </div>
                <div className="font-semibold text-cosmic-white">{selectedPlanet.rulingSign}</div>
              </div>
              <div className="p-3 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/30">
                <div className="text-cosmic-white/50 mb-0.5 flex items-center gap-1">
                  <Gem className="w-3 h-3 text-cosmic-saffron" /> Sacred Gemstone
                </div>
                <div className="font-semibold text-cosmic-white">{selectedPlanet.gemstone}</div>
              </div>
              <div className="p-3 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/30">
                <div className="text-cosmic-white/50 mb-0.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-purple-400" /> Sacred Metal
                </div>
                <div className="font-semibold text-cosmic-white">{selectedPlanet.metal}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
