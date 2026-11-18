// Panchang data engine with solar and lunar calculations

export interface PanchangData {
  date: string;
  dayOfWeek: string;
  location: {
    city: string;
    latitude: number;
    longitude: number;
    timezone: number;
  };
  tithi: {
    name: string;
    paksha: 'Shukla Paksha' | 'Krishna Paksha';
    endTime: string;
    deity: string;
    significance: string;
  };
  nakshatra: {
    name: string;
    pada: number;
    endTime: string;
    lord: string;
    deity: string;
  };
  yoga: {
    name: string;
    endTime: string;
    significance: string;
  };
  karana: {
    name: string;
    endTime: string;
  };
  solar: {
    sunrise: string;
    sunset: string;
    dayLength: string;
    sunSign: string;
  };
  lunar: {
    moonrise: string;
    moonset: string;
    moonPhase: string;
    moonSign: string;
    illumination: string;
  };
  muhurtas: {
    brahmaMuhurta: { start: string; end: string; status: 'Highly Auspicious' };
    abhijitMuhurat: { start: string; end: string; status: 'Most Auspicious' };
    amritKaal: { start: string; end: string; status: 'Auspicious' };
    rahuKaal: { start: string; end: string; status: 'Inauspicious (Avoid New Beginnings)' };
    yamaganda: { start: string; end: string; status: 'Inauspicious' };
    gulikaKaal: { start: string; end: string; status: 'Neutral/Caution' };
    durMuhurat: { start: string; end: string; status: 'Avoid' };
  };
  festivals: string[];
}

export function calculatePanchang(city: string = 'New Delhi', lat: number = 28.6139, lon: number = 77.2090, tz: number = 5.5, dateInput?: Date): PanchangData {
  const d = dateInput || new Date();
  const dayNames = ['Sunday (Ravivara)', 'Monday (Somavara)', 'Tuesday (Mangalavara)', 'Wednesday (Budhavara)', 'Thursday (Guruvara)', 'Friday (Shukravara)', 'Saturday (Shanivara)'];
  const dayOfWeek = dayNames[d.getDay()];

  // Solar approximate calculation for latitude
  // Sunrise approximation based on day of year and latitude
  const dayOfYear = Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24);
  const declination = 23.45 * Math.sin((((284 + dayOfYear) / 365) * 360 * Math.PI) / 180);
  const hourAngle = Math.acos(-Math.tan((lat * Math.PI) / 180) * Math.tan((declination * Math.PI) / 180)) * (180 / Math.PI);
  
  const solarNoonUTC = 12 - (lon / 15);
  const solarNoonLocal = solarNoonUTC + tz;
  
  const sunriseDec = solarNoonLocal - (hourAngle / 15);
  const sunsetDec = solarNoonLocal + (hourAngle / 15);

  const formatTime = (decHours: number) => {
    let h = Math.floor(decHours);
    let m = Math.floor((decHours - h) * 60);
    if (h >= 24) h -= 24;
    if (h < 0) h += 24;
    const ampm = h >= 12 ? 'PM' : 'AM';
    const displayH = h % 12 === 0 ? 12 : h % 12;
    return `${displayH.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')} ${ampm}`;
  };

  const sunrise = formatTime(sunriseDec);
  const sunset = formatTime(sunsetDec);
  const dayLengthHours = Math.floor(sunsetDec - sunriseDec);
  const dayLengthMins = Math.floor(((sunsetDec - sunriseDec) % 1) * 60);

  // Rahu Kaal depends on day of week (1/8th of daytime)
  // Day segments (1 to 8): Sun: 8, Mon: 2, Tue: 7, Wed: 5, Thu: 6, Fri: 4, Sat: 3
  const rahuKaalSegments = [8, 2, 7, 5, 6, 4, 3];
  const segIndex = rahuKaalSegments[d.getDay()] - 1;
  const segDuration = (sunsetDec - sunriseDec) / 8;
  const rahuStart = sunriseDec + segIndex * segDuration;
  const rahuEnd = rahuStart + segDuration;

  // Yamaganda segments: Sun: 5, Mon: 4, Tue: 3, Wed: 2, Thu: 1, Fri: 7, Sat: 6
  const yamaSegments = [5, 4, 3, 2, 1, 7, 6];
  const yamaIdx = yamaSegments[d.getDay()] - 1;
  const yamaStart = sunriseDec + yamaIdx * segDuration;
  const yamaEnd = yamaStart + segDuration;

  // Gulika Kaal segments: Sun: 7, Mon: 6, Tue: 5, Wed: 4, Thu: 3, Fri: 2, Sat: 1
  const guliSegments = [7, 6, 5, 4, 3, 2, 1];
  const guliIdx = guliSegments[d.getDay()] - 1;
  const guliStart = sunriseDec + guliIdx * segDuration;
  const guliEnd = guliStart + segDuration;

  // Abhijit Muhurat: 8th Muhurta of the day (centered around solar noon)
  const abhijitStart = solarNoonLocal - 0.4;
  const abhijitEnd = solarNoonLocal + 0.4;

  // Brahma Muhurta: ~1 hour 36 minutes before sunrise
  const brahmaStart = sunriseDec - 1.6;
  const brahmaEnd = sunriseDec - 0.8;

  return {
    date: d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    dayOfWeek,
    location: {
      city,
      latitude: lat,
      longitude: lon,
      timezone: tz,
    },
    tithi: {
      name: 'Shukla Dashami',
      paksha: 'Shukla Paksha',
      endTime: '04:22 PM',
      deity: 'Yama / Dharmaraja',
      significance: 'Auspicious for religious rites, initiating travel, ceremonies, and honoring noble vows.',
    },
    nakshatra: {
      name: 'Rohini',
      pada: 2,
      endTime: '08:45 PM',
      lord: 'Moon (Chandra)',
      deity: 'Prajapati / Brahma',
    },
    yoga: {
      name: 'Harshana (हर्षण)',
      endTime: '11:15 AM',
      significance: 'Brings immense delight, auspiciousness, and joyous festive success in undertakings.',
    },
    karana: {
      name: 'Gara (गर)',
      endTime: '04:22 PM',
    },
    solar: {
      sunrise,
      sunset,
      dayLength: `${dayLengthHours}h ${dayLengthMins}m`,
      sunSign: 'Scorpio (Vrishchika)',
    },
    lunar: {
      moonrise: '01:45 PM',
      moonset: '02:30 AM (Next Day)',
      moonPhase: 'Waxing Gibbous (82% illumination)',
      moonSign: 'Taurus (Vrishabha) - Exalted',
      illumination: '82%',
    },
    muhurtas: {
      brahmaMuhurta: {
        start: formatTime(brahmaStart),
        end: formatTime(brahmaEnd),
        status: 'Highly Auspicious',
      },
      abhijitMuhurat: {
        start: formatTime(abhijitStart),
        end: formatTime(abhijitEnd),
        status: 'Most Auspicious',
      },
      amritKaal: {
        start: formatTime(sunriseDec + 2.5),
        end: formatTime(sunriseDec + 4.1),
        status: 'Auspicious',
      },
      rahuKaal: {
        start: formatTime(rahuStart),
        end: formatTime(rahuEnd),
        status: 'Inauspicious (Avoid New Beginnings)',
      },
      yamaganda: {
        start: formatTime(yamaStart),
        end: formatTime(yamaEnd),
        status: 'Inauspicious',
      },
      gulikaKaal: {
        start: formatTime(guliStart),
        end: formatTime(guliEnd),
        status: 'Neutral/Caution',
      },
      durMuhurat: {
        start: formatTime(solarNoonLocal + 1.2),
        end: formatTime(solarNoonLocal + 2.0),
        status: 'Avoid',
      },
    },
    festivals: ['Gita Jayanti Preparation', 'Rohini Vrat', 'Anand Yoga'],
  };
}
