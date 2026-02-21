import { CategoryGrid } from "@/components/pages/dashboard/categories/category-grid";
import { Query, TSearchParams } from "@/types/shared";
import { getAllCategories } from "@/service/category";

const OverviewPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const result = await getAllCategories(query as Query);
  const categories = result?.data || [];

  return (
    <section className=" items-center justify-center min-h-screen my-10">
      <CategoryGrid categories={categories} />
    </section>
  );
};

export default OverviewPage;
