export interface Astrologer {
  id: string;
  name: string;
  title: string;
  avatar: string;
  isVerified: boolean;
  isTopChoice?: boolean;
  experienceYears: number;
  experienceDisplay: string;
  specializations: string[];
  languages: string[];
  pricePerMinute: number; // in INR
  videoPricePerMinute: number;
  voicePricePerMinute: number;
  rating: number; // e.g. 5.0
  reviewCount: number;
  consultationCount: number;
  status: 'online' | 'busy' | 'offline';
  availability: string;
  bio: string;
  about: string;
  education: string[];
  certifications: string[];
  servicesOffered: {
    name: string;
    description: string;
  }[];
  consultationStats: {
    totalMinutes: number;
    repeatClients: number;
    accuracyScore: string;
  };
  publication?: {
    title: string;
    link: string;
    description: string;
    asin?: string;
  };
  reviews: {
    id: string;
    userName: string;
    userLocation: string;
    rating: number;
    date: string;
    comment: string;
    consultationType: 'Chat' | 'Voice' | 'Video';
  }[];
}

export const ASTROLOGERS_DATABASE: Astrologer[] = [
  {
    id: 'dr-amit-deshmukh',
    name: 'Dr. Amit Deshmukh',
    title: 'Vedic Astrologer, Vastu & Prashna Specialist • Ph.D. Scholar & Author',
    avatar: '/images/astrologers/dr-amit-deshmukh.jpg',
    isVerified: true,
    isTopChoice: true,
    experienceYears: 9,
    experienceDisplay: '9 Years',
    specializations: [
      'Prashna Kundali',
      'Vedic Astrology',
      'Numerology',
      'Vastu Consultation',
      'Palm Reading',
    ],
    languages: ['Hindi', 'English', 'Marathi', 'Kannada'],
    pricePerMinute: 20,
    voicePricePerMinute: 20,
    videoPricePerMinute: 20,
    rating: 5.0,
    reviewCount: 1420,
    consultationCount: 4890,
    status: 'online',
    availability: 'Monday to Sunday, 10 AM – 6 PM',
    bio: 'Dr. Amit Deshmukh has 9 years of experience in astrology and related consultation services. He provides guidance to people facing challenges in different areas of life. Author of "Experiences of Extraordinary Pleasure" with a Ph.D. thesis on the Hare Krishna Maha-Mantra and higher spiritual taste.',
    about: 'Dr. Amit Deshmukh has 9 years of experience in astrology and related consultation services. He provides guidance to people facing challenges in different areas of life.\n\nHis specializations include career, business, marriage, love relationships, finance, health and family matters. He combines traditional Vedic knowledge with practical remedies.\n\nHe has completed his doctoral research (Ph.D. Thesis) on the transcendental sound vibration of the Hare Krishna Maha-Mantra and higher spiritual taste, and is the published author of the book "Experiences of Extraordinary Pleasure".',
    education: [
      'Ph.D. Thesis on Hare Krishna Maha-Mantra & Higher Taste of Spiritual Consciousness',
      'Doctor of Philosophy (Ph.D.) in Vedic Astrology & Philosophy',
      'Jyotish Praveena & Jyotish Visharada',
      'Master of Arts in Sanskrit Literature',
    ],
    certifications: [
      'Author of "Experiences of Extraordinary Pleasure" (Available on Amazon)',
      'Certified Prashna Kundali Acharya',
      'Master Certified Vastu Consultant',
      'Federation of Indian Astrologers Gold Medalist',
    ],
    publication: {
      title: 'Experiences of Extraordinary Pleasure',
      link: 'https://www.amazon.in/Experiences-Extraordinary-pleasure-Jayant-Deshmukh/dp/8199098090?s=bazaar',
      description: 'Authored by Dr. Amit Jayant Deshmukh, exploring profound spiritual ecstasy, transcendental consciousness, and higher taste through sacred Vedic chanting and the Hare Krishna Maha-Mantra.',
      asin: '8199098090',
    },
    servicesOffered: [
      { name: 'Prashna Kundali', description: 'Answers through question-based astrology' },
      { name: 'Vedic Astrology', description: 'Traditional birth-chart analysis' },
      { name: 'Numerology', description: 'Number-based predictions' },
      { name: 'Vastu Consultation', description: 'Vastu-related guidance' },
      { name: 'Palm Reading', description: 'Palmistry and hand analysis' },
    ],
    consultationStats: {
      totalMinutes: 98400,
      repeatClients: 84,
      accuracyScore: '99.2%',
    },
    reviews: [
      {
        id: 'rev-1',
        userName: 'Rahul Sharma',
        userLocation: 'Delhi, India',
        rating: 5.0,
        date: 'Verified Client',
        comment: 'Appreciated career guidance and help with decision-making.',
        consultationType: 'Chat',
      },
      {
        id: 'rev-2',
        userName: 'Priya Verma',
        userLocation: 'Mumbai, India',
        rating: 5.0,
        date: 'Verified Client',
        comment: 'Appreciated relationship consultation and suggested remedies.',
        consultationType: 'Voice',
      },
      {
        id: 'rev-3',
        userName: 'Amit Kumar',
        userLocation: 'Bengaluru, India',
        rating: 5.0,
        date: 'Verified Client',
        comment: 'Appreciated detailed Kundli analysis and explanations.',
        consultationType: 'Chat',
      },
      {
        id: 'rev-4',
        userName: 'Sneha Patel',
        userLocation: 'Ahmedabad, India',
        rating: 5.0,
        date: 'Verified Client',
        comment: 'Appreciated video consultation regarding marriage and family.',
        consultationType: 'Video',
      },
      {
        id: 'rev-5',
        userName: 'Vikram Singh',
        userLocation: 'Jaipur, India',
        rating: 5.0,
        date: 'Verified Client',
        comment: 'Appreciated predictions and practical remedies.',
        consultationType: 'Voice',
      },
    ],
  },
  {
    id: 'vidushi-gayatri-devi',
    name: 'Vidushi Gayatri Devi',
    title: 'Senior Vedic Astrologer & Relationship Healer',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400',
    isVerified: true,
    isTopChoice: true,
    experienceYears: 14,
    experienceDisplay: '14+ Years',
    specializations: [
      'Vedic Astrology',
      'Marriage Compatibility',
      'Kundli Analysis',
      'Tarot Reading',
      'Relationship Guidance',
    ],
    languages: ['Hindi', 'English', 'Sanskrit', 'Bengali'],
    pricePerMinute: 25,
    voicePricePerMinute: 25,
    videoPricePerMinute: 35,
    rating: 4.95,
    reviewCount: 2310,
    consultationCount: 7120,
    status: 'online',
    availability: 'Daily, 8 AM – 10 PM',
    bio: 'Renowned expert in Ashtakoot Guna Milan, spiritual matchmaking, and marital harmony counseling.',
    about: 'Vidushi Gayatri Devi has dedicated over 14 years to helping individuals find peace in relationships, navigate marital discord, and discover auspicious muhurtas for new ventures.',
    education: ['Jyotish Ratna', 'M.Sc. in Psychology', 'Vedic Shastra Fellowship, Varanasi'],
    certifications: ['Certified Relationship Counselor', 'Grandmaster Tarot Reader'],
    servicesOffered: [
      { name: 'Kundli Milan', description: 'In-depth 36 Guna analysis and Dosha mitigation.' },
      { name: 'Love & Relationship Healing', description: 'Remedies for harmonizing planetary energies with your partner.' },
    ],
    consultationStats: {
      totalMinutes: 145000,
      repeatClients: 89,
      accuracyScore: '98.8%',
    },
    reviews: [
      {
        id: 'rev-4',
        userName: 'Ananya Sharma',
        userLocation: 'New Delhi',
        rating: 5,
        date: '2 days ago',
        comment: 'Her predictions regarding my marriage timeline came 100% true. Divine presence and very warm guidance.',
        consultationType: 'Chat',
      },
    ],
  },
  {
    id: 'pt-radheshyam-shastri',
    name: 'Pt. Radheshyam Shastri',
    title: 'Kashi Jyotish Peeth Scholar & Mahadasha Specialist',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
    isVerified: true,
    isTopChoice: false,
    experienceYears: 22,
    experienceDisplay: '22+ Years',
    specializations: [
      'Vedic Astrology',
      'Career Prediction',
      'Business Astrology',
      'Muhurta Consultation',
      'Gemstone Recommendation',
    ],
    languages: ['Hindi', 'Sanskrit', 'Gujarati'],
    pricePerMinute: 30,
    voicePricePerMinute: 30,
    videoPricePerMinute: 45,
    rating: 4.98,
    reviewCount: 3890,
    consultationCount: 11200,
    status: 'busy',
    availability: 'Monday to Saturday, 9 AM – 5 PM',
    bio: 'Direct disciple of the Kashi Vishwanath lineage, authority on Sade Sati, Shani remedies, and corporate business timing.',
    about: 'Pt. Radheshyam Shastri is consulted by leading entrepreneurs, politicians, and professionals seeking career breakthroughs and corporate muhurta alignment.',
    education: ['Acharya in Phalita Jyotish (BHU Varanasi)', 'Veda Murti Scholar'],
    certifications: ['Kashi Vidvat Parishad Certified', 'Certified Gemologist'],
    servicesOffered: [
      { name: 'Career & Business Growth', description: 'Pinpointing career turning points, promotion periods, and investments.' },
      { name: 'Sade Sati & Shani Shanti', description: 'Vedic rituals and authentic gemstone remedies.' },
    ],
    consultationStats: {
      totalMinutes: 280000,
      repeatClients: 92,
      accuracyScore: '99.5%',
    },
    reviews: [
      {
        id: 'rev-5',
        userName: 'Gaurav Mehta',
        userLocation: 'Ahmedabad',
        rating: 5,
        date: '4 days ago',
        comment: 'Panditjis timing for my startup seed round was immaculate. True guidance from a Varanasi scholar.',
        consultationType: 'Voice',
      },
    ],
  },
  {
    id: 'dr-meenakshi-sundaram',
    name: 'Dr. Meenakshi Sundaram',
    title: 'Nadi Astrology & KP System Scholar',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    isVerified: true,
    isTopChoice: false,
    experienceYears: 16,
    experienceDisplay: '16+ Years',
    specializations: [
      'Vedic Astrology',
      'Numerology',
      'Palmistry',
      'Horoscope Analysis',
      'Health and Wellbeing',
    ],
    languages: ['Tamil', 'English', 'Hindi', 'Telugu'],
    pricePerMinute: 22,
    voicePricePerMinute: 22,
    videoPricePerMinute: 32,
    rating: 4.92,
    reviewCount: 1780,
    consultationCount: 5400,
    status: 'online',
    availability: 'Daily, 7 AM – 9 PM',
    bio: 'Specialist in ancient Tamil Agasthya Nadi leaves, Krishnamurti Paddhati (KP System), and sub-lord planetary interlinks.',
    about: 'Dr. Meenakshi Sundaram combines medical astrology, micro-horary precision, and ancient palm leaves to deliver pinpoint clarity for health, wealth, and family harmony.',
    education: ['Doctorate in Astrological Sciences', 'KP Astrology Gold Medalist', 'B.A. in Indian Philosophy'],
    certifications: ['All India Nadi Association Fellow', 'Certified Sound Healer'],
    servicesOffered: [
      { name: 'KP Sub-Lord Analysis', description: 'High precision minute-level event prediction.' },
      { name: 'Medical Astrology', description: 'Ayurvedic planetary dosha and health wellness guidance.' },
    ],
    consultationStats: {
      totalMinutes: 112000,
      repeatClients: 81,
      accuracyScore: '98.5%',
    },
    reviews: [
      {
        id: 'rev-6',
        userName: 'Karthik Ramanathan',
        userLocation: 'Chennai',
        rating: 5,
        date: '5 days ago',
        comment: 'Remarkable accuracy in predicting foreign travel and career shifts. Excellent KP analysis!',
        consultationType: 'Video',
      },
    ],
  },
  {
    id: 'acharyaa-tanya-khanna',
    name: 'Acharyaa Tanya Khanna',
    title: 'Tarot Grandmaster & Western-Vedic Synthesizer',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400',
    isVerified: true,
    isTopChoice: false,
    experienceYears: 8,
    experienceDisplay: '8+ Years',
    specializations: [
      'Tarot Reading',
      'Love & Relationship',
      'Numerology',
      'Vedic Astrology',
      'Personal Growth',
    ],
    languages: ['English', 'Hindi', 'Punjabi'],
    pricePerMinute: 18,
    voicePricePerMinute: 18,
    videoPricePerMinute: 28,
    rating: 4.88,
    reviewCount: 950,
    consultationCount: 3200,
    status: 'online',
    availability: 'Monday to Sunday, 12 PM – 12 AM',
    bio: 'Compassionate modern spiritual guide combining intuitive Tarot spreads, angel card guidance, and Vedic planetary transits.',
    about: 'Acharyaa Tanya specializes in youth counseling, career crossroads, heartbreak recovery, and manifestations using sacred geometry and crystal remedies.',
    education: ['Master in Clinical Psychology', 'Certified International Tarot Reader'],
    certifications: ['Reiki Level 3 Master', 'Pranic Healer'],
    servicesOffered: [
      { name: 'Celtic Cross Tarot Spread', description: 'Deep psychic breakdown of current relationship dynamics.' },
      { name: 'Chakra & Crystal Balancing', description: 'Aura cleansing and gemstone energization.' },
    ],
    consultationStats: {
      totalMinutes: 68000,
      repeatClients: 86,
      accuracyScore: '97.9%',
    },
    reviews: [
      {
        id: 'rev-7',
        userName: 'Simran Walia',
        userLocation: 'Chandigarh',
        rating: 5,
        date: '1 week ago',
        comment: 'Tanyas Tarot cards revealed exactly what was bothering my partner. Such positive energy!',
        consultationType: 'Chat',
      },
    ],
  },
];

export function getAstrologerById(id: string): Astrologer | undefined {
  return ASTROLOGERS_DATABASE.find((a) => a.id === id);
}
