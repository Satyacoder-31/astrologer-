'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ASTROLOGERS_DATABASE } from '@/lib/data/astrologers';
import { useConsultation } from '@/context/ConsultationContext';
import { useAuth } from '@/context/AuthContext';
import {
  Briefcase,
  DollarSign,
  Clock,
  Star,
  Users,
  CheckCircle2,
  XCircle,
  PhoneCall,
  MessageCircle,
  Video,
  Power,
  ShieldCheck,
  TrendingUp,
  CreditCard,
  Bell,
  Send,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export default function AstrologerDashboardPage() {
  const astrologer = ASTROLOGERS_DATABASE[0]; // Dr. Amit Deshmukh view
  const { user } = useAuth();
  const {
    activeSession,
    messages,
    sendMessage,
    isUserTyping,
    sessionDurationFormatted,
  } = useConsultation();

  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [incomingRequest, setIncomingRequest] = useState<any | null>({
    id: 'req_live_109',
    userName: 'Rahul Sharma',
    userLocation: 'Delhi, India',
    type: 'Chat',
    ratePerMinute: 20,
    questionSummary: 'Career transition and promotion outcome this month',
  });
  const [payoutRequested, setPayoutRequested] = useState(false);
  const [quickReplyText, setQuickReplyText] = useState('');

  // Financial stats
  const totalEarnings = 18450;
  const platformCommission = 3690; // 20%
  const netEarnings = 14760;
  const pendingPayout = 8400;

  const handleAcceptRequest = () => {
    setIncomingRequest(null);
  };

  const handleRejectRequest = () => {
    setIncomingRequest(null);
  };

  const handleRequestPayout = () => {
    setPayoutRequested(true);
    setTimeout(() => setPayoutRequested(false), 3000);
  };

  const handleSendDashboardReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickReplyText.trim()) return;
    sendMessage(quickReplyText, undefined, undefined, 'astrologer');
    setQuickReplyText('');
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Astrologer Portal Top Banner */}
      <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/40 shadow-xl backdrop-blur-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-cosmic-gold flex-shrink-0">
            <Image src={astrologer.avatar} alt={astrologer.name} fill className="object-cover" priority />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-cinzel font-bold text-xl text-cosmic-white">
              <span>Acharya Portal: {astrologer.name}</span>
              <ShieldCheck className="w-5 h-5 text-cosmic-peacock" />
            </div>
            <div className="text-xs text-cosmic-gold">{astrologer.title} • Verified Practitioner</div>
          </div>
        </div>

        {/* Online / Offline Availability Toggle */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-border/30">
            <span className="text-xs text-cosmic-white/70">Availability Status:</span>
            <button
              onClick={() => setIsOnline(!isOnline)}
              className={`flex items-center gap-2 px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                isOnline
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                  : 'bg-rose-500/20 text-rose-300 border border-rose-500/50'
              }`}
            >
              <Power className="w-3.5 h-3.5" />
              {isOnline ? 'Online & Accepting' : 'Offline'}
            </button>
          </div>

          <Link
            href={`/consultation/chat/${astrologer.id}?role=astrologer`}
            className="px-4 py-2 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs shadow-goldGlow hover:scale-105 transition-transform flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            Open Live Chat Desk
          </Link>
        </div>
      </div>

      {/* Incoming Consultation Request Alert Modal / Banner */}
      {incomingRequest && isOnline && (
        <div className="p-6 rounded-3xl bg-gradient-to-r from-cosmic-midnight via-cosmic-peacock/30 to-cosmic-midnight border-2 border-cosmic-gold shadow-goldGlow animate-pulse-slow flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cosmic-gold text-cosmic-midnight flex items-center justify-center font-bold">
              <PhoneCall className="w-6 h-6 animate-bounce" />
            </div>
            <div>
              <div className="text-xs text-cosmic-saffron uppercase font-bold tracking-wider">
                Incoming Consultation Request!
              </div>
              <div className="text-base font-cinzel font-bold text-cosmic-white">
                {incomingRequest.userName} ({incomingRequest.userLocation})
              </div>
              <div className="text-xs text-cosmic-white/80 font-poppins">
                {incomingRequest.type} Consultation • Rate: ₹{incomingRequest.ratePerMinute}/min • &quot;{incomingRequest.questionSummary}&quot;
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleRejectRequest}
              className="px-5 py-2.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/40 font-cinzel font-bold text-xs hover:bg-rose-500 hover:text-white transition-colors"
            >
              Decline
            </button>
            <Link
              href={`/consultation/chat/${astrologer.id}?role=astrologer`}
              onClick={handleAcceptRequest}
              className="px-6 py-2.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs shadow-goldGlow hover:scale-105 transition-transform"
            >
              Accept & Start Chat →
            </Link>
          </div>
        </div>
      )}

      {/* LIVE INTERLINKED CHAT TERMINAL ON DASHBOARD */}
      <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/40 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[10px] text-cosmic-gold font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Real-Time Client Consultation Link
            </div>
            <h3 className="text-xl font-cinzel font-bold text-cosmic-white">
              Live Acharya Consultation Console
            </h3>
          </div>

          <Link
            href={`/consultation/chat/${astrologer.id}?role=astrologer`}
            className="text-xs text-cosmic-gold hover:underline font-semibold flex items-center gap-1"
          >
            Launch Full-Screen Chat Console <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Live messages container */}
        <div className="h-64 overflow-y-auto p-4 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-border/30 space-y-3 text-xs font-poppins">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-cosmic-white/50 text-xs">
              <MessageCircle className="w-8 h-8 text-cosmic-gold/40 mb-2" />
              <span>No active chat messages yet. Once a seeker sends a query, it will stream here in real-time.</span>
            </div>
          ) : (
            messages.map((m) => {
              const isMe = m.senderRole === 'astrologer';
              return (
                <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-md p-3 rounded-2xl space-y-1 ${
                      isMe
                        ? 'bg-cosmic-gold/20 border border-cosmic-gold/50 text-cosmic-white rounded-br-none'
                        : 'bg-cosmic-peacock/20 border border-cosmic-peacock/40 text-cosmic-white rounded-bl-none'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4 text-[10px] text-cosmic-white/50">
                      <span className="font-bold text-cosmic-gold">
                        {isMe ? 'Dr. Amit Deshmukh (You)' : 'Client (Seeker)'}
                      </span>
                      <span>{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                    <p className="whitespace-pre-wrap">{m.text}</p>
                  </div>
                </div>
              );
            })
          )}

          {isUserTyping && (
            <div className="text-[11px] text-cosmic-peacock animate-pulse flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cosmic-peacock" />
              Seeker is typing a message...
            </div>
          )}
        </div>

        {/* Dashboard Quick Reply Box */}
        <form onSubmit={handleSendDashboardReply} className="flex gap-2">
          <input
            type="text"
            placeholder="Type live advice or remedies as Dr. Amit Deshmukh..."
            value={quickReplyText}
            onChange={(e) => setQuickReplyText(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 focus:border-cosmic-gold text-xs text-cosmic-white outline-none"
          />
          <button
            type="submit"
            disabled={!quickReplyText.trim()}
            className="px-5 py-2.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-bold text-xs hover:opacity-90 disabled:opacity-40 transition-opacity flex items-center gap-1"
          >
            <Send className="w-3.5 h-3.5" /> Send Reply
          </button>
        </form>
      </div>

      {/* Financial Earnings Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30">
          <div className="text-xs text-cosmic-white/50 uppercase">Total Revenue (Gross)</div>
          <div className="text-2xl font-cinzel font-bold text-cosmic-gold mt-1">₹{totalEarnings}</div>
          <div className="text-[10px] text-cosmic-white/60">This month (980 mins)</div>
        </div>

        <div className="p-5 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-peacock/30">
          <div className="text-xs text-cosmic-white/50 uppercase">Net Astrologer Share (80%)</div>
          <div className="text-2xl font-cinzel font-bold text-emerald-300 mt-1">₹{netEarnings}</div>
          <div className="text-[10px] text-cosmic-peacock font-semibold">After 20% platform charge</div>
        </div>

        <div className="p-5 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-border/30">
          <div className="text-xs text-cosmic-white/50 uppercase">Pending Bank Payout</div>
          <div className="text-2xl font-cinzel font-bold text-amber-200 mt-1">₹{pendingPayout}</div>
          <div className="text-[10px] text-cosmic-white/60">Eligible for instant transfer</div>
        </div>

        <div className="p-5 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-border/30 flex flex-col justify-between">
          <div className="text-xs text-cosmic-white/50 uppercase">Bank Withdrawal</div>
          <button
            onClick={handleRequestPayout}
            className="w-full mt-2 py-2.5 rounded-xl bg-cosmic-midnight border border-cosmic-gold/40 text-cosmic-gold hover:bg-cosmic-gold hover:text-cosmic-midnight font-cinzel font-bold text-xs transition-colors"
          >
            {payoutRequested ? 'Payout Initiated!' : 'Request Payout →'}
          </button>
        </div>
      </div>

      {/* Active Consultations & Schedule Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Client Sessions */}
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4">
          <h3 className="text-xl font-cinzel font-bold text-cosmic-white">
            Recent Consultation History
          </h3>
          <div className="space-y-3 text-xs">
            {[
              { client: 'Rahul Sharma', type: 'Prashna Chat', duration: '14 mins', amount: '₹280', time: 'Today, 11:30 AM' },
              { client: 'Priya Verma', type: 'Voice Call', duration: '22 mins', amount: '₹440', time: 'Yesterday, 03:15 PM' },
              { client: 'Amit Kumar', type: 'Kundli Chat', duration: '20 mins', amount: '₹400', time: 'Yesterday, 06:00 PM' },
              { client: 'Sneha Patel', type: 'Video Vastu', duration: '30 mins', amount: '₹600', time: '14 Nov, 05:00 PM' },
              { client: 'Vikram Singh', type: 'Voice Call', duration: '15 mins', amount: '₹300', time: '13 Nov, 02:00 PM' },
            ].map((s, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-cosmic-midnight/60 border border-cosmic-border/30 flex items-center justify-between">
                <div>
                  <div className="font-bold text-cosmic-white">{s.client}</div>
                  <div className="text-[10px] text-cosmic-white/50">{s.type} • {s.duration} • {s.time}</div>
                </div>
                <div className="font-cinzel font-bold text-cosmic-gold">{s.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Availability Planner */}
        <div className="p-6 md:p-8 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/30 space-y-4">
          <h3 className="text-xl font-cinzel font-bold text-cosmic-white">
            Weekly Hours & Availability Schedule
          </h3>
          <div className="space-y-2 text-xs">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="p-2.5 rounded-xl bg-cosmic-midnight/60 border border-cosmic-border/20 flex items-center justify-between">
                <span className="font-semibold text-cosmic-white">{day}</span>
                <span className="text-cosmic-gold font-mono">10:00 AM – 06:00 PM (IST)</span>
                <span className="text-[10px] text-emerald-400 font-bold">Active</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
