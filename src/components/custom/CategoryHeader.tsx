import React from "react";
import { Badge } from "@/components/ui/badge";

interface CategoryHeaderProps {
  category: {
    id: string;
    name: string;
    description?: string;
    totalItems?: number;
  };
}

export default function CategoryHeader({ category }: CategoryHeaderProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight">{category.name}</h1>
        {category.totalItems && (
          <Badge variant="secondary" className="px-2 py-1">
            {category.totalItems} items
          </Badge>
        )}
      </div>
      {category.description && (
        <p className="text-muted-foreground">{category.description}</p>
      )}
    </div>
  );
}