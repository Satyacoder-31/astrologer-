import React from 'react';
import Link from 'next/link';

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8 text-xs md:text-sm text-cosmic-white/80 font-poppins leading-relaxed">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-cinzel font-bold text-cosmic-white">
          Cancellation & Refund Policy
        </h1>
        <p className="text-xs text-cosmic-white/60">
          Last Updated: November 2026 • Krishna Jyotish Financial Protection
        </p>
      </div>

      <div className="p-8 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 space-y-6 backdrop-blur-xl">
        <section className="space-y-2">
          <h2 className="text-lg font-cinzel font-bold text-cosmic-gold">1. 100% Satisfaction Guarantee</h2>
          <p>
            We stand behind the authenticity and integrity of our verified Vedic astrologers. If you encounter a verified technical glitch, dropped connection, or unprofessional conduct during a live consultation, you are eligible for an immediate wallet credit refund.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-cinzel font-bold text-cosmic-gold">2. Wallet Recharge Refund Eligibility</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>Unused Wallet Recharges: You may request a full refund to your original payment source (UPI/Card/Bank) within 7 days of recharge if no consultations have been conducted.</li>
            <li>Double Deduction: If an erroneous duplicate deduction occurs due to network latency, the excess amount is credited back to your wallet instantly upon verification.</li>
            <li>Promotional Bonus Credits: Promotional welcome credits are non-refundable and cannot be withdrawn to a bank account.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-cinzel font-bold text-cosmic-gold">3. How to Request a Refund</h2>
          <p>
            To initiate a review or refund, please reach out to our team at <strong>refunds@krishnajyotish.com</strong> with your registered phone number, transaction ID, and consultation details. All legitimate claims are settled within 2 to 5 business days via Razorpay gateway.
          </p>
        </section>
      </div>
    </div>
  );
}
