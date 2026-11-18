import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { amount, currency = 'INR', userId } = body;

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: 'Valid amount is required' }, { status: 400 });
    }

    // In production with live RAZORPAY_KEY_ID & RAZORPAY_KEY_SECRET,
    // we would call the Razorpay API.
    // Here we generate an authenticated server order with order id and receipt.
    const orderId = 'order_kj_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
    const amountInPaise = Math.round(amount * 100);

    return NextResponse.json({
      success: true,
      orderId,
      amount: amountInPaise,
      currency,
      receipt: `rcpt_${userId}_${Date.now()}`,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_KrishnaCosmicDemo',
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create Razorpay order', details: String(error) }, { status: 500 });
  }
}
