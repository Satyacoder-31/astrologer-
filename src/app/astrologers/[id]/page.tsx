'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getAstrologerById, ASTROLOGERS_DATABASE } from '@/lib/data/astrologers';
import { useAuth } from '@/context/AuthContext';
import { useWallet } from '@/context/WalletContext';
import { RechargeModal } from '@/components/wallet/RechargeModal';
import {
  Star,
  ShieldCheck,
  MessageCircle,
  Phone,
  Video,
  Calendar,
  Clock,
  Award,
  GraduationCap,
  Sparkles,
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  Calculator,
} from 'lucide-react';

export default function AstrologerProfilePage() {
  const params = useParams();
  const astrologerId = (params?.id as string) || 'dr-amit-deshmukh';
  const astrologer = getAstrologerById(astrologerId) || ASTROLOGERS_DATABASE[0];

  const { isAstrologerSaved, toggleSaveAstrologer } = useAuth();
  const { balance } = useWallet();

  const [selectedDuration, setSelectedDuration] = useState<number>(10);
  const [selectedConsultationType, setSelectedConsultationType] = useState<'Chat' | 'Voice' | 'Video'>('Chat');
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Price calculations
  const currentRate = selectedConsultationType === 'Video' ? astrologer.videoPricePerMinute : selectedConsultationType === 'Voice' ? astrologer.voicePricePerMinute : astrologer.pricePerMinute;
  const estimatedTotalCost = currentRate * selectedDuration;
  const hasSufficientBalance = balance >= estimatedTotalCost;

  const handleBookAppointment = () => {
    setBookingSuccess(true);
    setTimeout(() => setBookingSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      {/* Back Link */}
      <Link
        href="/astrologers"
        className="inline-flex items-center gap-1.5 text-xs text-cosmic-gold hover:underline font-semibold"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Astrologer Directory
      </Link>

      {/* Main Profile Header Banner */}
      <div className="rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/40 p-6 md:p-10 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Avatar & Availability */}
          <div className="lg:col-span-4 flex flex-col items-center text-center">
            <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-3xl overflow-hidden border-2 border-cosmic-gold shadow-goldGlow mb-4">
              <Image
                src={astrologer.avatar}
                alt={astrologer.name}
                fill
                className="object-cover"
                priority
              />
              <span
                className={`absolute bottom-3 right-3 px-3 py-1 rounded-full text-xs font-bold text-white shadow-md flex items-center gap-1.5 ${
                  astrologer.status === 'online' ? 'bg-emerald-500' : 'bg-amber-500'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                {astrologer.status.toUpperCase()}
              </span>
            </div>

            <button
              onClick={() => toggleSaveAstrologer(astrologer.id)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-cosmic-midnight/80 border border-cosmic-border/30 text-xs text-cosmic-white hover:text-cosmic-gold transition-colors"
            >
              <Bookmark
                className={`w-4 h-4 ${isAstrologerSaved(astrologer.id) ? 'fill-cosmic-gold text-cosmic-gold' : ''}`}
              />
              {isAstrologerSaved(astrologer.id) ? 'Saved to Favorites' : 'Save Astrologer'}
            </button>
          </div>

          {/* Core Credentials & Bio */}
          <div className="lg:col-span-8 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-cosmic-white">
                    {astrologer.name}
                  </h1>
                  <ShieldCheck className="w-6 h-6 text-cosmic-peacock" />
                </div>
                <div className="text-sm text-cosmic-gold font-medium mt-0.5">
                  {astrologer.title}
                </div>
              </div>

              {/* Rating & Review Badge */}
              <div className="flex items-center gap-2 p-2.5 px-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-gold/30">
                <Star className="w-5 h-5 fill-cosmic-gold text-cosmic-gold" />
                <div>
                  <div className="font-bold text-base text-cosmic-white leading-tight">
                    {astrologer.rating} / 5.0
                  </div>
                  <div className="text-[10px] text-cosmic-white/50">{astrologer.reviewCount} Reviews</div>
                </div>
              </div>
            </div>

            <div>
              <span className="text-xs font-semibold text-cosmic-gold uppercase tracking-wider block mb-1.5">
                About the Astrologer
              </span>
              <p className="text-sm md:text-base text-cosmic-white/85 font-poppins leading-relaxed whitespace-pre-line">
                {astrologer.about}
              </p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 text-center">
                <div className="text-lg font-cinzel font-bold text-cosmic-gold">
                  {astrologer.experienceDisplay}
                </div>
                <div className="text-[10px] text-cosmic-white/50 uppercase">Experience</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 text-center">
                <div className="text-lg font-cinzel font-bold text-cosmic-peacock">
                  {astrologer.consultationStats.repeatClients}%
                </div>
                <div className="text-[10px] text-cosmic-white/50 uppercase">Repeat Clients</div>
              </div>
              <div className="p-3.5 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 text-center">
                <div className="text-lg font-cinzel font-bold text-emerald-300">
                  {astrologer.consultationStats.accuracyScore}
                </div>
                <div className="text-[10px] text-cosmic-white/50 uppercase">Vedic Accuracy</div>
              </div>
            </div>

            {/* Specializations & Languages */}
            <div className="space-y-3 pt-2">
              <div>
                <span className="text-xs font-semibold text-cosmic-gold uppercase tracking-wider block mb-1.5">
                  Astrology Specializations
                </span>
                <div className="flex flex-wrap gap-2">
                  {astrologer.specializations.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-xs text-cosmic-white font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 rounded-xl bg-cosmic-midnight/50 border border-cosmic-border/20">
                  <span className="text-cosmic-gold font-semibold">Languages Spoken: </span>
                  <span className="text-cosmic-white/80">{astrologer.languages.join(', ')}</span>
                </div>
                <div className="p-3 rounded-xl bg-cosmic-midnight/50 border border-cosmic-border/20">
                  <span className="text-cosmic-peacock font-semibold">Standard Timings: </span>
                  <span className="text-cosmic-white/80">{astrologer.availability}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instant Consultation & Cost Estimator Card */}
      <div className="rounded-3xl bg-gradient-to-r from-cosmic-midnight via-cosmic-galaxy to-cosmic-midnight border-2 border-cosmic-gold/50 p-6 md:p-8 shadow-goldGlow space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-cosmic-gold font-semibold mb-1">
              <Calculator className="w-3.5 h-3.5 text-cosmic-gold" />
              Live Per-Minute Consultation Calculator
            </div>
            <h2 className="text-2xl font-cinzel font-bold text-cosmic-white">
              Connect with {astrologer.name}
            </h2>
          </div>

          <div className="text-xs text-cosmic-white/60">
            Current Wallet Balance:{' '}
            <strong className="text-cosmic-gold font-bold">₹{balance}</strong>
          </div>
        </div>

        {/* Mode Selector */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { type: 'Chat', price: astrologer.pricePerMinute, icon: MessageCircle, label: 'Live Chat' },
            { type: 'Voice', price: astrologer.voicePricePerMinute, icon: Phone, label: 'Voice Call' },
            { type: 'Video', price: astrologer.videoPricePerMinute, icon: Video, label: 'HD Video Call' },
          ].map((m) => {
            const isSelected = selectedConsultationType === m.type;
            const Icon = m.icon;
            return (
              <button
                key={m.type}
                onClick={() => setSelectedConsultationType(m.type as any)}
                className={`p-4 rounded-2xl border text-center transition-all ${
                  isSelected
                    ? 'bg-cosmic-gold/20 border-cosmic-gold shadow-goldGlow scale-[1.02]'
                    : 'bg-cosmic-midnight/60 border-cosmic-border/30 hover:border-cosmic-gold/50'
                }`}
              >
                <Icon className={`w-5 h-5 mx-auto mb-1.5 ${isSelected ? 'text-cosmic-gold' : 'text-cosmic-white/60'}`} />
                <div className="font-cinzel font-bold text-sm text-cosmic-white">{m.label}</div>
                <div className="text-xs text-cosmic-gold font-semibold">₹{m.price}/min</div>
              </button>
            );
          })}
        </div>

        {/* Duration Slider */}
        <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="text-cosmic-white/70">Estimated Session Duration:</span>
            <span className="text-cosmic-gold font-bold">{selectedDuration} Minutes</span>
          </div>
          <input
            type="range"
            min="5"
            max="60"
            step="5"
            value={selectedDuration}
            onChange={(e) => setSelectedDuration(parseInt(e.target.value, 10))}
            className="w-full accent-cosmic-gold"
          />
          <div className="flex justify-between text-[10px] text-cosmic-white/40">
            <span>5 mins</span>
            <span>15 mins</span>
            <span>30 mins</span>
            <span>45 mins</span>
            <span>60 mins</span>
          </div>
        </div>

        {/* Cost Summary & Consultation CTA */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="text-xs text-cosmic-white/60">Estimated Consultation Cost:</div>
            <div className="text-2xl font-cinzel font-bold text-cosmic-white">
              ₹{estimatedTotalCost}{' '}
              <span className="text-xs font-normal text-cosmic-white/50">
                (₹{currentRate}/min × {selectedDuration} mins)
              </span>
            </div>
            {!hasSufficientBalance && (
              <div className="text-xs text-rose-300 mt-1">
                Insufficient wallet balance. You need ₹{estimatedTotalCost - balance} more.
              </div>
            )}
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {!hasSufficientBalance && (
              <button
                onClick={() => setIsRechargeModalOpen(true)}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-cosmic-peacock text-white font-cinzel font-bold text-xs hover:bg-cosmic-peacock/80 transition-colors shadow-sm"
              >
                Recharge Wallet
              </button>
            )}

            <Link
              href={
                selectedConsultationType === 'Chat'
                  ? `/consultation/chat/${astrologer.id}`
                  : `/consultation/call/${astrologer.id}?mode=${selectedConsultationType.toLowerCase()}`
              }
              className="flex-1 sm:flex-none px-8 py-3.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-sm shadow-goldGlow hover:scale-105 transition-transform text-center"
            >
              Start {selectedConsultationType} Consultation
            </Link>
          </div>
        </div>
      </div>

      {/* Qualifications, Certifications & Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 2. Skills and Specializations Table */}
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-cinzel font-bold text-cosmic-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cosmic-gold" />
              2. Skills and Specializations
            </h3>
            <span className="text-[11px] text-cosmic-gold font-semibold uppercase tracking-wider">Vedic Services</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-poppins">
              <thead>
                <tr className="border-b border-cosmic-border/30 text-cosmic-gold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Service</th>
                  <th className="py-2.5 px-3">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cosmic-border/20">
                {astrologer.servicesOffered.map((s, idx) => (
                  <tr key={idx} className="hover:bg-cosmic-midnight/40">
                    <td className="py-3 px-3 font-semibold text-cosmic-gold whitespace-nowrap">
                      {s.name}
                    </td>
                    <td className="py-3 px-3 text-cosmic-white/80">
                      {s.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Languages & Certifications */}
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-5">
          <div>
            <h3 className="text-xl font-cinzel font-bold text-cosmic-white flex items-center gap-2 mb-3">
              <GraduationCap className="w-5 h-5 text-cosmic-peacock" />
              3. Languages
            </h3>
            <div className="flex flex-wrap gap-2">
              {astrologer.languages.map((lang) => (
                <span
                  key={lang}
                  className="px-3.5 py-1.5 rounded-xl bg-cosmic-midnight border border-cosmic-peacock/40 text-xs font-semibold text-cosmic-white flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-cosmic-peacock" />
                  {lang}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-cosmic-border/20">
            <h4 className="text-sm font-cinzel font-bold text-cosmic-gold mb-2 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cosmic-gold" />
              Formal Vedic Education & Honours
            </h4>
            <div className="space-y-2 text-xs">
              {astrologer.education.map((edu, idx) => (
                <div key={idx} className="flex items-start gap-2 text-cosmic-white/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{edu}</span>
                </div>
              ))}
              {astrologer.certifications.map((cert, idx) => (
                <div key={idx} className="flex items-start gap-2 text-cosmic-white/80">
                  <Award className="w-3.5 h-3.5 text-cosmic-peacock flex-shrink-0 mt-0.5" />
                  <span>{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Pricing & 5. Availability and Working Hours Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 4. Pricing Breakdown Table */}
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-cosmic-gold font-bold">4. Pricing</div>
            <h3 className="text-2xl font-cinzel font-bold text-cosmic-white mt-1">
              CONSULTATION PRICE
            </h3>
            <div className="text-xl font-cinzel font-bold text-cosmic-gold mt-1">
              ₹20/minute
            </div>
            <div className="text-xs text-cosmic-white/60 mt-1">
              Example consultation costs:
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-poppins">
              <thead>
                <tr className="border-b border-cosmic-border/30 text-cosmic-gold uppercase text-[10px]">
                  <th className="py-2 px-3">Duration</th>
                  <th className="py-2 px-3">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cosmic-border/20">
                {[
                  { duration: '5 minutes', price: '₹100' },
                  { duration: '10 minutes', price: '₹200' },
                  { duration: '15 minutes', price: '₹300' },
                  { duration: '20 minutes', price: '₹400' },
                  { duration: '30 minutes', price: '₹600' },
                  { duration: '60 minutes', price: '₹1,200' },
                ].map((row, idx) => (
                  <tr key={idx} className="hover:bg-cosmic-midnight/40">
                    <td className="py-2 px-3 text-cosmic-white font-medium">{row.duration}</td>
                    <td className="py-2 px-3 font-cinzel font-bold text-cosmic-gold">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-[11px] text-cosmic-white/50 italic font-poppins pt-1">
            Calculated from the listed per-minute rate, not separately published package prices.
          </p>
        </div>

        {/* 5. Availability and Working Hours Table */}
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-cosmic-gold font-bold">5. Availability and Working Hours</div>
            <h3 className="text-xl font-cinzel font-bold text-cosmic-white mt-1">
              Weekly Consultation Hours
            </h3>
            <p className="text-xs text-cosmic-white/60 mt-1">
              The profile lists availability throughout the week.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-poppins">
              <thead>
                <tr className="border-b border-cosmic-border/30 text-cosmic-gold uppercase text-[10px]">
                  <th className="py-2 px-3">Day</th>
                  <th className="py-2 px-3">Available Hours</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cosmic-border/20">
                {[
                  'Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday',
                ].map((day) => (
                  <tr key={day} className="hover:bg-cosmic-midnight/40">
                    <td className="py-2 px-3 text-cosmic-white font-medium">{day}</td>
                    <td className="py-2 px-3 font-mono text-cosmic-gold">10 AM – 6 PM</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 6. Rating and Testimonials */}
      <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-cosmic-gold font-bold">6. Rating and Testimonials</div>
            <h3 className="text-2xl font-cinzel font-bold text-cosmic-white mt-1">
              Client Testimonials & Experiences
            </h3>
          </div>
          <div className="flex items-center gap-2 p-2 px-4 rounded-xl bg-cosmic-midnight/80 border border-cosmic-gold/40">
            <Star className="w-5 h-5 fill-cosmic-gold text-cosmic-gold" />
            <span className="font-cinzel font-bold text-base text-cosmic-white">Displayed rating: {astrologer.rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-xs text-cosmic-white/60">
          The profile page contains five sample customer testimonials:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {astrologer.reviews.map((rev, idx) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 space-y-3 text-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex text-cosmic-gold">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-cosmic-gold" />
                    ))}
                  </div>
                  <span className="text-[10px] text-cosmic-gold font-semibold">Testimonial #{idx + 1}</span>
                </div>
                <p className="text-cosmic-white/90 font-poppins italic">
                  &quot;{rev.comment}&quot;
                </p>
              </div>

              <div className="pt-2 border-t border-cosmic-border/20 flex items-center justify-between">
                <div>
                  <div className="font-bold text-cosmic-white">{idx + 1}. {rev.userName}</div>
                  <div className="text-[10px] text-cosmic-white/50">{rev.userLocation}</div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-cosmic-peacock/20 text-cosmic-peacock text-[10px] font-medium">
                  {rev.consultationType}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recharge Modal Portal */}
      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        suggestedAmount={estimatedTotalCost}
      />
    </div>
  );
}
