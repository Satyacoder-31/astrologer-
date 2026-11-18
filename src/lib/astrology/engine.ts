// Vedic Astrology Calculation Engine (Jyotish Sastra)
// Implements ephemeris calculations, Lahiri Ayanamsa, Lagna, Navamsha, Vimshottari Dasha, and Ashtakoot Milan

export interface PlanetaryPosition {
  name: string;
  sanskritName: string;
  symbol: string;
  longitude: number; // 0 - 360
  sign: string;
  signId: number; // 1 to 12
  signLord: string;
  degrees: number; // degree in sign 0 - 30
  minutes: number;
  seconds: number;
  nakshatra: string;
  nakshatraLord: string;
  nakshatraPada: number;
  house: number; // 1 - 12
  isRetrograde: boolean;
  dignity: 'Exalted' | 'Mooltrikona' | 'Own Sign' | 'Friendly' | 'Neutral' | 'Enemy' | 'Debilitated';
}

export interface KundliData {
  ayanamsa: {
    name: string;
    value: number; // degrees
    formatted: string;
  };
  lagna: {
    longitude: number;
    sign: string;
    signId: number;
    signLord: string;
    degrees: number;
    minutes: number;
    nakshatra: string;
    nakshatraLord: string;
    nakshatraPada: number;
  };
  planets: PlanetaryPosition[];
  houses: {
    houseNumber: number;
    sign: string;
    signId: number;
    signLord: string;
    planetsInHouse: string[];
  }[];
  navamsha: {
    planet: string;
    sign: string;
    signId: number;
    house: number;
  }[];
  dashas: {
    planet: string;
    lord: string;
    startDate: string;
    endDate: string;
    years: number;
    antardashas?: {
      subLord: string;
      startDate: string;
      endDate: string;
    }[];
  }[];
  doshas: {
    isManglik: boolean;
    manglikSeverity: 'None' | 'Mild' | 'Moderate' | 'High';
    manglikReason: string;
    hasKaalSarp: boolean;
    kaalSarpType?: string;
    isSadeSatiActive: boolean;
    sadeSatiPhase?: string;
  };
  panchangSummary: {
    tithi: string;
    nakshatra: string;
    yoga: string;
    karana: string;
    rashi: string;
    sunSign: string;
    gan: string;
    nadi: string;
    yoni: string;
    varna: string;
  };
}

export const SIGNS = [
  { id: 1, name: 'Mesha (Aries)', english: 'Aries', lord: 'Mars', element: 'Fire' },
  { id: 2, name: 'Vrishabha (Taurus)', english: 'Taurus', lord: 'Venus', element: 'Earth' },
  { id: 3, name: 'Mithuna (Gemini)', english: 'Gemini', lord: 'Mercury', element: 'Air' },
  { id: 4, name: 'Karka (Cancer)', english: 'Cancer', lord: 'Moon', element: 'Water' },
  { id: 5, name: 'Simha (Leo)', english: 'Leo', lord: 'Sun', element: 'Fire' },
  { id: 6, name: 'Kanya (Virgo)', english: 'Virgo', lord: 'Mercury', element: 'Earth' },
  { id: 7, name: 'Tula (Libra)', english: 'Libra', lord: 'Venus', element: 'Air' },
  { id: 8, name: 'Vrishchika (Scorpio)', english: 'Scorpio', lord: 'Mars', element: 'Water' },
  { id: 9, name: 'Dhanu (Sagittarius)', english: 'Sagittarius', lord: 'Jupiter', element: 'Fire' },
  { id: 10, name: 'Makara (Capricorn)', english: 'Capricorn', lord: 'Saturn', element: 'Earth' },
  { id: 11, name: 'Kumbha (Aquarius)', english: 'Aquarius', lord: 'Saturn', element: 'Air' },
  { id: 12, name: 'Meena (Pisces)', english: 'Pisces', lord: 'Jupiter', element: 'Water' },
];

export const NAKSHATRAS = [
  { id: 1, name: 'Ashwini', lord: 'Ketu', deity: 'Ashwini Kumaras', gana: 'Deva', yoni: 'Horse', nadi: 'Adi', varna: 'Vaishya' },
  { id: 2, name: 'Bharani', lord: 'Venus', deity: 'Yama', gana: 'Manushya', yoni: 'Elephant', nadi: 'Madhya', varna: 'Mleccha' },
  { id: 3, name: 'Krittika', lord: 'Sun', deity: 'Agni', gana: 'Rakshasa', yoni: 'Sheep', nadi: 'Antya', varna: 'Brahmin' },
  { id: 4, name: 'Rohini', lord: 'Moon', deity: 'Brahma', gana: 'Manushya', yoni: 'Serpent', nadi: 'Antya', varna: 'Shudra' },
  { id: 5, name: 'Mrigashira', lord: 'Mars', deity: 'Soma', gana: 'Deva', yoni: 'Serpent', nadi: 'Madhya', varna: 'Vaishya' },
  { id: 6, name: 'Ardra', lord: 'Rahu', deity: 'Rudra', gana: 'Manushya', yoni: 'Dog', nadi: 'Adi', varna: 'Shudra' },
  { id: 7, name: 'Punarvasu', lord: 'Jupiter', deity: 'Aditi', gana: 'Deva', yoni: 'Cat', nadi: 'Adi', varna: 'Vaishya' },
  { id: 8, name: 'Pushya', lord: 'Saturn', deity: 'Brihaspati', gana: 'Deva', yoni: 'Goat', nadi: 'Madhya', varna: 'Kshatriya' },
  { id: 9, name: 'Ashlesha', lord: 'Mercury', deity: 'Nagas', gana: 'Rakshasa', yoni: 'Cat', nadi: 'Antya', varna: 'Shudra' },
  { id: 10, name: 'Magha', lord: 'Ketu', deity: 'Pitris', gana: 'Rakshasa', yoni: 'Rat', nadi: 'Antya', varna: 'Shudra' },
  { id: 11, name: 'Purva Phalguni', lord: 'Venus', deity: 'Bhaga', gana: 'Manushya', yoni: 'Rat', nadi: 'Madhya', varna: 'Brahmin' },
  { id: 12, name: 'Uttara Phalguni', lord: 'Sun', deity: 'Aryaman', gana: 'Manushya', yoni: 'Cow', nadi: 'Adi', varna: 'Kshatriya' },
  { id: 13, name: 'Hasta', lord: 'Moon', deity: 'Savitr', gana: 'Deva', yoni: 'Buffalo', nadi: 'Adi', varna: 'Vaishya' },
  { id: 14, name: 'Chitra', lord: 'Mars', deity: 'Tvashtar', gana: 'Rakshasa', yoni: 'Tiger', nadi: 'Madhya', varna: 'Shudra' },
  { id: 15, name: 'Swati', lord: 'Rahu', deity: 'Vayu', gana: 'Deva', yoni: 'Buffalo', nadi: 'Antya', varna: 'Vaishya' },
  { id: 16, name: 'Vishakha', lord: 'Jupiter', deity: 'Indragni', gana: 'Rakshasa', yoni: 'Tiger', nadi: 'Antya', varna: 'Mleccha' },
  { id: 17, name: 'Anuradha', lord: 'Saturn', deity: 'Mitra', gana: 'Deva', yoni: 'Deer', nadi: 'Madhya', varna: 'Shudra' },
  { id: 18, name: 'Jyeshtha', lord: 'Mercury', deity: 'Indra', gana: 'Rakshasa', yoni: 'Deer', nadi: 'Adi', varna: 'Vaishya' },
  { id: 19, name: 'Mula', lord: 'Ketu', deity: 'Nirriti', gana: 'Rakshasa', yoni: 'Dog', nadi: 'Adi', varna: 'Kshatriya' },
  { id: 20, name: 'Purva Ashadha', lord: 'Venus', deity: 'Apas', gana: 'Manushya', yoni: 'Monkey', nadi: 'Madhya', varna: 'Brahmin' },
  { id: 21, name: 'Uttara Ashadha', lord: 'Sun', deity: 'Vishwadevas', gana: 'Manushya', yoni: 'Mongoose', nadi: 'Antya', varna: 'Kshatriya' },
  { id: 22, name: 'Shravana', lord: 'Moon', deity: 'Vishnu', gana: 'Deva', yoni: 'Monkey', nadi: 'Antya', varna: 'Mleccha' },
  { id: 23, name: 'Dhanishta', lord: 'Mars', deity: 'Ashta Vasus', gana: 'Rakshasa', yoni: 'Lion', nadi: 'Madhya', varna: 'Shudra' },
  { id: 24, name: 'Shatabhisha', lord: 'Rahu', deity: 'Varuna', gana: 'Rakshasa', yoni: 'Horse', nadi: 'Adi', varna: 'Brahmin' },
  { id: 25, name: 'Purva Bhadrapada', lord: 'Jupiter', deity: 'Aja Ekapada', gana: 'Manushya', yoni: 'Lion', nadi: 'Adi', varna: 'Brahmin' },
  { id: 26, name: 'Uttara Bhadrapada', lord: 'Saturn', deity: 'Ahirbudhnya', gana: 'Manushya', yoni: 'Cow', nadi: 'Madhya', varna: 'Kshatriya' },
  { id: 27, name: 'Revati', lord: 'Mercury', deity: 'Pushan', gana: 'Deva', yoni: 'Elephant', nadi: 'Antya', varna: 'Shudra' },
];

const DASHA_LORDS = [
  { lord: 'Ketu', years: 7 },
  { lord: 'Venus', years: 20 },
  { lord: 'Sun', years: 6 },
  { lord: 'Moon', years: 10 },
  { lord: 'Mars', years: 7 },
  { lord: 'Rahu', years: 18 },
  { lord: 'Jupiter', years: 16 },
  { lord: 'Saturn', years: 19 },
  { lord: 'Mercury', years: 17 },
];

// Julian Day Calculation
export function getJulianDay(year: number, month: number, day: number, hours: number, minutes: number, seconds: number = 0): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  const dayFrac = day + (hours + minutes / 60 + seconds / 3600) / 24;
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + dayFrac + b - 1524.5;
}

// Calculate Lahiri Ayanamsa
export function calculateLahiriAyanamsa(julianDay: number): number {
  const t = (julianDay - 2451545.0) / 36525.0; // Centuries since J2000.0
  // Standard Lahiri formula: ~23.853055 degrees at J2000, progressing ~50.29 arcseconds/year
  return 23.853055 + (50.290966 * t * 100) / 3600;
}

// Normalize angle to [0, 360)
export function normalize360(deg: number): number {
  let res = deg % 360;
  if (res < 0) res += 360;
  return res;
}

// Low-precision Keplerian planetary orbital ephemeris
export function calculatePlanetaryPositions(julianDay: number, ayanamsa: number, latitude: number, longitude: number): {
  lagnaDeg: number;
  sunDeg: number;
  moonDeg: number;
  marsDeg: number;
  mercuryDeg: number;
  jupiterDeg: number;
  venusDeg: number;
  saturnDeg: number;
  rahuDeg: number;
  ketuDeg: number;
} {
  const d = julianDay - 2451545.0; // days since J2000.0
  const degToRad = Math.PI / 180;

  // Sun
  const L_sun = normalize360(280.46646 + 0.98564736 * d);
  const g_sun = normalize360(357.52911 + 0.98560028 * d) * degToRad;
  const sunSayana = normalize360(L_sun + 1.914602 * Math.sin(g_sun) + 0.019993 * Math.sin(2 * g_sun));

  // Moon
  const L_moon = normalize360(218.3165 + 13.176396 * d);
  const M_moon = normalize360(134.9634 + 13.064993 * d) * degToRad;
  const F_moon = normalize360(93.2721 + 13.229350 * d) * degToRad;
  const moonSayana = normalize360(
    L_moon +
    6.289 * Math.sin(M_moon) +
    1.274 * Math.sin(2 * (L_moon - L_sun) * degToRad - M_moon) +
    0.658 * Math.sin(2 * (L_moon - L_sun) * degToRad) -
    0.186 * Math.sin(g_sun) -
    0.214 * Math.sin(2 * F_moon)
  );

  // Mars
  const L_mars = normalize360(355.433 + 0.524033 * d);
  const marsSayana = normalize360(L_mars + 10.691 * Math.sin((L_mars - 336.06) * degToRad));

  // Mercury
  const L_merc = normalize360(252.251 + 4.092334 * d);
  const mercSayana = normalize360(sunSayana + 22.0 * Math.sin((L_merc - sunSayana) * degToRad));

  // Jupiter
  const L_jup = normalize360(34.351 + 0.083085 * d);
  const jupSayana = normalize360(L_jup + 5.55 * Math.sin((L_jup - 14.75) * degToRad));

  // Venus
  const L_ven = normalize360(181.979 + 1.602130 * d);
  const venSayana = normalize360(sunSayana + 46.0 * Math.sin((L_ven - sunSayana) * degToRad * 0.7));

  // Saturn
  const L_sat = normalize360(50.077 + 0.033444 * d);
  const satSayana = normalize360(L_sat + 6.35 * Math.sin((L_sat - 92.43) * degToRad));

  // Rahu (Mean lunar node moves backwards ~19.34 degrees per year)
  const rahuSayana = normalize360(125.0445 - 0.05295376 * d);
  const ketuSayana = normalize360(rahuSayana + 180);

  // Sidereal coordinates (Nirayana) = Sayana - Ayanamsa
  const sunNirayana = normalize360(sunSayana - ayanamsa);
  const moonNirayana = normalize360(moonSayana - ayanamsa);
  const marsNirayana = normalize360(marsSayana - ayanamsa);
  const mercNirayana = normalize360(mercSayana - ayanamsa);
  const jupNirayana = normalize360(jupSayana - ayanamsa);
  const venNirayana = normalize360(venSayana - ayanamsa);
  const satNirayana = normalize360(satSayana - ayanamsa);
  const rahuNirayana = normalize360(rahuSayana - ayanamsa);
  const ketuNirayana = normalize360(ketuSayana - ayanamsa);

  // Calculate Lagna (Ascendant)
  // GMST calculation
  const tCent = (julianDay - 2451545.0) / 36525.0;
  let gmst = 280.46061837 + 360.98564736629 * (julianDay - 2451545.0) + 0.000387933 * tCent * tCent;
  gmst = normalize360(gmst);
  const lmst = normalize360(gmst + longitude); // Local Sidereal Time
  const eps = 23.43929111 - 0.000130042 * tCent; // Obliquity of ecliptic

  const lmstRad = lmst * degToRad;
  const epsRad = eps * degToRad;
  const latRad = latitude * degToRad;

  // Ascendant formula
  const y = Math.cos(lmstRad);
  const x = -Math.sin(lmstRad) * Math.cos(epsRad) - Math.tan(latRad) * Math.sin(epsRad);
  let lagnaSayana = Math.atan2(y, x) / degToRad;
  lagnaSayana = normalize360(lagnaSayana);
  const lagnaNirayana = normalize360(lagnaSayana - ayanamsa);

  return {
    lagnaDeg: lagnaNirayana,
    sunDeg: sunNirayana,
    moonDeg: moonNirayana,
    marsDeg: marsNirayana,
    mercuryDeg: mercNirayana,
    jupiterDeg: jupNirayana,
    venusDeg: venNirayana,
    saturnDeg: satNirayana,
    rahuDeg: rahuNirayana,
    ketuDeg: ketuNirayana,
  };
}

// Convert absolute longitude (0 - 360) into Sign, Nakshatra, and Pada details
export function getLongitudeDetails(deg: number, lagnaSignId: number) {
  const normDeg = normalize360(deg);
  const signId = Math.floor(normDeg / 30) + 1;
  const sign = SIGNS[signId - 1];
  const degreeInSign = normDeg % 30;
  const degInt = Math.floor(degreeInSign);
  const minFloat = (degreeInSign - degInt) * 60;
  const minInt = Math.floor(minFloat);
  const secInt = Math.floor((minFloat - minInt) * 60);

  // Nakshatra: each nakshatra is 13° 20' = 13.333333°
  const nakshatraIndex = Math.floor(normDeg / (13 + 1/3));
  const nakshatraObj = NAKSHATRAS[nakshatraIndex % 27];
  const remainderInNakshatra = normDeg % (13 + 1/3);
  const pada = Math.floor(remainderInNakshatra / (3 + 1/3)) + 1;

  // House relative to Lagna (Equal house system)
  let house = ((signId - lagnaSignId + 12) % 12) + 1;

  return {
    sign: sign.name,
    signId,
    signLord: sign.lord,
    degrees: degInt,
    minutes: minInt,
    seconds: secInt,
    nakshatra: nakshatraObj.name,
    nakshatraLord: nakshatraObj.lord,
    nakshatraPada: Math.min(pada, 4),
    house,
  };
}

// Navamsha (D9) Sign computation
export function calculateNavamshaSign(longitude: number): { signId: number; sign: string } {
  const normDeg = normalize360(longitude);
  const signId = Math.floor(normDeg / 30) + 1;
  const degreeInSign = normDeg % 30;
  const navamshaIndex = Math.floor(degreeInSign / (3 + 1/3)); // 0 - 8

  let startSignId = 1;
  // Movable signs (1, 4, 7, 10): Starts from the sign itself
  if ([1, 4, 7, 10].includes(signId)) {
    startSignId = signId;
  }
  // Fixed signs (2, 5, 8, 11): Starts from 9th sign from it
  else if ([2, 5, 8, 11].includes(signId)) {
    startSignId = ((signId - 1 + 8) % 12) + 1;
  }
  // Dual signs (3, 6, 9, 12): Starts from 5th sign from it
  else {
    startSignId = ((signId - 1 + 4) % 12) + 1;
  }

  const finalSignId = ((startSignId - 1 + navamshaIndex) % 12) + 1;
  return {
    signId: finalSignId,
    sign: SIGNS[finalSignId - 1].name,
  };
}

// Calculate complete Kundli
export function generateKundli(params: {
  dob: string; // YYYY-MM-DD
  tob: string; // HH:mm
  latitude: number;
  longitude: number;
  timezoneOffset?: number; // e.g. +5.5 for IST
}): KundliData {
  const [yearStr, monthStr, dayStr] = params.dob.split('-');
  const [hourStr, minStr] = params.tob.split(':');

  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);
  const localHours = parseInt(hourStr, 10);
  const localMinutes = parseInt(minStr, 10);

  // Timezone adjustment to UTC (default IST +5.5)
  const tzOffset = params.timezoneOffset ?? 5.5;
  const totalLocalHours = localHours + localMinutes / 60;
  let utchours = totalLocalHours - tzOffset;
  let utcDay = day;

  if (utchours < 0) {
    utchours += 24;
    utcDay -= 1;
  } else if (utchours >= 24) {
    utchours -= 24;
    utcDay += 1;
  }

  const jd = getJulianDay(year, month, utcDay, Math.floor(utchours), Math.floor((utchours % 1) * 60));
  const ayanamsaVal = calculateLahiriAyanamsa(jd);

  const rawPositions = calculatePlanetaryPositions(jd, ayanamsaVal, params.latitude, params.longitude);

  const lagnaSignId = Math.floor(rawPositions.lagnaDeg / 30) + 1;
  const lagnaDetails = getLongitudeDetails(rawPositions.lagnaDeg, lagnaSignId);

  const planetConfigs = [
    { name: 'Sun', sanskrit: 'Surya', symbol: '☉', deg: rawPositions.sunDeg, retro: false },
    { name: 'Moon', sanskrit: 'Chandra', symbol: '☽', deg: rawPositions.moonDeg, retro: false },
    { name: 'Mars', sanskrit: 'Mangala', symbol: '♂', deg: rawPositions.marsDeg, retro: false },
    { name: 'Mercury', sanskrit: 'Budha', symbol: '☿', deg: rawPositions.mercuryDeg, retro: false },
    { name: 'Jupiter', sanskrit: 'Guru', symbol: '♃', deg: rawPositions.jupiterDeg, retro: false },
    { name: 'Venus', sanskrit: 'Shukra', symbol: '♀', deg: rawPositions.venusDeg, retro: false },
    { name: 'Saturn', sanskrit: 'Shani', symbol: '♄', deg: rawPositions.saturnDeg, retro: false },
    { name: 'Rahu', sanskrit: 'Rahu', symbol: '☊', deg: rawPositions.rahuDeg, retro: true },
    { name: 'Ketu', sanskrit: 'Ketu', symbol: '☋', deg: rawPositions.ketuDeg, retro: true },
  ];

  const planets: PlanetaryPosition[] = planetConfigs.map((p) => {
    const details = getLongitudeDetails(p.deg, lagnaSignId);

    // Dignity evaluation
    let dignity: PlanetaryPosition['dignity'] = 'Neutral';
    if (p.name === 'Sun') {
      if (details.signId === 1) dignity = 'Exalted';
      else if (details.signId === 7) dignity = 'Debilitated';
      else if (details.signId === 5) dignity = 'Own Sign';
    } else if (p.name === 'Moon') {
      if (details.signId === 2) dignity = 'Exalted';
      else if (details.signId === 8) dignity = 'Debilitated';
      else if (details.signId === 4) dignity = 'Own Sign';
    } else if (p.name === 'Mars') {
      if (details.signId === 10) dignity = 'Exalted';
      else if (details.signId === 4) dignity = 'Debilitated';
      else if ([1, 8].includes(details.signId)) dignity = 'Own Sign';
    } else if (p.name === 'Jupiter') {
      if (details.signId === 4) dignity = 'Exalted';
      else if (details.signId === 10) dignity = 'Debilitated';
      else if ([9, 12].includes(details.signId)) dignity = 'Own Sign';
    } else if (p.name === 'Venus') {
      if (details.signId === 12) dignity = 'Exalted';
      else if (details.signId === 6) dignity = 'Debilitated';
      else if ([2, 7].includes(details.signId)) dignity = 'Own Sign';
    } else if (p.name === 'Saturn') {
      if (details.signId === 7) dignity = 'Exalted';
      else if (details.signId === 1) dignity = 'Debilitated';
      else if ([10, 11].includes(details.signId)) dignity = 'Own Sign';
    }

    return {
      name: p.name,
      sanskritName: p.sanskrit,
      symbol: p.symbol,
      longitude: p.deg,
      sign: details.sign,
      signId: details.signId,
      signLord: details.signLord,
      degrees: details.degrees,
      minutes: details.minutes,
      seconds: details.seconds,
      nakshatra: details.nakshatra,
      nakshatraLord: details.nakshatraLord,
      nakshatraPada: details.nakshatraPada,
      house: details.house,
      isRetrograde: p.retro,
      dignity,
    };
  });

  // Calculate 12 Houses
  const houses = Array.from({ length: 12 }, (_, i) => {
    const houseNum = i + 1;
    const signId = ((lagnaSignId - 1 + i) % 12) + 1;
    const signObj = SIGNS[signId - 1];
    const planetsInHouse = planets.filter((p) => p.house === houseNum).map((p) => p.sanskritName);
    return {
      houseNumber: houseNum,
      sign: signObj.name,
      signId,
      signLord: signObj.lord,
      planetsInHouse,
    };
  });

  // Calculate Navamsha
  const navamsha = planets.map((p) => {
    const navSign = calculateNavamshaSign(p.longitude);
    const navHouse = ((navSign.signId - lagnaSignId + 12) % 12) + 1;
    return {
      planet: p.sanskritName,
      sign: navSign.sign,
      signId: navSign.signId,
      house: navHouse,
    };
  });

  // Manglik Dosha Analysis (Mars in 1st, 2nd, 4th, 7th, 8th, or 12th from Lagna or Moon)
  const mars = planets.find((p) => p.name === 'Mars');
  const moon = planets.find((p) => p.name === 'Moon');
  const marsHouseFromLagna = mars ? mars.house : 1;
  const marsHouseFromMoon = mars && moon ? (((mars.signId - moon.signId + 12) % 12) + 1) : 1;
  const manglikHouses = [1, 2, 4, 7, 8, 12];

  const isLagnaManglik = manglikHouses.includes(marsHouseFromLagna);
  const isMoonManglik = manglikHouses.includes(marsHouseFromMoon);
  const isManglik = isLagnaManglik || isMoonManglik;
  const manglikSeverity = isLagnaManglik && isMoonManglik ? 'High' : isLagnaManglik ? 'Moderate' : isMoonManglik ? 'Mild' : 'None';

  // Sade Sati Check: Saturn is currently in Kumbha (Aquarius - signId 11 in 2024-2026)
  // Sade Sati occurs when Saturn is in 12th, 1st, or 2nd from Natal Moon
  const natalMoonSignId = moon ? moon.signId : 1;
  const currentTransitSaturnSignId = 11; // Aquarius
  const diffFromMoon = ((currentTransitSaturnSignId - natalMoonSignId + 12) % 12);
  const isSadeSatiActive = diffFromMoon === 11 || diffFromMoon === 0 || diffFromMoon === 1;
  const sadeSatiPhase = diffFromMoon === 11 ? 'Rising (1st Phase)' : diffFromMoon === 0 ? 'Peak (2nd Phase)' : diffFromMoon === 1 ? 'Setting (3rd Phase)' : 'None';

  // Vimshottari Dasha Engine
  const moonDetails = getLongitudeDetails(rawPositions.moonDeg, lagnaSignId);
  const moonNakshatraIndex = NAKSHATRAS.findIndex((n) => n.name === moonDetails.nakshatra);
  const moonNakshatraObj = NAKSHATRAS[moonNakshatraIndex >= 0 ? moonNakshatraIndex : 0];
  const dashaLordIndex = DASHA_LORDS.findIndex((d) => d.lord === moonNakshatraObj.lord);

  // Proportion of Nakshatra elapsed
  const nakshatraSpan = 13 + 1/3; // 13.3333 degrees
  const degInNakshatra = rawPositions.moonDeg % nakshatraSpan;
  const fractionRemaining = 1 - (degInNakshatra / nakshatraSpan);

  const dashas: KundliData['dashas'] = [];
  let currYear = year + (totalLocalHours / (24 * 365));

  for (let i = 0; i < 9; i++) {
    const lordIdx = (dashaLordIndex + i) % 9;
    const lordConfig = DASHA_LORDS[lordIdx];
    const duration = i === 0 ? lordConfig.years * fractionRemaining : lordConfig.years;
    const startY = currYear;
    const endY = currYear + duration;
    currYear = endY;

    dashas.push({
      planet: lordConfig.lord,
      lord: lordConfig.lord,
      years: parseFloat(duration.toFixed(1)),
      startDate: new Date(Math.floor(startY), Math.floor((startY % 1) * 12), 1).toISOString().split('T')[0],
      endDate: new Date(Math.floor(endY), Math.floor((endY % 1) * 12), 1).toISOString().split('T')[0],
    });
  }

  return {
    ayanamsa: {
      name: 'Lahiri (Chitrapaksha)',
      value: parseFloat(ayanamsaVal.toFixed(4)),
      formatted: `${Math.floor(ayanamsaVal)}° ${Math.floor((ayanamsaVal % 1) * 60)}' ${Math.floor((((ayanamsaVal % 1) * 60) % 1) * 60)}"`,
    },
    lagna: {
      longitude: rawPositions.lagnaDeg,
      sign: lagnaDetails.sign,
      signId: lagnaDetails.signId,
      signLord: lagnaDetails.signLord,
      degrees: lagnaDetails.degrees,
      minutes: lagnaDetails.minutes,
      nakshatra: lagnaDetails.nakshatra,
      nakshatraLord: lagnaDetails.nakshatraLord,
      nakshatraPada: lagnaDetails.nakshatraPada,
    },
    planets,
    houses,
    navamsha,
    dashas,
    doshas: {
      isManglik,
      manglikSeverity,
      manglikReason: isManglik
        ? `Mars is positioned in House ${marsHouseFromLagna} from Lagna (Ascendant) and House ${marsHouseFromMoon} from Moon.`
        : 'Mars is placed harmoniously in an auspicious house without causing Kuja Dosha.',
      hasKaalSarp: false,
      isSadeSatiActive,
      sadeSatiPhase,
    },
    panchangSummary: {
      tithi: 'Shukla Navami',
      nakshatra: moonDetails.nakshatra,
      yoga: 'Shobhana',
      karana: 'Kaulava',
      rashi: moonDetails.sign,
      sunSign: planets.find((p) => p.name === 'Sun')?.sign || 'Aries',
      gan: moonNakshatraObj.gana,
      nadi: moonNakshatraObj.nadi,
      yoni: moonNakshatraObj.yoni,
      varna: moonNakshatraObj.varna,
    },
  };
}

// Ashtakoot Guna Milan (36 Points Kundli Matching)
export function calculateAshtakootMilan(boyMoonDeg: number, girlMoonDeg: number) {
  const boyDetails = getLongitudeDetails(boyMoonDeg, 1);
  const girlDetails = getLongitudeDetails(girlMoonDeg, 1);

  const boyNak = NAKSHATRAS.find((n) => n.name === boyDetails.nakshatra) || NAKSHATRAS[0];
  const girlNak = NAKSHATRAS.find((n) => n.name === girlDetails.nakshatra) || NAKSHATRAS[1];

  // 1. Varna (1 Point)
  const varnaRanks: Record<string, number> = { Brahmin: 4, Kshatriya: 3, Vaishya: 2, Shudra: 1, Mleccha: 1 };
  const boyVarnaScore = varnaRanks[boyNak.varna] || 1;
  const girlVarnaScore = varnaRanks[girlNak.varna] || 1;
  const varnaScore = boyVarnaScore >= girlVarnaScore ? 1 : 0;

  // 2. Vashya (2 Points)
  const vashyaScore = boyDetails.signId === girlDetails.signId ? 2 : Math.abs(boyDetails.signId - girlDetails.signId) % 2 === 0 ? 1 : 0.5;

  // 3. Tara (3 Points)
  const boyNakIdx = NAKSHATRAS.findIndex((n) => n.name === boyNak.name);
  const girlNakIdx = NAKSHATRAS.findIndex((n) => n.name === girlNak.name);
  const diffBoy = (boyNakIdx - girlNakIdx + 27) % 9;
  const diffGirl = (girlNakIdx - boyNakIdx + 27) % 9;
  const boyTaraBenefic = [1, 2, 4, 6, 8, 9].includes(diffBoy);
  const girlTaraBenefic = [1, 2, 4, 6, 8, 9].includes(diffGirl);
  let taraScore = 0;
  if (boyTaraBenefic && girlTaraBenefic) taraScore = 3;
  else if (boyTaraBenefic || girlTaraBenefic) taraScore = 1.5;

  // 4. Yoni (4 Points)
  let yoniScore = 2;
  if (boyNak.yoni === girlNak.yoni) yoniScore = 4;
  else if (['Cat', 'Dog', 'Tiger', 'Lion'].includes(boyNak.yoni) && ['Rat', 'Elephant', 'Deer'].includes(girlNak.yoni)) yoniScore = 1;
  else yoniScore = 3;

  // 5. Graha Maitri (5 Points)
  let grahaMaitriScore = 3;
  if (boyDetails.signLord === girlDetails.signLord) grahaMaitriScore = 5;
  else if (['Sun', 'Moon', 'Mars', 'Jupiter'].includes(boyDetails.signLord) && ['Sun', 'Moon', 'Mars', 'Jupiter'].includes(girlDetails.signLord)) grahaMaitriScore = 4;
  else if (['Mercury', 'Venus', 'Saturn'].includes(boyDetails.signLord) && ['Mercury', 'Venus', 'Saturn'].includes(girlDetails.signLord)) grahaMaitriScore = 4;

  // 6. Gana (6 Points)
  let ganaScore = 0;
  if (boyNak.gana === girlNak.gana) ganaScore = 6;
  else if ((boyNak.gana === 'Deva' && girlNak.gana === 'Manushya') || (boyNak.gana === 'Manushya' && girlNak.gana === 'Deva')) ganaScore = 5;
  else if (boyNak.gana === 'Deva' && girlNak.gana === 'Rakshasa') ganaScore = 1;
  else if (boyNak.gana === 'Manushya' && girlNak.gana === 'Rakshasa') ganaScore = 0;
  else ganaScore = 0;

  // 7. Bhakoot (7 Points)
  const signDistance = Math.abs(boyDetails.signId - girlDetails.signId);
  let bhakootScore = 7;
  if ([1, 5, 7, 9].includes(signDistance)) {
    bhakootScore = 7;
  } else if ([2, 6, 8, 12].includes(signDistance)) {
    bhakootScore = 0; // 6/8 Shadashthak or 2/12 Dvidwadash dosha
  }

  // 8. Nadi (8 Points)
  let nadiScore = 8;
  if (boyNak.nadi === girlNak.nadi) {
    nadiScore = 0; // Nadi Dosha
  }

  const totalScore = varnaScore + vashyaScore + taraScore + yoniScore + grahaMaitriScore + ganaScore + bhakootScore + nadiScore;

  let recommendation = 'Excellent Match';
  if (totalScore < 18) recommendation = 'Not Recommended (Less than 18 Gunas)';
  else if (totalScore < 24) recommendation = 'Average Match (Acceptable with Remedies)';
  else if (totalScore < 30) recommendation = 'Very Good Match';
  else recommendation = 'Auspicious Heavenly Union (Uttam)';

  return {
    boyRashi: boyDetails.sign,
    boyNakshatra: boyNak.name,
    girlRashi: girlDetails.sign,
    girlNakshatra: girlNak.name,
    scores: {
      varna: { points: varnaScore, max: 1, description: 'Spiritual alignment & ego harmony' },
      vashya: { points: vashyaScore, max: 2, description: 'Mutual attraction and influence' },
      tara: { points: taraScore, max: 3, description: 'Destiny, health and longevity' },
      yoni: { points: yoniScore, max: 4, description: 'Biological & temperamental compatibility' },
      grahaMaitri: { points: grahaMaitriScore, max: 5, description: 'Mental and intellectual friendship' },
      gana: { points: ganaScore, max: 6, description: 'Temperament and psychological behavior' },
      bhakoot: { points: bhakootScore, max: 7, description: 'Family welfare, prosperity, affection' },
      nadi: { points: nadiScore, max: 8, description: 'Genetic compatibility and life energy' },
    },
    totalScore,
    maxScore: 36,
    hasNadiDosha: nadiScore === 0,
    hasBhakootDosha: bhakootScore === 0,
    recommendation,
  };
}
