'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ASTROLOGERS_DATABASE, Astrologer } from '@/lib/data/astrologers';
import { ASTROLOGY_SERVICES } from '@/lib/data/services';
import { GITA_VERSES } from '@/lib/data/krishna';
import { calculatePanchang } from '@/lib/data/panchang';
import { ZODIAC_HOROSCOPES } from '@/lib/data/horoscope';
import { generateKundli } from '@/lib/astrology/engine';
import { KundliChart } from '@/components/kundli/KundliChart';
import { POPULAR_CITIES, CityLocation } from '@/lib/astrology/cities';
import { exportKundliToPDF } from '@/lib/utils/pdfExport';
import { useWallet } from '@/context/WalletContext';
import {
  Sparkles,
  Phone,
  MessageCircle,
  Video,
  Star,
  ShieldCheck,
  Compass,
  ArrowRight,
  Flame,
  Calendar,
  Award,
  ChevronRight,
  Users,
  RotateCw,
  Orbit,
  Download,
  Heart,
  Clock,
  MapPin,
  Send,
  X,
  CheckCircle2,
  AlertCircle,
  Check,
} from 'lucide-react';

export default function HomePage() {
  const { balance, deductAmount } = useWallet();

  // Astrologers state
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const featuredAstrologer = ASTROLOGERS_DATABASE[0]; // Dr. Amit Deshmukh

  // Filtered astrologers list
  const filteredAstrologers = useMemo(() => {
    return ASTROLOGERS_DATABASE.filter((astro) => {
      const matchesSpec =
        selectedSpecialization === 'All' ||
        astro.specializations.some((s) => s.toLowerCase().includes(selectedSpecialization.toLowerCase()));
      const matchesSearch =
        astro.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        astro.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
        astro.languages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSpec && matchesSearch;
    });
  }, [selectedSpecialization, searchQuery]);

  // Interactive Kundli State
  const [seekerName, setSeekerName] = useState('Arjuna Seeker');
  const [dob, setDob] = useState('1996-08-25');
  const [tob, setTob] = useState('06:30');
  const [selectedCity, setSelectedCity] = useState<CityLocation>(POPULAR_CITIES[0]); // Mathura
  const [isDownloadingPdf, setIsDownloadingPdf] = useState(false);

  const calculatedKundli = useMemo(() => {
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
        calculatedKundli,
        seekerName,
        dob,
        tob,
        `${selectedCity.city}, ${selectedCity.state}`
      );
    } finally {
      setIsDownloadingPdf(false);
    }
  };

  // Interactive Daily Horoscope State
  const zodiacKeys = Object.keys(ZODIAC_HOROSCOPES);
  const [activeZodiacKey, setActiveZodiacKey] = useState<string>('aries');
  const currentHoroscope = ZODIAC_HOROSCOPES[activeZodiacKey] || ZODIAC_HOROSCOPES['aries'];

  // Panchang data
  const panchang = useMemo(() => calculatePanchang(), []);

  // Bhagavad Gita Oracle state
  const [activeDilemmaIndex, setActiveDilemmaIndex] = useState(0);
  const dailyVerse = GITA_VERSES[activeDilemmaIndex % GITA_VERSES.length];

  const dilemmas = [
    { title: 'Confusion in Career Direction', chapter: 2, verse: 47 },
    { title: 'Anxiety & Fear of Future Outcome', chapter: 18, verse: 66 },
    { title: 'Inner Restlessness & Wandering Mind', chapter: 6, verse: 26 },
    { title: 'Relationship Expectations & Detachment', chapter: 2, verse: 48 },
  ];

  // Quick Consultation Modal State
  const [activeConsultation, setActiveConsultation] = useState<{
    astrologer: Astrologer;
    mode: 'chat' | 'call';
  } | null>(null);
  const [chatMessages, setChatMessages] = useState<Array<{ sender: 'user' | 'astrologer'; text: string; time: string }>>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [isSessionActive, setIsSessionActive] = useState(false);

  // Start Consultation
  const handleStartConsultation = (astro: Astrologer, mode: 'chat' | 'call') => {
    setActiveConsultation({ astrologer: astro, mode });
    setSessionSeconds(0);
    setIsSessionActive(true);
    setChatMessages([
      {
        sender: 'astrologer',
        text: `Pranam! I am ${astro.name}. I am looking into your cosmic chart right now. What life dilemma or Prashna would you like to explore today?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !activeConsultation) return;
    const userMsg = inputMessage;
    const newMsgs = [
      ...chatMessages,
      {
        sender: 'user' as const,
        text: userMsg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
    setChatMessages(newMsgs);
    setInputMessage('');

    // Realistic Astrologer AI response simulation
    setTimeout(() => {
      let reply = `According to your Lagna and current transit, the planetary energies are favoring disciplined action. Focus your intent, and the obstacles will dissolve through divine grace.`;
      if (userMsg.toLowerCase().includes('job') || userMsg.toLowerCase().includes('career')) {
        reply = `Your 10th house indicates an upcoming transit shift. Between next month and mid-year, a significant professional elevation is indicated. Stay persistent.`;
      } else if (userMsg.toLowerCase().includes('marriage') || userMsg.toLowerCase().includes('love')) {
        reply = `Jupiter's aspect on your 7th house brings harmonious alignment. Patience and clear, truthful communication will resolve current tensions.`;
      }
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'astrologer',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 1200);
  };

  const handleEndConsultation = () => {
    if (activeConsultation) {
      const minutes = Math.max(1, Math.ceil(sessionSeconds / 60));
      const cost = minutes * activeConsultation.astrologer.pricePerMinute;
      deductAmount(cost, `Consultation with ${activeConsultation.astrologer.name}`);
    }
    setIsSessionActive(false);
    setActiveConsultation(null);
  };

  return (
    <div className="relative min-h-screen text-cosmic-white overflow-hidden">
      {/* =========================================================================
          SECTION 1: HERO SECTION - LORD KRISHNA BLENDED + 3D NASA EARTH ON RIGHT
          - Sized & positioned in the exact red circled area from user screenshot!
          - Earth shows Day/Night terminator with glowing city night lights
          - Zero white rings! Pure photorealistic NASA globe
      ========================================================================= */}
      <section id="hero" className="relative min-h-[96vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8">
        {/* Divine Lord Krishna Cosmic Universe Blend Backdrop */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-40 mix-blend-screen z-0 overflow-hidden">
          <div className="relative w-full max-w-5xl h-[88vh] [mask-image:radial-gradient(ellipse_at_center,black_25%,rgba(0,0,0,0.7)_55%,transparent_80%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_25%,rgba(0,0,0,0.7)_55%,transparent_80%)]">
            <Image
              src="/images/krishna-cosmic-blend.jpg"
              alt="Lord Krishna Divine Cosmic Consciousness"
              fill
              className="object-cover object-center scale-105"
              priority
            />
          </div>
        </div>



        {/* Hero Content Container - Asymmetric Grid Framing 3D Earth on the Right */}
        <div className="relative z-10 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Lord Krishna + Divine Wisdom + CTAs */}
          <div className="lg:col-span-7 xl:col-span-7 text-center lg:text-left space-y-6">
            {/* Divine Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-black/70 border border-cosmic-gold/40 text-cosmic-gold shadow-goldGlow text-xs md:text-sm font-medium tracking-wide backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-cosmic-saffron animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
              श्री कृष्णाय नमः • Divine Cosmic Consciousness
            </div>

            {/* Central Lord Krishna Artwork Inspiration with Feathered Cosmic Glow */}
            <div className="flex items-center gap-5 justify-center lg:justify-start">
              <div className="relative w-28 h-28 md:w-36 md:h-36 group shrink-0">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cosmic-peacock via-cosmic-gold to-cosmic-purple blur-xl opacity-80 group-hover:opacity-100 transition-opacity animate-pulse-slow" />
                <div className="absolute -inset-2 rounded-full border border-dashed border-cosmic-gold/40 animate-spin-slow" />

                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-cosmic-gold shadow-goldGlow bg-black">
                  <Image
                    src="/images/krishna-cosmic-blend.jpg"
                    alt="Divine Lord Krishna"
                    fill
                    className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-1 inset-x-0 text-center">
                    <span className="text-[9px] font-cinzel font-bold text-cosmic-gold tracking-widest uppercase">
                      Shree Krishna
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-left hidden sm:block">
                <span className="text-xs uppercase tracking-widest text-cosmic-gold font-cinzel font-bold block">
                  Krishna Cosmic Universe
                </span>
                <span className="text-xs text-cosmic-white/70 font-poppins block max-w-xs mt-1">
                  Guided by ancient Vedic astronomy & Bhagavad Gita timeless consciousness.
                </span>
                <span className="font-devanagari text-xs text-amber-200/90 block mt-1.5">
                  यदा यदा हि धर्मस्य ग्लानिर्भवति भारत
                </span>
              </div>
            </div>

            {/* Main Hero Headings */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-cinzel font-extrabold tracking-tight text-cosmic-white leading-[1.14]">
                Discover Your Destiny Through The{' '}
                <span className="gold-gradient-text drop-shadow-[0_0_35px_rgba(212,175,98,0.5)]">
                  Wisdom of the Stars
                </span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-cosmic-white/80 max-w-xl font-poppins font-light leading-relaxed">
                Connect with verified Vedic astrologers and discover personalized guidance for your life&apos;s journey, suspended in the infinite cosmic dance of the Navagrahas.
              </p>
            </div>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3.5 pt-1">
              <a
                href="#astrologers"
                className="px-6 py-3.5 rounded-2xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-sm md:text-base hover:shadow-goldGlowLg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 shadow-goldGlow"
              >
                <Users className="w-5 h-5 text-cosmic-midnight" />
                Consult an Astrologer
              </a>

              <a
                href="#kundli"
                className="px-6 py-3.5 rounded-2xl bg-black/80 border border-cosmic-gold/50 text-cosmic-gold hover:bg-cosmic-gold hover:text-cosmic-midnight font-cinzel font-bold text-sm md:text-base transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-md shadow-lg"
              >
                <Compass className="w-5 h-5" />
                Explore Your Kundli
              </a>

              <a
                href="#horoscope"
                className="px-5 py-3.5 rounded-2xl bg-black/60 border border-cosmic-peacock/40 text-cosmic-white hover:bg-cosmic-peacock/30 font-cinzel font-semibold text-xs md:text-sm transition-all"
              >
                Daily Horoscope
              </a>
            </div>

            {/* Scroll Indicator Prompt */}
            <div className="pt-4 flex items-center justify-center lg:justify-start gap-2.5 text-xs text-cosmic-gold/70 font-poppins">
              <div className="w-4 h-7 rounded-full border border-cosmic-gold/40 flex justify-center pt-1 shrink-0">
                <div className="w-1 h-1.5 rounded-full bg-cosmic-gold animate-bounce" />
              </div>
              <span className="uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                <Orbit className="w-3.5 h-3.5 text-cosmic-gold animate-spin" />
                Scroll Downwards to Orbit Through the 3D Planets on the Right
              </span>
            </div>
          </div>

          {/* Right Column: 100% RESERVED FOR 3D NASA EARTH (Red circled area) */}
          {/* Unobstructed viewport allowing the 3D globe with day/night & city lights to shine */}
          <div className="lg:col-span-5 xl:col-span-5 hidden lg:block pointer-events-none min-h-[520px]" />
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: ASTROLOGERS DIRECTORY & DR. AMIT DESHMUKH CONSULTATION
          - Watch Jupiter and its Galilean moons rotate into the right side stage!
      ========================================================================= */}
      <section id="astrologers" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cosmic-gold/10 border border-cosmic-gold/30 text-cosmic-gold text-xs tracking-wider uppercase mb-2">
              <Award className="w-3.5 h-3.5 text-cosmic-gold" />
              Verified Vedic Astrologers • AskK & ChatWithAstrologers Certified
            </div>
            <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
              Consult Master Astrologers
            </h2>
            <p className="text-cosmic-white/70 text-sm md:text-base font-poppins mt-1 max-w-2xl">
              Connect instantly via real-time Live Chat, Voice Call, or Video Consultation. As you scroll here, Jupiter rotates in 3D on the right.
            </p>
          </div>

          {/* Specialization Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {['All', 'Vedic', 'Prashna', 'Tarot', 'Numerology', 'Vastu'].map((spec) => (
              <button
                key={spec}
                onClick={() => setSelectedSpecialization(spec)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-cinzel font-semibold transition-all ${
                  selectedSpecialization === spec
                    ? 'bg-gold-gradient text-cosmic-midnight shadow-goldGlow'
                    : 'bg-black/70 border border-cosmic-border/40 text-cosmic-white/80 hover:border-cosmic-gold/50'
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>

        {/* FLAGSHIP PROFILE HIGHLIGHT: DR. AMIT DESHMUKH */}
        <div className="mb-12 rounded-3xl bg-black/85 border-2 border-cosmic-gold/60 p-6 md:p-8 shadow-goldGlow relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 px-4 py-1.5 bg-gold-gradient text-cosmic-midnight font-bold font-cinzel text-xs rounded-bl-2xl uppercase tracking-wider shadow-md">
            Flagship Featured Astrologer
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Avatar & Badges */}
            <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="relative w-32 h-32 md:w-44 md:h-44 rounded-3xl overflow-hidden border-2 border-cosmic-gold shadow-2xl mb-4 group">
                <Image
                  src={featuredAstrologer.avatar}
                  alt={featuredAstrologer.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-emerald-500 text-white font-bold text-[10px] flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" /> Live Online
                </span>
              </div>

              <div className="flex items-center gap-2">
                <h3 className="text-2xl md:text-3xl font-cinzel font-bold text-cosmic-white">
                  {featuredAstrologer.name}
                </h3>
                <ShieldCheck className="w-6 h-6 text-cosmic-peacock" />
              </div>
              <div className="text-xs text-cosmic-gold font-medium mt-0.5">
                {featuredAstrologer.title}
              </div>
              <div className="text-xs text-cosmic-white/60 mt-1">
                Experience: <span className="text-cosmic-white font-semibold">{featuredAstrologer.experienceDisplay}</span>
              </div>
            </div>

            {/* Specializations & Bio */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs md:text-sm text-cosmic-white/80 font-poppins leading-relaxed">
                {featuredAstrologer.bio}
              </p>

              <div>
                <div className="text-[11px] uppercase tracking-wider text-cosmic-gold font-semibold mb-2">
                  Verified Specializations
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {featuredAstrologer.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="px-2.5 py-1 rounded-lg bg-black/80 border border-cosmic-gold/30 text-xs text-cosmic-white/90"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-[11px] uppercase tracking-wider text-cosmic-gold font-semibold mb-1">
                  Languages Spoken
                </div>
                <div className="text-xs text-cosmic-white/70">
                  {featuredAstrologer.languages.join(', ')}
                </div>
              </div>
            </div>

            {/* Instant Consultation Action Panel */}
            <div className="lg:col-span-3 flex flex-col justify-center p-5 rounded-2xl bg-black/90 border border-cosmic-gold/40 space-y-3.5 text-center backdrop-blur-md">
              <div className="flex items-center justify-center gap-1 text-cosmic-gold">
                <Star className="w-4 h-4 fill-cosmic-gold" />
                <span className="font-bold text-lg">{featuredAstrologer.rating}</span>
                <span className="text-xs text-cosmic-white/50">({featuredAstrologer.reviewCount} reviews)</span>
              </div>

              <div className="text-2xl font-cinzel font-bold text-cosmic-white">
                ₹{featuredAstrologer.pricePerMinute}
                <span className="text-xs font-normal text-cosmic-white/60"> / min</span>
              </div>

              <div className="space-y-2 pt-1">
                <button
                  onClick={() => handleStartConsultation(featuredAstrologer, 'chat')}
                  className="w-full py-2.5 px-4 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs hover:shadow-goldGlow flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" /> Instant Chat Now
                </button>

                <button
                  onClick={() => handleStartConsultation(featuredAstrologer, 'call')}
                  className="w-full py-2.5 px-4 rounded-xl bg-cosmic-peacock/20 border border-cosmic-peacock/50 text-cosmic-white hover:bg-cosmic-peacock/40 transition-colors font-cinzel font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-cosmic-peacock" /> Voice Consultation
                </button>

                <Link
                  href={`/astrologers/${featuredAstrologer.id}`}
                  className="w-full py-2 px-4 rounded-xl bg-black/80 border border-cosmic-gold/40 text-cosmic-gold hover:bg-cosmic-gold hover:text-cosmic-midnight transition-colors font-cinzel font-semibold text-xs flex items-center justify-center gap-1.5"
                >
                  View Full Profile & Reviews →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Top Verified Astrologers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAstrologers.slice(1, 4).map((astro) => (
            <div
              key={astro.id}
              className="glass-panel glass-panel-hover rounded-3xl p-6 flex flex-col justify-between space-y-5"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border border-cosmic-gold/40 flex-shrink-0">
                  <Image src={astro.avatar} alt={astro.name} fill className="object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-cinzel font-bold text-base text-cosmic-white truncate">
                      {astro.name}
                    </h4>
                    <ShieldCheck className="w-4 h-4 text-cosmic-peacock flex-shrink-0" />
                  </div>
                  <div className="text-xs text-cosmic-gold truncate">{astro.title}</div>
                  <div className="flex items-center gap-2 mt-1 text-xs text-cosmic-white/60">
                    <span className="flex items-center gap-0.5 text-cosmic-gold font-semibold">
                      <Star className="w-3 h-3 fill-cosmic-gold" /> {astro.rating}
                    </span>
                    <span>•</span>
                    <span>{astro.experienceDisplay}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {astro.specializations.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-black/80 border border-cosmic-border/30 text-[11px] text-cosmic-white/80"
                  >
                    {s}
                  </span>
                ))}
              </div>

              <div className="pt-3 border-t border-cosmic-border/30 flex items-center justify-between">
                <div>
                  <span className="text-lg font-cinzel font-bold text-cosmic-white">
                    ₹{astro.pricePerMinute}
                  </span>
                  <span className="text-[10px] text-cosmic-white/60">/min</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStartConsultation(astro, 'chat')}
                    className="p-2 rounded-xl bg-black border border-cosmic-gold/40 text-cosmic-gold hover:bg-cosmic-gold hover:text-cosmic-midnight transition-colors"
                    title="Chat"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleStartConsultation(astro, 'call')}
                    className="p-2 rounded-xl bg-black border border-cosmic-peacock/40 text-cosmic-peacock hover:bg-cosmic-peacock hover:text-cosmic-white transition-colors"
                    title="Call"
                  >
                    <Phone className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleStartConsultation(astro, 'chat')}
                    className="px-3.5 py-1.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs shadow-sm hover:opacity-90"
                  >
                    Consult
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: INTERACTIVE VEDIC KUNDLI GENERATOR
          - Watch Saturn with its concentric Cassini rings rotate on the right!
      ========================================================================= */}
      <section id="kundli" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="p-6 md:p-10 rounded-3xl bg-black/85 border-2 border-cosmic-gold/40 shadow-2xl backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-gold/15 border border-cosmic-gold/30 text-cosmic-gold text-xs font-semibold uppercase mb-2">
                <Compass className="w-3.5 h-3.5 text-cosmic-gold" />
                Vedic Kundli Engine • Lahiri Chitrapaksha Ayanamsa
              </div>
              <h2 className="text-3xl md:text-4xl font-cinzel font-bold text-cosmic-white">
                Interactive Kundli & Birth Chart
              </h2>
              <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins mt-1">
                Enter your birth details to instantly compute your D1 Lagna Chart, Nakshatra, and Mahadasha.
              </p>
            </div>

            <button
              onClick={handleDownloadPDF}
              disabled={isDownloadingPdf}
              className="px-5 py-2.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs shadow-goldGlow hover:opacity-95 transition-opacity flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              {isDownloadingPdf ? 'Generating PDF...' : 'Download PDF Kundli'}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Form Column */}
            <div className="lg:col-span-5 space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-cosmic-gold font-semibold mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={seekerName}
                  onChange={(e) => setSeekerName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-cosmic-border/40 text-cosmic-white text-sm focus:outline-none focus:border-cosmic-gold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-cosmic-gold font-semibold mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/80 border border-cosmic-border/40 text-cosmic-white text-xs focus:outline-none focus:border-cosmic-gold"
                  />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-wider text-cosmic-gold font-semibold mb-1">
                    Time of Birth
                  </label>
                  <input
                    type="time"
                    value={tob}
                    onChange={(e) => setTob(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/80 border border-cosmic-border/40 text-cosmic-white text-xs focus:outline-none focus:border-cosmic-gold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-cosmic-gold font-semibold mb-1">
                  Birthplace (City, State)
                </label>
                <select
                  value={selectedCity.city}
                  onChange={(e) => {
                    const c = POPULAR_CITIES.find((item) => item.city === e.target.value);
                    if (c) setSelectedCity(c);
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/80 border border-cosmic-border/40 text-cosmic-white text-sm focus:outline-none focus:border-cosmic-gold"
                >
                  {POPULAR_CITIES.map((c) => (
                    <option key={c.city} value={c.city} className="bg-black text-white">
                      {c.city}, {c.state} ({c.latitude.toFixed(2)}°N, {c.longitude.toFixed(2)}°E)
                    </option>
                  ))}
                </select>
              </div>

              {/* Calculated Astrological Summary Cards */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-black/70 border border-cosmic-border/30">
                  <div className="text-[10px] uppercase text-cosmic-white/50">Ascendant (Lagna)</div>
                  <div className="text-sm font-bold text-cosmic-gold font-cinzel">
                    {calculatedKundli.lagna.sign}
                  </div>
                  <div className="text-[10px] text-cosmic-white/60">
                    {calculatedKundli.lagna.degrees.toFixed(2)}° • Lord: {calculatedKundli.lagna.signLord}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/70 border border-cosmic-border/30">
                  <div className="text-[10px] uppercase text-cosmic-white/50">Moon Sign (Rashi)</div>
                  <div className="text-sm font-bold text-cosmic-white font-cinzel">
                    {calculatedKundli.panchangSummary.rashi}
                  </div>
                  <div className="text-[10px] text-cosmic-peacock">
                    Nakshatra: {calculatedKundli.panchangSummary.nakshatra}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/70 border border-cosmic-border/30">
                  <div className="text-[10px] uppercase text-cosmic-white/50">Mahadasha Cycle</div>
                  <div className="text-sm font-bold text-amber-200 font-cinzel">
                    {calculatedKundli.dashas[0]?.lord || 'Guru'} Mahadasha
                  </div>
                  <div className="text-[10px] text-cosmic-white/60">
                    Until {calculatedKundli.dashas[0]?.endDate || '2032'}
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-black/70 border border-cosmic-border/30">
                  <div className="text-[10px] uppercase text-cosmic-white/50">Manglik Status</div>
                  <div className="text-sm font-bold text-emerald-300 font-cinzel">
                    {calculatedKundli.doshas.isManglik ? 'Partial Manglik' : 'Non-Manglik'}
                  </div>
                  <div className="text-[10px] text-emerald-400">
                    {calculatedKundli.doshas.isManglik ? 'Minor remedies' : 'No affliction'}
                  </div>
                </div>
              </div>
            </div>

            {/* Live Vedic Chart Diagram Column */}
            <div className="lg:col-span-7 flex flex-col items-center">
              <div className="w-full max-w-lg p-4 rounded-2xl bg-black/90 border border-cosmic-gold/30 shadow-xl">
                <KundliChart kundli={calculatedKundli} title="Lagna Kundli (D1 Rashi)" chartType="D1-Lagna" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 4: DAILY HOROSCOPE (RASHIFAL FOR ALL 12 SIGNS)
          - Watch Mars (Mangala) rotate into view on the right side!
      ========================================================================= */}
      <section id="horoscope" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cosmic-saffron/15 border border-cosmic-saffron/30 text-cosmic-saffron text-xs font-semibold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5 text-cosmic-saffron" />
            Today&apos;s Planetary Transits
          </div>
          <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
            Daily Horoscope (Rashifal)
          </h2>
          <p className="text-cosmic-white/70 text-sm md:text-base font-poppins mt-2">
            Select your Moon Sign (Rashi) to unveil today&apos;s cosmic alignment across Love, Career, and Wealth.
          </p>
        </div>

        {/* 12 Zodiac Tabs */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-2 mb-8">
          {zodiacKeys.map((key) => {
            const z = ZODIAC_HOROSCOPES[key];
            const isSelected = activeZodiacKey === key;
            return (
              <button
                key={key}
                onClick={() => setActiveZodiacKey(key)}
                className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${
                  isSelected
                    ? 'bg-gold-gradient text-cosmic-midnight shadow-goldGlow scale-105 font-bold'
                    : 'bg-black/70 border border-cosmic-border/30 text-cosmic-white/70 hover:border-cosmic-gold/50'
                }`}
              >
                <span className="text-xl leading-none">{z.symbol}</span>
                <span className="text-[10px] font-cinzel mt-1 uppercase truncate w-full">{z.sign}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Zodiac Card */}
        <div className="p-6 md:p-8 rounded-3xl bg-black/85 border border-cosmic-gold/40 shadow-2xl backdrop-blur-xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-cosmic-border/30">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-4xl text-cosmic-gold">{currentHoroscope.symbol}</span>
                <div>
                  <h3 className="text-2xl font-cinzel font-bold text-cosmic-white">
                    {currentHoroscope.sign} • <span className="text-cosmic-gold">{currentHoroscope.sanskrit}</span>
                  </h3>
                  <div className="text-xs text-cosmic-white/60 font-poppins">
                    {currentHoroscope.dates} • Element: {currentHoroscope.element} • Ruling Planet: {currentHoroscope.rulingPlanet}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-poppins">
              <div className="px-3 py-1.5 rounded-xl bg-black border border-cosmic-gold/30 text-cosmic-gold">
                Lucky Number: <span className="font-bold text-white">{currentHoroscope.daily.luckyNumber}</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl bg-black border border-cosmic-gold/30 text-cosmic-gold">
                Lucky Color: <span className="font-bold text-white">{currentHoroscope.daily.luckyColor}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            <div className="p-4 rounded-2xl bg-black/70 border border-cosmic-border/20 space-y-2">
              <div className="text-xs uppercase tracking-wider text-cosmic-gold font-cinzel font-bold">
                Daily Overview
              </div>
              <p className="text-xs md:text-sm text-cosmic-white/80 font-poppins leading-relaxed">
                {currentHoroscope.daily.overview}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/70 border border-cosmic-border/20 space-y-2">
              <div className="text-xs uppercase tracking-wider text-rose-300 font-cinzel font-bold">
                Love & Relationships
              </div>
              <p className="text-xs md:text-sm text-cosmic-white/80 font-poppins leading-relaxed">
                {currentHoroscope.daily.love}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-black/70 border border-cosmic-border/20 space-y-2">
              <div className="text-xs uppercase tracking-wider text-emerald-300 font-cinzel font-bold">
                Career & Wealth
              </div>
              <p className="text-xs md:text-sm text-cosmic-white/80 font-poppins leading-relaxed">
                {currentHoroscope.daily.career}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 5: PANCHANG & AUSPICIOUS MUHURTA
      ========================================================================= */}
      <section id="panchang" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="p-8 md:p-10 rounded-3xl bg-black/85 border border-cosmic-gold/30 backdrop-blur-2xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-gold/10 border border-cosmic-gold/30 text-cosmic-gold text-xs uppercase tracking-wider mb-2">
                <Calendar className="w-3.5 h-3.5 text-cosmic-gold" />
                Vedic Solar-Lunar Calendar • Location: {panchang.location.city}
              </div>
              <h2 className="text-2xl md:text-4xl font-cinzel font-bold text-cosmic-white">
                Today&apos;s Panchang & Muhurta
              </h2>
              <p className="text-xs md:text-sm text-cosmic-white/60 font-poppins">
                {panchang.date} • {panchang.dayOfWeek}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="p-3.5 rounded-2xl bg-black/70 border border-cosmic-border/30">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Tithi</div>
              <div className="text-sm font-bold text-cosmic-gold font-cinzel">{panchang.tithi.name}</div>
              <div className="text-[10px] text-cosmic-white/60">{panchang.tithi.paksha}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/70 border border-cosmic-border/30">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Nakshatra</div>
              <div className="text-sm font-bold text-cosmic-white font-cinzel">{panchang.nakshatra.name}</div>
              <div className="text-[10px] text-cosmic-peacock">Lord: {panchang.nakshatra.lord}</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/70 border border-cosmic-border/30">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Yoga</div>
              <div className="text-sm font-bold text-amber-200 font-cinzel">{panchang.yoga.name}</div>
              <div className="text-[10px] text-cosmic-white/60">Auspicious</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/70 border border-cosmic-border/30">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Abhijit Muhurat</div>
              <div className="text-sm font-bold text-emerald-300 font-cinzel">{panchang.muhurtas.abhijitMuhurat.start}</div>
              <div className="text-[10px] text-emerald-400 font-medium">Most Auspicious</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/70 border border-cosmic-border/30">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Rahu Kaal</div>
              <div className="text-sm font-bold text-rose-300 font-cinzel">{panchang.muhurtas.rahuKaal.start}</div>
              <div className="text-[10px] text-rose-400 font-medium">Avoid New Tasks</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-black/70 border border-cosmic-border/30">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Sun & Moon</div>
              <div className="text-sm font-bold text-cosmic-saffron font-cinzel">{panchang.solar.sunrise}</div>
              <div className="text-[10px] text-cosmic-white/60">Moon: {panchang.lunar.moonPhase.split(' ')[0]}</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 6: LORD KRISHNA SPIRITUAL SANCTUARY & BHAGAVAD GITA ORACLE
          - Watch Surya Narayana Sun radiate in 3D on the right side!
      ========================================================================= */}
      <section id="krishna-wisdom" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="rounded-3xl bg-black/85 border-2 border-cosmic-gold/50 p-8 md:p-12 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="max-w-4xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-saffron/15 border border-cosmic-saffron/40 text-cosmic-saffron text-xs font-semibold uppercase tracking-wider">
              <Flame className="w-3.5 h-3.5 text-cosmic-saffron" />
              Bhagavad Gita Oracle • Lord Krishna&apos;s Eternal Counsel
            </div>

            <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white leading-tight">
              Divine Answers for Your Life Dilemma
            </h2>

            {/* Dilemma Selector */}
            <div className="flex flex-wrap gap-2 pt-2">
              {dilemmas.map((d, idx) => (
                <button
                  key={d.title}
                  onClick={() => setActiveDilemmaIndex(idx)}
                  className={`px-4 py-2 rounded-xl text-xs font-poppins transition-all ${
                    activeDilemmaIndex === idx
                      ? 'bg-gold-gradient text-cosmic-midnight font-bold shadow-goldGlow'
                      : 'bg-black/70 border border-cosmic-border/40 text-cosmic-white/70 hover:border-cosmic-gold/50'
                  }`}
                >
                  {d.title}
                </button>
              ))}
            </div>

            {/* Gita Shloka Display */}
            <div className="p-6 md:p-8 rounded-2xl bg-black/90 border border-cosmic-gold/40 shadow-xl space-y-4">
              <div className="font-devanagari text-xl md:text-2xl text-amber-200 font-semibold leading-relaxed">
                {dailyVerse.sanskrit}
              </div>
              <div className="text-xs text-cosmic-white/60 italic font-poppins">
                {dailyVerse.transliteration} (Bhagavad Gita Chapter {dailyVerse.chapter}, Verse {dailyVerse.verse})
              </div>
              <div className="text-sm text-cosmic-white/90 font-poppins pt-4 border-t border-cosmic-border/30">
                <span className="font-semibold text-cosmic-gold">Krishna&apos;s Practical Wisdom: </span>
                {dailyVerse.practicalWisdom}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 7: ALL 12 ASTROLOGY SERVICES
      ========================================================================= */}
      <section id="services" className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-20">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cosmic-peacock/15 border border-cosmic-peacock/30 text-cosmic-peacock text-xs font-semibold uppercase tracking-wider mb-3">
            <Compass className="w-3.5 h-3.5 text-cosmic-peacock" />
            Sacred Disciplines
          </div>
          <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
            Comprehensive Astrology Services
          </h2>
          <p className="text-cosmic-white/70 text-sm md:text-base font-poppins mt-2">
            Tailored consultations across ancient Indian Shastras to illuminate every dimension of your earthly existence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ASTROLOGY_SERVICES.slice(0, 6).map((service) => (
            <div
              key={service.slug}
              className="glass-panel glass-panel-hover rounded-3xl p-6 group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cosmic-gold/15 border border-cosmic-gold/30 flex items-center justify-center text-cosmic-gold mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-cinzel font-bold text-xl text-cosmic-white group-hover:text-cosmic-gold transition-colors">
                  {service.title}
                </h3>
                <div className="font-devanagari text-xs text-cosmic-peacock mt-0.5">
                  {service.sanskritTitle}
                </div>
                <p className="text-xs text-cosmic-white/70 font-poppins mt-2.5 leading-relaxed line-clamp-3">
                  {service.description}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-cosmic-border/30 flex items-center justify-between text-xs text-cosmic-gold font-medium">
                <a
                  href="#astrologers"
                  className="hover:underline flex items-center gap-1"
                >
                  Book Consultation <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          SECTION 8: FINAL DIVINE CALL TO ACTION
      ========================================================================= */}
      <section className="relative py-24 px-4 text-center">
        <div className="max-w-4xl mx-auto rounded-3xl bg-black/90 p-10 md:p-14 border-2 border-cosmic-gold/50 shadow-goldGlowLg space-y-6 backdrop-blur-2xl">
          <span className="font-devanagari text-3xl md:text-4xl text-cosmic-gold font-bold">
            ॐ श्रीकृष्णाय नमः
          </span>
          <h2 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
            Ready to Discover What the Stars Have Written for You?
          </h2>
          <p className="text-sm md:text-base text-cosmic-white/80 max-w-xl mx-auto font-poppins">
            Join thousands of seekers consulting verified Vedic acharyas daily. Instant consultation starting at ₹20/min!
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#astrologers"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-base shadow-goldGlow hover:scale-105 transition-transform"
            >
              Consult Dr. Amit Deshmukh Now
            </a>
            <a
              href="#kundli"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-black/80 border border-cosmic-gold/40 text-cosmic-white hover:text-cosmic-gold font-cinzel font-bold text-base transition-colors"
            >
              Calculate Your Free Kundli
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE LIVE CONSULTATION DRAWER / MODAL
          - Enables instant consultation directly on the landing page!
      ========================================================================= */}
      {activeConsultation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-lg rounded-3xl bg-black/95 border-2 border-cosmic-gold/60 shadow-goldGlowLg overflow-hidden flex flex-col h-[600px] max-h-[90vh]">
            {/* Header */}
            <div className="px-5 py-4 border-b border-cosmic-gold/30 bg-black/80 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-xl overflow-hidden border border-cosmic-gold">
                  <Image
                    src={activeConsultation.astrologer.avatar}
                    alt={activeConsultation.astrologer.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-cinzel font-bold text-sm text-cosmic-white">
                    {activeConsultation.astrologer.name}
                  </h4>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Consultation • ₹{activeConsultation.astrologer.pricePerMinute}/min
                  </div>
                </div>
              </div>

              <button
                onClick={handleEndConsultation}
                className="p-1.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500 hover:text-white transition-colors"
                title="End Consultation"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-black/40">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs font-poppins leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gold-gradient text-cosmic-midnight font-medium rounded-br-sm'
                        : 'bg-black/90 border border-cosmic-border/50 text-cosmic-white rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-cosmic-white/40 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
            </div>

            {/* Chat Input Bar */}
            <div className="p-3 border-t border-cosmic-gold/30 bg-black/90 flex items-center gap-2">
              <input
                type="text"
                placeholder="Ask about your career, marriage, or health..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                className="flex-1 px-4 py-2.5 rounded-xl bg-black border border-cosmic-border/40 text-xs text-cosmic-white focus:outline-none focus:border-cosmic-gold"
              />
              <button
                onClick={handleSendMessage}
                className="p-2.5 rounded-xl bg-gold-gradient text-cosmic-midnight hover:shadow-goldGlow transition-transform"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
