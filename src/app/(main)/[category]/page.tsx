import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryHeader from "@/components/custom/CategoryHeader";
import FilterSidebar from "@/components/custom/FilterSidebar";
import MysteryBoxGrid from "@/components/custom/MysteryBoxGrid";
import Pagination from "@/components/custom/Pagination";

interface CategoryPageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{
    page?: string;
    filter?: string;
  }>;
}

async function getCategoryInfo(slug: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories/${slug}`);
   
    if (!res.ok) {
      return null;
    }
   
    return res.json();
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  // Await kedua params dan searchParams
  const { category } = await params;
  const { page, filter: activeFilter = "" } = await searchParams;
  
  const categoryInfo = await getCategoryInfo(category);
 
  if (!categoryInfo) {
    notFound();
  }
 
  const currentPage = page ? parseInt(page) : 1;
 
  return (
    <div className="container mx-auto py-8 px-4">
      <CategoryHeader category={categoryInfo} />
     
      <div className="flex flex-col lg:flex-row gap-6 mt-8">
        <div className="w-full lg:w-64 flex-shrink-0">
          <FilterSidebar categoryId={categoryInfo.id} />
        </div>
       
        <div className="flex-grow">
          <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-pulse">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-80 bg-muted rounded-lg"></div>
            ))}
          </div>}>
            <MysteryBoxGrid categoryId={categoryInfo.id} filter={activeFilter} />
          </Suspense>
         
          <div className="mt-12">
            <Pagination
              currentPage={currentPage}
              totalPages={10}
              categorySlug={category}
              filter={activeFilter}
            />
          </div>
        </div>
      </div>
    </div>
  );
}