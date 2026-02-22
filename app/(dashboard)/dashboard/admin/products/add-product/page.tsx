import AddProduct from "@/components/pages/dashboard/products/addProduct/addProduct";
import { getAllCategories } from "@/service/category";


export default async function page() {
  const categories = await getAllCategories();
  return (
    <div>
      <AddProduct categories={categories.data} />
    </div>
  )
}