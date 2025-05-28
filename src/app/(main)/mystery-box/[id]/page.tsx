import { notFound } from "next/navigation";
import { Suspense } from "react";
import RelatedMysteryBoxes from "@/components/custom/RelatedMysteryBoxes";
import MysteryBoxDetail from "@/components/custom/MysteryBoxDetail";


async function getMysteryBox(id: string) {
  try {
    const res = await fetch(`${process.env.API_URL}/api/mystery-boxes/${id}`);
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching mystery box:", error);
    return null;
  }
}

export default async function MysteryBoxPage({ params }: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  const mysteryBox = await getMysteryBox(id);
  
  if (!mysteryBox) {
    notFound();
  }
  
  return (
    <div className="container mx-auto py-8 px-4">
      <MysteryBoxDetail mysteryBox={mysteryBox} />
      
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <Suspense fallback={<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
          {[...Array(4)].map((_, index) => (
            <div key={index} className="h-80 bg-muted rounded-lg"></div>
          ))}
        </div>}>
          <RelatedMysteryBoxes 
            currentBoxId={mysteryBox.id} 
            categoryId={mysteryBox.category.id} 
          />
        </Suspense>
      </div>
    </div>
  );
}