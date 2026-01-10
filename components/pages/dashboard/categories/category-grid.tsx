import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
import { Input } from "@/components/ui/input";
import { Eye, Search } from "lucide-react";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Fashion Categories",
    image: "/category1.png",
  },
  {
    id: 2,
    name: "Electronics Headphone",
    image: "/category2.png",
  },
  {
    id: 3,
    name: "Foot Wares",
    image: "/category1.png",
  },
  {
    id: 4,
    name: "Eye Ware & Sunglass",
    image: "/category2.png",
  },
];

export function CategoryGrid() {
  return (
    <div className="space-y-6 w-full  mt-10">
      {/* Header with search and link */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Input
            icon={<Search className="w-4 h-4" />}
            type="text"
            placeholder="Search In category"
            className=""
          />
        </div>
        <Link href={"/dashboard/categories/all"} className="relative">
          <div className="relative">
            <ButtonComponent
              buttonName="See all Category"
              varient="purple"
              clasName="p-[12px]"
            />
          </div>
        </Link>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* First row */}
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
        {/* Second row - same categories */}
        {categories.map((category) => (
          <CategoryCard key={`row2-${category.id}`} category={category} />
        ))}
      </div>
    </div>
  );
}

function CategoryCard({
  category,
}: {
  category: { id: number; name: string; image: string };
}) {
  return (
    <div
      className="effectBlack p-6 cursor-pointer hover:scale-[1.02] transition-transform rounded-xl"
    >
      {/* Inner bordered image container */}
      <div className="effectBlack flex justify-center items-center min-h-24 rounded-xl">
        <img
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          className="h-24 w-24 object-contain"
        />
      </div>
      {/* Category name */}
      <h3 className="text-white font-semibold text-center mt-4">
        {category.name}
      </h3>
    </div>
  );
}
