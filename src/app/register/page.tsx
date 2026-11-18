'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, Phone, Mail, Lock, User, Gift } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({
      name: name || 'Astro Seeker',
      phone: phone || '+91 98765 00000',
      email: email || 'seeker@krishnajyotish.com',
      walletBalance: 100, // 100 free credits
      isProfileComplete: false,
    });
    router.push('/onboarding');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cosmic-purple/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 p-8 shadow-2xl backdrop-blur-xl">
        {/* Welcome Bonus Callout */}
        <div className="mb-6 p-3 rounded-2xl bg-cosmic-gold/15 border border-cosmic-gold/40 flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cosmic-gold text-cosmic-midnight">
            <Gift className="w-5 h-5" />
          </div>
          <div className="text-xs">
            <span className="font-bold text-cosmic-gold block font-cinzel">
              Divine Welcome Blessing
            </span>
            <span className="text-cosmic-white/80">
              Get ₹100 instant wallet credits on sign up for your first consultation!
            </span>
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-cinzel font-bold text-cosmic-white">
            Create Your Account
          </h2>
          <p className="text-xs text-cosmic-white/60 font-poppins mt-1">
            Join the Krishna Cosmic Universe for daily horoscope & consultations
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/50" />
              <input
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1">
              Mobile Number (For OTP Verification)
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/50" />
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/50" />
              <input
                type="email"
                placeholder="yourname@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1">
              Create Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/50" />
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
                minLength={6}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs uppercase tracking-wider shadow-goldGlow hover:opacity-95 transition-opacity"
          >
            Claim ₹100 & Continue to Birth Profile →
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-cosmic-white/60">
          Already registered?{' '}
          <Link href="/login" className="text-cosmic-gold hover:underline font-semibold">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
}
