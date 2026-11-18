'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ASTROLOGERS_DATABASE } from '@/lib/data/astrologers';
import {
  Shield,
  Users,
  Briefcase,
  DollarSign,
  TrendingUp,
  CheckCircle2,
  XCircle,
  FileText,
  Settings,
  Bell,
  Search,
  AlertCircle,
  Check,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<'analytics' | 'astrologers' | 'users' | 'finances' | 'content'>('analytics');
  const [astrologerList, setAstrologerList] = useState(ASTROLOGERS_DATABASE);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Users state
  const [userList, setUserList] = useState([
    { id: 'u1', name: 'Krishna Bhakt', email: 'devotee@krishnajyotish.com', phone: '+91 98765 43210', wallet: '₹250', status: 'Active' },
    { id: 'u2', name: 'Rahul Sharma', email: 'rahul.s@gmail.com', phone: '+91 98220 54321', wallet: '₹500', status: 'Active' },
    { id: 'u3', name: 'Priya Verma', email: 'priya.v@gmail.com', phone: '+91 98450 11223', wallet: '₹420', status: 'Active' },
    { id: 'u4', name: 'Amit Kumar', email: 'amit.k@yahoo.com', phone: '+91 98112 99887', wallet: '₹150', status: 'Active' },
    { id: 'u5', name: 'Sneha Patel', email: 'sneha.p@outlook.com', phone: '+91 98790 33445', wallet: '₹300', status: 'Active' },
    { id: 'u6', name: 'Vikram Singh', email: 'vikram.s@gmail.com', phone: '+91 98290 88776', wallet: '₹600', status: 'Active' },
  ]);

  // Financial payout state
  const [pendingPayouts, setPendingPayouts] = useState('₹142,500');
  const [payoutApproved, setPayoutApproved] = useState(false);

  // CMS state
  const [gitaVerse, setGitaVerse] = useState('Chapter 2, Verse 47: कर्मण्येवाधिकारस्ते मा फलेषु कदाचन (Set to your duty, not the fruits)');
  const [festiveAlert, setFestiveAlert] = useState('Gita Jayanti, Rohini Vrat active for this month.');
  const [editingCMS, setEditingCMS] = useState<'gita' | 'festive' | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleVerification = (id: string) => {
    setAstrologerList((prev) =>
      prev.map((a) => {
        if (a.id === id) {
          const nextStatus = !a.isVerified;
          showToast(`${a.name} status updated to: ${nextStatus ? 'Verified ✓' : 'Unverified'}`);
          return { ...a, isVerified: nextStatus };
        }
        return a;
      })
    );
  };

  const handleToggleUserStatus = (id: string) => {
    setUserList((prev) =>
      prev.map((u) => {
        if (u.id === id) {
          const next = u.status === 'Active' ? 'Suspended' : 'Active';
          showToast(`User ${u.name} set to ${next}`);
          return { ...u, status: next };
        }
        return u;
      })
    );
  };

  const handleApproveAllPayouts = () => {
    setPendingPayouts('₹0');
    setPayoutApproved(true);
    showToast('Batch ACH Payout of ₹142,500 successfully released to verified astrologers via Razorpay Route!');
    setTimeout(() => setPayoutApproved(false), 4000);
  };

  const filteredAstrologers = astrologerList.filter((a) =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase())) ||
    a.languages.some((l) => l.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-6 z-50 p-4 rounded-2xl bg-cosmic-midnight border border-cosmic-gold text-cosmic-gold shadow-2xl flex items-center gap-2 text-xs font-semibold animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toastMessage}
        </div>
      )}

      {/* Admin Header */}
      <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/90 border-2 border-cosmic-gold/50 shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cosmic-saffron/15 border border-cosmic-saffron/40 text-cosmic-saffron text-xs font-bold uppercase mb-2">
            <Shield className="w-3.5 h-3.5" />
            Super Administrator Control Center
          </div>
          <h1 className="text-2xl md:text-3xl font-cinzel font-bold text-cosmic-white">
            Krishna Jyotish Platform Admin
          </h1>
          <p className="text-xs text-cosmic-white/60 font-poppins">
            System health, verified astrologer credentials, financial ledgers, and CMS.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            System Status: 100% Operational
          </span>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="flex border-b border-cosmic-border/30 gap-2 overflow-x-auto text-xs font-cinzel font-bold">
        {[
          { id: 'analytics', label: 'Platform Analytics' },
          { id: 'astrologers', label: 'Astrologer Roster & Approvals' },
          { id: 'users', label: 'User Directory & Ledgers' },
          { id: 'finances', label: 'Razorpay & Payouts' },
          { id: 'content', label: 'Spiritual CMS' },
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

      {/* Tab 1: Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-cosmic-galaxy/80 border border-cosmic-gold/30">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Total Users</div>
              <div className="text-2xl font-cinzel font-bold text-cosmic-white mt-1">48,920</div>
              <div className="text-[10px] text-emerald-400">+12% this week</div>
            </div>

            <div className="p-5 rounded-2xl bg-cosmic-galaxy/80 border border-cosmic-peacock/30">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Active Astrologers</div>
              <div className="text-2xl font-cinzel font-bold text-cosmic-peacock mt-1">{astrologerList.length}</div>
              <div className="text-[10px] text-cosmic-white/60">3 Online Now</div>
            </div>

            <div className="p-5 rounded-2xl bg-cosmic-galaxy/80 border border-cosmic-gold/30">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Gross Recharges</div>
              <div className="text-2xl font-cinzel font-bold text-cosmic-gold mt-1">₹14,890,200</div>
              <div className="text-[10px] text-cosmic-white/60">Razorpay Verified</div>
            </div>

            <div className="p-5 rounded-2xl bg-cosmic-galaxy/80 border border-emerald-500/30">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Platform Net Cut (20%)</div>
              <div className="text-2xl font-cinzel font-bold text-emerald-300 mt-1">₹2,978,040</div>
              <div className="text-[10px] text-emerald-400">Automated ledger</div>
            </div>
          </div>

          <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4">
            <h3 className="font-cinzel font-bold text-lg text-cosmic-white">
              Consultation Traffic & Hourly Load
            </h3>
            <p className="text-xs text-cosmic-white/70">
              Peak live consultation traffic occurs between 07:00 PM and 11:30 PM (IST) corresponding with evening spiritual queries.
            </p>
            <div className="h-32 flex items-end gap-2 pt-4">
              {[25, 40, 30, 60, 85, 95, 110, 80, 50, 35, 20, 15].map((val, idx) => (
                <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full bg-gradient-to-t from-cosmic-peacock to-cosmic-gold rounded-t-lg transition-all"
                    style={{ height: `${val}px` }}
                  />
                  <span className="text-[9px] text-cosmic-white/40">{idx * 2}h</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Astrologers Management */}
      {activeTab === 'astrologers' && (
        <div className="rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 p-6 md:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-cinzel font-bold text-lg text-cosmic-white">
                Vetted Astrologer Directory & Credentials
              </h3>
              <p className="text-xs text-cosmic-white/60">
                Manage practitioner credentials, verify certifications, and review consultation rates.
              </p>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="relative flex-1 sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cosmic-white/40" />
                <input
                  type="text"
                  placeholder="Filter astrologers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-xs text-cosmic-white outline-none focus:border-cosmic-gold"
                />
              </div>

              <Link
                href="/astrologer-register"
                className="px-4 py-2 rounded-xl bg-gold-gradient text-cosmic-midnight font-bold text-xs whitespace-nowrap shadow-sm hover:opacity-95"
              >
                + Onboard
              </Link>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-poppins">
              <thead>
                <tr className="border-b border-cosmic-border/30 text-cosmic-gold uppercase text-[10px]">
                  <th className="py-3 px-3">Astrologer</th>
                  <th className="py-3 px-3">Experience</th>
                  <th className="py-3 px-3">Specializations</th>
                  <th className="py-3 px-3">Pricing</th>
                  <th className="py-3 px-3">Rating</th>
                  <th className="py-3 px-3">Verification</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cosmic-border/20">
                {filteredAstrologers.map((a) => (
                  <tr key={a.id} className="hover:bg-cosmic-midnight/40 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-cosmic-white">{a.name}</div>
                      <div className="text-[10px] text-cosmic-white/50">{a.availability}</div>
                    </td>
                    <td className="py-3 px-3 text-cosmic-gold">{a.experienceDisplay}</td>
                    <td className="py-3 px-3 text-cosmic-white/80">{a.specializations.slice(0, 2).join(', ')}</td>
                    <td className="py-3 px-3 font-semibold text-cosmic-white">₹{a.pricePerMinute}/min</td>
                    <td className="py-3 px-3 text-amber-200">★ {a.rating.toFixed(1)}</td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => handleToggleVerification(a.id)}
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition-all ${
                          a.isVerified ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40 hover:bg-rose-500/30'
                        }`}
                        title="Click to toggle status"
                      >
                        {a.isVerified ? 'Verified ✓' : 'Unverified ✕'}
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Link
                        href={`/astrologers/${a.id}`}
                        className="text-cosmic-gold hover:underline text-xs font-semibold"
                      >
                        View Profile
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Users */}
      {activeTab === 'users' && (
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4 text-xs">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel font-bold text-lg text-cosmic-white">
              Registered Users & Kundli Profiles
            </h3>
            <span className="text-cosmic-gold font-semibold">{userList.length} Active Accounts</span>
          </div>

          <div className="space-y-3">
            {userList.map((u) => (
              <div key={u.id} className="p-3.5 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 flex items-center justify-between">
                <div>
                  <div className="font-bold text-cosmic-white text-sm">{u.name}</div>
                  <div className="text-[11px] text-cosmic-white/50">{u.email} • {u.phone}</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-bold text-cosmic-gold font-mono">{u.wallet}</div>
                    <div className={`text-[10px] font-semibold ${u.status === 'Active' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {u.status}
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggleUserStatus(u.id)}
                    className="px-3 py-1 rounded-lg bg-cosmic-midnight border border-cosmic-border/40 text-cosmic-white/80 hover:text-cosmic-gold hover:border-cosmic-gold transition-colors"
                  >
                    {u.status === 'Active' ? 'Suspend' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Finances */}
      {activeTab === 'finances' && (
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-6 text-xs">
          <div>
            <h3 className="font-cinzel font-bold text-lg text-cosmic-white">
              Razorpay Payment Gateway & Payout Engine
            </h3>
            <p className="text-cosmic-white/70">
              Payment transactions, signature verifications, and automated bank settlements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-gold/30 space-y-2">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Gateway Integration</div>
              <div className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" /> Razorpay Live Active
              </div>
              <div className="text-[11px] text-cosmic-white/60">Key: rzp_live_krishnajyotish</div>
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-peacock/30 space-y-2">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Platform Fee Schedule</div>
              <div className="font-bold text-cosmic-gold text-sm">20% on all sessions</div>
              <div className="text-[11px] text-cosmic-white/60">80% distributed to Astrologers</div>
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 space-y-2">
              <div className="text-[10px] text-cosmic-white/50 uppercase">Pending Bank Payouts</div>
              <div className="font-bold text-amber-200 text-sm">{pendingPayouts}</div>
              <button
                onClick={handleApproveAllPayouts}
                disabled={pendingPayouts === '₹0'}
                className="px-3 py-1.5 rounded-lg bg-gold-gradient text-cosmic-midnight font-bold text-xs hover:opacity-90 disabled:opacity-40 transition-opacity"
              >
                {pendingPayouts === '₹0' ? 'Settled ✓' : 'Release Payout Batch'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab 5: Content CMS */}
      {activeTab === 'content' && (
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4 text-xs">
          <div>
            <h3 className="font-cinzel font-bold text-lg text-cosmic-white">
              Spiritual Content Management System (CMS)
            </h3>
            <p className="text-cosmic-white/70">
              Update Bhagavad Gita daily shlokas, daily Panchang updates, and festival alerts in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 space-y-2">
              <div className="font-bold text-cosmic-gold">Gita Verse of the Day</div>
              <p className="text-cosmic-white/90 text-[11px] font-devanagari">{gitaVerse}</p>
              <button
                onClick={() => {
                  const newVerse = prompt('Enter new Gita Shloka / Verse:', gitaVerse);
                  if (newVerse) {
                    setGitaVerse(newVerse);
                    showToast('Gita Verse of the Day updated!');
                  }
                }}
                className="mt-2 text-cosmic-peacock underline font-semibold hover:text-cosmic-gold"
              >
                Edit Shloka Text →
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 space-y-2">
              <div className="font-bold text-cosmic-gold">Upcoming Festive Alerts</div>
              <p className="text-cosmic-white/90 text-[11px]">{festiveAlert}</p>
              <button
                onClick={() => {
                  const newAlert = prompt('Enter new Festival Alert:', festiveAlert);
                  if (newAlert) {
                    setFestiveAlert(newAlert);
                    showToast('Festive Alert updated!');
                  }
                }}
                className="mt-2 text-cosmic-peacock underline font-semibold hover:text-cosmic-gold"
              >
                Edit Event Banner →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
