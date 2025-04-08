// components/custom/CartSummary.tsx
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import Link from "next/link";

interface CartSummaryProps {
  subtotal: number;
  itemCount: number;
}

export default function CartSummary({ subtotal, itemCount }: CartSummaryProps) {
  // Example shipping calculation (free if over $100)
  const shipping = subtotal >= 100 ? 0 : 8.99;
  
  // Example tax calculation (10%)
  const tax = subtotal * 0.1;
  
  // Total
  const total = subtotal + shipping + tax;

  return (
    <Card className="border-border">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Estimated Tax</span>
          <span>{formatCurrency(tax)}</span>
        </div>
        <div className="border-t border-border pt-4 flex justify-between font-semibold">
          <span>Total</span>
          <span>{formatCurrency(total)}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href="/checkout" className="w-full">
          <Button size="lg" className="w-full">
            Proceed to Checkout
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}