export type UserRole = 'user' | 'astrologer' | 'admin';

export interface User {
  id: string;
  name: string;
  phone?: string;
  email: string;
  avatar?: string;
  role: UserRole;
  walletBalance: number; // in INR
  isProfileComplete: boolean;
  savedAstrologers?: string[];
  createdAt: string;
}

export interface UserBirthProfile {
  fullName: string;
  gender: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  dob: string; // YYYY-MM-DD
  tob: string; // HH:mm (24 hr)
  birthplace: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: number; // e.g. +5.5
  preferredLanguage: string;
  relationshipStatus?: string;
  areasOfInterest: string[];
}

export type ConsultationType = 'Chat' | 'Voice' | 'Video';

export interface ConsultationSession {
  id: string;
  astrologerId: string;
  astrologerName: string;
  astrologerAvatar: string;
  userId: string;
  userName: string;
  type: ConsultationType;
  status: 'requested' | 'active' | 'completed' | 'cancelled';
  ratePerMinute: number;
  startedAt?: string;
  endedAt?: string;
  durationSeconds: number;
  totalDeduction: number;
  rating?: number;
  reviewText?: string;
}

export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderRole: 'user' | 'astrologer' | 'system';
  text: string;
  attachmentUrl?: string;
  attachmentType?: 'image' | 'kundli' | 'pdf';
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
}

export type TransactionType = 'recharge' | 'consultation_deduction' | 'refund' | 'promotional_credit';

export interface WalletTransaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  balanceAfter: number;
  timestamp: string;
  status: 'success' | 'failed' | 'pending';
  orderId?: string;
  paymentMethod: string; // 'UPI', 'Debit Card', 'Credit Card', 'Wallet Balance'
  description: string;
}

export interface Appointment {
  id: string;
  userId: string;
  astrologerId: string;
  astrologerName: string;
  astrologerAvatar: string;
  date: string;
  timeSlot: string;
  consultationType: ConsultationType;
  estimatedCost: number;
  status: 'confirmed' | 'completed' | 'cancelled';
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'consultation' | 'wallet' | 'horoscope' | 'system' | 'call';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}
