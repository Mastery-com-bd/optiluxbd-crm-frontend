import ProductCardV2 from "@/components/pages/dashboard/products/productCardV2";
import PageHeader from "@/components/pages/dashboard/shared/pageHeader";
import React from "react";

const Page = () => {
  return (
    <div className="w-full max-w-[1131px] mx-auto space-y-8">
      <div>
        <PageHeader
          title="All Products"
          description="Browse and manage All Products"
        />
      </div>
      <div className="grid grid-cols-3 gap-5">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index}>
            <ProductCardV2 />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
