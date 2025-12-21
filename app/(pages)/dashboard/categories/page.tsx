import { CategoryOverview } from "@/components/pages/dashboard/categories/categories-dashboard";
import { CategoryGrid } from "@/components/pages/dashboard/categories/category-grid";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <CategoryOverview />
      <CategoryGrid />
    </div>
  );
};

export default Page;
