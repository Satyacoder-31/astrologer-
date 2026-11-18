'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { getServiceBySlug, ASTROLOGY_SERVICES } from '@/lib/data/services';
import { getAstrologerById } from '@/lib/data/astrologers';
import {
  Sparkles,
  ChevronLeft,
  CheckCircle2,
  HelpCircle,
  Users,
  ShieldCheck,
  Star,
  ArrowRight,
} from 'lucide-react';

export default function IndividualServicePage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'vedic-astrology';
  const service = getServiceBySlug(slug) || ASTROLOGY_SERVICES[0];

  const recommendedAstrologers = service.recommendedAstrologers
    .map((id) => getAstrologerById(id))
    .filter(Boolean);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      {/* Back link */}
      <Link
        href="/services"
        className="inline-flex items-center gap-1.5 text-xs text-cosmic-gold hover:underline font-semibold"
      >
        <ChevronLeft className="w-4 h-4" /> Back to All Services
      </Link>

      {/* Header Banner */}
      <div className="rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/40 p-8 md:p-12 shadow-2xl space-y-4 backdrop-blur-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cosmic-gold/15 border border-cosmic-gold/30 text-cosmic-gold text-xs font-semibold uppercase">
          <Sparkles className="w-3.5 h-3.5 text-cosmic-gold" />
          Vedic Discipline
        </div>
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
          {service.title}
        </h1>
        <div className="text-lg md:text-xl font-devanagari text-cosmic-peacock">
          {service.sanskritTitle}
        </div>
        <p className="text-sm md:text-base text-cosmic-white/80 font-poppins max-w-2xl leading-relaxed">
          {service.description}
        </p>

        <div className="pt-4 flex flex-wrap items-center gap-4">
          <Link
            href="/astrologers"
            className="px-6 py-3 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs shadow-goldGlow hover:scale-105 transition-transform"
          >
            Consult Expert in {service.title}
          </Link>
        </div>
      </div>

      {/* Benefits & Process */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Core Benefits */}
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4">
          <h3 className="text-xl font-cinzel font-bold text-cosmic-gold">
            Transformative Benefits
          </h3>
          <ul className="space-y-3 text-xs md:text-sm text-cosmic-white/80 font-poppins">
            {service.benefits.map((b, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Consultation Process */}
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-peacock/30 space-y-4">
          <h3 className="text-xl font-cinzel font-bold text-cosmic-peacock">
            How The Consultation Works
          </h3>
          <ul className="space-y-3 text-xs md:text-sm text-cosmic-white/80 font-poppins">
            {service.process.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-cosmic-peacock/20 text-cosmic-peacock font-bold text-[10px] flex items-center justify-center flex-shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Recommended Astrologers for this Service */}
      {recommendedAstrologers.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-2xl font-cinzel font-bold text-cosmic-white">
            Recommended Astrologers for {service.title}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendedAstrologers.map((astro: any) => (
              <div
                key={astro.id}
                className="glass-panel glass-panel-hover rounded-3xl p-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-cosmic-gold/40 flex-shrink-0">
                    <Image src={astro.avatar} alt={astro.name} fill className="object-cover" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1 font-cinzel font-bold text-sm text-cosmic-white">
                      <span>{astro.name}</span>
                      <ShieldCheck className="w-4 h-4 text-cosmic-peacock" />
                    </div>
                    <div className="text-[11px] text-cosmic-gold">{astro.experienceDisplay} • ₹{astro.pricePerMinute}/min</div>
                    <div className="flex items-center gap-1 text-[11px] text-cosmic-white/60">
                      <Star className="w-3 h-3 fill-cosmic-gold text-cosmic-gold" /> {astro.rating} ({astro.reviewCount} reviews)
                    </div>
                  </div>
                </div>

                <Link
                  href={`/consultation/chat/${astro.id}`}
                  className="px-4 py-2 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs"
                >
                  Consult
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Frequently Asked Questions */}
      <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4">
        <h3 className="text-xl font-cinzel font-bold text-cosmic-gold flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-cosmic-gold" /> Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {service.faqs.map((faq, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 text-xs space-y-1">
              <div className="font-bold text-cosmic-white font-cinzel text-sm">{faq.question}</div>
              <p className="text-cosmic-white/70 font-poppins leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
