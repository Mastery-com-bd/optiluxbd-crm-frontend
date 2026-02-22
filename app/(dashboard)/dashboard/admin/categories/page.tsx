import AllCategories from "@/components/pages/dashboard/categories/all/all-categories";
import { getAllCategories } from "@/service/category";
import { Query, TSearchParams } from "@/types/shared";

const AllCategoryPage = async ({
  searchParams,
}: {
  searchParams: TSearchParams;
}) => {
  const query = await searchParams;
  const result = await getAllCategories(query as Query);
  const categories = result?.data || [];
  return (
    <div className=" items-center justify-center min-h-screen my-10">
      <AllCategories categories={categories} />
    </div>
  );
};

export default AllCategoryPage;
