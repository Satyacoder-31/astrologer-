'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Users, MessageCircle, Wallet, User as UserIcon } from 'lucide-react';
import { useWallet } from '@/context/WalletContext';

export const BottomNav: React.FC = () => {
  const pathname = usePathname();
  const { balance } = useWallet();

  // Hide bottom nav on full-screen active consultation call or video
  if (pathname.includes('/consultation/call/')) {
    return null;
  }

  const items = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Astrologers', href: '/astrologers', icon: Users },
    { label: 'Chat', href: '/consultation/chat/dr-amit-deshmukh', icon: MessageCircle, badge: 'Live' },
    { label: `₹${balance}`, href: '/wallet', icon: Wallet },
    { label: 'Profile', href: '/profile', icon: UserIcon },
  ];

  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/90 backdrop-blur-2xl border-t border-cosmic-gold/25 px-2 py-1 shadow-2xl">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center py-1.5 px-3 rounded-xl transition-all relative ${
                isActive ? 'text-cosmic-gold scale-105' : 'text-cosmic-white/60 hover:text-cosmic-white'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-cosmic-gold stroke-[2.5]' : ''}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 px-1 rounded-full text-[8px] font-bold bg-cosmic-saffron text-cosmic-midnight animate-pulse">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] mt-0.5 font-poppins ${isActive ? 'font-bold' : 'font-medium'}`}>
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-cosmic-gold absolute bottom-0 shadow-goldGlow" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
