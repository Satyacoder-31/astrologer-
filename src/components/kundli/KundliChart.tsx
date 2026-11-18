'use client';

import React, { useState } from 'react';
import { KundliData } from '@/lib/astrology/engine';

interface KundliChartProps {
  kundli: KundliData;
  title?: string;
  chartType?: 'D1-Lagna' | 'D9-Navamsa';
  className?: string;
}

export const KundliChart: React.FC<KundliChartProps> = ({
  kundli,
  title = 'Lagna Kundli (D1)',
  chartType = 'D1-Lagna',
  className = '',
}) => {
  const [style, setStyle] = useState<'North' | 'South'>('North');
  const [selectedHouse, setSelectedHouse] = useState<number | null>(null);

  const lagnaSignId = chartType === 'D1-Lagna' ? kundli.lagna.signId : kundli.navamsha.find((p) => p.planet === 'Surya')?.signId || 1;

  // Group planets by house (1 to 12)
  const planetsByHouse: Record<number, string[]> = {};
  for (let h = 1; h <= 12; h++) {
    planetsByHouse[h] = [];
  }

  if (chartType === 'D1-Lagna') {
    kundli.planets.forEach((p) => {
      const retro = p.isRetrograde ? '(R)' : '';
      planetsByHouse[p.house].push(`${p.sanskritName}${retro}`);
    });
  } else {
    kundli.navamsha.forEach((n) => {
      planetsByHouse[n.house].push(n.planet);
    });
  }

  // Sign number for each house: house 1 has lagnaSignId, house 2 has lagnaSignId + 1, etc.
  const signForHouse = (h: number) => {
    return ((lagnaSignId - 1 + (h - 1)) % 12) + 1;
  };

  const HOUSE_SIGNIFICANCE: Record<number, { name: string; meaning: string }> = {
    1: { name: 'Tanu Bhava (Self)', meaning: 'Personality, physical body, vitality, appearance, self-identity, and destiny.' },
    2: { name: 'Dhana Bhava (Wealth)', meaning: 'Accumulated savings, family lineage, speech, voice, face, and primary assets.' },
    3: { name: 'Sahaja Bhava (Siblings)', meaning: 'Courage, younger siblings, short journeys, initiative, communication, and hands.' },
    4: { name: 'Sukha Bhava (Happiness)', meaning: 'Mother, home sanctuary, domestic peace, landed properties, vehicles, and heart.' },
    5: { name: 'Putra Bhava (Progeny & Intellect)', meaning: 'Past life karma (Purva Punya), intelligence, children, creativity, and investments.' },
    6: { name: 'Ari Bhava (Debts & Health)', meaning: 'Health challenges, daily service, debts, litigations, competitors, and discipline.' },
    7: { name: 'Yuvati Bhava (Partnership)', meaning: 'Spouse, marriage, business partnerships, public relations, and foreign contracts.' },
    8: { name: 'Randhra Bhava (Transformation)', meaning: 'Longevity, occult sciences, inheritance, hidden mysteries, and spiritual rebirth.' },
    9: { name: 'Dharma Bhava (Fortune)', meaning: 'Father, spiritual Guru, higher wisdom, pilgrimages, good fortune, and morality.' },
    10: { name: 'Karma Bhava (Profession)', meaning: 'Career status, executive authority, prestige, public achievements, and duty.' },
    11: { name: 'Labha Bhava (Gains)', meaning: 'Fulfillment of desires, elder siblings, major wealth gains, and influential networks.' },
    12: { name: 'Vyaya Bhava (Liberation)', meaning: 'Spiritual liberation (Moksha), foreign travels, meditation, charity, and sleep.' },
  };

  return (
    <div className={`p-5 rounded-3xl bg-cosmic-galaxy/95 border border-cosmic-gold/30 shadow-2xl ${className}`}>
      {/* Header with Title and North/South Toggle */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-5 border-b border-cosmic-border/30 pb-3">
        <div>
          <h3 className="text-xl font-cinzel font-bold text-cosmic-gold">{title}</h3>
          <p className="text-xs text-cosmic-white/60 font-poppins">
            Lagna: <span className="text-cosmic-white font-medium">{kundli.lagna.sign}</span> ({kundli.lagna.degrees}° {kundli.lagna.minutes}&apos;) • {kundli.ayanamsa.name}
          </p>
        </div>

        {/* Style switch */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-cosmic-midnight border border-cosmic-gold/30 text-xs">
          <button
            onClick={() => setStyle('North')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              style === 'North'
                ? 'bg-cosmic-gold text-cosmic-midnight font-bold shadow-sm'
                : 'text-cosmic-white/70 hover:text-cosmic-white'
            }`}
          >
            North Indian (Diamond)
          </button>
          <button
            onClick={() => setStyle('South')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
              style === 'South'
                ? 'bg-cosmic-gold text-cosmic-midnight font-bold shadow-sm'
                : 'text-cosmic-white/70 hover:text-cosmic-white'
            }`}
          >
            South Indian (Grid)
          </button>
        </div>
      </div>

      {/* Interactive Chart Canvas View */}
      <div className="flex flex-col items-center">
        {style === 'North' ? (
          /* Classical North Indian Diamond Kundli (400x400 SVG) */
          <div className="relative w-full max-w-[420px] aspect-square">
            <svg
              viewBox="0 0 400 400"
              className="w-full h-full drop-shadow-xl select-none"
              style={{ filter: 'drop-shadow(0 0 15px rgba(212, 175, 98, 0.2))' }}
            >
              {/* Outer Border */}
              <rect x="10" y="10" width="380" height="380" fill="#080D24" stroke="#D4AF62" strokeWidth="2.5" />

              {/* Main Diagonals */}
              <line x1="10" y1="10" x2="390" y2="390" stroke="#D4AF62" strokeWidth="1.8" />
              <line x1="390" y1="10" x2="10" y2="390" stroke="#D4AF62" strokeWidth="1.8" />

              {/* Central Diamond (Kendra: 1, 4, 7, 10) */}
              <polygon points="200,10 390,200 200,390 10,200" fill="none" stroke="#D4AF62" strokeWidth="2" />

              {/* Inner Diamond Center lines */}
              <line x1="105" y1="105" x2="295" y2="105" stroke="#D4AF62" strokeWidth="1" strokeDasharray="3 3" />
              <line x1="105" y1="295" x2="295" y2="295" stroke="#D4AF62" strokeWidth="1" strokeDasharray="3 3" />

              {/* House 1: Top Center Diamond */}
              <g
                className="cursor-pointer hover:opacity-80 transition-opacity"
                onClick={() => setSelectedHouse(1)}
              >
                <text x="200" y="70" textAnchor="middle" fill="#E6A64A" fontSize="12" fontWeight="bold">
                  {signForHouse(1)}
                </text>
                <text x="200" y="95" textAnchor="middle" fill="#F5F1E8" fontSize="13" fontWeight="bold">
                  {planetsByHouse[1].join(' ')}
                </text>
                <text x="200" y="115" textAnchor="middle" fill="#D4AF62" fontSize="9" opacity="0.8">
                  H1 (Lagna)
                </text>
              </g>

              {/* House 2: Upper Left Triangle */}
              <g className="cursor-pointer hover:opacity-80" onClick={() => setSelectedHouse(2)}>
                <text x="135" y="45" textAnchor="middle" fill="#E6A64A" fontSize="11" fontWeight="bold">
                  {signForHouse(2)}
                </text>
                <text x="110" y="70" textAnchor="middle" fill="#F5F1E8" fontSize="11">
                  {planetsByHouse[2].join(' ')}
                </text>
              </g>

              {/* House 3: Far Left Upper Triangle */}
              <g className="cursor-pointer hover:opacity-80" onClick={() => setSelectedHouse(3)}>
                <text x="45" y="135" textAnchor="middle" fill="#E6A64A" fontSize="11" fontWeight="bold">
                  {signForHouse(3)}
                </text>
                <text x="70" y="110" textAnchor="middle" fill="#F5F1E8" fontSize="11">
                  {planetsByHouse[3].join(' ')}
                </text>
              </g>

              {/* House 4: Left Center Diamond */}
              <g className="cursor-pointer hover:opacity-80" onClick={() => setSelectedHouse(4)}>
                <text x="70" y="200" textAnchor="middle" fill="#E6A64A" fontSize="12" fontWeight="bold">
                  {signForHouse(4)}
                </text>
                <text x="95" y="205" textAnchor="middle" fill="#F5F1E8" fontSize="12" fontWeight="bold">
                  {planetsByHouse[4].join(' ')}
                </text>
                <text x="115" y="225" textAnchor="middle" fill="#D4AF62" fontSize="9" opacity="0.8">
                  H4
                </text>
              </g>

              {/* House 5: Far Left Lower Triangle */}
              <g className="cursor-pointer hover:opacity-80" onClick={() => setSelectedHouse(5)}>
                <text x="45" y="275" textAnchor="middle" fill="#E6A64A" fontSize="11" fontWeight="bold">
                  {signForHouse(5)}
                </text>
                <text x="70" y="300" textAnchor="middle" fill="#F5F1E8" fontSize="11">
                  {planetsByHouse[5].join(' ')}
                </text>
              </g>

              {/* House 6: Lower Left Triangle */}
              <g className="cursor-pointer hover:opacity-80" onClick={() => setSelectedHouse(6)}>
                <text x="135" y="365" textAnchor="middle" fill="#E6A64A" fontSize="11" fontWeight="bold">
                  {signForHouse(6)}
                </text>
                <text x="110" y="340" textAnchor="middle" fill="#F5F1E8" fontSize="11">
                  {planetsByHouse[6].join(' ')}
                </text>
              </g>

              {/* House 7: Bottom Center Diamond */}
              <g className="cursor-pointer hover:opacity-80" onClick={() => setSelectedHouse(7)}>
                <text x="200" y="335" textAnchor="middle" fill="#E6A64A" fontSize="12" fontWeight="bold">
                  {signForHouse(7)}
                </text>
                <text x="200" y="310" textAnchor="middle" fill="#F5F1E8" fontSize="13" fontWeight="bold">
                  {planetsByHouse[7].join(' ')}
                </text>
                <text x="200" y="290" textAnchor="middle" fill="#D4AF62" fontSize="9" opacity="0.8">
                  H7
                </text>
              </g>

              {/* House 8: Lower Right Triangle */}
              <g className="cursor-pointer hover:opacity-80" onClick={() => setSelectedHouse(8)}>
                <text x="265" y="365" textAnchor="middle" fill="#E6A64A" fontSize="11" fontWeight="bold">
                  {signForHouse(8)}
                </text>
                <text x="290" y="340" textAnchor="middle" fill="#F5F1E8" fontSize="11">
                  {planetsByHouse[8].join(' ')}
                </text>
              </g>

              {/* House 9: Far Right Lower Triangle */}
              <g className="cursor-pointer hover:opacity-80" onClick={() => setSelectedHouse(9)}>
                <text x="355" y="275" textAnchor="middle" fill="#E6A64A" fontSize="11" fontWeight="bold">
                  {signForHouse(9)}
                </text>
                <text x="330" y="300" textAnchor="middle" fill="#F5F1E8" fontSize="11">
                  {planetsByHouse[9].join(' ')}
                </text>
              </g>

              {/* House 10: Right Center Diamond */}
              <g className="cursor-pointer hover:opacity-80" onClick={() => setSelectedHouse(10)}>
                <text x="330" y="200" textAnchor="middle" fill="#E6A64A" fontSize="12" fontWeight="bold">
                  {signForHouse(10)}
                </text>
                <text x="305" y="205" textAnchor="middle" fill="#F5F1E8" fontSize="12" fontWeight="bold">
                  {planetsByHouse[10].join(' ')}
                </text>
                <text x="285" y="225" textAnchor="middle" fill="#D4AF62" fontSize="9" opacity="0.8">
                  H10
                </text>
              </g>

              {/* House 11: Far Right Upper Triangle */}
              <g className="cursor-pointer hover:opacity-80" onClick={() => setSelectedHouse(11)}>
                <text x="355" y="135" textAnchor="middle" fill="#E6A64A" fontSize="11" fontWeight="bold">
                  {signForHouse(11)}
                </text>
                <text x="330" y="110" textAnchor="middle" fill="#F5F1E8" fontSize="11">
                  {planetsByHouse[11].join(' ')}
                </text>
              </g>

              {/* House 12: Upper Right Triangle */}
              <g className="cursor-pointer hover:opacity-80" onClick={() => setSelectedHouse(12)}>
                <text x="265" y="45" textAnchor="middle" fill="#E6A64A" fontSize="11" fontWeight="bold">
                  {signForHouse(12)}
                </text>
                <text x="290" y="70" textAnchor="middle" fill="#F5F1E8" fontSize="11">
                  {planetsByHouse[12].join(' ')}
                </text>
              </g>
            </svg>
          </div>
        ) : (
          /* Classical South Indian Fixed-Zodiac Grid (4x4) */
          <div className="w-full max-w-[420px] aspect-square grid grid-cols-4 grid-rows-4 border-2 border-cosmic-gold rounded-xl overflow-hidden bg-cosmic-midnight">
            {/* 12 Signs in South Indian Clockwise fixed placement */}
            {[
              { signId: 12, name: 'Pisces (Meena)', house: ((12 - lagnaSignId + 12) % 12) + 1 },
              { signId: 1, name: 'Aries (Mesha)', house: ((1 - lagnaSignId + 12) % 12) + 1 },
              { signId: 2, name: 'Taurus (Vrishabha)', house: ((2 - lagnaSignId + 12) % 12) + 1 },
              { signId: 3, name: 'Gemini (Mithuna)', house: ((3 - lagnaSignId + 12) % 12) + 1 },
              { signId: 11, name: 'Aquarius (Kumbha)', house: ((11 - lagnaSignId + 12) % 12) + 1 },
              null, // Center 2x2
              null,
              { signId: 4, name: 'Cancer (Karka)', house: ((4 - lagnaSignId + 12) % 12) + 1 },
              { signId: 10, name: 'Capricorn (Makara)', house: ((10 - lagnaSignId + 12) % 12) + 1 },
              null,
              null,
              { signId: 5, name: 'Leo (Simha)', house: ((5 - lagnaSignId + 12) % 12) + 1 },
              { signId: 9, name: 'Sagittarius (Dhanu)', house: ((9 - lagnaSignId + 12) % 12) + 1 },
              { signId: 8, name: 'Scorpio (Vrishchika)', house: ((8 - lagnaSignId + 12) % 12) + 1 },
              { signId: 7, name: 'Libra (Tula)', house: ((7 - lagnaSignId + 12) % 12) + 1 },
              { signId: 6, name: 'Virgo (Kanya)', house: ((6 - lagnaSignId + 12) % 12) + 1 },
            ].map((cell, idx) => {
              if (idx === 5) {
                return (
                  <div
                    key="center-box"
                    className="col-span-2 row-span-2 border border-cosmic-gold/40 flex flex-col items-center justify-center bg-cosmic-galaxy p-2 text-center"
                  >
                    <div className="text-cosmic-gold font-cinzel font-bold text-sm">
                      {chartType === 'D1-Lagna' ? 'Rashi Chakra' : 'Navamsha'}
                    </div>
                    <div className="text-xs text-cosmic-white/60 mt-1">
                      Lagna: {kundli.lagna.sign}
                    </div>
                  </div>
                );
              }
              if (cell === null) return null;

              const isLagna = cell.signId === lagnaSignId;
              const cellPlanets = planetsByHouse[cell.house] || [];

              return (
                <div
                  key={cell.signId}
                  onClick={() => setSelectedHouse(cell.house)}
                  className={`border border-cosmic-gold/30 p-1.5 flex flex-col justify-between text-xs transition-colors cursor-pointer hover:bg-cosmic-gold/10 ${
                    isLagna ? 'bg-cosmic-gold/15' : 'bg-cosmic-midnight/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-cosmic-white/50">{cell.signId}</span>
                    {isLagna && (
                      <span className="text-[9px] px-1 rounded bg-cosmic-gold text-cosmic-midnight font-bold">
                        ASC
                      </span>
                    )}
                  </div>
                  <div className="font-bold text-center text-amber-200 text-xs">
                    {cellPlanets.join(' ')}
                  </div>
                  <div className="text-[9px] text-cosmic-white/40 text-right">
                    H{cell.house}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Selected House Details Drawer / Card */}
        {selectedHouse && (
          <div className="mt-5 w-full p-4 rounded-2xl bg-cosmic-midnight/90 border border-cosmic-gold/40 text-xs md:text-sm animate-fadeIn">
            <div className="flex items-center justify-between text-cosmic-gold font-bold mb-1">
              <span>
                House {selectedHouse}: {HOUSE_SIGNIFICANCE[selectedHouse]?.name}
              </span>
              <button
                onClick={() => setSelectedHouse(null)}
                className="text-cosmic-white/60 hover:text-cosmic-white text-xs underline"
              >
                Close
              </button>
            </div>
            <p className="text-cosmic-white/80 font-poppins">
              {HOUSE_SIGNIFICANCE[selectedHouse]?.meaning}
            </p>
            <div className="mt-2 text-xs flex gap-2">
              <span className="text-cosmic-peacock">Planets present:</span>
              <span className="font-semibold text-cosmic-white">
                {planetsByHouse[selectedHouse]?.length > 0 ? planetsByHouse[selectedHouse].join(', ') : 'None (Empty House)'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
