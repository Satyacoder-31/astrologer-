'use client';

import React from 'react';
import Link from 'next/link';
import { ASTROLOGY_SERVICES } from '@/lib/data/services';
import { Sparkles, ArrowRight, ShieldCheck, Compass } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cosmic-gold/15 border border-cosmic-gold/30 text-cosmic-gold text-xs font-semibold uppercase">
          <Compass className="w-3.5 h-3.5 text-cosmic-gold" />
          Authentic Vedic Shastras
        </div>
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
          Astrology & Spiritual Consultation Services
        </h1>
        <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins">
          Explore our twelve sacred branches of divination, energy harmonization, and celestial predictive sciences.
        </p>
      </div>

      {/* Services Grid (All 12 Services) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ASTROLOGY_SERVICES.map((service, idx) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="glass-panel glass-panel-hover rounded-3xl p-6 group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="w-10 h-10 rounded-2xl bg-cosmic-gold/15 border border-cosmic-gold/30 flex items-center justify-center text-cosmic-gold font-cinzel font-bold text-sm group-hover:scale-110 transition-transform">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
                <span className="text-[10px] text-cosmic-peacock uppercase font-semibold">
                  Certified Acharyas
                </span>
              </div>

              <h3 className="font-cinzel font-bold text-xl text-cosmic-white group-hover:text-cosmic-gold transition-colors">
                {service.title}
              </h3>
              <div className="font-devanagari text-xs text-cosmic-peacock mt-0.5">
                {service.sanskritTitle}
              </div>

              <p className="text-xs text-cosmic-white/70 font-poppins mt-3 leading-relaxed line-clamp-3">
                {service.description}
              </p>

              <div className="mt-4 pt-3 border-t border-cosmic-border/20">
                <div className="text-[11px] font-semibold text-cosmic-gold uppercase mb-1">
                  Key Benefits
                </div>
                <ul className="text-[11px] text-cosmic-white/60 space-y-1">
                  {service.benefits.slice(0, 2).map((b, i) => (
                    <li key={i} className="truncate">• {b}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-cosmic-border/30 flex items-center justify-between text-xs text-cosmic-gold font-medium">
              <span>View Service Details & Astrologers</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
