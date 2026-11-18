import { NextResponse } from 'next/server';
import { calculateAshtakootMilan, generateKundli } from '@/lib/astrology/engine';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { boyDob, boyTob, boyLat = 28.6139, boyLon = 77.2090, girlDob, girlTob, girlLat = 28.6139, girlLon = 77.2090 } = body;

    if (!boyDob || !boyTob || !girlDob || !girlTob) {
      return NextResponse.json({ error: 'Both Boy and Girl birth details are required' }, { status: 400 });
    }

    const boyKundli = generateKundli({ dob: boyDob, tob: boyTob, latitude: boyLat, longitude: boyLon });
    const girlKundli = generateKundli({ dob: girlDob, tob: girlTob, latitude: girlLat, longitude: girlLon });

    const boyMoon = boyKundli.planets.find((p) => p.name === 'Moon');
    const girlMoon = girlKundli.planets.find((p) => p.name === 'Moon');

    const matchResult = calculateAshtakootMilan(
      boyMoon?.longitude || 0,
      girlMoon?.longitude || 0
    );

    return NextResponse.json({
      success: true,
      matching: matchResult,
      boyDetails: {
        name: body.boyName || 'Groom',
        lagna: boyKundli.lagna.sign,
        rashi: boyKundli.panchangSummary.rashi,
        nakshatra: boyKundli.panchangSummary.nakshatra,
        isManglik: boyKundli.doshas.isManglik,
      },
      girlDetails: {
        name: body.girlName || 'Bride',
        lagna: girlKundli.lagna.sign,
        rashi: girlKundli.panchangSummary.rashi,
        nakshatra: girlKundli.panchangSummary.nakshatra,
        isManglik: girlKundli.doshas.isManglik,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Kundli matching failed', details: String(error) }, { status: 500 });
  }
}
