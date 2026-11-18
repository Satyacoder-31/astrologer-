'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { POPULAR_CITIES, searchCities, CityLocation } from '@/lib/astrology/cities';
import { UserBirthProfile } from '@/types';
import {
  Sparkles,
  MapPin,
  Calendar,
  Clock,
  User,
  Heart,
  Globe,
  CheckCircle2,
  Search,
} from 'lucide-react';
import confetti from 'canvas-confetti';

const INTEREST_AREAS = [
  'Career & Job',
  'Marriage & Matching',
  'Love & Relationships',
  'Business & Startup',
  'Finance & Wealth',
  'Family Peace',
  'Higher Education',
  'Health & Wellbeing',
  'Personal & Spiritual Growth',
];

const LANGUAGES = [
  'Hindi',
  'English',
  'Marathi',
  'Gujarati',
  'Kannada',
  'Tamil',
  'Telugu',
  'Bengali',
  'Punjabi',
  'Malayalam',
  'Odia',
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user, birthProfile, saveBirthProfile } = useAuth();

  const [fullName, setFullName] = useState(birthProfile?.fullName || user?.name || '');
  const [gender, setGender] = useState<UserBirthProfile['gender']>(birthProfile?.gender || 'Male');
  const [dob, setDob] = useState(birthProfile?.dob || '1998-05-15');
  const [tob, setTob] = useState(birthProfile?.tob || '07:30');

  // Searchable birthplace selector
  const [citySearchQuery, setCitySearchQuery] = useState(birthProfile?.city || 'New Delhi');
  const [selectedCity, setSelectedCity] = useState<CityLocation>(
    POPULAR_CITIES.find((c) => c.city === birthProfile?.city) || POPULAR_CITIES[0]
  );
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false);

  const [preferredLanguage, setPreferredLanguage] = useState(birthProfile?.preferredLanguage || 'Hindi');
  const [relationshipStatus, setRelationshipStatus] = useState(birthProfile?.relationshipStatus || 'Single');
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    birthProfile?.areasOfInterest || ['Career & Job', 'Marriage & Matching']
  );

  const citySearchResults = searchCities(citySearchQuery);

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const handleSelectCity = (city: CityLocation) => {
    setSelectedCity(city);
    setCitySearchQuery(`${city.city}, ${city.state}, ${city.country}`);
    setIsCityDropdownOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const profile: UserBirthProfile = {
      fullName,
      gender,
      dob,
      tob,
      birthplace: `${selectedCity.city}, ${selectedCity.state}, ${selectedCity.country}`,
      city: selectedCity.city,
      state: selectedCity.state,
      country: selectedCity.country,
      latitude: selectedCity.latitude,
      longitude: selectedCity.longitude,
      timezone: selectedCity.timezone,
      preferredLanguage,
      relationshipStatus,
      areasOfInterest: selectedInterests,
    };

    saveBirthProfile(profile);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#D4AF62', '#087E8B', '#E6A64A'],
    });

    setTimeout(() => {
      router.push('/dashboard');
    }, 1200);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-3xl mx-auto rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/40 p-6 md:p-10 shadow-2xl backdrop-blur-xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-gold/15 border border-cosmic-gold/40 text-cosmic-gold text-xs font-semibold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
            Mandatory Astrological Profile
          </div>
          <h1 className="text-2xl md:text-3xl font-cinzel font-bold text-cosmic-white">
            Construct Your Vedic Cosmic Blueprint
          </h1>
          <p className="text-xs md:text-sm text-cosmic-white/70 max-w-xl mx-auto font-poppins mt-1">
            Exact birth coordinates and time are essential to calculate your accurate Lagna, Nakshatras, and Vimshottari Mahadasha cycles.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 1. Name & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/50" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
                  placeholder="e.g. Radhika Sharma"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1.5">
                Gender (Optional)
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value as any)}
                className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* 2. Date of Birth & Exact Time of Birth */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1.5">
                Date of Birth
              </label>
              <div className="relative">
                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/50" />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1.5">
                Exact Time of Birth (24-Hour Format)
              </label>
              <div className="relative">
                <Clock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/50" />
                <input
                  type="time"
                  value={tob}
                  onChange={(e) => setTob(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
                  required
                />
              </div>
            </div>
          </div>

          {/* 3. Searchable Birthplace Selector with Coordinates & Timezone Resolution */}
          <div className="relative">
            <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1.5">
              Birthplace (Searchable Indian & Global Cities Database)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-peacock" />
              <input
                type="text"
                value={citySearchQuery}
                onFocus={() => setIsCityDropdownOpen(true)}
                onChange={(e) => {
                  setCitySearchQuery(e.target.value);
                  setIsCityDropdownOpen(true);
                }}
                className="w-full pl-10 pr-10 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
                placeholder="Type city name (e.g. Pune, Delhi, Mumbai, Bengaluru, Varanasi...)"
                required
              />
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/40" />
            </div>

            {/* Coordinates & Timezone Auto-Resolution preview */}
            <div className="mt-1.5 flex items-center gap-3 text-[11px] text-cosmic-peacock font-medium">
              <span>Latitude: {selectedCity.latitude}° N</span>
              <span>•</span>
              <span>Longitude: {selectedCity.longitude}° E</span>
              <span>•</span>
              <span>UTC Timezone: {selectedCity.timezone >= 0 ? `+${selectedCity.timezone}` : selectedCity.timezone}h</span>
            </div>

            {/* City Dropdown List */}
            {isCityDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 max-h-52 overflow-y-auto rounded-2xl bg-cosmic-midnight border border-cosmic-gold/40 shadow-2xl z-30 p-1">
                {citySearchResults.map((city) => (
                  <button
                    key={`${city.city}-${city.state}`}
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className="w-full text-left px-3.5 py-2 rounded-xl text-xs text-cosmic-white/80 hover:bg-cosmic-galaxy hover:text-cosmic-gold transition-colors flex items-center justify-between"
                  >
                    <span>
                      <strong className="text-cosmic-white">{city.city}</strong>, {city.state}, {city.country}
                    </span>
                    <span className="text-[10px] text-cosmic-white/40 font-mono">
                      {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 4. Preferred Language & Relationship Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1.5">
                Preferred Consultation Language
              </label>
              <select
                value={preferredLanguage}
                onChange={(e) => setPreferredLanguage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1.5">
                Current Relationship Status (Optional)
              </label>
              <select
                value={relationshipStatus}
                onChange={(e) => setRelationshipStatus(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
              >
                <option value="Single">Single</option>
                <option value="In a Relationship">In a Relationship</option>
                <option value="Engaged">Engaged</option>
                <option value="Married">Married</option>
                <option value="Separated / Divorced">Separated / Divorced</option>
              </select>
            </div>
          </div>

          {/* 5. Areas of Interest (Multi-select) */}
          <div>
            <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-2">
              Primary Areas of Interest (Select all that apply)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {INTEREST_AREAS.map((interest) => {
                const isChecked = selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`p-2.5 rounded-xl border text-xs font-medium text-left transition-all flex items-center justify-between ${
                      isChecked
                        ? 'bg-cosmic-peacock/20 border-cosmic-peacock text-cosmic-white shadow-sm'
                        : 'bg-cosmic-midnight/60 border-cosmic-border/30 text-cosmic-white/60 hover:text-cosmic-white'
                    }`}
                  >
                    <span>{interest}</span>
                    {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-cosmic-peacock flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Submit and Save */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-sm uppercase tracking-wider shadow-goldGlow hover:scale-[1.01] transition-transform"
            >
              Generate My Birth Chart & Enter Dashboard →
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
