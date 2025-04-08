import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;
    
    // Assuming categories have a slug field or you're using the id as a slug
    // If using id, you might want to adjust the query accordingly
    const category = await prisma.category.findFirst({
      where: {
        // Try to match either on ID or on a slug field if you have one
        OR: [
          { id: slug },
          // Uncomment if you have a slug field
          // { slug: slug }
        ]
      },
      include: {
        // Count the number of mystery boxes
        _count: {
          select: {
            mysteryBoxes: true
          }
        }
      }
    });
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    // Format the response
    const formattedCategory = {
      id: category.id,
      name: category.name,
      description: category.description,
      totalItems: category._count.mysteryBoxes,
      // Add any other fields you need
    };
    
    return NextResponse.json(formattedCategory);
  } catch (error) {
    console.error('Failed to fetch category:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}