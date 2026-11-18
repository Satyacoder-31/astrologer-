export interface AstrologyService {
  slug: string;
  title: string;
  sanskritTitle: string;
  tagline: string;
  iconName: string;
  description: string;
  benefits: string[];
  process: string[];
  faqs: { question: string; answer: string }[];
  recommendedAstrologers: string[];
}

export const ASTROLOGY_SERVICES: AstrologyService[] = [
  {
    slug: 'vedic-astrology',
    title: 'Vedic Astrology',
    sanskritTitle: 'वैदिक ज्योतिष (Jyotish Shastra)',
    tagline: 'Ancient Indian light of wisdom to navigate destiny and cosmic law',
    iconName: 'Sparkles',
    description: 'Rooted in the sacred Vedas, Vedic Astrology (Jyotish) is the science of light that analyzes the exact cosmic blueprint at the time of your birth to unveil your soul purpose, karmic lessons, life cycles, and divine destiny.',
    benefits: [
      'Comprehensive understanding of your Lagna (Ascendant), Moon sign, and Sun sign',
      'Detailed planetary Mahadasha & Antardasha timeline for lifetime event mapping',
      'Identification of auspicious career, financial, and personal breakthrough windows',
      'Time-tested remedial measures including mantras, yantras, and Vedic charities',
    ],
    process: [
      'Accurate birth data entry (Date, exact time, and birthplace coordinates)',
      'Sidereal chart generation using Lahiri Ayanamsa',
      'Planetary strength assessment (Shadbala, Bhavabala, and Avasthas)',
      '1-on-1 personalized guidance with a verified Vedic Acharya',
    ],
    faqs: [
      {
        question: 'How is Vedic astrology different from Western astrology?',
        answer: 'Vedic astrology uses the Sidereal (Nirayana) zodiac based on observable fixed stars and accounts for the precession of equinoxes (Ayanamsa), whereas Western astrology uses the Tropical (Sayana) zodiac based on seasonal solar positions.',
      },
      {
        question: 'Can Vedic astrology predict exact events?',
        answer: 'Yes, through the combined analysis of Vimshottari Dasha, Gochara (planetary transits), and Ashtakavarga points, astrologers can identify precise time windows for major life events.',
      },
    ],
    recommendedAstrologers: ['dr-amit-deshmukh', 'pt-radheshyam-shastri'],
  },
  {
    slug: 'kundli-analysis',
    title: 'Kundli Analysis',
    sanskritTitle: 'जन्म कुण्डली विवेचन',
    tagline: 'Deep dive into your 12 Bhavas, planetary aspects, and cosmic blueprints',
    iconName: 'Compass',
    description: 'Your Kundli is a snapshot of the celestial heavens at the precise moment of your first breath. Our detailed analysis reveals the subtle interplay of your 12 houses governing wealth, health, marriage, dharma, and moksha.',
    benefits: [
      'Uncover planetary yogas (Raj Yoga, Gajakesari Yoga, Dhan Yoga, Neechbhanga)',
      'Analysis of challenging placements and Doshas (Manglik, Pitra, Kaal Sarp)',
      'House-by-house breakdown of life areas from personality to salvation',
      'Personalized gemstones and lifestyle remedies for afflicted planets',
    ],
    process: [
      'Ascendant and house cusp calculation',
      'Divisional chart cross-referencing (D1 Rashi, D9 Navamsa, D10 Dashamsha)',
      'Detailed diagnostic consultation',
    ],
    faqs: [
      {
        question: 'What if I do not know my exact birth time?',
        answer: 'You can consult our experts for Prashna Kundali (Horary Astrology) or Birth Time Rectification (BTR) to reconstruct your chart accurately.',
      },
    ],
    recommendedAstrologers: ['dr-amit-deshmukh', 'vidushi-gayatri-devi'],
  },
  {
    slug: 'numerology',
    title: 'Numerology',
    sanskritTitle: 'अंक ज्योतिष (Ank Jyotish)',
    tagline: 'Harness the cosmic vibrational power of numbers and your sacred name',
    iconName: 'Binary',
    description: 'Every number carries a unique vibrational frequency linked to a ruling celestial deity. Numerology helps you optimize your name spelling, discover your Life Path and Destiny numbers, and align with lucky dates and colors.',
    benefits: [
      'Life Path, Destiny, Soul Urge, and Personality number calculation',
      'Name correction and spelling optimization for career & marriage success',
      'Business name, brand name, and mobile number compatibility analysis',
      'Yearly and monthly personal vibrational forecasts',
    ],
    process: [
      'Chaldean and Pythagorean numerological conversion',
      'Planetary vibration alignment with your birth chart',
      'Actionable name and brand recommendation report',
    ],
    faqs: [
      {
        question: 'Can changing my name spelling really help?',
        answer: 'Yes, subtle adjustments in letter vibrations alter the phonetic and cosmic resonance of how people address you and how opportunities gravitate toward you.',
      },
    ],
    recommendedAstrologers: ['dr-amit-deshmukh', 'acharyaa-tanya-khanna'],
  },
  {
    slug: 'palmistry',
    title: 'Palmistry',
    sanskritTitle: 'हस्तरेखा शास्त्र (Hastarekha)',
    tagline: 'Read the divine blueprint inscribed on the palms of your hands',
    iconName: 'Hand',
    description: 'Your hands are the mirrors of your subconscious mind and destiny. Palmistry interprets the principal lines (Life, Heart, Head, Fate, Sun), mounts of the planets, and auspicious markings like triangles, tridents, and fish signs.',
    benefits: [
      'Analysis of Life Line, Heart Line, Head Line, and Fate Line',
      'Mount examination for planetary dominance (Jupiter, Venus, Saturn mounts)',
      'Foreign travel, career breakthroughs, and wealth indicators',
      'Health warnings and vitality assessment',
    ],
    process: [
      'Clear high-resolution photo upload of both palms',
      'Mount, line, and dermatoglyphic analysis by certified palmist',
      'Live consultation to verify life markers',
    ],
    faqs: [
      {
        question: 'Do palm lines change over time?',
        answer: 'Yes! While major primary lines remain stable, secondary lines, branches, and mount markings evolve dynamically as your conscious thoughts, deeds, and lifestyle change.',
      },
    ],
    recommendedAstrologers: ['dr-amit-deshmukh', 'dr-meenakshi-sundaram'],
  },
  {
    slug: 'tarot-reading',
    title: 'Tarot Reading',
    sanskritTitle: 'टैरो कार्ड परामर्श',
    tagline: 'Intuitive archetypal cards revealing current energies and imminent choices',
    iconName: 'Layers',
    description: 'Tarot taps into the synchronistic quantum field of the present moment. By channeling archetypal symbols, our gifted readers clarify dilemmas, unmask hidden obstacles, and empower you with timely choices.',
    benefits: [
      'Immediate clarity on love dilemmas, breakups, and third-party situations',
      'Career direction, interview outcomes, and workplace dynamics',
      'Spiritual messages from spirit guides and divine consciousness',
      'Empowering action steps rather than fatalistic prophecies',
    ],
    process: [
      'Intentional question focusing',
      'Sacred card shuffle and spread selection (Celtic Cross, Horseshoe, 3-Card)',
      'Live interactive interpretation session',
    ],
    faqs: [
      {
        question: 'Is Tarot contradictory to Vedic astrology?',
        answer: 'Not at all. While Vedic astrology provides the overarching architectural lifetime blueprint, Tarot reveals immediate micro-energies and subconscious blocks.',
      },
    ],
    recommendedAstrologers: ['acharyaa-tanya-khanna', 'vidushi-gayatri-devi'],
  },
  {
    slug: 'vastu-consultation',
    title: 'Vastu Consultation',
    sanskritTitle: 'वास्तु शास्त्र (Vastu Shastra)',
    tagline: 'Harmonize the 5 cosmic elements and directional energies in your space',
    iconName: 'Home',
    description: 'Vastu Shastra aligns the five primordial elements (Pancha Bhoota: Earth, Water, Fire, Air, Space) with the 16 magnetic directions of your home, office, or factory to promote health, prosperity, and peace.',
    benefits: [
      'Remedies without demolition using colors, pyramids, crystals, and mirrors',
      'Placement optimization for main door, kitchen, master bedroom, and puja room',
      'Commercial Vastu for footfall, cash flow, and client retention',
      'Identification of geopathic stress and directional energy blockages',
    ],
    process: [
      'Floor plan and compass directional layout review',
      'Zonal analysis and element balancing assessment',
      'Customized non-invasive remedial layout map',
    ],
    faqs: [
      {
        question: 'Do I need to break walls for Vastu correction?',
        answer: 'No. Modern Vastu acharyas like Dr. Amit Deshmukh specialize in non-structural remedial measures that rebalance elemental zones effectively.',
      },
    ],
    recommendedAstrologers: ['dr-amit-deshmukh'],
  },
  {
    slug: 'marriage-compatibility',
    title: 'Marriage Compatibility',
    sanskritTitle: 'विवाह मेलापक एवं गुण मिलान',
    tagline: 'Ashtakoot 36 Guna Milan, Manglik assessment, and matrimonial bliss',
    iconName: 'HeartHandshake',
    description: 'Marriage is not just the union of two individuals but two cosmic souls and ancestral lineages. We perform rigorous 36-point Ashtakoot Milan, D9 Navamsha comparison, and planetary longevity checks.',
    benefits: [
      'Ashtakoot score breakdown across Varna, Vashya, Tara, Yoni, Maitri, Gana, Bhakoot, Nadi',
      'Comprehensive Manglik Dosha matching and mitigation strategies',
      'Mental, emotional, and physical harmony assessment',
      'Prosperity and childbearing (Putra Bhava) planetary evaluation',
    ],
    process: [
      'Boy and Girl birth details input',
      'Comparative Kundli alignment and cross-planetary aspects',
      'Detailed relationship compatibility report and expert consultation',
    ],
    faqs: [
      {
        question: 'What if our Guna score is less than 18?',
        answer: 'While 18+ is traditionally considered standard, deep chart analysis often reveals cancellation factors (Dosha Bhanga) or specific Vedic remedies that make the union successful.',
      },
    ],
    recommendedAstrologers: ['vidushi-gayatri-devi', 'dr-amit-deshmukh'],
  },
  {
    slug: 'career-prediction',
    title: 'Career Prediction',
    sanskritTitle: 'व्यवसाय एवं आजीविका योग',
    tagline: 'Align your vocational trajectory with your 10th House Karma Bhava',
    iconName: 'Briefcase',
    description: 'Are you meant for corporate leadership, government service, independent consultancy, or entrepreneurship? Unlock the secrets of your Dashamsha (D10) chart and plan promotions, job changes, and career shifts with celestial confidence.',
    benefits: [
      'Analysis of 10th house lord, Dashamsha (D10), and Amatyakaraka planet',
      'Timing of job promotions, salary appraisals, and overseas transfers',
      'Choosing between corporate employment vs startup entrepreneurship',
      'Remedies for office politics, stagnation, and career instability',
    ],
    process: [
      '10th and 6th house karma analysis',
      'Running dasha and transit review (Jupiter, Saturn, Rahu)',
      'Actionable career roadmap with auspicious timing',
    ],
    faqs: [
      {
        question: 'Which planet rules career growth?',
        answer: 'The Sun represents authority, Saturn represents persistence and service, Mercury rules business intellect, and Mars gives administrative prowess. The specific lord of your 10th house governs your primary vocational path.',
      },
    ],
    recommendedAstrologers: ['pt-radheshyam-shastri', 'dr-amit-deshmukh'],
  },
  {
    slug: 'business-astrology',
    title: 'Business Astrology',
    sanskritTitle: 'व्यापार ज्योतिष',
    tagline: 'Strategic corporate timing, partnership synergy, and wealth yogas',
    iconName: 'TrendingUp',
    description: 'From selecting auspicious brand launch dates to vetting business partners and managing cash flow cycles, Business Astrology empowers founders with macro-cosmic intelligence.',
    benefits: [
      'Partner compatibility and equity synergy analysis',
      'Auspicious company incorporation and product launch Muhurtas',
      'Dhan Yoga and Labha Bhava (11th House) wealth potential review',
      'Market cycle and economic transit risk management',
    ],
    process: [
      'Founder birth charts and business registration chart synchronization',
      'Financial house (2nd, 9th, 11th) strength calculation',
      'Strategic corporate consultation',
    ],
    faqs: [
      {
        question: 'Can a company have its own Kundli?',
        answer: 'Yes! The exact date, time, and city of signing incorporation papers creates the birth chart of the company, dictating its lifecycle and growth hurdles.',
      },
    ],
    recommendedAstrologers: ['pt-radheshyam-shastri', 'dr-amit-deshmukh'],
  },
  {
    slug: 'relationship-guidance',
    title: 'Relationship Guidance',
    sanskritTitle: 'प्रेम एवं संबंध मार्गदर्शन',
    tagline: 'Heal emotional rifts, understand your partner, and nurture true love',
    iconName: 'Heart',
    description: 'Love is the divine dance of Radha and Krishna. When misunderstandings, trust issues, or family pressures cloud your bond, relationship astrology shines clarity on the underlying psychological and karmic knots.',
    benefits: [
      '7th House (Partnership) and 5th House (Romance) diagnosis',
      'Venus and Mars synergy for emotional and physical fulfillment',
      'Resolution of recurring conflicts and third-party interference',
      'Strengthening soulful communication and emotional commitment',
    ],
    process: [
      'Synastry and composite planetary overlay',
      'Compassionate counseling session with actionable tips',
    ],
    faqs: [
      {
        question: 'Can astrology help bring an ex back?',
        answer: 'Astrology reveals the authentic karmic chord between two people, whether a reunion is in your highest soul interest, and the timing of reconciliation if destined.',
      },
    ],
    recommendedAstrologers: ['vidushi-gayatri-devi', 'acharyaa-tanya-khanna'],
  },
  {
    slug: 'horoscope-analysis',
    title: 'Horoscope Analysis',
    sanskritTitle: 'दैनिक एवं वार्षिक भविष्यफल',
    tagline: 'Understand the weekly, monthly, and annual transits shaping your days',
    iconName: 'Calendar',
    description: 'Get continuous celestial foresight with personalized Varshaphala (Solar Return) charts, transit tracking of Jupiter, Saturn, Rahu, and Ketu, and daily lunar mood indicators.',
    benefits: [
      'Annual Varshaphala predictions with Tajika yogas',
      'Major planetary transit impacts (Guru Gochar, Shani Gochar)',
      'Quarterly financial, romantic, and health outlook',
      'Customized monthly calendar of favorable and caution days',
    ],
    process: [
      'Annual solar return calculation',
      'Transit overlay on natal chart',
      'Comprehensive report delivery with live review',
    ],
    faqs: [
      {
        question: 'What is Varshaphala?',
        answer: 'Varshaphala is your annual birth chart cast for the exact moment the Sun returns to the identical celestial longitude it occupied at your birth, detailing the events of that particular year.',
      },
    ],
    recommendedAstrologers: ['dr-amit-deshmukh', 'dr-meenakshi-sundaram'],
  },
  {
    slug: 'muhurta-consultation',
    title: 'Muhurta Consultation',
    sanskritTitle: 'शुभ मुहूर्त निर्धारण',
    tagline: 'Initiate critical life events at the exact cosmic moment of success',
    iconName: 'Clock',
    description: 'Timing is everything in the cosmos. Choosing an auspicious Shubh Muhurta aligns your action with favorable cosmic frequencies, neutralizing negative planetary influences and magnifying success.',
    benefits: [
      'Wedding and Vivaha Muhurta selection for lifelong harmony',
      'Griha Pravesh (Housewarming) and property purchase timing',
      'Business launch, contract signing, and vehicle delivery slots',
      'Avoidance of Rahu Kaal, Gulika Kaal, Bhadra, and Rikta tithis',
    ],
    process: [
      'Target time window and nature of ceremony definition',
      'Panchanga Shuddhi check (Tithi, Vara, Nakshatra, Yoga, Karana)',
      'Selection of peak Amrit or Abhijit Muhurta window',
    ],
    faqs: [
      {
        question: 'Why is Abhijit Muhurat considered so auspicious?',
        answer: 'Abhijit Muhurat occurs around midday (midpoint of sunrise and sunset) and is blessed by Lord Vishnu to destroy millions of subtle astrological doshas.',
      },
    ],
    recommendedAstrologers: ['pt-radheshyam-shastri', 'dr-amit-deshmukh'],
  },
];

export function getServiceBySlug(slug: string): AstrologyService | undefined {
  return ASTROLOGY_SERVICES.find((s) => s.slug === slug);
}
