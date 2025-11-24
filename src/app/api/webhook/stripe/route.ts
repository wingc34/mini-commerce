import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { env } from '@/lib/env';

const stripe = new Stripe(env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')!;
  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const errorMessage = err as { message: string };
    console.error('❌ Webhook signature failed:', errorMessage.message);
    return new NextResponse(`Webhook Error: ${errorMessage.message}`, {
      status: 400,
    });
  }

  // Handle event types
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const orderId = session.metadata?.orderId;
    const paymentIntent = session.payment_intent;

    if (!orderId) {
      console.error('⚠️ No orderId metadata found');
      return NextResponse.json({ received: true });
    }

    // update postgres db
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
        paymentIntentId: paymentIntent as string,
        stripeSessionId: session.id,
      },
    });

    console.log(`✅ Order ${orderId} marked as PAID`);
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
