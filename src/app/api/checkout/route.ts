import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { 
      orderId, 
      email, 
      name, 
      address, 
      city, 
      postalCode, 
      country, 
      paymentMethod,
      subtotal,
      shipping,
      tax,
      total
    } = data;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Get or create user based on email
    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
        },
      });
    }

    // Update order with user and shipping info
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        userId: user.id,
        totalPrice: total,
        status: 'PROCESSING',
        // Store shipping info as JSON or add fields to schema
      },
    });

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        orderId,
        amount: total,
        status: 'COMPLETED', // Mock payment - always succeeds
        method: paymentMethod,
      },
    });

    // Update order status to PAID
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
      },
    });

    return NextResponse.json({ 
      success: true, 
      orderId,
      paymentId: payment.id
    }, { status: 200 });

  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Checkout failed' },
      { status: 500 }
    );
  }
}
