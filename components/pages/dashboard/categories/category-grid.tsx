import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
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
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            icon={<Search className="w-4 h-4" />}
            type="text"
            placeholder="Search In category"
            className=" text-gray-300 placeholder-gray-500 w-[280px] outline-none"
          />
        </div>
        <Link href={"/dashboard/categories/all"} className="relative">
          <div className="relative">
            <LiquidGlass
              glowIntensity="none"
              borderRadius="10px"
              className="w-fit"
            >
              <Button
                style={{
                  backgroundImage: "url('/svg/button-pink-background.svg')",
                  backgroundSize: "cover",
                }}
                className="rounded-xl bg-transparent border-none"
              >
                See all Category
              </Button>
              <div className="w-full absolute bottom-0 left-1/2 -translate-x-1/2 bg-linear-to-r from-transparent via-[#AA00FF] to-transparent h-[1.5px]" />
            </LiquidGlass>
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
    <LiquidGlass
      borderRadius="12px"
      shadowIntensity="xxs"
      className="rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform"
    >
      {/* Inner bordered image container */}
      <LiquidGlass
        borderRadius="12px"
        shadowIntensity="xxs"
        className="border border-gray-700/50 rounded-xl p-6 flex items-center justify-center min-h-[140px] bg-white/10"
      >
        <img
          src={category.image || "/placeholder.svg"}
          alt={category.name}
          className="h-24 w-24 object-contain"
        />
      </LiquidGlass>
      {/* Category name */}
      <h3 className="text-white font-semibold text-center mt-4">
        {category.name}
      </h3>
    </LiquidGlass>
  );
}
