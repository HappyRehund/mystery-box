"use client";

import { useState } from "react";
import Image from "next/image";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QuantitySelector from "./QuantitySelector";
import { formatCurrency } from "@/lib/utils";

interface MysteryBoxDetailProps {
  mysteryBox: {
    id: string;
    name: string;
    description?: string;
    price: number;
    imageUrl?: string;
    category: {
      id: string;
      name: string;
    };
    contents?: {
      description: string;
      probabilityRange: string;
    }[];
    details?: {
      [key: string]: string;
    };
  };
}

export default function MysteryBoxDetail({ mysteryBox }: MysteryBoxDetailProps) {
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    // Add to cart logic would go here
    console.log(`Adding ${quantity} of ${mysteryBox.id} to cart`);
    
    // Show success toast
    toast.success(`Added ${quantity} ${mysteryBox.name} to your cart!`, {
      description: `Total: ${formatCurrency(mysteryBox.price * quantity)}`,
      action: {
        label: "View Cart",
        onClick: () => {
          // Navigate to cart page
          window.location.href = "/cart";
        },
      },
    });
  };
  
  return (
    <>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden rounded-lg border bg-background">
          <Image
            src={mysteryBox.imageUrl || "/images/tablet-box.webp"}
            alt={mysteryBox.name}
            fill
            className="object-cover"
          />
        </div>
        
        {/* Details Section */}
        <div className="flex flex-col">
          <div className="mb-2">
            <Badge variant="secondary">{mysteryBox.category.name}</Badge>
          </div>
          
          <h1 className="text-3xl font-bold">{mysteryBox.name}</h1>
          
          <div className="mt-4 text-2xl font-semibold text-primary">
            {formatCurrency(mysteryBox.price)}
          </div>
          
          {mysteryBox.description && (
            <p className="mt-6 text-muted-foreground">
              {mysteryBox.description}
            </p>
          )}
          
          {/* Product Details */}
          {mysteryBox.details && Object.keys(mysteryBox.details).length > 0 && (
            <div className="mt-6 border-t pt-6">
              <h3 className="font-medium mb-3">Details</h3>
              <div className="grid grid-cols-1 gap-2">
                {Object.entries(mysteryBox.details).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{key}</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Add to cart section */}
          <div className="mt-8 border-t pt-6">
            <div className="flex items-center gap-4">
              <QuantitySelector
                quantity={quantity}
                onDecrement={() => quantity > 1 && setQuantity(quantity - 1)}
                onIncrement={() => setQuantity(quantity + 1)}
              />
              
              <Button 
                className="flex-1" 
                size="lg" 
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contents section */}
      {mysteryBox.contents && mysteryBox.contents.length > 0 && (
        <Card className="mt-12 p-6">
          <h2 className="text-xl font-bold mb-4">Possible Contents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mysteryBox.contents.map((item, index) => (
              <div 
                key={index} 
                className="p-4 border rounded-md"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-semibold">Item {index + 1}</h3>
                  <Badge variant="outline">{item.probabilityRange}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}