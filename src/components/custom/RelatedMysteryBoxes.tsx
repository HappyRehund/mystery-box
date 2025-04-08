"use client";

import { useState, useEffect } from "react";
import MysteryBoxCard from "./MysteryBoxCard";
import { toast } from "sonner";

interface MysteryBox {
  id: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category: {
    id: string;
    name: string;
  };
}

interface RelatedMysteryBoxesProps {
  currentBoxId: string;
  categoryId: string;
  limit?: number;
}

export default function RelatedMysteryBoxes({
  currentBoxId,
  categoryId,
  limit = 4,
}: RelatedMysteryBoxesProps) {
  const [relatedBoxes, setRelatedBoxes] = useState<MysteryBox[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRelatedBoxes = async () => {
      try {
        const params = new URLSearchParams({
          category_id: categoryId,
          limit: limit.toString(),
          exclude_id: currentBoxId,
        });
        
        const response = await fetch(`/api/mystery-boxes?${params.toString()}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch related mystery boxes");
        }
        
        const data = await response.json();
        setRelatedBoxes(data);
      } catch (err) {
        setError("Failed to load related items");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchRelatedBoxes();
  }, [categoryId, currentBoxId, limit]);

  const handleAddToCart = () => {
    // Add to cart logic would go here
    
    // Show success toast
    toast.success(`Added to your cart!`, {
      action: {
        label: "View Cart",
        onClick: () => {
          // Navigate to cart page
          window.location.href = "/cart";
        },
      },
    });
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        {[...Array(limit)].map((_, index) => (
          <div key={index} className="h-80 bg-muted rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive text-center py-8">{error}</div>;
  }

  if (relatedBoxes.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {relatedBoxes.map((box) => (
        <MysteryBoxCard
          key={box.id}
          id={box.id}
          name={box.name}
          description={box.description}
          price={box.price}
          imageUrl={box.imageUrl}
          categoryName={box.category.name}
          onAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
}