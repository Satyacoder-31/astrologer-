import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { WalletProvider } from '@/context/WalletContext';
import { ConsultationProvider } from '@/context/ConsultationContext';
import { Navbar } from '@/components/layout/Navbar';
import { BottomNav } from '@/components/layout/BottomNav';
import { Footer } from '@/components/layout/Footer';
import { InfiniteUniverseWrapper } from '@/components/cosmic/InfiniteUniverseWrapper';

export const metadata: Metadata = {
  title: 'Krishna Jyotish – Premium Cosmic Vedic Astrology Consultation',
  description: 'Connect with verified Vedic astrologers, explore 3D Navagraha universe, generate accurate Kundli charts, and receive divine wisdom inspired by Lord Krishna.',
  keywords: 'astrology consultation, vedic astrology, kundli, panchang, dr amit deshmukh, krishna cosmic universe, horoscope',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-cosmic-white min-h-screen flex flex-col selection:bg-cosmic-gold selection:text-black">
        {/* Persistent 3D Infinite Scroll Universe: Pure Black Void, Stars & Rotating Planets */}
        <InfiniteUniverseWrapper />

        <AuthProvider>
          <WalletProvider>
            <ConsultationProvider>
              <div className="relative z-10 flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 w-full">{children}</main>
                <Footer />
                <BottomNav />
              </div>
            </ConsultationProvider>
          </WalletProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
