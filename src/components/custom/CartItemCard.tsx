// components/custom/CartItemCard.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import QuantitySelector from "@/components/custom/QuantitySelector";

interface CartItemCardProps {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItemCard({
  id,
  name,
  price,
  quantity,
  imageUrl,
  onUpdateQuantity,
  onRemove,
}: CartItemCardProps) {
  const handleIncrement = () => {
    onUpdateQuantity(id, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onUpdateQuantity(id, quantity - 1);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start border-b border-border py-6">
      <div className="relative h-32 w-32 flex-shrink-0 rounded-md overflow-hidden">
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover"
        />
      </div>
      
      <div className="flex-grow mt-4 md:mt-0 md:ml-6 flex flex-col">
        <div className="flex justify-between items-start">
          <Link href={`/mystery-box/${id}`} className="hover:text-primary">
            <h3 className="text-lg font-medium">{name}</h3>
          </Link>
          <span className="font-semibold text-lg">
            {formatCurrency(price)}
          </span>
        </div>
        
        <div className="mt-4 flex items-center justify-between">
          <QuantitySelector 
            quantity={quantity}
            onIncrement={handleIncrement}
            onDecrement={handleDecrement}
          />
          
          <Button 
            variant="ghost" 
            size="sm"
            className="text-muted-foreground hover:text-destructive"
            onClick={() => onRemove(id)}
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
        
        <div className="mt-4 text-sm text-right text-muted-foreground">
          Item total: <span className="font-medium text-foreground">{formatCurrency(price * quantity)}</span>
        </div>
      </div>
    </div>
  );
}