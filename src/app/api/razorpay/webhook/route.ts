import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-razorpay-signature');
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (secret && signature) {
      const expectedSignature = crypto
        .createHmac('sha256', secret)
        .update(rawBody)
        .digest('hex');

      if (expectedSignature !== signature) {
        return NextResponse.json({ status: 'invalid_signature' }, { status: 400 });
      }
    }

    const event = JSON.parse(rawBody);

    // Process event e.g. payment.captured, payment.failed, refund.processed
    return NextResponse.json({ status: 'ok', receivedEvent: event.event });
  } catch (err) {
    return NextResponse.json({ error: 'Webhook processing failed', details: String(err) }, { status: 500 });
  }
}
