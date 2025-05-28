// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const user = await requireAuth(req);

    const orders = await prisma.order.findMany({
      where: {
        userId: user.id,
      },
      include: {
        items: {
          include: {
            mysteryBox: true,
          },
        },
        payment: true,
      },
    });

    return NextResponse.json(orders);
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Failed to fetch orders:', error);
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Try to get authenticated user, but allow guest orders
    let user = null;
    try {
      user = await requireAuth(req);
    } catch (error) {
      // User not authenticated, proceed as guest
    }

    // Generate a unique guest ID if no user
    const userId = user?.id || `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    const order = await prisma.order.create({
      data: {
        userId: userId,
        status: 'PENDING',
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}

// Add new endpoint for guest orders
export async function PATCH(req: NextRequest) {
  try {
    const { orderId, guestId } = await req.json();
    
    if (!orderId || !guestId) {
      return NextResponse.json(
        { error: 'Order ID and guest ID are required' },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
        userId: guestId,
      },
      include: {
        items: {
          include: {
            mysteryBox: true,
          },
        },
        payment: true,
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error('Failed to fetch guest order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}