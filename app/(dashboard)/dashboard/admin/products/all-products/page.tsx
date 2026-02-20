import AllProductHeaderOverview from "@/components/pages/dashboard/products/allProduct/AllProductHeaderOverview";
import AllProducts from "@/components/pages/dashboard/products/allProduct/allProducts";
import { getSubCategories } from "@/service/category";
import { getAllProducts } from "@/service/product-service/product.service";
import { Query, TSearchParams } from "@/types/shared";
import React from "react";

const Page: React.FC = async ({ searchParams }: { searchParams?: TSearchParams }) => {
  const query = await searchParams;
  // const [products, subCategories] = await Promise.all([getAllProducts(query as Query), getSubCategories()]);
  const products = await getAllProducts(query as Query);
  const subCategories = await getSubCategories();
  console.log("products->> ",products)

  return (
    <div className="">
      <AllProductHeaderOverview />
      <AllProducts products={products?.data?.products} pagination={products.pagination} subCategories={subCategories?.data || []} />
    </div>
  );
};

export default Page;