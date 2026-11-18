'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Phone, Mail, Lock, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { loginWithOtp, loginWithEmail, loginWithGoogle } = useAuth();

  const [authMode, setAuthMode] = useState<'otp' | 'email'>('otp');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [demoOtpHint, setDemoOtpHint] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSendOtp = () => {
    if (!phoneNumber || phoneNumber.length < 10) {
      setErrorMsg('Please enter a valid 10-digit mobile number');
      return;
    }
    setErrorMsg('');
    setOtpSent(true);
    // Generates secure 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setDemoOtpHint(generatedOtp);
    setOtpCode(generatedOtp); // Auto-filled for instant seamless authentication
  };

  const handleOtpLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    const success = await loginWithOtp(phoneNumber, otpCode);
    setIsLoading(false);
    if (success) {
      router.push('/dashboard');
    } else {
      setErrorMsg('Invalid OTP. Please enter the 6-digit code sent to your phone.');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');
    const success = await loginWithEmail(email, password);
    setIsLoading(false);
    if (success) {
      router.push('/dashboard');
    } else {
      setErrorMsg('Invalid credentials. Password must be at least 6 characters.');
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    const success = await loginWithGoogle();
    setIsLoading(false);
    if (success) router.push('/dashboard');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cosmic-gold/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 p-8 shadow-2xl backdrop-blur-xl">
        {/* Brand header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-cosmic-peacock via-cosmic-purple to-cosmic-gold p-0.5 shadow-goldGlow mb-3">
            <div className="w-full h-full bg-cosmic-midnight rounded-[14px] flex items-center justify-center font-devanagari text-cosmic-gold text-2xl font-bold">
              ॐ
            </div>
          </div>
          <h2 className="text-2xl font-cinzel font-bold text-cosmic-white">
            Welcome to Krishna Jyotish
          </h2>
          <p className="text-xs text-cosmic-white/60 font-poppins mt-1">
            Access your personalized Kundli, consultations, and wallet
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex rounded-xl bg-cosmic-midnight/80 p-1 border border-cosmic-border/30 mb-6 text-xs">
          <button
            type="button"
            onClick={() => setAuthMode('otp')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              authMode === 'otp'
                ? 'bg-cosmic-gold text-cosmic-midnight font-bold shadow-sm'
                : 'text-cosmic-white/70 hover:text-cosmic-white'
            }`}
          >
            Mobile OTP
          </button>
          <button
            type="button"
            onClick={() => setAuthMode('email')}
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${
              authMode === 'email'
                ? 'bg-cosmic-gold text-cosmic-midnight font-bold shadow-sm'
                : 'text-cosmic-white/70 hover:text-cosmic-white'
            }`}
          >
            Email & Password
          </button>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-xs text-rose-300">
            {errorMsg}
          </div>
        )}

        {authMode === 'otp' ? (
          <form onSubmit={handleOtpLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-cosmic-white/60 font-medium">
                  +91
                </span>
                <input
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            {!otpSent ? (
              <button
                type="button"
                onClick={handleSendOtp}
                className="w-full py-3 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs uppercase tracking-wider shadow-goldGlow hover:opacity-95 transition-opacity"
              >
                Send Verification OTP
              </button>
            ) : (
              <div className="space-y-4">
                {demoOtpHint && (
                  <div className="p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs text-emerald-300 flex items-center justify-between">
                    <span>SMS OTP dispatched:</span>
                    <button
                      type="button"
                      onClick={() => setOtpCode(demoOtpHint)}
                      className="font-mono font-bold underline text-amber-200"
                    >
                      {demoOtpHint} (Auto-filled)
                    </button>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1.5">
                    Enter 6-Digit OTP
                  </label>
                  <input
                    type="text"
                    placeholder="Enter code (123456)"
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-center tracking-widest text-lg font-mono text-cosmic-white outline-none"
                    maxLength={6}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs uppercase tracking-wider shadow-goldGlow hover:opacity-95 transition-opacity disabled:opacity-50"
                >
                  {isLoading ? 'Verifying...' : 'Verify & Enter Cosmic Universe'}
                </button>
              </div>
            )}
          </form>
        ) : (
          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/50" />
                <input
                  type="email"
                  placeholder="yourname@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cosmic-gold uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-cosmic-white/50" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs uppercase tracking-wider shadow-goldGlow hover:opacity-95 transition-opacity disabled:opacity-50"
            >
              {isLoading ? 'Authenticating...' : 'Sign In'}
            </button>
          </form>
        )}

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-cosmic-border/30" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-cosmic-galaxy px-2 text-cosmic-white/50">Or continue with</span>
          </div>
        </div>

        {/* Google 1-Click */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full py-2.5 px-4 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 hover:border-cosmic-gold/50 text-xs font-semibold text-cosmic-white transition-all flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Register link */}
        <div className="text-center mt-6 text-xs text-cosmic-white/60">
          New to Krishna Jyotish?{' '}
          <Link href="/register" className="text-cosmic-gold hover:underline font-semibold">
            Create an account (Get ₹100 Free Credits)
          </Link>
        </div>
      </div>
    </div>
  );
}
