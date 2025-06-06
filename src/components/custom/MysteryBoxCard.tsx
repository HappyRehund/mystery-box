// components/custom/MysteryBoxCard.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

interface MysteryBoxCardProps {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  categoryName?: string;
  onAddToCart: () => void;
}

export default function MysteryBoxCard({
  id,
  name,
  description,
  price,
  imageUrl = "/images/tablet-box.webp",
  categoryName,
}: MysteryBoxCardProps) {
  const { addItem, isLoading } = useCart();

  const handleAddToCart = async () => {
    await addItem(id);
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <Link href={`/mystery-box/${id}`} className="relative h-48 w-full">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover"
        />
      </Link>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/mystery-box/${id}`}>
            <h3 className="font-semibold text-foreground hover:text-primary">{name}</h3>
          </Link>
          <span className="font-bold text-primary">{formatCurrency(price)}</span>
        </div>
        {categoryName && (
          <Badge variant="secondary" className="mb-2">
            {categoryName}
          </Badge>
        )}
        {description && (
          <p className="text-sm text-muted-foreground mt-1 line-clamp-3">{description}</p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          className="w-full"
          variant="default"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}