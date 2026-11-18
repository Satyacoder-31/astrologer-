'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { getAstrologerById, ASTROLOGERS_DATABASE } from '@/lib/data/astrologers';
import { useConsultation } from '@/context/ConsultationContext';
import { useWallet } from '@/context/WalletContext';
import { useAuth } from '@/context/AuthContext';
import { RechargeModal } from '@/components/wallet/RechargeModal';
import {
  Send,
  Paperclip,
  Clock,
  Wallet,
  AlertCircle,
  Phone,
  Video,
  X,
  Star,
  Sparkles,
  ShieldCheck,
  ChevronLeft,
  CheckCheck,
  User,
  Compass,
  FileText,
  DollarSign,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

export default function LiveChatConsultationPage() {
  const params = useParams();
  const router = useRouter();
  const astrologerId = (params?.id as string) || 'dr-amit-deshmukh';
  const astrologer = getAstrologerById(astrologerId) || ASTROLOGERS_DATABASE[0];

  const { user, birthProfile } = useAuth();
  const { balance } = useWallet();
  const {
    activeSession,
    messages,
    isAstrologerTyping,
    isUserTyping,
    startConsultation,
    endConsultation,
    sendMessage,
    sendTypingStatus,
    sessionDurationFormatted,
  } = useConsultation();

  // Switchable viewing role for real-time live interaction
  const [viewRole, setViewRole] = useState<'user' | 'astrologer'>('user');
  const [showClientKundli, setShowClientKundli] = useState<boolean>(true);

  const [inputMessage, setInputMessage] = useState('');
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize viewRole from query param or user role
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const roleParam = urlParams.get('role');
      if (roleParam === 'astrologer' || user?.role === 'astrologer') {
        setViewRole('astrologer');
      }
    } catch {
      // ignore
    }
  }, [user?.role]);

  // Auto-scroll chat to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isAstrologerTyping, isUserTyping]);

  // Start chat session if not already running
  useEffect(() => {
    if (!activeSession || activeSession.astrologerId !== astrologer.id) {
      const started = startConsultation(astrologer.id, 'Chat');
      if (!started && viewRole === 'user') {
        setIsRechargeModalOpen(true);
      }
    }
  }, [astrologer.id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputMessage(val);

    sendTypingStatus(viewRole, val.length > 0);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      sendTypingStatus(viewRole, false);
    }, 2000);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    sendMessage(inputMessage, undefined, undefined, viewRole);
    setInputMessage('');
    sendTypingStatus(viewRole, false);
  };

  const handleSendQuickQuestion = (q: string) => {
    sendMessage(q, undefined, undefined, 'user');
  };

  const handleSendAstrologerRemedy = (remedyText: string) => {
    sendMessage(remedyText, undefined, undefined, 'astrologer');
  };

  const handleShareKundli = () => {
    sendMessage(
      `📜 [Client Natal Chart Submitted]:\nName: ${user?.name || 'Rahul Sharma'}\nDOB: ${birthProfile?.dob || '1996-08-25'}, Time: ${birthProfile?.tob || '06:30 AM'}\nPlace: ${birthProfile?.birthplace || 'Mathura, UP, India'}\nInterests: Career & Business Growth, Marriage Compatibility`,
      undefined,
      'kundli',
      'user'
    );
  };

  const handleConfirmEnd = () => {
    endConsultation(rating, feedback);
    setIsEndModalOpen(false);
    if (viewRole === 'astrologer') {
      router.push('/astrologer-dashboard');
    } else {
      router.push('/dashboard');
    }
  };

  // Astrologer earnings calculation
  const sessionTotalDeduction = activeSession?.totalDeduction || astrologer.pricePerMinute;
  const astrologerEarnings = Math.round(sessionTotalDeduction * 0.8); // 80% share

  return (
    <div className="min-h-screen py-4 px-2 sm:px-6 max-w-6xl mx-auto flex flex-col h-[calc(100vh-5rem)]">
      {/* Role Switcher Toolbar */}
      <div className="mb-2 p-2 px-4 rounded-2xl bg-black/80 border border-cosmic-gold/30 flex items-center justify-between text-xs backdrop-blur-md">
        <div className="flex items-center gap-2">
          <span className="text-cosmic-white/60">Live Chat Perspective:</span>
          <span className="font-bold text-cosmic-gold capitalize flex items-center gap-1">
            {viewRole === 'astrologer' ? 'Acharya Console 🧘' : 'Seeker Console 👤'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] text-cosmic-white/50 hidden sm:inline">
            Test simultaneous 2-way chat by toggling:
          </span>
          <div className="flex rounded-xl bg-cosmic-midnight p-0.5 border border-cosmic-border/40">
            <button
              type="button"
              onClick={() => setViewRole('user')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                viewRole === 'user'
                  ? 'bg-cosmic-peacock text-white shadow-sm'
                  : 'text-cosmic-white/60 hover:text-white'
              }`}
            >
              👤 Client View
            </button>
            <button
              type="button"
              onClick={() => setViewRole('astrologer')}
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                viewRole === 'astrologer'
                  ? 'bg-gold-gradient text-cosmic-midnight font-bold shadow-goldGlow'
                  : 'text-cosmic-white/60 hover:text-white'
              }`}
            >
              🧘 Astrologer View
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Banner */}
      <div className="p-4 rounded-3xl bg-cosmic-galaxy/95 border border-cosmic-gold/40 shadow-xl backdrop-blur-xl flex flex-wrap items-center justify-between gap-4 mb-3">
        {/* Left identity depending on viewRole */}
        {viewRole === 'user' ? (
          <div className="flex items-center gap-3">
            <Link href={`/astrologers/${astrologer.id}`} className="relative w-12 h-12 rounded-2xl overflow-hidden border border-cosmic-gold flex-shrink-0">
              <Image src={astrologer.avatar} alt={astrologer.name} fill className="object-cover" />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border border-cosmic-midnight" />
            </Link>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-cinzel font-bold text-base text-cosmic-white">
                  {astrologer.name}
                </h2>
                <ShieldCheck className="w-4 h-4 text-cosmic-peacock" />
              </div>
              <div className="text-[11px] text-cosmic-gold">
                Rate: ₹{astrologer.pricePerMinute}/min • Live Vedic Consultation
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cosmic-midnight border border-cosmic-gold flex items-center justify-center font-cinzel font-bold text-cosmic-gold text-lg flex-shrink-0">
              <User className="w-6 h-6 text-cosmic-peacock" />
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-cinzel font-bold text-base text-cosmic-white">
                  Client: {activeSession?.userName || user?.name || 'Rahul Sharma'}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  Connected
                </span>
              </div>
              <div className="text-[11px] text-cosmic-gold">
                Consulting Acharya: Dr. Amit Deshmukh • Rate: ₹{astrologer.pricePerMinute}/min
              </div>
            </div>
          </div>
        )}

        {/* Live Timer, Wallet/Earnings & End Button */}
        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cosmic-midnight border border-cosmic-gold/30 text-xs font-mono text-cosmic-gold shadow-sm">
            <Clock className="w-4 h-4 text-cosmic-saffron animate-spin-slow" />
            <span>{sessionDurationFormatted}</span>
          </div>

          {/* User Wallet OR Astrologer Earnings */}
          {viewRole === 'user' ? (
            <button
              onClick={() => setIsRechargeModalOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-xs font-semibold text-cosmic-white hover:border-cosmic-gold transition-colors"
            >
              <Wallet className="w-3.5 h-3.5 text-cosmic-gold" />
              <span>₹{balance}</span>
              <span className="text-[10px] text-cosmic-peacock underline ml-1">+ Add</span>
            </button>
          ) : (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cosmic-midnight border border-emerald-500/40 text-xs font-semibold text-emerald-300">
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
              <span>Net: ₹{astrologerEarnings}</span>
              <span className="text-[9px] text-cosmic-white/50">(80%)</span>
            </div>
          )}

          {/* Voice Switch */}
          <Link
            href={`/consultation/call/${astrologer.id}?mode=voice`}
            className="p-2 rounded-xl bg-cosmic-midnight border border-cosmic-peacock/40 text-cosmic-peacock hover:bg-cosmic-peacock hover:text-cosmic-white transition-colors"
            title="Switch to Voice Call"
          >
            <Phone className="w-4 h-4" />
          </Link>

          {/* End Consultation Button */}
          <button
            onClick={() => setIsEndModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-rose-500/20 border border-rose-500/50 text-rose-300 hover:bg-rose-500 hover:text-white transition-colors text-xs font-bold font-cinzel"
          >
            {viewRole === 'astrologer' ? 'Conclude Session' : 'End Chat'}
          </button>
        </div>
      </div>

      {/* Astrologer Top Client Kundli Brief (Visible in Astrologer mode) */}
      {viewRole === 'astrologer' && (
        <div className="mb-3 rounded-2xl bg-cosmic-midnight/90 border border-cosmic-gold/30 p-3 text-xs backdrop-blur-md">
          <div
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setShowClientKundli(!showClientKundli)}
          >
            <div className="flex items-center gap-2 text-cosmic-gold font-cinzel font-bold">
              <Compass className="w-4 h-4 text-cosmic-gold" />
              <span>Client Astrological Dossier (Live Natal Alignment)</span>
            </div>
            <div className="text-[11px] text-cosmic-white/60 flex items-center gap-1">
              <span>{showClientKundli ? 'Collapse' : 'Expand'}</span>
              {showClientKundli ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </div>
          </div>

          {showClientKundli && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2.5 mt-2 border-t border-cosmic-border/20 text-[11px]">
              <div>
                <span className="text-cosmic-white/50 block">Birth Coordinates</span>
                <strong className="text-cosmic-white font-medium">
                  {birthProfile?.dob || '25 Aug 1996'} • {birthProfile?.tob || '06:30 AM'}
                </strong>
                <span className="text-cosmic-white/60 block">{birthProfile?.city || 'Mathura'}, India</span>
              </div>
              <div>
                <span className="text-cosmic-white/50 block">Lagna / Ascendant</span>
                <strong className="text-cosmic-gold font-cinzel">Simha (Leo)</strong>
                <span className="text-cosmic-white/60 block">Lord: Surya (Sun)</span>
              </div>
              <div>
                <span className="text-cosmic-white/50 block">Chandra Rashi / Moon</span>
                <strong className="text-cosmic-peacock font-cinzel">Vrishchika (Scorpio)</strong>
                <span className="text-cosmic-white/60 block">Nakshatra: Jyeshtha</span>
              </div>
              <div>
                <span className="text-cosmic-white/50 block">Active Mahadasha</span>
                <strong className="text-emerald-300">Brihaspati (Jupiter)</strong>
                <span className="text-cosmic-white/60 block">Antardasha: Shani</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Messages Scroll Container */}
      <div className="flex-1 overflow-y-auto p-4 rounded-3xl bg-cosmic-galaxy/80 border border-cosmic-gold/25 space-y-4 backdrop-blur-xl">
        {/* Sacred Sanctuary Banner */}
        <div className="p-3.5 rounded-2xl bg-cosmic-midnight/80 border border-cosmic-gold/30 text-xs text-center space-y-1.5 max-w-lg mx-auto">
          <Sparkles className="w-4 h-4 text-cosmic-gold mx-auto" />
          <div className="font-cinzel font-bold text-xs text-cosmic-gold">
            Live Vedic Consultation Channel • 100% Encrypted & Linked
          </div>
          <p className="text-[11px] text-cosmic-white/70">
            {viewRole === 'astrologer'
              ? 'You are chatting as Acharya Dr. Amit Deshmukh. Client receives your remedies in real-time.'
              : 'You are consulting Dr. Amit Deshmukh. Messages sync bidirectionally in real-time.'}
          </p>
        </div>

        {/* Render Chat Messages */}
        {messages.map((msg) => {
          // Determine if message is sent by current viewer
          const isSender =
            (viewRole === 'user' && msg.senderRole === 'user') ||
            (viewRole === 'astrologer' && msg.senderRole === 'astrologer');

          return (
            <div
              key={msg.id}
              className={`flex ${isSender ? 'justify-end' : 'justify-start'} animate-fadeIn`}
            >
              <div
                className={`max-w-[85%] sm:max-w-md p-4 rounded-2xl text-xs md:text-sm font-poppins space-y-1.5 ${
                  isSender
                    ? viewRole === 'astrologer'
                      ? 'bg-gradient-to-r from-cosmic-midnight via-cosmic-gold/20 to-cosmic-midnight border border-cosmic-gold text-cosmic-white rounded-br-none shadow-goldGlow'
                      : 'bg-cosmic-peacock/35 border border-cosmic-peacock/60 text-cosmic-white rounded-br-none shadow-md'
                    : msg.senderRole === 'astrologer'
                    ? 'bg-cosmic-midnight/90 border border-cosmic-gold/30 text-cosmic-white rounded-bl-none shadow-md'
                    : 'bg-cosmic-midnight/90 border border-cosmic-peacock/30 text-cosmic-white rounded-bl-none shadow-md'
                }`}
              >
                <div className="flex items-center justify-between gap-4 text-[10px] text-cosmic-white/50 mb-1">
                  <span className="font-semibold text-cosmic-gold flex items-center gap-1">
                    {msg.senderRole === 'astrologer' ? (
                      <>
                        <span>{viewRole === 'astrologer' ? 'Dr. Amit Deshmukh (You)' : astrologer.name}</span>
                        <ShieldCheck className="w-3 h-3 text-cosmic-peacock inline" />
                      </>
                    ) : (
                      <span>{viewRole === 'user' ? 'You (Client)' : activeSession?.userName || 'Client'}</span>
                    )}
                  </span>
                  <span>
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>

                <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>

                {isSender && (
                  <div className="flex justify-end text-[10px] text-cosmic-peacock pt-0.5">
                    <CheckCheck className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Real-time Typing Indicators */}
        {viewRole === 'user' && isAstrologerTyping && (
          <div className="flex justify-start">
            <div className="p-3 rounded-2xl bg-cosmic-midnight/90 border border-cosmic-gold/30 text-xs text-cosmic-gold flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cosmic-gold animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-cosmic-gold animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-cosmic-gold animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-cosmic-white/70 ml-1 font-poppins">
                {astrologer.name} is calculating transits & drafting answer...
              </span>
            </div>
          </div>
        )}

        {viewRole === 'astrologer' && isUserTyping && (
          <div className="flex justify-start">
            <div className="p-3 rounded-2xl bg-cosmic-midnight/90 border border-cosmic-peacock/30 text-xs text-cosmic-peacock flex items-center gap-2 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cosmic-peacock animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-cosmic-peacock animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-cosmic-peacock animate-bounce [animation-delay:0.4s]" />
              <span className="text-[11px] text-cosmic-white/70 ml-1 font-poppins">
                Client is composing a question...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions Bar (Tailored to current role) */}
      {viewRole === 'user' ? (
        <div className="py-2 flex items-center gap-2 overflow-x-auto text-[11px]">
          <button
            onClick={handleShareKundli}
            className="px-3 py-1.5 rounded-full bg-cosmic-peacock/20 border border-cosmic-peacock/50 text-cosmic-peacock font-semibold whitespace-nowrap hover:bg-cosmic-peacock hover:text-white transition-colors"
          >
            📎 Share My Natal Kundli
          </button>
          {[
            'When will my career transition succeed?',
            'Is my marriage compatibility favorable?',
            'What are the remedies for my running Mahadasha?',
            'Can you check my Prashna Kundali for my query?',
          ].map((q) => (
            <button
              key={q}
              onClick={() => handleSendQuickQuestion(q)}
              className="px-3 py-1.5 rounded-full bg-cosmic-galaxy/80 border border-cosmic-border/30 text-cosmic-white/70 hover:text-cosmic-white hover:border-cosmic-gold/50 whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>
      ) : (
        <div className="py-2 flex items-center gap-2 overflow-x-auto text-[11px]">
          <span className="text-cosmic-gold font-semibold uppercase text-[10px] whitespace-nowrap">
            Acharya Remedies:
          </span>
          {[
            '🌟 Offer Surya Arghya at sunrise & chant Gayatri Mantra 108 times daily.',
            '💼 10th House Karma Transit indicates a major positive job breakthrough within 3 weeks.',
            '💍 Venus is entering 7th house in Shukla Paksha; patient communication will harmonize relations.',
            '🪐 Prashna Kundali confirms positive resolution for your query with Jupiter\'s grace.',
            '💎 Wear a silver ring or chant ॐ नमो भगवते वासुदेवाय to strengthen your benefic Lagna.',
          ].map((rem, i) => (
            <button
              key={i}
              onClick={() => handleSendAstrologerRemedy(rem)}
              className="px-3 py-1.5 rounded-full bg-cosmic-midnight border border-cosmic-gold/40 text-cosmic-gold hover:bg-cosmic-gold hover:text-cosmic-midnight whitespace-nowrap transition-all"
            >
              {rem.slice(0, 38)}...
            </button>
          ))}
        </div>
      )}

      {/* Bottom Message Input Form */}
      <form onSubmit={handleSend} className="pt-2 flex items-center gap-2">
        <input
          type="text"
          placeholder={
            viewRole === 'astrologer'
              ? 'Type Vedic guidance & advice as Dr. Amit Deshmukh...'
              : 'Ask your astrological question to Dr. Amit Deshmukh...'
          }
          value={inputMessage}
          onChange={handleInputChange}
          className="flex-1 px-5 py-3.5 rounded-2xl bg-cosmic-galaxy border border-cosmic-gold/40 focus:border-cosmic-gold text-sm text-cosmic-white outline-none shadow-inner"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim()}
          className={`p-3.5 rounded-2xl text-cosmic-midnight hover:opacity-95 transition-opacity disabled:opacity-40 shadow-goldGlow ${
            viewRole === 'astrologer' ? 'bg-gold-gradient' : 'bg-gold-gradient'
          }`}
          title="Send Message"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>

      {/* End Consultation Modal */}
      {isEndModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-midnight/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-cosmic-galaxy border border-cosmic-gold p-6 text-center space-y-4 text-cosmic-white">
            <h3 className="text-xl font-cinzel font-bold text-cosmic-gold">
              {viewRole === 'astrologer' ? 'Conclude Astrological Session?' : 'End Consultation Session?'}
            </h3>
            <p className="text-xs text-cosmic-white/70 font-poppins">
              Session duration: <strong>{sessionDurationFormatted}</strong> • Total amount:{' '}
              <strong className="text-cosmic-gold">₹{sessionTotalDeduction}</strong>
              {viewRole === 'astrologer' && (
                <span className="block text-emerald-300 font-semibold mt-1">
                  Your Net Earnings: ₹{astrologerEarnings} (80%)
                </span>
              )}
            </p>

            {viewRole === 'user' && (
              <div className="py-2">
                <label className="block text-xs uppercase tracking-wider text-cosmic-white/60 mb-2">
                  Rate your consultation with {astrologer.name}
                </label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-cosmic-gold hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-7 h-7 ${star <= rating ? 'fill-cosmic-gold text-cosmic-gold' : 'text-cosmic-white/30'}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            <textarea
              placeholder={
                viewRole === 'astrologer'
                  ? 'Add closing astrologer notes or remedy summary...'
                  : 'Leave a short review or blessing for the astrologer (optional)...'
              }
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="w-full p-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-xs text-cosmic-white outline-none focus:border-cosmic-gold h-20"
            />

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsEndModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-xs font-semibold text-cosmic-white"
              >
                Continue Chat
              </button>
              <button
                type="button"
                onClick={handleConfirmEnd}
                className="flex-1 py-2.5 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs"
              >
                Confirm & Exit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Recharge Modal */}
      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        suggestedAmount={199}
      />
    </div>
  );
}
