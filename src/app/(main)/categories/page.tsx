import CategoryGrid from "@/components/custom/CategoryGrid";
import React, { Suspense } from "react";

function page() {
  return (
    <div className="max-w-7xl my-20 mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8">Shop by Category</h2>
      <Suspense fallback={<div>Loading categories...</div>}>
        <CategoryGrid />
      </Suspense>
    </div>
  );
}

export default page;
