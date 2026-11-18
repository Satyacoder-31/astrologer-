'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useWallet } from '@/context/WalletContext';
import { ASTROLOGERS_DATABASE } from '@/lib/data/astrologers';
import {
  User,
  Calendar,
  Clock,
  MapPin,
  Wallet,
  Bookmark,
  Bell,
  Lock,
  Trash2,
  CheckCircle2,
  History,
  Phone,
  MessageCircle,
  Shield,
  Edit,
} from 'lucide-react';

export default function UserProfilePage() {
  const { user, birthProfile, saveBirthProfile, isAstrologerSaved } = useAuth();
  const { balance, transactions } = useWallet();

  const [activeTab, setActiveTab] = useState<'profile' | 'history' | 'saved' | 'settings'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  // Edit form state
  const [name, setName] = useState(birthProfile?.fullName || user?.name || '');
  const [city, setCity] = useState(birthProfile?.city || '');
  const [language, setLanguage] = useState(birthProfile?.preferredLanguage || 'Hindi');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const savedAstrologers = ASTROLOGERS_DATABASE.filter((a) => isAstrologerSaved(a.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (birthProfile) {
      saveBirthProfile({
        ...birthProfile,
        fullName: name,
        city,
        preferredLanguage: language,
      });
      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 2500);
    }
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8">
      {/* Header Profile Card */}
      <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/30 backdrop-blur-xl flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="w-24 h-24 rounded-3xl bg-cosmic-purple/40 border-2 border-cosmic-gold/50 flex items-center justify-center font-cinzel font-bold text-3xl text-cosmic-gold shadow-goldGlow">
            {user?.name ? user.name.charAt(0) : 'K'}
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-cinzel font-bold text-cosmic-white">
              {user?.name || 'Astro Seeker'}
            </h1>
            <div className="text-xs text-cosmic-gold mt-0.5">{user?.email} • {user?.phone}</div>
            <div className="text-xs text-cosmic-white/60 mt-1">
              Member since {new Date(user?.createdAt || Date.now()).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 px-5 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-gold/30 text-center">
            <div className="text-[10px] text-cosmic-white/50 uppercase">Wallet Balance</div>
            <div className="text-xl font-cinzel font-bold text-cosmic-gold">₹{balance}</div>
          </div>
          <Link
            href="/wallet"
            className="px-4 py-2.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs"
          >
            Recharge
          </Link>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-xs text-emerald-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> Birth profile updated successfully!
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b border-cosmic-border/30 gap-2 overflow-x-auto text-xs font-cinzel font-bold">
        {[
          { id: 'profile', label: 'Personal & Birth Details' },
          { id: 'history', label: 'Consultation & Call History' },
          { id: 'saved', label: `Saved Astrologers (${savedAstrologers.length})` },
          { id: 'settings', label: 'Account & Privacy Settings' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-3 px-5 rounded-t-2xl border-t border-x transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-cosmic-galaxy border-cosmic-gold text-cosmic-gold shadow-md'
                : 'border-transparent text-cosmic-white/60 hover:text-cosmic-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Profile & Birth Info */}
      {activeTab === 'profile' && (
        <div className="rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 p-6 md:p-8 backdrop-blur-xl space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-cinzel font-bold text-cosmic-white">
              Vedic Birth Profile Information
            </h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cosmic-midnight border border-cosmic-border/30 text-xs text-cosmic-gold"
            >
              <Edit className="w-3.5 h-3.5" /> {isEditing ? 'Cancel' : 'Edit Details'}
            </button>
          </div>

          {!isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-poppins">
              <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30">
                <span className="text-cosmic-white/50 block text-[10px] uppercase">Full Name</span>
                <span className="font-bold text-cosmic-white text-sm">{birthProfile?.fullName}</span>
              </div>
              <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30">
                <span className="text-cosmic-white/50 block text-[10px] uppercase">Date of Birth</span>
                <span className="font-bold text-cosmic-white text-sm">{birthProfile?.dob}</span>
              </div>
              <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30">
                <span className="text-cosmic-white/50 block text-[10px] uppercase">Time of Birth</span>
                <span className="font-bold text-cosmic-white text-sm">{birthProfile?.tob} (24-hr)</span>
              </div>
              <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30">
                <span className="text-cosmic-white/50 block text-[10px] uppercase">Birth City & State</span>
                <span className="font-bold text-cosmic-white text-sm">{birthProfile?.birthplace}</span>
              </div>
              <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30">
                <span className="text-cosmic-white/50 block text-[10px] uppercase">Coordinates</span>
                <span className="font-bold text-cosmic-peacock text-sm">
                  {birthProfile?.latitude}° N, {birthProfile?.longitude}° E
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30">
                <span className="text-cosmic-white/50 block text-[10px] uppercase">Language</span>
                <span className="font-bold text-cosmic-white text-sm">{birthProfile?.preferredLanguage}</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="space-y-4 max-w-md">
              <div>
                <label className="text-xs text-cosmic-gold block mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-xs text-cosmic-white outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-cosmic-gold block mb-1">City</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-xs text-cosmic-white outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-cosmic-gold block mb-1">Preferred Language</label>
                <input
                  type="text"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-xs text-cosmic-white outline-none"
                  required
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs"
              >
                Save Changes
              </button>
            </form>
          )}

          <div className="pt-4 border-t border-cosmic-border/30 flex items-center gap-3">
            <Link
              href="/kundli"
              className="px-4 py-2 rounded-xl bg-cosmic-midnight border border-cosmic-gold/40 text-cosmic-gold text-xs font-semibold hover:bg-cosmic-gold hover:text-cosmic-midnight transition-colors"
            >
              View Generated Kundli (D1 & D9) →
            </Link>
          </div>
        </div>
      )}

      {/* Tab 2: History */}
      {activeTab === 'history' && (
        <div className="rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 p-6 md:p-8 backdrop-blur-xl space-y-4">
          <h3 className="text-xl font-cinzel font-bold text-cosmic-white">
            Consultation Session Log
          </h3>
          <div className="space-y-3">
            {[
              {
                astro: 'Dr. Amit Deshmukh',
                type: 'Live Chat',
                duration: '2 mins',
                cost: '₹49',
                date: 'Yesterday, 04:30 PM',
                status: 'Completed',
              },
              {
                astro: 'Vidushi Gayatri Devi',
                type: 'Voice Call',
                duration: '5 mins',
                cost: '₹125',
                date: '3 days ago, 11:15 AM',
                status: 'Completed',
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 flex items-center justify-between text-xs"
              >
                <div>
                  <div className="font-bold text-cosmic-white">{item.astro}</div>
                  <div className="text-[11px] text-cosmic-white/50">{item.type} • {item.duration} • {item.date}</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-cosmic-gold font-cinzel">{item.cost}</div>
                  <div className="text-[10px] text-emerald-400">{item.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Saved Astrologers */}
      {activeTab === 'saved' && (
        <div className="rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 p-6 md:p-8 backdrop-blur-xl space-y-4">
          <h3 className="text-xl font-cinzel font-bold text-cosmic-white">
            Bookmarked Astrologers
          </h3>
          {savedAstrologers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {savedAstrologers.map((a) => (
                <div
                  key={a.id}
                  className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 flex items-center justify-between text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden">
                      <Image src={a.avatar} alt={a.name} fill className="object-cover" />
                    </div>
                    <div>
                      <div className="font-bold text-cosmic-white">{a.name}</div>
                      <div className="text-[11px] text-cosmic-gold">{a.experienceDisplay} • ₹{a.pricePerMinute}/min</div>
                    </div>
                  </div>
                  <Link
                    href={`/consultation/chat/${a.id}`}
                    className="px-3 py-1.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-bold text-xs"
                  >
                    Consult
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-xs text-cosmic-white/50 italic">No saved astrologers yet.</div>
          )}
        </div>
      )}

      {/* Tab 4: Settings & Data Privacy */}
      {activeTab === 'settings' && (
        <div className="rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 p-6 md:p-8 backdrop-blur-xl space-y-6">
          <h3 className="text-xl font-cinzel font-bold text-cosmic-white">
            Account Preferences & Data Privacy
          </h3>

          <div className="space-y-4 text-xs max-w-xl">
            <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 flex items-center justify-between">
              <div>
                <div className="font-semibold text-cosmic-white">In-App Consultation Ring Notification</div>
                <div className="text-[10px] text-cosmic-white/50">Receive audio chime when astrologer messages or calls</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-cosmic-gold w-4 h-4" />
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 flex items-center justify-between">
              <div>
                <div className="font-semibold text-cosmic-white">Daily Horoscope Notification</div>
                <div className="text-[10px] text-cosmic-white/50">Morning daily transit summary for your Rashi</div>
              </div>
              <input type="checkbox" defaultChecked className="accent-cosmic-gold w-4 h-4" />
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-rose-500/30 flex items-center justify-between">
              <div>
                <div className="font-semibold text-rose-300">Delete Account & Birth Data</div>
                <div className="text-[10px] text-cosmic-white/50">Permanently erase your birth records and consultation logs</div>
              </div>
              <button
                onClick={() => alert('Account deletion request submitted. As per data privacy guidelines, records will be purged within 48 hours.')}
                className="px-3 py-1.5 rounded-lg bg-rose-500/20 text-rose-300 font-semibold hover:bg-rose-500 hover:text-white transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
