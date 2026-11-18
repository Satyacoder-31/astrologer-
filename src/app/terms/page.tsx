import React from 'react';
import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-xs md:text-sm text-cosmic-white/80 font-poppins leading-relaxed">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-cosmic-white">
          Terms & Conditions of Service
        </h1>
        <p className="text-xs text-cosmic-white/60">
          Effective Date: November 2026 • Krishna Jyotish Consultation Platform
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 space-y-6 backdrop-blur-xl">
        <section className="space-y-2">
          <h2 className="text-lg font-cinzel font-bold text-cosmic-gold">1. Acceptance of Terms</h2>
          <p>
            By accessing or using Krishna Jyotish (the &quot;Platform&quot;), including registering an account, generating a Kundli, topping up your wallet, or consulting with an astrologer, you agree to be bound by these Terms and Conditions.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-cinzel font-bold text-cosmic-gold">2. Nature of Astrological Guidance</h2>
          <p>
            Vedic astrology is an ancient spiritual science of probabilities and cosmic energy analysis. Astrological readings, horary interpretations, and gemstone or remedial recommendations represent philosophical counsel and should not replace professional medical, legal, psychiatric, or financial advisory services.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-cinzel font-bold text-cosmic-gold">3. Wallet & Billing Terms</h2>
          <p>
            Wallet balances are credited via authorized Razorpay payment methods. Real-time consultation deductions occur automatically on a per-minute basis while a live chat, voice call, or video session is active.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-cinzel font-bold text-cosmic-gold">4. Code of Conduct</h2>
          <p>
            Seekers and astrologers must maintain mutual spiritual respect and decorum. Any abusive language, harassment, or unauthorized solicitation will lead to immediate account suspension and forfeiture of access.
          </p>
        </section>
      </div>
    </div>
  );
}
