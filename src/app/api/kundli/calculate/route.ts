import { NextResponse } from 'next/server';
import { generateKundli } from '@/lib/astrology/engine';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { dob, tob, latitude, longitude, timezoneOffset } = body;

    if (!dob || !tob) {
      return NextResponse.json({ error: 'Date of birth and time of birth are required' }, { status: 400 });
    }

    const lat = typeof latitude === 'number' ? latitude : 28.6139; // default New Delhi
    const lon = typeof longitude === 'number' ? longitude : 77.2090;
    const tz = typeof timezoneOffset === 'number' ? timezoneOffset : 5.5;

    const kundli = generateKundli({
      dob,
      tob,
      latitude: lat,
      longitude: lon,
      timezoneOffset: tz,
    });

    return NextResponse.json({ success: true, kundli });
  } catch (error) {
    return NextResponse.json({ error: 'Kundli calculation failed', details: String(error) }, { status: 500 });
  }
}
