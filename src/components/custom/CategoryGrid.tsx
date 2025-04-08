// components/custom/CategoryGrid.tsx
"use client";

import { useState, useEffect } from "react";
import CategoryCard from "./CategoryCard";

interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError("Failed to load categories. Please try again later.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 animate-pulse">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="h-64 bg-muted rounded-lg"></div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div className="text-destructive text-center py-8">{error}</div>;
  }

  if (categories.length === 0) {
    return <div className="text-muted-foreground text-center py-8">No categories found.</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {categories.map((category) => (
        <CategoryCard 
          key={category.id} 
          id={category.id} 
          name={category.name} 
          description={category.description}
        />
      ))}
    </div>
  );
}