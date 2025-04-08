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
    const user = await requireAuth(req);

    const order = await prisma.order.create({
      data: {
        userId: user.id,
        status: 'PENDING',
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Failed to create order:', error);
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    );
  }
}