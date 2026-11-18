'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useWallet } from '@/context/WalletContext';
import { RechargeModal } from '@/components/wallet/RechargeModal';
import {
  Sparkles,
  Wallet,
  Menu,
  X,
  User as UserIcon,
  Shield,
  Briefcase,
  Compass,
  ChevronDown,
  LogOut,
  Plus,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, switchRole } = useAuth();
  const { balance } = useWallet();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  const navLinks = [
    { label: 'Astrologers', href: '#astrologers' },
    { label: 'Kundli', href: '#kundli' },
    { label: 'Horoscope', href: '#horoscope' },
    { label: 'Panchang', href: '#panchang' },
    { label: 'Services', href: '#services' },
    { label: 'Krishna Wisdom', href: '#krishna-wisdom' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full backdrop-blur-2xl bg-[#080D24]/85 border-b border-cosmic-gold/25 shadow-[0_4px_30px_rgba(0,0,0,0.6)] transition-all">
        {/* Top subtle golden lightbeam */}
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cosmic-gold/50 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3.5 group">
              <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-cosmic-peacock via-cosmic-gold to-cosmic-purple p-[1.5px] shadow-[0_0_15px_rgba(212,175,98,0.4)] group-hover:shadow-[0_0_25px_rgba(212,175,98,0.7)] group-hover:scale-105 transition-all duration-300">
                <div className="w-full h-full bg-[#080D24] rounded-[14px] flex items-center justify-center">
                  <span className="font-devanagari text-cosmic-gold text-2xl font-bold leading-none select-none">ॐ</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-cinzel font-extrabold text-lg sm:text-xl md:text-2xl tracking-wider gold-gradient-text flex items-center gap-1.5 drop-shadow-[0_0_12px_rgba(212,175,98,0.3)]">
                  KRISHNA JYOTISH
                  <Sparkles className="w-3.5 h-3.5 text-cosmic-saffron animate-pulse" />
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-cosmic-gold/80 uppercase font-poppins font-medium">
                  Vedic Cosmic Universe
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1.5 p-1 rounded-full bg-black/40 border border-cosmic-gold/15 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + '/');
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-poppins font-medium tracking-wide transition-all duration-300 relative ${
                      isActive
                        ? 'text-cosmic-midnight bg-gold-gradient font-bold shadow-[0_0_15px_rgba(212,175,98,0.4)]'
                        : 'text-cosmic-white/80 hover:text-cosmic-gold hover:bg-cosmic-gold/10'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* Right Action Buttons */}
            <div className="hidden sm:flex items-center gap-3">
              {/* Wallet Pill */}
              <button
                onClick={() => setIsRechargeModalOpen(true)}
                className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-cosmic-gold/35 text-xs font-semibold text-cosmic-white hover:border-cosmic-gold hover:shadow-[0_0_15px_rgba(212,175,98,0.3)] transition-all group backdrop-blur-md"
                title="Click to recharge wallet"
              >
                <Wallet className="w-3.5 h-3.5 text-cosmic-gold group-hover:scale-110 transition-transform" />
                <span className="font-mono text-cosmic-gold font-bold">₹{balance}</span>
                <span className="p-0.5 rounded-full bg-cosmic-gold/20 text-cosmic-gold group-hover:bg-cosmic-gold group-hover:text-cosmic-midnight transition-colors">
                  <Plus className="w-3 h-3" />
                </span>
              </button>

              {/* Role Switcher & User Profile Dropdown or Sign In */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
                    className="flex items-center gap-2 p-1.5 pl-3 rounded-full bg-black/70 border border-cosmic-border/40 hover:border-cosmic-gold/50 text-xs text-cosmic-white transition-all backdrop-blur-md"
                  >
                    <span className="text-[11px] text-cosmic-white/70 capitalize">
                      {user.role}
                    </span>
                    <div className="w-7 h-7 rounded-full bg-cosmic-purple/40 border border-cosmic-gold/40 flex items-center justify-center text-cosmic-gold font-bold">
                      {user.name ? user.name.charAt(0) : <UserIcon className="w-3.5 h-3.5" />}
                    </div>
                    <ChevronDown className="w-3.5 h-3.5 text-cosmic-white/60 mr-1" />
                  </button>

                  {isRoleDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-black/95 border border-cosmic-gold/30 shadow-2xl p-2 z-50 text-xs backdrop-blur-2xl animate-fadeIn">
                      <div className="p-2 border-b border-cosmic-border/30">
                        <div className="font-bold text-cosmic-white truncate">{user.name}</div>
                        <div className="text-[10px] text-cosmic-white/50 truncate">{user.email}</div>
                      </div>

                      <div className="py-1">
                        <Link
                          href="/dashboard"
                          onClick={() => setIsRoleDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-cosmic-white/80 hover:bg-cosmic-galaxy hover:text-cosmic-gold"
                        >
                          <Compass className="w-4 h-4" /> User Dashboard
                        </Link>
                        <Link
                          href="/profile"
                          onClick={() => setIsRoleDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-cosmic-white/80 hover:bg-cosmic-galaxy hover:text-cosmic-gold"
                        >
                          <UserIcon className="w-4 h-4" /> Profile & History
                        </Link>
                        <Link
                          href="/wallet"
                          onClick={() => setIsRoleDropdownOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-xl text-cosmic-white/80 hover:bg-cosmic-galaxy hover:text-cosmic-gold"
                        >
                          <Wallet className="w-4 h-4" /> Wallet & Ledgers
                        </Link>
                      </div>

                      {/* Role Switcher */}
                      <div className="border-t border-cosmic-border/30 pt-1">
                        <div className="px-3 py-1 text-[10px] font-semibold text-cosmic-gold uppercase tracking-wider">
                          Switch View Mode
                        </div>
                        <Link
                          href="/dashboard"
                          onClick={() => {
                            switchRole('user');
                            setIsRoleDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${
                            user.role === 'user' ? 'bg-cosmic-gold/20 text-cosmic-gold font-bold' : 'text-cosmic-white/70 hover:bg-cosmic-galaxy'
                          }`}
                        >
                          <span>User Portal</span>
                          {user.role === 'user' && '✓'}
                        </Link>
                        <Link
                          href="/astrologer-dashboard"
                          onClick={() => {
                            switchRole('astrologer');
                            setIsRoleDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${
                            user.role === 'astrologer' ? 'bg-cosmic-gold/20 text-cosmic-gold font-bold' : 'text-cosmic-white/70 hover:bg-cosmic-galaxy'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="w-3 h-3 text-cosmic-peacock" /> Astrologer Portal
                          </span>
                          {user.role === 'astrologer' && '✓'}
                        </Link>
                        <Link
                          href="/admin"
                          onClick={() => {
                            switchRole('admin');
                            setIsRoleDropdownOpen(false);
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-left ${
                            user.role === 'admin' ? 'bg-cosmic-gold/20 text-cosmic-gold font-bold' : 'text-cosmic-white/70 hover:bg-cosmic-galaxy'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <Shield className="w-3 h-3 text-cosmic-saffron" /> Admin Panel
                          </span>
                          {user.role === 'admin' && '✓'}
                        </Link>
                      </div>

                      <div className="border-t border-cosmic-border/30 pt-1 mt-1">
                        <button
                          onClick={() => {
                            logout();
                            setIsRoleDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-rose-400 hover:bg-cosmic-galaxy text-left"
                        >
                          <LogOut className="w-3.5 h-3.5" /> Log Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-3.5 py-1.5 rounded-full bg-black/70 border border-cosmic-border/40 hover:border-cosmic-gold/50 text-xs font-semibold text-cosmic-white transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    className="px-3.5 py-1.5 rounded-full bg-cosmic-gold/20 border border-cosmic-gold/40 hover:bg-cosmic-gold hover:text-cosmic-midnight text-xs font-semibold text-cosmic-gold transition-all"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Direct Consult CTA */}
              <Link
                href="/astrologers"
                className="px-5 py-2 rounded-full bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,98,0.5)] hover:scale-105 transition-all duration-300 shadow-goldGlow flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-cosmic-midnight" />
                Consult Now
              </Link>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="flex sm:hidden items-center gap-2">
              <button
                onClick={() => setIsRechargeModalOpen(true)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black border border-cosmic-gold/40 text-xs font-semibold text-cosmic-gold"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>₹{balance}</span>
              </button>

              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-xl bg-black text-cosmic-white border border-cosmic-border/40"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-b border-cosmic-gold/30 bg-black/95 backdrop-blur-2xl px-4 pt-2 pb-6 space-y-3">
            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2.5 rounded-xl text-sm font-medium text-cosmic-white/90 hover:bg-cosmic-galaxy hover:text-cosmic-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-medium text-cosmic-gold hover:bg-cosmic-galaxy"
              >
                My Dashboard
              </Link>
              <Link
                href="/astrologer-dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-medium text-cosmic-peacock hover:bg-cosmic-galaxy"
              >
                Astrologer Portal
              </Link>
              <Link
                href="/admin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-xl text-sm font-medium text-cosmic-saffron hover:bg-cosmic-galaxy"
              >
                Admin Panel
              </Link>
            </nav>

            <div className="pt-2 border-t border-cosmic-border/30 flex gap-2">
              <Link
                href="/astrologers"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex-1 py-3 text-center rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-sm shadow-goldGlow"
              >
                Consult Astrologer
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Recharge Modal Portal */}
      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
      />
    </>
  );
}
export { Navbar };
