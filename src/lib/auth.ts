// lib/auth.ts
import { getAuth } from '@clerk/nextjs/server';
import prisma from './prisma';
import { NextRequest } from 'next/server';

export async function getCurrentUser(req: NextRequest) {
  const auth = getAuth(req);
  const { userId } = auth;
  
  if (!userId) {
    return null;
  }
  
  // Coba temukan user di database
  let user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  
  // Jika user tidak ada di database tapi terautentikasi dengan Clerk, buat user baru
  if (!user && userId) {
    try {
      // Dapatkan informasi email dari Clerk session
      const email = auth.sessionClaims?.email as string;
      const name = auth.sessionClaims?.name as string || null;
      
      if (!email) {
        console.error("Cannot create user: No email available from Clerk session");
        return null;
      }
      
      // Buat user baru di database
      user = await prisma.user.create({
        data: {
          id: userId,
          email: email,
          name: name,
        },
      });
      
      console.log(`Created new user in database: ${userId}`);
    } catch (error) {
      console.error("Failed to create user in database:", error);
      return null;
    }
  }
  
  return user;
}

export async function requireAuth(req: NextRequest) {
  const user = await getCurrentUser(req);
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}