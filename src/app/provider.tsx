// app/providers.tsx
'use client';

import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/lib/cart-context";
import { Toaster } from "@/components/ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider afterSignOutUrl={"/sign-in"}>
      <CartProvider>
        {children}
        <Toaster />
      </CartProvider>
    </ClerkProvider>
  );
}