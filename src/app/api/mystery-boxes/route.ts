// app/api/mystery-boxes/route.ts
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get('category_id');

    const where = categoryId ? { categoryId } : {};

    const mysteryBoxes = await prisma.mysteryBox.findMany({
      where,
      include: {
        category: true,
      },
    });

    return NextResponse.json(mysteryBoxes);
  } catch (error) {
    console.error('Failed to fetch mystery boxes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mystery boxes' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { name, description, price, imageUrl, categoryId } = data;

    if (!name || !price || !categoryId) {
      return NextResponse.json(
        { error: 'Name, price, and categoryId are required' },
        { status: 400 }
      );
    }

    const mysteryBox = await prisma.mysteryBox.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        categoryId,
      },
    });

    return NextResponse.json(mysteryBox, { status: 201 });
  } catch (error) {
    console.error('Failed to create mystery box:', error);
    return NextResponse.json(
      { error: 'Failed to create mystery box' },
      { status: 500 }
    );
  }
}