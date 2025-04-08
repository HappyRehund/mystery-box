// lib/auth.ts
import { getAuth } from '@clerk/nextjs/server';
import prisma from './prisma';
import { NextRequest } from 'next/server';

export async function getCurrentUser(req: NextRequest) {
  const { userId } = getAuth(req);
  
  if (!userId) {
    return null;
  }

  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export async function requireAuth(req: NextRequest) {
  const user = await getCurrentUser(req);
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}