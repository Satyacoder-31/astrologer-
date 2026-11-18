'use client';

import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import { ConsultationSession, ChatMessage, ConsultationType } from '@/types';
import { useWallet } from './WalletContext';
import { useAuth } from './AuthContext';
import { getAstrologerById, ASTROLOGERS_DATABASE } from '@/lib/data/astrologers';

interface ConsultationContextType {
  activeSession: ConsultationSession | null;
  messages: ChatMessage[];
  isAstrologerTyping: boolean;
  isUserTyping: boolean;
  isInCall: boolean;
  isCallMuted: boolean;
  isVideoEnabled: boolean;
  incomingCall: { astrologerId: string; type: ConsultationType } | null;
  startConsultation: (astrologerId: string, type: ConsultationType) => boolean;
  endConsultation: (rating?: number, reviewText?: string) => void;
  sendMessage: (
    text: string,
    attachmentUrl?: string,
    attachmentType?: 'image' | 'kundli' | 'pdf',
    senderRole?: 'user' | 'astrologer'
  ) => void;
  sendTypingStatus: (senderRole: 'user' | 'astrologer', isTyping: boolean) => void;
  toggleMute: () => void;
  toggleVideo: () => void;
  acceptIncomingCall: () => void;
  rejectIncomingCall: () => void;
  quickRechargeDuringSession: (amount: number) => Promise<boolean>;
  sessionDurationFormatted: string;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

const BROADCAST_CHANNEL_NAME = 'kj_cosmic_chat_channel';
const STORAGE_MESSAGES_KEY = 'kj_active_chat_messages';
const STORAGE_SESSION_KEY = 'kj_active_consultation_session';

export const ConsultationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { balance, deductAmount, rechargeWallet, checkAffordability } = useWallet();

  const [activeSession, setActiveSession] = useState<ConsultationSession | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isAstrologerTyping, setIsAstrologerTyping] = useState<boolean>(false);
  const [isUserTyping, setIsUserTyping] = useState<boolean>(false);
  const [isInCall, setIsInCall] = useState<boolean>(false);
  const [isCallMuted, setIsCallMuted] = useState<boolean>(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState<boolean>(true);
  const [incomingCall, setIncomingCall] = useState<{ astrologerId: string; type: ConsultationType } | null>(null);
  const [secondsElapsed, setSecondsElapsed] = useState<number>(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastDeductedMinuteRef = useRef<number>(0);
  const channelRef = useRef<BroadcastChannel | null>(null);
  const autoReplyTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize and synchronize with localStorage & BroadcastChannel
  useEffect(() => {
    // 1. Load active session from localStorage if available
    try {
      const storedSession = localStorage.getItem(STORAGE_SESSION_KEY);
      if (storedSession) {
        const parsed = JSON.parse(storedSession);
        if (parsed && parsed.status === 'active') {
          setActiveSession(parsed);
          if (parsed.startedAt) {
            const elapsed = Math.floor((Date.now() - new Date(parsed.startedAt).getTime()) / 1000);
            setSecondsElapsed(Math.max(0, elapsed));
          }
        }
      }

      // Load active messages
      const storedMessages = localStorage.getItem(STORAGE_MESSAGES_KEY);
      if (storedMessages) {
        const parsedMsgs = JSON.parse(storedMessages);
        if (Array.isArray(parsedMsgs) && parsedMsgs.length > 0) {
          setMessages(parsedMsgs);
        }
      }
    } catch {
      // ignore
    }

    // 2. Set up BroadcastChannel for instant cross-tab sync
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      try {
        const bc = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        channelRef.current = bc;

        bc.onmessage = (event) => {
          const data = event.data;
          if (!data || !data.type) return;

          switch (data.type) {
            case 'NEW_MESSAGE': {
              const incomingMsg: ChatMessage = data.message;
              setMessages((prev) => {
                if (prev.some((m) => m.id === incomingMsg.id)) return prev;
                const next = [...prev, incomingMsg];
                try {
                  localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(next));
                } catch {
                  // ignore
                }
                return next;
              });

              // Reset typing indicators
              if (incomingMsg.senderRole === 'astrologer') {
                setIsAstrologerTyping(false);
                // Cancel pending auto-reply if astrologer responded manually
                if (autoReplyTimeoutRef.current) {
                  clearTimeout(autoReplyTimeoutRef.current);
                  autoReplyTimeoutRef.current = null;
                }
              } else if (incomingMsg.senderRole === 'user') {
                setIsUserTyping(false);
              }
              break;
            }

            case 'TYPING_STATUS': {
              if (data.senderRole === 'astrologer') {
                setIsAstrologerTyping(data.isTyping);
              } else if (data.senderRole === 'user') {
                setIsUserTyping(data.isTyping);
              }
              break;
            }

            case 'SESSION_START': {
              setActiveSession(data.session);
              setSecondsElapsed(0);
              break;
            }

            case 'SESSION_END': {
              setActiveSession((curr) => (curr ? { ...curr, status: 'completed' } : null));
              setIsInCall(false);
              break;
            }
          }
        };
      } catch (err) {
        console.warn('BroadcastChannel not initialized:', err);
      }
    }

    // Fallback: window storage event
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_MESSAGES_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setMessages(parsed);
        } catch {
          // ignore
        }
      }
      if (e.key === STORAGE_SESSION_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setActiveSession(parsed);
        } catch {
          // ignore
        }
      }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      if (channelRef.current) {
        channelRef.current.close();
      }
      if (autoReplyTimeoutRef.current) {
        clearTimeout(autoReplyTimeoutRef.current);
      }
    };
  }, []);

  // Save messages to localStorage on change
  const persistMessages = (newMessages: ChatMessage[]) => {
    setMessages(newMessages);
    try {
      localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(newMessages));
    } catch {
      // ignore
    }
  };

  // Timer & Per-minute auto-billing
  useEffect(() => {
    if (activeSession && activeSession.status === 'active') {
      timerRef.current = setInterval(() => {
        setSecondsElapsed((prev) => {
          const nextSec = prev + 1;
          const currentMinute = Math.floor(nextSec / 60);

          // If a new minute has started, deduct ratePerMinute from wallet
          if (currentMinute > lastDeductedMinuteRef.current) {
            lastDeductedMinuteRef.current = currentMinute;
            const success = deductAmount(
              activeSession.ratePerMinute,
              `Live Consultation minute ${currentMinute}`,
              activeSession.astrologerName
            );

            if (!success) {
              endConsultation();
              alert('Consultation ended due to insufficient wallet balance. Please recharge to continue.');
            } else {
              setActiveSession((curr) => {
                if (!curr) return null;
                const updated = {
                  ...curr,
                  durationSeconds: nextSec,
                  totalDeduction: curr.totalDeduction + curr.ratePerMinute,
                };
                try {
                  localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(updated));
                } catch {
                  // ignore
                }
                return updated;
              });
            }
          }
          return nextSec;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeSession?.status, balance]);

  const startConsultation = (astrologerId: string, type: ConsultationType): boolean => {
    const astro = getAstrologerById(astrologerId) || ASTROLOGERS_DATABASE[0];
    if (!astro) return false;

    const rate = type === 'Video' ? astro.videoPricePerMinute : type === 'Voice' ? astro.voicePricePerMinute : astro.pricePerMinute;

    const { canConsult } = checkAffordability(rate);
    if (!canConsult) {
      alert(`Minimum wallet balance of ₹${rate} required to start consultation. Please recharge your wallet.`);
      return false;
    }

    // Deduct initial 1 minute to start
    const deducted = deductAmount(rate, `First minute of ${type} consultation`, astro.name);
    if (!deducted) return false;

    const newSession: ConsultationSession = {
      id: 'session_' + Date.now(),
      astrologerId: astro.id,
      astrologerName: astro.name,
      astrologerAvatar: astro.avatar,
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Blessed Seeker',
      type,
      status: 'active',
      ratePerMinute: rate,
      startedAt: new Date().toISOString(),
      durationSeconds: 0,
      totalDeduction: rate,
    };

    lastDeductedMinuteRef.current = 1;
    setSecondsElapsed(0);
    setActiveSession(newSession);

    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(newSession));
    } catch {
      // ignore
    }

    if (type === 'Voice' || type === 'Video') {
      setIsInCall(true);
      setIsVideoEnabled(type === 'Video');
    }

    // Welcome greeting message in chat
    const welcomeMsg: ChatMessage = {
      id: 'msg_welcome_' + Date.now(),
      sessionId: newSession.id,
      senderId: astro.id,
      senderRole: 'astrologer',
      text: `Hari Om, ${user?.name || 'seeker'}! I am ${astro.name}. I am observing your natal charts. Please state your primary inquiry or question regarding career, relationship, or planetary remedies.`,
      timestamp: new Date().toISOString(),
      status: 'read',
    };

    const initialMsgs = [welcomeMsg];
    persistMessages(initialMsgs);

    // Broadcast session start & welcome message
    if (channelRef.current) {
      channelRef.current.postMessage({ type: 'SESSION_START', session: newSession });
      channelRef.current.postMessage({ type: 'NEW_MESSAGE', message: welcomeMsg });
    }

    return true;
  };

  const endConsultation = (rating?: number, reviewText?: string) => {
    if (!activeSession) return;
    const ended: ConsultationSession = {
      ...activeSession,
      status: 'completed',
      endedAt: new Date().toISOString(),
      durationSeconds: secondsElapsed,
      rating,
      reviewText,
    };

    if (timerRef.current) clearInterval(timerRef.current);
    setIsInCall(false);
    setActiveSession(ended);

    try {
      localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(ended));
      const history = JSON.parse(localStorage.getItem('kj_consultation_history') || '[]');
      history.unshift(ended);
      localStorage.setItem('kj_consultation_history', JSON.stringify(history));
    } catch {
      // ignore
    }

    if (channelRef.current) {
      channelRef.current.postMessage({ type: 'SESSION_END', session: ended });
    }
  };

  const sendTypingStatus = (senderRole: 'user' | 'astrologer', isTyping: boolean) => {
    if (channelRef.current) {
      channelRef.current.postMessage({ type: 'TYPING_STATUS', senderRole, isTyping });
    }
  };

  const sendMessage = (
    text: string,
    attachmentUrl?: string,
    attachmentType?: 'image' | 'kundli' | 'pdf',
    senderRole: 'user' | 'astrologer' = 'user'
  ) => {
    const currentSession = activeSession || {
      id: 'session_live_' + Date.now(),
      astrologerId: 'dr-amit-deshmukh',
      astrologerName: 'Dr. Amit Deshmukh',
      astrologerAvatar: '/images/astrologers/dr-amit-deshmukh.jpg',
      userId: user?.id || 'usr-1',
      userName: user?.name || 'Blessed Seeker',
      type: 'Chat' as ConsultationType,
      status: 'active' as const,
      ratePerMinute: 20,
      durationSeconds: secondsElapsed,
      totalDeduction: 20,
    };

    const newMsg: ChatMessage = {
      id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
      sessionId: currentSession.id,
      senderId: senderRole === 'astrologer' ? currentSession.astrologerId : (user?.id || 'usr-1'),
      senderRole,
      text,
      attachmentUrl,
      attachmentType,
      timestamp: new Date().toISOString(),
      status: 'read',
    };

    const updated = [...messages, newMsg];
    persistMessages(updated);

    // Broadcast over channel to all tabs/windows
    if (channelRef.current) {
      channelRef.current.postMessage({ type: 'NEW_MESSAGE', message: newMsg });
      channelRef.current.postMessage({ type: 'TYPING_STATUS', senderRole, isTyping: false });
    }

    if (senderRole === 'astrologer') {
      setIsAstrologerTyping(false);
      // Cancel pending auto-reply if astrologer responded manually
      if (autoReplyTimeoutRef.current) {
        clearTimeout(autoReplyTimeoutRef.current);
        autoReplyTimeoutRef.current = null;
      }
    } else {
      setIsUserTyping(false);

      // If user sent a message and astrologer doesn't respond within 5 seconds,
      // provide intelligent authentic Vedic guidance fallback so seeker is never left waiting
      if (autoReplyTimeoutRef.current) {
        clearTimeout(autoReplyTimeoutRef.current);
      }

      autoReplyTimeoutRef.current = setTimeout(() => {
        setIsAstrologerTyping(true);
        if (channelRef.current) {
          channelRef.current.postMessage({ type: 'TYPING_STATUS', senderRole: 'astrologer', isTyping: true });
        }

        setTimeout(() => {
          const replies = [
            `Hari Om. I am calculating your running Vimshottari Mahadasha and Gochara transits. Your 10th house of Karma indicates a significant positive breakthrough in the coming weeks. Maintain focused perseverance.`,
            `Regarding your question, your Lagna lord is benefic and well-placed. Obstacles in this phase will be dispelled by offering Arghya to Surya dev in the morning and chanting the sacred Gayatri mantra.`,
            `Your 7th house and Venus are entering an auspicious alignment during the upcoming Shukla Paksha. Patient communication and understanding will resolve all lingering misunderstandings.`,
            `I have examined your Navamsha (D9) chart. The planetary configuration points to high professional elevation, particularly through foreign associations or technical innovation.`,
            `The Vedic remedy for your current planetary phase: offer clean water to Surya at sunrise and wear a silver ring or chant the divine Krishna mantra (ॐ नमो भगवते वासुदेवाय) 108 times daily.`,
            `Prashna Kundali insight: The lagna is in a fixed sign (Sthira Rashi) with Jupiter's benevolent drishti. The outcome of your endeavor is assured and favorable.`,
          ];
          const chosenReply = replies[Math.floor(Math.random() * replies.length)];

          const autoMsg: ChatMessage = {
            id: 'msg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
            sessionId: currentSession.id,
            senderId: currentSession.astrologerId,
            senderRole: 'astrologer',
            text: chosenReply,
            timestamp: new Date().toISOString(),
            status: 'read',
          };

          setMessages((curr) => {
            const next = [...curr, autoMsg];
            try {
              localStorage.setItem(STORAGE_MESSAGES_KEY, JSON.stringify(next));
            } catch {
              // ignore
            }
            return next;
          });

          setIsAstrologerTyping(false);
          if (channelRef.current) {
            channelRef.current.postMessage({ type: 'NEW_MESSAGE', message: autoMsg });
            channelRef.current.postMessage({ type: 'TYPING_STATUS', senderRole: 'astrologer', isTyping: false });
          }
        }, 2200);
      }, 5000);
    }
  };

  const toggleMute = () => setIsCallMuted((prev) => !prev);
  const toggleVideo = () => setIsVideoEnabled((prev) => !prev);

  const acceptIncomingCall = () => {
    if (incomingCall) {
      startConsultation(incomingCall.astrologerId, incomingCall.type);
      setIncomingCall(null);
    }
  };

  const rejectIncomingCall = () => {
    setIncomingCall(null);
  };

  const quickRechargeDuringSession = async (amount: number): Promise<boolean> => {
    const res = await rechargeWallet(amount, 'Quick Recharge during Session');
    return res.success;
  };

  const minutes = Math.floor(secondsElapsed / 60);
  const seconds = secondsElapsed % 60;
  const sessionDurationFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <ConsultationContext.Provider
      value={{
        activeSession,
        messages,
        isAstrologerTyping,
        isUserTyping,
        isInCall,
        isCallMuted,
        isVideoEnabled,
        incomingCall,
        startConsultation,
        endConsultation,
        sendMessage,
        sendTypingStatus,
        toggleMute,
        toggleVideo,
        acceptIncomingCall,
        rejectIncomingCall,
        quickRechargeDuringSession,
        sessionDurationFormatted,
      }}
    >
      {children}
    </ConsultationContext.Provider>
  );
};

export const useConsultation = () => {
  const context = useContext(ConsultationContext);
  if (!context) throw new Error('useConsultation must be used within a ConsultationProvider');
  return context;
};
