// app/api/orders/[order_id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ order_id: string }> }
) {
  try {
    const { order_id } = await params;
    const { searchParams } = new URL(req.url);
    const guestId = searchParams.get('guestId');

    // Try to get authenticated user, but allow guest access
    let user = null;
    try {
      user = await requireAuth(req);
    } catch (error) {
      // User not authenticated, check for guest access
      if (!guestId) {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    const order = await prisma.order.findUnique({
      where: {
        id: order_id,
        userId: user?.id,
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
    console.error('Failed to fetch order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}