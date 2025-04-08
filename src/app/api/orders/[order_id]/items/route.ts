// app/api/orders/[order_id]/items/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ order_id: string }> }
) {
  try {
    const user = await requireAuth(req);
    const { order_id } = await params;
    const data = await req.json();
    const { mysteryBoxId, quantity = 1 } = data;

    if (!mysteryBoxId) {
      return NextResponse.json(
        { error: 'Mystery box ID is required' },
        { status: 400 }
      );
    }

    // Verify the order belongs to the user
    const order = await prisma.order.findUnique({
      where: {
        id: order_id,
        userId: user.id,
        status: 'PENDING',  // Only allow adding items to pending orders
      },
    });

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found or not editable' },
        { status: 404 }
      );
    }

    // Get the mystery box to add
    const mysteryBox = await prisma.mysteryBox.findUnique({
      where: { id: mysteryBoxId },
    });

    if (!mysteryBox) {
      return NextResponse.json(
        { error: 'Mystery box not found' },
        { status: 404 }
      );
    }

    // Add item to order
    const orderItem = await prisma.orderItem.create({
      data: {
        orderId: order_id,
        mysteryBoxId,
        quantity,
        price: mysteryBox.price,
      },
    });

    // Update order total
    const itemTotal = parseFloat(mysteryBox.price.toString()) * quantity;
    await prisma.order.update({
      where: { id: order_id },
      data: {
        totalPrice: {
          increment: itemTotal,
        },
      },
    });

    return NextResponse.json(orderItem, { status: 201 });
  } catch (error) {
    if (error instanceof Error && error.message === 'Unauthorized') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Failed to add item to order:', error);
    return NextResponse.json(
      { error: 'Failed to add item to order' },
      { status: 500 }
    );
  }
}