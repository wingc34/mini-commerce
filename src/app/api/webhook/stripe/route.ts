import Stripe from 'stripe';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { env } from '@/lib/env';
import { DraftStatus, OrderStatus } from '@prisma/client';

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
  if (event.type === 'payment_intent.succeeded') {
    const session = event.data.object as Stripe.PaymentIntent;

    const draftOrderId = session.metadata?.draftOrderId;
    const paymentIntent = session.id;

    if (!draftOrderId) {
      console.error('⚠️ No orderId metadata found');
      return NextResponse.json({ received: true });
    }

    // update postgres db
    const draftOrder = await prisma.draftOrder.findUnique({
      where: { id: draftOrderId },
      include: { items: true },
    });

    if (!draftOrder) {
      console.error(`⚠️ No draft order found for ${draftOrderId}`);
      return NextResponse.json({ received: true });
    }

    const order = await prisma.order.create({
      data: {
        userId: draftOrder.userId,
        total: draftOrder.total,
        shippingAddressId: draftOrder.shippingAddressId,
        status: OrderStatus.PAID,
        paymentIntentId: paymentIntent as string,
        stripeSessionId: session.id,
        draftOrderId: draftOrderId,
      },
    });

    await prisma.orderItem.createMany({
      data: draftOrder.items.map((item) => {
        return {
          orderId: order.id,
          skuId: item.skuId,
          quantity: item.quantity,
          price: item.price,
        };
      }),
    });

    console.log(`✅ Order ${order.id} marked as PAID`);

    await prisma.draftOrder.update({
      where: { id: draftOrder.id },
      data: {
        status: DraftStatus.COMPLETED,
      },
    });

    console.log(`✅ Draft order ${draftOrderId} completed`);
  } else {
    console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
