// app/api/payments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth(req);
    const data = await req.json();
    const { orderId, method } = data;

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Verify the order belongs to the user
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId: user.id,
        status: 'PENDING',  // Only allow payment for pending orders
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found or not payable' },
        { status: 404 }
      );
    }

    // Mock payment processing - always succeeds in this example
    const payment = await prisma.payment.create({
      data: {
        orderId,
        amount: order.totalPrice,
        status: 'COMPLETED',  // In a real app, this would be set after payment confirmation
        method: method || 'Credit Card',
      },
    });

    // Update order status
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: 'PAID',
      },
    });

    return NextResponse.json(payment, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Failed to process payment:', error);
    return NextResponse.json(
      { error: 'Failed to process payment' },
      { status: 500 }
    );
  }
}