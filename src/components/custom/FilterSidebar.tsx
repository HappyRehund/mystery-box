"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FilterOption {
  id: string;
  name: string;
  value: string;
}

interface PriceRange {
  min: number;
  max: number;
}

interface FilterSidebarProps {
  categoryId: string;
}

export default function FilterSidebar({ categoryId }: FilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [priceRanges, setPriceRanges] = useState<PriceRange[]>([
    { min: 0, max: 50 },
    { min: 50, max: 100 },
    { min: 100, max: 200 },
    { min: 200, max: 500 },
    { min: 500, max: 1000 },
  ]);
  
  const [sortOptions] = useState<FilterOption[]>([
    { id: "price-asc", name: "Price: Low to High", value: "price-asc" },
    { id: "price-desc", name: "Price: High to Low", value: "price-desc" },
    { id: "newest", name: "Newest", value: "newest" },
    { id: "popular", name: "Most Popular", value: "popular" },
  ]);
  
  const activeFilter = searchParams.get("filter") || "";
  
  const handleFilterChange = (filter: string) => {
    // Create a URL with the new filter and reset pagination
    const params = new URLSearchParams(searchParams);
    if (filter) {
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }
    params.delete("page"); // Reset to first page when filter changes
    
    router.push(`?${params.toString()}`);
  };
  
  const handlePriceRangeSelect = (min: number, max: number) => {
    handleFilterChange(`price-${min}-${max}`);
  };
  
  const handleSortSelect = (value: string) => {
    handleFilterChange(value);
  };
  
  const handleClearFilters = () => {
    router.push("");
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {sortOptions.map((option) => (
              <div
                key={option.id}
                className={`px-3 py-2 text-sm rounded-md cursor-pointer transition-colors ${
                  activeFilter === option.value
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
                onClick={() => handleSortSelect(option.value)}
              >
                {option.name}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            {priceRanges.map((range, index) => (
              <div
                key={index}
                className={`px-3 py-2 text-sm rounded-md cursor-pointer transition-colors ${
                  activeFilter === `price-${range.min}-${range.max}`
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
                onClick={() => handlePriceRangeSelect(range.min, range.max)}
              >
                ${range.min} - ${range.max}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={handleClearFilters}
      >
        Clear Filters
      </Button>
    </div>
  );
}