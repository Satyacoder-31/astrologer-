export interface ZodiacSignHoroscope {
  sign: string;
  sanskrit: string;
  symbol: string;
  dates: string;
  element: 'Fire' | 'Earth' | 'Air' | 'Water';
  rulingPlanet: string;
  daily: {
    overview: string;
    love: string;
    career: string;
    health: string;
    luckyNumber: number;
    luckyColor: string;
    cosmicTip: string;
    compatibility: string;
  };
  weekly: {
    summary: string;
    keyThemes: string[];
  };
  monthly: {
    summary: string;
    financialOutlook: string;
  };
  yearly: {
    year: number;
    theme: string;
    prediction: string;
  };
}

export const ZODIAC_HOROSCOPES: Record<string, ZodiacSignHoroscope> = {
  aries: {
    sign: 'Aries',
    sanskrit: 'Mesha (मेष)',
    symbol: '♈',
    dates: 'Mar 21 - Apr 19',
    element: 'Fire',
    rulingPlanet: 'Mars (Mangala)',
    daily: {
      overview: 'Mars infuses your spirit with bold vitality today. An unexpected communication from a mentor brings great clarity to a pending decision.',
      love: 'Speak from the heart; vulnerability will deepen your bond today. Singles may meet someone with strong spiritual resonance.',
      career: 'Your pioneering drive catches the attention of senior decision-makers. Step forward with that innovative proposition.',
      health: 'High energy, but avoid over-exertion during physical workouts. Drink warm herbal infusions.',
      luckyNumber: 9,
      luckyColor: 'Divine Saffron',
      cosmicTip: 'Direct passion into constructive service rather than combative debates.',
      compatibility: 'Leo & Sagittarius',
    },
    weekly: {
      summary: 'A transformative week for professional initiatives. Mid-week brings financial gains through past investments.',
      keyThemes: ['Leadership', 'Financial Realignment', 'Clear Communication'],
    },
    monthly: {
      summary: 'The transit of Jupiter highlights your 2nd house of accumulated wealth and family happiness.',
      financialOutlook: 'Favorable for long-term investments; avoid speculative intraday bets.',
    },
    yearly: {
      year: 2026,
      theme: 'Expansion & Spiritual Rebirth',
      prediction: 'A landmark year where long-delayed goals materialize swiftly. Saturn tests your patience early, but Jupiter brings triumphant rewards by mid-year.',
    },
  },
  taurus: {
    sign: 'Taurus',
    sanskrit: 'Vrishabha (वृषभ)',
    symbol: '♉',
    dates: 'Apr 20 - May 20',
    element: 'Earth',
    rulingPlanet: 'Venus (Shukra)',
    daily: {
      overview: 'Venus bestows aesthetic harmony and emotional calm. Your artistic instincts and financial acumen are exceptionally sharp today.',
      love: 'A tranquil evening with your beloved brings deep reassurance. Meaningful gestures matter far more than lavish gifts.',
      career: 'Negotiations regarding contracts or property resolve in your favor. Trust your methodical instincts.',
      health: 'Pay attention to throat comfort. Honey and ginger tea will soothe your vocal energies.',
      luckyNumber: 6,
      luckyColor: 'Emerald Green',
      cosmicTip: 'Appreciate simple abundance; gratitude unlocks hidden cosmic doors.',
      compatibility: 'Virgo & Capricorn',
    },
    weekly: {
      summary: 'Steadiness and discipline bring tangible rewards. An elder provides invaluable counsel.',
      keyThemes: ['Financial Stability', 'Aesthetic Creations', 'Patience'],
    },
    monthly: {
      summary: 'Venus in your 5th house ignites creative projects, romantic joy, and speculative intelligence.',
      financialOutlook: 'Strong steady cash inflows; ideal time for home beautification.',
    },
    yearly: {
      year: 2026,
      theme: 'Material Abundance & Sacred Anchor',
      prediction: 'You will establish unbreakable foundations in your career and domestic life, overcoming past hesitations with graceful determination.',
    },
  },
  gemini: {
    sign: 'Gemini',
    sanskrit: 'Mithuna (मिथुन)',
    symbol: '♊',
    dates: 'May 21 - Jun 20',
    element: 'Air',
    rulingPlanet: 'Mercury (Budha)',
    daily: {
      overview: 'Budha activates your intellect and eloquence. Your communication skills sparkle, making this an ideal day for presentations and meetings.',
      love: 'Lively banter and intellectual chemistry reignite sparks. Listen deeply to what remains unsaid.',
      career: 'A breakthrough solution to a multifaceted problem earns you praise from colleagues.',
      health: 'Mental restlessness can disturb sleep. Practice pranayama before turning off the lights.',
      luckyNumber: 5,
      luckyColor: 'Peacock Turquoise',
      cosmicTip: 'Focus your restless brilliance on one meaningful priority rather than scattering your light.',
      compatibility: 'Libra & Aquarius',
    },
    weekly: {
      summary: 'Networking, writing, and digital communication flourish. Be mindful of commitments made in haste.',
      keyThemes: ['Intellectual Agility', 'New Collaborations', 'Digital Reach'],
    },
    monthly: {
      summary: 'Mercury illuminates your 10th house of career fame and public standing.',
      financialOutlook: 'Income through consulting, writing, or technology endeavors sees a notable uptick.',
    },
    yearly: {
      year: 2026,
      theme: 'Mastery of Knowledge & Networking',
      prediction: 'A whirlwind year of learning, foreign connections, and commercial breakthroughs. You will finally discover the bridge connecting passion with profit.',
    },
  },
  cancer: {
    sign: 'Cancer',
    sanskrit: 'Karka (कर्क)',
    symbol: '♋',
    dates: 'Jun 21 - Jul 22',
    element: 'Water',
    rulingPlanet: 'Moon (Chandra)',
    daily: {
      overview: 'Chandra enhances your intuitive sensitivity. Trust the quiet whisper of your gut over noisy external opinions.',
      love: 'Nurturing energy surrounds your relationships. Emotional honesty heals old unspoken misunderstandings.',
      career: 'Collaborative projects thrive under your compassionate leadership. Avoid emotional reaction in formal meetings.',
      health: 'Focus on digestive balance and emotional equilibrium. Spend time near pure water.',
      luckyNumber: 2,
      luckyColor: 'Pearl Silver',
      cosmicTip: 'Protect your psychic sanctuary; say a graceful no to energy-draining conversations.',
      compatibility: 'Scorpio & Pisces',
    },
    weekly: {
      summary: 'A time of domestic rejuvenation and deepening spiritual realization. Family ties grow firmer.',
      keyThemes: ['Intuition', 'Family Harmony', 'Emotional Sanctuary'],
    },
    monthly: {
      summary: 'The new moon activates your 9th house of fortune, spiritual wisdom, and long-distance travel.',
      financialOutlook: 'Stable; expenditure on domestic comfort or sacred pilgrimage brings peace.',
    },
    yearly: {
      year: 2026,
      theme: 'Emotional Sovereignty & Soul Purpose',
      prediction: 'You step into your profound inner strength, releasing past emotional baggage to build an empire of love and security.',
    },
  },
  leo: {
    sign: 'Leo',
    sanskrit: 'Simha (सिंह)',
    symbol: '♌',
    dates: 'Jul 23 - Aug 22',
    element: 'Fire',
    rulingPlanet: 'Sun (Surya)',
    daily: {
      overview: 'The radiant Sun illuminates your charismatic presence. People naturally look to you for direction and confidence.',
      love: 'Your warmth and generosity are magnetic. Plan a royal celebration or heartfelt dinner for someone special.',
      career: 'Leadership initiatives take flight. A promotion or executive responsibility is within reach.',
      health: 'Vitality is high; maintain cardiovascular health with brisk outdoor walks during sunrise.',
      luckyNumber: 1,
      luckyColor: 'Royal Gold',
      cosmicTip: 'True majesty lies in lifting others higher. Lead with humility and noble compassion.',
      compatibility: 'Aries & Sagittarius',
    },
    weekly: {
      summary: 'Public recognition and creative breakthroughs mark this week. Express your authentic voice boldly.',
      keyThemes: ['Radiance', 'Leadership Authority', 'Creative Honor'],
    },
    monthly: {
      summary: 'The Sun energizes your 11th house of grand gains, prestigious networks, and fulfilled wishes.',
      financialOutlook: 'Excellent cash flow through authoritative roles and senior alliances.',
    },
    yearly: {
      year: 2026,
      theme: 'Golden Authority & Creative Zenith',
      prediction: 'A coronation year where your authentic talents receive the worldwide stage they deserve. Stand tall in your regal purpose.',
    },
  },
  virgo: {
    sign: 'Virgo',
    sanskrit: 'Kanya (कन्या)',
    symbol: '♍',
    dates: 'Aug 23 - Sep 22',
    element: 'Earth',
    rulingPlanet: 'Mercury (Budha)',
    daily: {
      overview: 'Your precision and diagnostic acumen are extraordinary today. Details that others miss become your greatest competitive advantage.',
      love: 'Thoughtful service speaks louder than grandiose words. A practical gesture of help warms your partner deeply.',
      career: 'Analytical and organizational projects achieve peak clarity. Excellent for auditing, coding, and streamlining systems.',
      health: 'Support gut microbiome health with wholesome sattvic foods and mindful chewing.',
      luckyNumber: 7,
      luckyColor: 'Forest Moss',
      cosmicTip: 'Release the trap of perfectionism; remember that progress is already divine perfection in motion.',
      compatibility: 'Taurus & Capricorn',
    },
    weekly: {
      summary: 'Organizing finances and clearing backlogs brings tremendous psychological relief.',
      keyThemes: ['Precision', 'Holistic Wellness', 'System Efficiency'],
    },
    monthly: {
      summary: 'Planetary alignments favor career specialization, certifications, and health upgrades.',
      financialOutlook: 'Prudent budgeting yields substantial savings and smart capital allocation.',
    },
    yearly: {
      year: 2026,
      theme: 'Holistic Mastery & Elevated Service',
      prediction: 'Your meticulous discipline converts your technical skills into an indispensable authority in your field.',
    },
  },
  libra: {
    sign: 'Libra',
    sanskrit: 'Tula (तुला)',
    symbol: '♎',
    dates: 'Sep 23 - Oct 22',
    element: 'Air',
    rulingPlanet: 'Venus (Shukra)',
    daily: {
      overview: 'Venus awakens balance, artistic discernment, and social charm. You are the peacemaker who dissolves conflicts effortlessly.',
      love: 'Soulful harmony blossoms in romantic bonds. A deep conversation restores sweet intimacy.',
      career: 'Partnerships and joint ventures yield fruitful results. Your diplomatic negotiating skills win every party over.',
      health: 'Focus on kidney hydration and lower back stretching.',
      luckyNumber: 6,
      luckyColor: 'Rose Quartz',
      cosmicTip: 'Seek equilibrium not by compromising your truth, but by anchoring in divine justice.',
      compatibility: 'Gemini & Aquarius',
    },
    weekly: {
      summary: 'Contracts and alliances reach pivotal signing stages. Social invitations expand your sphere.',
      keyThemes: ['Diplomacy', 'Aesthetic Balance', 'Partnership Grace'],
    },
    monthly: {
      summary: 'Jupiter glances at your 7th house, infusing business partnerships and marital life with divine blessings.',
      financialOutlook: 'Lucrative outcomes through collaborations, law, arts, or luxury trade.',
    },
    yearly: {
      year: 2026,
      theme: 'Divine Union & Graceful Elevation',
      prediction: 'A landmark year for sacred partnerships, marriage, and prestigious collaborative milestones that elevate your social stature.',
    },
  },
  scorpio: {
    sign: 'Scorpio',
    sanskrit: 'Vrishchika (वृश्चिक)',
    symbol: '♏',
    dates: 'Oct 23 - Nov 21',
    element: 'Water',
    rulingPlanet: 'Mars & Ketu',
    daily: {
      overview: 'Intense, penetrating intuition guides your steps. You see straight through pretenses and unlock hidden truths.',
      love: 'Passionate and transformative emotional currents. Deep secrets shared forge unbreakable loyalty.',
      career: 'Research, strategic investigations, and crisis resolution proceed with extraordinary mastery.',
      health: 'Detoxify your physical and mental aura through salt baths and grounding meditation.',
      luckyNumber: 8,
      luckyColor: 'Deep Cosmic Crimson',
      cosmicTip: 'Use your intense power to regenerate and heal, never to hold grudges.',
      compatibility: 'Cancer & Pisces',
    },
    weekly: {
      summary: 'Financial recalculations and occult or strategic insights unlock new avenues of abundance.',
      keyThemes: ['Transformation', 'Psychic Depth', 'Strategic Power'],
    },
    monthly: {
      summary: 'Mars activates your 8th and 9th houses, bringing profound spiritual revelations and unexpected windfalls.',
      financialOutlook: 'Favorable for inheritance, royalties, or settling long-term debts.',
    },
    yearly: {
      year: 2026,
      theme: 'Phoenix Rebirth & Mystic Power',
      prediction: 'You rise triumphantly from past tribulations into unmatched personal sovereignty, feared by obstacles and revered by allies.',
    },
  },
  sagittarius: {
    sign: 'Sagittarius',
    sanskrit: 'Dhanu (धनु)',
    symbol: '♐',
    dates: 'Nov 22 - Dec 21',
    element: 'Fire',
    rulingPlanet: 'Jupiter (Brihaspati)',
    daily: {
      overview: 'Brihaspati showers philosophical optimism and expansive wisdom. Your visionary perspective inspires everyone around you.',
      love: 'Adventures shared create unforgettable memories. An honest philosophical debate sparks passionate connection.',
      career: 'Global prospects, higher education, or publishing ventures gain momentum. Aim your cosmic arrow high.',
      health: 'Vitality is strong; support liver health with bitter greens and pure spring water.',
      luckyNumber: 3,
      luckyColor: 'Bright Saffron Gold',
      cosmicTip: 'Wisdom without compassionate application is mere theory. Live your truth generously.',
      compatibility: 'Aries & Leo',
    },
    weekly: {
      summary: 'Travel, legal affairs, and mentorship initiatives yield breakthroughs. A teacher or guru appears.',
      keyThemes: ['Philosophical Expansion', 'Global Vision', 'Spiritual Luck'],
    },
    monthly: {
      summary: 'Jupiter casts its auspicious trine onto your Lagna, radiating luck, health, and spiritual charisma.',
      financialOutlook: 'Generous gains through teaching, foreign clients, or ethical entrepreneurship.',
    },
    yearly: {
      year: 2026,
      theme: 'Dharmic Expansion & Universal Blessings',
      prediction: 'The guru planet opens gateways to international recognition, deep spiritual awakening, and bountiful material fortune.',
    },
  },
  capricorn: {
    sign: 'Capricorn',
    sanskrit: 'Makara (मकर)',
    symbol: '♑',
    dates: 'Dec 22 - Jan 19',
    element: 'Earth',
    rulingPlanet: 'Saturn (Shani)',
    daily: {
      overview: 'Shani rewards your steady perseverance and unyielding integrity. What you construct today is built to endure for decades.',
      love: 'Loyalty and steadfast devotion are your greatest romantic strengths. Show your reliability through action.',
      career: 'Institutional respect and long-term milestones are achieved. Executive authority is reinforced.',
      health: 'Take care of joints, knees, and bone health. Practice mindful posture.',
      luckyNumber: 8,
      luckyColor: 'Midnight Navy Blue',
      cosmicTip: 'Time is the greatest alchemist. Never rush what the cosmos is shaping to be eternal.',
      compatibility: 'Taurus & Virgo',
    },
    weekly: {
      summary: 'Professional responsibilities peak, accompanied by solid financial recognition and organizational trust.',
      keyThemes: ['Discipline', 'Karmic Rewards', 'Executive Mastery'],
    },
    monthly: {
      summary: 'Saturn stabilizes your 2nd house of sustained wealth, while Venus brings delightful domestic comfort.',
      financialOutlook: 'Solid, reliable, and compounding growth; great for real estate or blue-chip assets.',
    },
    yearly: {
      year: 2026,
      theme: 'Empire Building & Karmic Triumph',
      prediction: 'Years of quiet dedication culminate in undeniable societal leadership and unshakeable financial independence.',
    },
  },
  aquarius: {
    sign: 'Aquarius',
    sanskrit: 'Kumbha (कुम्भ)',
    symbol: '♒',
    dates: 'Jan 20 - Feb 18',
    element: 'Air',
    rulingPlanet: 'Saturn & Rahu',
    daily: {
      overview: 'Visionary humanitarian ideas and futuristic insights flood your mind. You are ahead of your time.',
      love: 'Celebrate uniqueness in your relationship. A deep intellectual friendship is the cornerstone of lasting love.',
      career: 'Technological innovations, community organizing, and unconventional solutions succeed brilliantly.',
      health: 'Stimulate lymphatic circulation with light movement and dry brushing.',
      luckyNumber: 4,
      luckyColor: 'Electric Violet',
      cosmicTip: 'Dare to walk the path less traveled; the collective future is waiting for your bold leadership.',
      compatibility: 'Gemini & Libra',
    },
    weekly: {
      summary: 'Group networks, social impact, and innovative digital creations capture widespread attention.',
      keyThemes: ['Innovation', 'Community Leadership', 'Humanitarian Vision'],
    },
    monthly: {
      summary: 'Rahu and Saturn combine to grant disruptive breakthroughs in your scientific, artistic, or business projects.',
      financialOutlook: 'Surge in unconventional income channels, crowdfunding, or technology investments.',
    },
    yearly: {
      year: 2026,
      theme: 'Quantum Leaps & Revolutionary Impact',
      prediction: 'You liberate yourself from all limiting paradigms and pioneer a transformative venture that touches thousands of lives.',
    },
  },
  pisces: {
    sign: 'Pisces',
    sanskrit: 'Meena (मीन)',
    symbol: '♓',
    dates: 'Feb 19 - Mar 20',
    element: 'Water',
    rulingPlanet: 'Jupiter & Ketu',
    daily: {
      overview: 'Mystic imagination, boundless empathy, and divine dreams guide your spirit today. The veil between worlds is thin.',
      love: 'Transcendent, unconditional love fills your aura. Soulmate vibrations are exceptionally strong.',
      career: 'Artistic creations, healing modalities, and spiritual counseling reach profound heights.',
      health: 'Rest deeply and practice foot reflexology. Protect your sensitive aura in crowded spaces.',
      luckyNumber: 7,
      luckyColor: 'Aquamarine Blue',
      cosmicTip: 'Surrender fear into the ocean of divine grace. You are constantly held and protected.',
      compatibility: 'Cancer & Scorpio',
    },
    weekly: {
      summary: 'Spiritual dreams and creative epiphanies provide answers to long-standing dilemmas.',
      keyThemes: ['Mystic Vision', 'Soul Healing', 'Compassion'],
    },
    monthly: {
      summary: 'Jupiter bestows divine blessings on your 12th and 1st houses, awakening spiritual enlightenment and global opportunities.',
      financialOutlook: 'Abundance flows through creative arts, spiritual services, or foreign connections.',
    },
    yearly: {
      year: 2026,
      theme: 'Spiritual Illumination & Divine Bliss',
      prediction: 'A sacred golden year of deep enlightenment, creative masterpieces, and divine union with your highest destiny.',
    },
  },
};
