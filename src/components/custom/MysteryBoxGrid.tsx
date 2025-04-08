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

interface MysteryBoxGridProps {
  categoryId?: string;
  filter?: string;
}

export default function MysteryBoxGrid({ categoryId, filter }: MysteryBoxGridProps) {
  const [mysteryBoxes, setMysteryBoxes] = useState<MysteryBox[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMysteryBoxes = async () => {
      setIsLoading(true);
      try {
        // Create URL with searchParams
        const params = new URLSearchParams();
        
        if (categoryId) {
          params.append("category_id", categoryId);
        }
        
        // Parse filter
        if (filter) {
          if (filter.startsWith("price-")) {
            // Extract price range filter
            if (filter.startsWith("price-") && !["price-asc", "price-desc"].includes(filter)) {
              const [_, min, max] = filter.split("-");
              params.append("min_price", min);
              params.append("max_price", max);
            } else if (filter === "price-asc") {
              params.append("sort", "price");
              params.append("order", "asc");
            } else if (filter === "price-desc") {
              params.append("sort", "price");
              params.append("order", "desc");
            }
          } else if (filter === "newest") {
            params.append("sort", "created_at");
            params.append("order", "desc");
          } else if (filter === "popular") {
            params.append("sort", "popularity");
            params.append("order", "desc");
          }
        }
        
        const url = `/api/mystery-boxes?${params.toString()}`;
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch mystery boxes");
        }
        const data = await response.json();
        setMysteryBoxes(data);
      } catch (err) {
        setError("Failed to load mystery boxes. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchMysteryBoxes();
  }, [categoryId, filter]);

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
        {[...Array(8)].map((_, index) => (
          <div key={index} className="h-80 bg-muted rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive text-center py-8">{error}</div>;
  }

  if (mysteryBoxes.length === 0) {
    return <div className="text-muted-foreground text-center py-8">No mystery boxes found.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {mysteryBoxes.map((box) => (
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