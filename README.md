# Krishna Cosmic Universe (Krishna Jyotish)
## Premium Vedic Astrology Consultation & Cosmic Universe Platform

Inspired by AskK (https://play.google.com/store/apps/details?id=in.mohalla.askk) and featuring Dr. Amit Deshmukh from chatwithastrologers.com.

---

### 1. Brand Identity & Visual System
- **Colors**:
  - Midnight cosmic blue: `#080D24`
  - Deep galaxy navy: `#101A38`
  - Peacock blue: `#087E8B`
  - Divine gold: `#D4AF62`
  - Royal purple: `#513B83`
  - Celestial white: `#F5F1E8`
  - Warm saffron: `#E6A64A`
- **Typography**:
  - `Cinzel` for headings & royal banners
  - `Poppins` for readable body text & controls
  - `Noto Sans Devanagari` for Sanskrit mantras & Hindi shlokas
  - `Playfair Display` for philosophical quotes

### 2. Astronomical & Astrological Calculation Engine
- **Ayanamsa**: True Lahiri (Chitrapaksha) sidereal subtraction.
- **Ephemeris Calculation**: Julian Day conversion, RAMC (Local Sidereal Time), and Nirayana coordinates for Sun, Moon, Mars, Mercury, Jupiter, Venus, Saturn, Rahu, and Ketu.
- **Charts**: Interactive North Indian (Diamond) and South Indian (Square Grid) Lagna (D1) and Navamsha (D9) charts.
- **Vimshottari Dasha Sequence**: 120-year timeline with balance of dasha at birth derived from the Moon's exact Nakshatra degree.
- **Ashtakoot Guna Milan (36 Points)**: 8 Kootas (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, Nadi) with Nadi & Bhakoot Dosha diagnostics.
- **PDF Export**: Branded, high-resolution Kundli report download via jsPDF.

### 3. Digital Wallet & Razorpay Payment Integration
- Server-authoritative order creation (`/api/razorpay/create-order`) and HMAC SHA-256 signature verification (`/api/razorpay/verify-payment`).
- Immutable transaction audit ledger (Recharge, Consultation Deduction, Promotional Bonus, Refund).
- Predefined packs (₹99, ₹199, ₹499, ₹999, ₹1999, Custom).
- Per-minute live billing with automatic low-balance notifications and quick top-up during active sessions.

### 4. Real-time Consultation System
- **Live 1-on-1 Chat**: Real-time messaging, typing indicators, suggested questions, and Kundli card sharing.
- **Voice Calling**: WebRTC audio stream with audio waveform visualizer and per-minute billing.
- **Video Calling**: Full WebRTC video preview with picture-in-picture self-view and floating session timer.

### 5. Running the Project Locally
```bash
npm install
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to enter the cosmic universe.
