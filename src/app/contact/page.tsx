'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Send, CheckCircle2, Sparkles, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Consultation Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    setTimeout(() => setIsSent(false), 4000);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-10">
      <div className="text-center max-w-3xl mx-auto space-y-2">
        <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-cosmic-white">
          Contact Vedic Support
        </h1>
        <p className="text-xs md:text-sm text-cosmic-white/70 font-poppins">
          Have questions about payment, wallet recharge, or astrologer verification? Our 24/7 team is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Contact Info Card */}
        <div className="md:col-span-5 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 p-6 md:p-8 space-y-6 text-xs text-cosmic-white/80 font-poppins backdrop-blur-xl">
          <h2 className="text-xl font-cinzel font-bold text-cosmic-gold">
            Sacred Office & Support
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-cosmic-peacock flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-cosmic-white block">Vedic Sanctuary HQ:</strong>
                Mathura Road, Vrindavan, Uttar Pradesh 281121, India
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-cosmic-gold flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-cosmic-white block">Email Support:</strong>
                care@krishnajyotish.com • support@krishnacosmic.com
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-cosmic-saffron flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-cosmic-white block">WhatsApp Helpline:</strong>
                +91 98765 43210 (Toll-Free 24x7)
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-border/30 text-[11px] text-cosmic-white/70">
            For urgent consultation inquiries, you can directly live chat with any available astrologer from the directory.
          </div>
        </div>

        {/* Form Card */}
        <div className="md:col-span-7 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 p-6 md:p-8 backdrop-blur-xl">
          {isSent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-cinzel font-bold text-cosmic-gold">
                Message Received with Blessings
              </h3>
              <p className="text-xs text-cosmic-white/70">
                Our support team will respond to {email} within 2 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-poppins">
              <div>
                <label className="text-cosmic-gold uppercase font-semibold block mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Radheshyam Patel"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
                  required
                />
              </div>

              <div>
                <label className="text-cosmic-gold uppercase font-semibold block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
                  required
                />
              </div>

              <div>
                <label className="text-cosmic-gold uppercase font-semibold block mb-1">Inquiry Subject</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
                >
                  <option value="Consultation Inquiry">Consultation & Astrologer Question</option>
                  <option value="Wallet Recharge Issue">Wallet Recharge & Razorpay Query</option>
                  <option value="Refund Request">Refund & Cancellation Request</option>
                  <option value="Astrologer Application">Astrologer Partnership Application</option>
                </select>
              </div>

              <div>
                <label className="text-cosmic-gold uppercase font-semibold block mb-1">Your Message</label>
                <textarea
                  placeholder="Describe your inquiry in detail..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full p-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white outline-none focus:border-cosmic-gold"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs uppercase tracking-wider shadow-goldGlow hover:opacity-95"
              >
                Send Message →
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
