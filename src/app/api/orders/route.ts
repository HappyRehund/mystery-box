// app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { requireAuth } from '@/lib/auth';
import { Prisma } from '@/generated/client';

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
    let authUser = null;
    let userIdToUse: string;

    try {
      // requireAuth should return an object like { id: string } if authenticated
      const userSession = await requireAuth(req);
      authUser = userSession; // Assuming requireAuth returns the user object or session
      userIdToUse = authUser.id;
    } catch (error) {
      // User not authenticated, proceed as guest
      const guestId = `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Ensure a guest user record exists in the User table
      await prisma.user.upsert({
        where: { id: guestId },
        update: {}, // No update needed if guest user already exists
        create: {
          id: guestId,
          email: `${guestId}@guest.example.com`, // Provide a unique placeholder email
          // name: "Guest User", // Provide if 'name' is also required and not nullable
          // Add any other required fields for the User model here
        },
      });
      userIdToUse = guestId;
    }

    const order = await prisma.order.create({
      data: {
        userId: userIdToUse,
        status: 'PENDING',
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Log specific Prisma errors
      console.error('Prisma Error Code:', error.code);
      if (error.code === 'P2003') {
        console.error('Foreign key constraint failed on field:', error.meta?.field_name);
      }
    }
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