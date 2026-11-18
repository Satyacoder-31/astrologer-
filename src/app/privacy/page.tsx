import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-xs md:text-sm text-cosmic-white/80 font-poppins leading-relaxed">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-cosmic-white">
          Privacy Policy & Birth Data Protection
        </h1>
        <p className="text-xs text-cosmic-white/60">
          Last Updated: November 2026 • Krishna Cosmic Universe (Krishna Jyotish)
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 space-y-6 backdrop-blur-xl">
        <section className="space-y-2">
          <h2 className="text-lg font-cinzel font-bold text-cosmic-gold">1. Sacred Commitment to Data Privacy</h2>
          <p>
            At Krishna Jyotish, we treat your birth data (date of birth, exact time of birth, birth coordinates) and personal questions with the utmost spiritual confidentiality and technical security. We do not sell, rent, or trade your data to third parties.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-cinzel font-bold text-cosmic-gold">2. Information We Collect</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Account Details: Name, email address, and verified mobile number.</li>
            <li>Astrological Particulars: Date of birth, time of birth, birthplace city and geographical coordinates.</li>
            <li>Financial Data: Razorpay payment order references, wallet transactions, and ledger logs. We never store credit/debit card numbers or UPI PINs.</li>
            <li>Consultation History: Time, duration, per-minute billing records, and client reviews.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-cinzel font-bold text-cosmic-gold">3. End-to-End Confidentiality</h2>
          <p>
            Consultation messages and voice/video sessions are conducted in secure peer-to-peer or encrypted rooms. Only you and your chosen verified astrologer participate in the consultation.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-cinzel font-bold text-cosmic-gold">4. Right to Data Erasure</h2>
          <p>
            You retain complete sovereignty over your cosmic data. At any time, you may request permanent deletion of your profile, birth charts, and consultation logs via your profile settings or by emailing privacy@krishnajyotish.com.
          </p>
        </section>
      </div>
    </div>
  );
}
