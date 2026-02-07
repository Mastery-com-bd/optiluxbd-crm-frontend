
import AllProductHeaderOverview from "@/components/pages/dashboard/products/allProduct/AllProductHeaderOverview";
import AllProducts from "@/components/pages/dashboard/products/allProduct/allProducts";
import { fetchProducts } from "@/service/productService";
import React from "react";

const Page: React.FC = async () => {
  const allData = await fetchProducts();
  console.log(allData);

  return (
    <div className="">
      <AllProductHeaderOverview />
      <AllProducts />
    </div>
  );
};

export default Page;