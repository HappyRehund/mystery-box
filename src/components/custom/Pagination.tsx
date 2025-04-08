"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  categorySlug: string;
  filter?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  categorySlug,
  filter,
}: PaginationProps) {
  // Create URL with current params
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    
    if (filter) {
      params.set("filter", filter);
    }
    
    return `/${categorySlug}?${params.toString()}`;
  };
  
  // Determine which page numbers to show
  const getPageNumbers = () => {
    const pages = [];
    
    // Always include first page
    pages.push(1);
    
    // Add current page and surrounding pages
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }
    
    // Always include last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    // Add ellipsis indicators
    const withEllipsis = [];
    let prev = 0;
    
    for (const page of pages) {
      if (page - prev > 1) {
        withEllipsis.push("...");
      }
      withEllipsis.push(page);
      prev = page;
    }
    
    return withEllipsis;
  };
  
  const pageNumbers = getPageNumbers();
  
  if (totalPages <= 1) {
    return null;
  }
  
  return (
    <div className="flex justify-center items-center gap-1 mt-6">
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage === 1}
      >
        <Link href={currentPage > 1 ? createPageUrl(currentPage - 1) : "#"}>
          <span className="sr-only">Previous page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
      </Button>
      
      <div className="flex items-center gap-1">
        {pageNumbers.map((page, i) => {
          if (page === "...") {
            return (
              <span key={`ellipsis-${i}`} className="px-3 py-2 text-sm">
                &#8230;
              </span>
            );
          }
          
          const pageNum = page as number;
          
          return (
            <Button
              key={`page-${pageNum}`}
              variant={currentPage === pageNum ? "default" : "outline"}
              size="icon"
              asChild
            >
              <Link href={createPageUrl(pageNum)}>
                <span className="w-8 h-8 flex items-center justify-center">
                  {pageNum}
                </span>
              </Link>
            </Button>
          );
        })}
      </div>
      
      <Button
        variant="outline"
        size="icon"
        asChild
        disabled={currentPage === totalPages}
      >
        <Link href={currentPage < totalPages ? createPageUrl(currentPage + 1) : "#"}>
          <span className="sr-only">Next page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </Link>
      </Button>
    </div>
  );
}