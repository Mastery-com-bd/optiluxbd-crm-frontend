import { Search } from "lucide-react"
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";

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
]

export function CategoryGrid() {
  return (
    <div className="space-y-6 w-full  mt-10">
      {/* Header with search and link */}
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search In category"
            className="bg-[#1a1a2e]/80 text-gray-300 placeholder-gray-500 rounded-full pl-11 pr-6 py-3 w-[280px] md:w-[400px] border-0 outline-none focus:ring-1 focus:ring-purple-500/50"
          />
        </div>
        <button className="relative text-white font-medium">
          See all Category
          <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-linear-to-r from-orange-500 to-amber-500 rounded-full" />
        </button>
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
  )
}

function CategoryCard({ category }: { category: { id: number; name: string; image: string } }) {
  return (
    <LiquidGlass borderRadius="12px" shadowIntensity="xxs" className="rounded-2xl p-6 cursor-pointer hover:scale-[1.02] transition-transform">
      {/* Inner bordered image container */}
      <LiquidGlass borderRadius="12px" shadowIntensity="xxs" className="border border-gray-700/50 rounded-xl p-6 flex items-center justify-center min-h-[140px] bg-white/10">
        <img src={category.image || "/placeholder.svg"} alt={category.name} className="h-24 w-24 object-contain" />
      </LiquidGlass>
      {/* Category name */}
      <h3 className="text-white font-semibold text-center mt-4">{category.name}</h3>
    </LiquidGlass>
  )
}
