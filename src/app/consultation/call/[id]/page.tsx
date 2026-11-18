'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { getAstrologerById, ASTROLOGERS_DATABASE } from '@/lib/data/astrologers';
import { useConsultation } from '@/context/ConsultationContext';
import { useWallet } from '@/context/WalletContext';
import { RechargeModal } from '@/components/wallet/RechargeModal';
import {
  Mic,
  MicOff,
  Video as VideoIcon,
  VideoOff,
  PhoneOff,
  Volume2,
  Clock,
  Wallet,
  Star,
  ShieldCheck,
  AlertCircle,
  MessageCircle,
} from 'lucide-react';

export default function VoiceVideoConsultationPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const astrologerId = (params?.id as string) || 'dr-amit-deshmukh';
  const astrologer = getAstrologerById(astrologerId) || ASTROLOGERS_DATABASE[0];
  const initialMode = searchParams.get('mode') === 'video' ? 'Video' : 'Voice';

  const { balance } = useWallet();
  const {
    activeSession,
    isInCall,
    isCallMuted,
    isVideoEnabled,
    startConsultation,
    endConsultation,
    toggleMute,
    toggleVideo,
    sessionDurationFormatted,
  } = useConsultation();

  const [callType, setCallType] = useState<'Voice' | 'Video'>(initialMode);
  const [isConnecting, setIsConnecting] = useState(true);
  const [isEndModalOpen, setIsEndModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState('');
  const [isRechargeModalOpen, setIsRechargeModalOpen] = useState(false);

  // WebRTC User Video Preview ref
  const userVideoRef = useRef<HTMLVideoElement>(null);

  // Initialize consultation session
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnecting(false);
      startConsultation(astrologer.id, callType);
    }, 1500);

    return () => clearTimeout(timer);
  }, [astrologer.id, callType]);

  // Request real user webcam/mic stream if in video mode
  useEffect(() => {
    if (callType === 'Video' && isVideoEnabled && navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (userVideoRef.current) {
            userVideoRef.current.srcObject = stream;
          }
        })
        .catch(() => {
          // Camera permission denied or not available; fallback to simulated avatar video
        });
    }
  }, [callType, isVideoEnabled]);

  const handleEndCall = () => {
    setIsEndModalOpen(true);
  };

  const handleConfirmEnd = () => {
    endConsultation(rating, review);
    setIsEndModalOpen(false);
    router.push('/dashboard');
  };

  const currentRate = callType === 'Video' ? astrologer.videoPricePerMinute : astrologer.voicePricePerMinute;

  return (
    <div className="relative min-h-[90vh] bg-cosmic-midnight flex flex-col justify-between p-4 sm:p-6 overflow-hidden">
      {/* Background visual atmosphere */}
      <div className="absolute inset-0 bg-divine-shrine pointer-events-none" />

      {/* 1. Top HUD Bar (Astrologer info, Live billing ticker, wallet status) */}
      <div className="relative z-20 flex flex-wrap items-center justify-between gap-4 p-4 rounded-3xl bg-cosmic-galaxy/90 border border-cosmic-gold/40 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12 rounded-2xl overflow-hidden border border-cosmic-gold">
            <Image src={astrologer.avatar} alt={astrologer.name} fill className="object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 font-cinzel font-bold text-base text-cosmic-white">
              <span>{astrologer.name}</span>
              <ShieldCheck className="w-4 h-4 text-cosmic-peacock" />
            </div>
            <div className="text-[11px] text-cosmic-gold">
              Live {callType} Session • ₹{currentRate}/min
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Live Session Timer */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cosmic-midnight border border-cosmic-gold/40 text-xs font-mono text-cosmic-gold shadow-sm">
            <Clock className="w-4 h-4 text-cosmic-saffron animate-spin-slow" />
            <span>{isConnecting ? 'Connecting...' : sessionDurationFormatted}</span>
          </div>

          {/* Wallet Balance */}
          <button
            onClick={() => setIsRechargeModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-xs font-semibold text-cosmic-white hover:border-cosmic-gold transition-colors"
          >
            <Wallet className="w-3.5 h-3.5 text-cosmic-gold" />
            <span>₹{balance}</span>
            <span className="text-[10px] text-cosmic-peacock underline ml-1">+ Add</span>
          </button>
        </div>
      </div>

      {/* Low balance alert banner */}
      {balance < 40 && (
        <div className="relative z-20 mt-3 p-3 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-xs text-amber-200 flex items-center justify-between max-w-xl mx-auto w-full">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-400" />
            <span>Low balance (₹{balance}). Call will end when balance is ₹0.</span>
          </div>
          <button
            onClick={() => setIsRechargeModalOpen(true)}
            className="px-3 py-1 rounded-lg bg-amber-500 text-cosmic-midnight font-bold text-xs"
          >
            Quick Recharge
          </button>
        </div>
      )}

      {/* 2. Main Call Arena */}
      <div className="relative z-10 flex-1 flex items-center justify-center my-6">
        {callType === 'Video' ? (
          /* Video Grid (Peer Astrologer & User Self-View) */
          <div className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden border-2 border-cosmic-gold/50 shadow-2xl bg-cosmic-galaxy">
            {/* Peer Video (Astrologer) */}
            <div className="relative w-full h-full flex items-center justify-center bg-cosmic-galaxy">
              <Image
                src={astrologer.avatar}
                alt={astrologer.name}
                fill
                className="object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cosmic-midnight/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 text-cosmic-white">
                <div className="font-cinzel font-bold text-lg">{astrologer.name}</div>
                <div className="text-xs text-cosmic-gold">Prashna & Vedic Consultation</div>
              </div>
            </div>

            {/* User Picture-in-Picture Self-View */}
            <div className="absolute top-4 right-4 w-32 sm:w-44 aspect-video rounded-2xl overflow-hidden border-2 border-cosmic-gold shadow-2xl bg-cosmic-midnight z-20">
              {isVideoEnabled ? (
                <video
                  ref={userVideoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover transform scale-x-[-1]"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-[10px] text-cosmic-white/50">
                  <VideoOff className="w-6 h-6 mb-1 text-cosmic-gold" />
                  Camera Off
                </div>
              )}
              <span className="absolute bottom-1 left-2 text-[10px] text-cosmic-white/70 font-semibold">
                You
              </span>
            </div>
          </div>
        ) : (
          /* Voice Call Visualizer Arena */
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              {/* Pulsing Concentric Audio Wave Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-cosmic-gold/40 animate-ping scale-150" />
              <div className="absolute -inset-6 rounded-full border border-cosmic-peacock/40 animate-pulse-slow" />

              <div className="relative w-40 h-40 md:w-52 md:h-52 rounded-full overflow-hidden border-4 border-cosmic-gold shadow-goldGlowLg">
                <Image
                  src={astrologer.avatar}
                  alt={astrologer.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <h2 className="text-2xl md:text-3xl font-cinzel font-bold text-cosmic-white">
                {astrologer.name}
              </h2>
              <p className="text-xs md:text-sm text-cosmic-gold font-poppins mt-1">
                {isConnecting ? 'Establishing Secure Vedic Voice Connection...' : 'Voice Call in Progress (HD Audio)'}
              </p>
            </div>

            {/* Animated Audio Waveform */}
            <div className="flex items-center gap-1.5 h-12">
              {[4, 10, 16, 24, 32, 20, 14, 28, 36, 18, 12, 22, 16, 8].map((h, i) => (
                <span
                  key={i}
                  className="w-1.5 bg-gradient-to-t from-cosmic-gold to-cosmic-peacock rounded-full animate-pulse"
                  style={{
                    height: `${h}px`,
                    animationDelay: `${(i % 5) * 0.15}s`,
                    animationDuration: '0.8s',
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 3. Bottom Controls Dock */}
      <div className="relative z-20 flex items-center justify-center gap-4 py-4">
        {/* Mute Button */}
        <button
          onClick={toggleMute}
          className={`p-4 rounded-2xl border transition-all ${
            isCallMuted
              ? 'bg-rose-500/20 border-rose-500 text-rose-300'
              : 'bg-cosmic-galaxy/90 border-cosmic-border/40 text-cosmic-white hover:border-cosmic-gold'
          }`}
          title={isCallMuted ? 'Unmute Mic' : 'Mute Mic'}
        >
          {isCallMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        {/* Video Toggle Button */}
        {callType === 'Video' && (
          <button
            onClick={toggleVideo}
            className={`p-4 rounded-2xl border transition-all ${
              !isVideoEnabled
                ? 'bg-rose-500/20 border-rose-500 text-rose-300'
                : 'bg-cosmic-galaxy/90 border-cosmic-border/40 text-cosmic-white hover:border-cosmic-gold'
            }`}
            title={isVideoEnabled ? 'Turn Off Camera' : 'Turn On Camera'}
          >
            {isVideoEnabled ? <VideoIcon className="w-6 h-6" /> : <VideoOff className="w-6 h-6" />}
          </button>
        )}

        {/* End Call Button */}
        <button
          onClick={handleEndCall}
          className="px-8 py-4 rounded-2xl bg-rose-600 text-white font-cinzel font-bold text-sm hover:bg-rose-700 transition-colors shadow-lg flex items-center gap-2"
        >
          <PhoneOff className="w-5 h-5" />
          End Consultation
        </button>
      </div>

      {/* End Call Rating Modal */}
      {isEndModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cosmic-midnight/80 backdrop-blur-md">
          <div className="relative w-full max-w-md rounded-3xl bg-cosmic-galaxy border border-cosmic-gold p-6 text-center space-y-4 text-cosmic-white">
            <h3 className="text-xl font-cinzel font-bold text-cosmic-gold">
              Consultation Concluded
            </h3>
            <p className="text-xs text-cosmic-white/70">
              Total duration: <strong>{sessionDurationFormatted}</strong> • Total deducted:{' '}
              <strong className="text-cosmic-gold">₹{activeSession?.totalDeduction || currentRate}</strong>
            </p>

            <div className="py-2">
              <label className="block text-xs uppercase tracking-wider text-cosmic-white/60 mb-2">
                Rate your session with {astrologer.name}
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

            <textarea
              placeholder="Leave feedback for Dr. Amit Deshmukh (optional)..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full p-3 rounded-xl bg-cosmic-midnight border border-cosmic-border/40 text-xs text-cosmic-white outline-none focus:border-cosmic-gold h-20"
            />

            <button
              onClick={handleConfirmEnd}
              className="w-full py-3 rounded-xl bg-gold-gradient text-cosmic-midnight font-cinzel font-bold text-xs uppercase tracking-wider shadow-goldGlow"
            >
              Submit & Return to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Recharge Modal */}
      <RechargeModal
        isOpen={isRechargeModalOpen}
        onClose={() => setIsRechargeModalOpen(false)}
        suggestedAmount={199}
      />
    </div>
  );
}
