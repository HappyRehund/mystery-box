import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const mysteryBox = await prisma.mysteryBox.findUnique({
      where: { id },
      include: {
        category: true,
        // Include any related data as needed
        // For example, if you have a reviews relationship:
        // reviews: {
        //   take: 5,
        //   orderBy: { createdAt: 'desc' }
        // }
      },
    });
    
    if (!mysteryBox) {
      return NextResponse.json(
        { error: 'Mystery box not found' },
        { status: 404 }
      );
    }
    
    // Add example contents and details for the mystery box
    // In a real application, these would come from your database
    const boxWithExtras = {
      ...mysteryBox,
      contents: [
        {
          description: "Exclusive limited edition item",
          probabilityRange: "5%"
        },
        {
          description: "Rare collectible",
          probabilityRange: "15%"
        },
        {
          description: "Uncommon item",
          probabilityRange: "30%"
        },
        {
          description: "Common item",
          probabilityRange: "50%"
        }
      ],
      details: {
        "Shipping": "Free",
        "Availability": "In Stock",
        "Box Weight": "0.5kg",
        "Box Dimensions": "25cm x 20cm x 10cm"
      }
    };
    
    return NextResponse.json(boxWithExtras);
  } catch (error) {
    console.error('Failed to fetch mystery box:', error);
    return NextResponse.json(
      { error: 'Failed to fetch mystery box' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const data = await req.json();
    const { name, description, price, imageUrl, categoryId } = data;
    
    const updatedMysteryBox = await prisma.mysteryBox.update({
      where: { id },
      data: {
        name,
        description,
        price,
        imageUrl,
        categoryId,
      },
    });
    
    return NextResponse.json(updatedMysteryBox);
  } catch (error) {
    console.error('Failed to update mystery box:', error);
    return NextResponse.json(
      { error: 'Failed to update mystery box' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    await prisma.mysteryBox.delete({
      where: { id },
    });
    
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Failed to delete mystery box:', error);
    return NextResponse.json(
      { error: 'Failed to delete mystery box' },
      { status: 500 }
    );
  }
}