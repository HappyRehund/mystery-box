// app/api/orders/[order_id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function GET(
  req: NextRequest,
  { params }: { params: { order_id: string } }
) {
  try {
    const user = await requireAuth(req);
    const { order_id } = params;

    const order = await prisma.order.findUnique({
      where: {
        id: order_id,
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

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(order);
  } catch (error) {
    if ( error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Failed to fetch order:', error);
    return NextResponse.json(
      { error: 'Failed to fetch order' },
      { status: 500 }
    );
  }
}