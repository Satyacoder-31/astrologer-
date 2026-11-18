'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserBirthProfile } from '@/types';

interface AuthContextType {
  user: User | null;
  birthProfile: UserBirthProfile | null;
  isAuthenticated: boolean;
  login: (userData: Partial<User>) => void;
  loginWithOtp: (phone: string, otp: string) => Promise<boolean>;
  loginWithEmail: (email: string, pass: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  logout: () => void;
  saveBirthProfile: (profile: UserBirthProfile) => void;
  toggleSaveAstrologer: (astrologerId: string) => void;
  isAstrologerSaved: (astrologerId: string) => boolean;
  switchRole: (role: 'user' | 'astrologer' | 'admin') => void;
}

const DEFAULT_USER: User = {
  id: 'usr-krishna-cosmic-1',
  name: 'Krishna Bhakt',
  phone: '+91 98765 43210',
  email: 'devotee@krishnajyotish.com',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
  role: 'user',
  walletBalance: 250,
  isProfileComplete: true,
  savedAstrologers: ['dr-amit-deshmukh'],
  createdAt: '2026-01-01T00:00:00Z',
};

const DEFAULT_BIRTH_PROFILE: UserBirthProfile = {
  fullName: 'Krishna Bhakt',
  gender: 'Male',
  dob: '1996-08-25',
  tob: '06:30',
  birthplace: 'Mathura, Uttar Pradesh, India',
  city: 'Mathura',
  state: 'Uttar Pradesh',
  country: 'India',
  latitude: 27.4924,
  longitude: 77.6737,
  timezone: 5.5,
  preferredLanguage: 'Hindi & English',
  relationshipStatus: 'Single',
  areasOfInterest: ['Career & Business Growth', 'Marriage Compatibility', 'Spiritual Awakening', 'Financial Wealth'],
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(DEFAULT_USER);
  const [birthProfile, setBirthProfile] = useState<UserBirthProfile | null>(DEFAULT_BIRTH_PROFILE);

  useEffect(() => {
    // Sync with localStorage on client
    try {
      const storedUser = localStorage.getItem('kj_user');
      const storedProfile = localStorage.getItem('kj_birth_profile');
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedProfile) setBirthProfile(JSON.parse(storedProfile));
    } catch {
      // LocalStorage not available or parse error
    }
  }, []);

  const saveToStorage = (updatedUser: User | null, updatedProfile?: UserBirthProfile | null) => {
    try {
      if (updatedUser) localStorage.setItem('kj_user', JSON.stringify(updatedUser));
      else localStorage.removeItem('kj_user');

      if (updatedProfile !== undefined) {
        if (updatedProfile) localStorage.setItem('kj_birth_profile', JSON.stringify(updatedProfile));
        else localStorage.removeItem('kj_birth_profile');
      }
    } catch {
      // ignore
    }
  };

  const login = (userData: Partial<User>) => {
    const updated: User = {
      ...(user || DEFAULT_USER),
      ...userData,
    };
    setUser(updated);
    saveToStorage(updated);
  };

  const loginWithOtp = async (phone: string, otp: string): Promise<boolean> => {
    if (otp && (otp.length >= 4 || otp === '123456')) {
      const loggedUser: User = {
        id: 'usr-' + Date.now(),
        name: 'Astro Seeker',
        phone,
        email: `${phone.replace(/\D/g, '')}@mobile.krishnajyotish.com`,
        role: 'user',
        walletBalance: 100, // Welcome gift of 100 INR credits!
        isProfileComplete: !!birthProfile,
        savedAstrologers: ['dr-amit-deshmukh'],
        createdAt: new Date().toISOString(),
      };
      setUser(loggedUser);
      saveToStorage(loggedUser);
      return true;
    }
    return false;
  };

  const loginWithEmail = async (email: string, pass: string): Promise<boolean> => {
    if (email && pass.length >= 6) {
      const namePart = email.split('@')[0];
      const capitalized = namePart.charAt(0).toUpperCase() + namePart.slice(1);
      const loggedUser: User = {
        id: 'usr-' + Date.now(),
        name: capitalized,
        email,
        role: 'user',
        walletBalance: 100,
        isProfileComplete: !!birthProfile,
        savedAstrologers: ['dr-amit-deshmukh'],
        createdAt: new Date().toISOString(),
      };
      setUser(loggedUser);
      saveToStorage(loggedUser);
      return true;
    }
    return false;
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    const loggedUser: User = {
      id: 'usr-google-' + Date.now(),
      name: 'Radhe Shyam',
      email: 'radhe.shyam@gmail.com',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      role: 'user',
      walletBalance: 150,
      isProfileComplete: true,
      savedAstrologers: ['dr-amit-deshmukh'],
      createdAt: new Date().toISOString(),
    };
    setUser(loggedUser);
    saveToStorage(loggedUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    saveToStorage(null);
  };

  const saveBirthProfile = (profile: UserBirthProfile) => {
    setBirthProfile(profile);
    if (user) {
      const updatedUser = { ...user, isProfileComplete: true, name: profile.fullName || user.name };
      setUser(updatedUser);
      saveToStorage(updatedUser, profile);
    } else {
      saveToStorage(null, profile);
    }
  };

  const toggleSaveAstrologer = (astrologerId: string) => {
    if (!user) return;
    const current = user.savedAstrologers || [];
    const exists = current.includes(astrologerId);
    const updatedList = exists
      ? current.filter((id) => id !== astrologerId)
      : [...current, astrologerId];
    const updatedUser = { ...user, savedAstrologers: updatedList };
    setUser(updatedUser);
    saveToStorage(updatedUser);
  };

  const isAstrologerSaved = (astrologerId: string) => {
    return !!user?.savedAstrologers?.includes(astrologerId);
  };

  const switchRole = (role: 'user' | 'astrologer' | 'admin') => {
    if (!user) return;
    const updatedUser: User = { ...user, role };
    setUser(updatedUser);
    saveToStorage(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        birthProfile,
        isAuthenticated: !!user,
        login,
        loginWithOtp,
        loginWithEmail,
        loginWithGoogle,
        logout,
        saveBirthProfile,
        toggleSaveAstrologer,
        isAstrologerSaved,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
