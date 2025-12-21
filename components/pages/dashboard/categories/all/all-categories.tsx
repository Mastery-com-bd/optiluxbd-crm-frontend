"use client";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import AddCategory from "../addCategory";
import CategoryCard from "../category-card";

type Child = { id: string; name: string; image: string };
type Parent = {
  id: string;
  name: string;
  image: string;
  children: Child[];
};

const CATEGORIES: Parent[] = [
  {
    id: "fashion",
    name: "Fashion Categories",
    image: "/category1.png",
    children: [
      {
        id: "electronics-headphone",
        name: "T-Shart",
        image: "/category2.png",
      },
      {
        id: "foot-wares",
        name: "Eye Ware &Sunglass",
        image: "/category3.png",
      },
      {
        id: "eye-ware",
        name: "Foot Ware",
        image: "/category4.png",
      },
    ],
  },
  {
    id: "electronics",
    name: "Electronics",
    image: "/category2.png",
    children: [
      {
        id: "headphone",
        name: "Electronics Headphone",
        image: "/category1.png",
      },
      {
        id: "camera",
        name: "Cameras",
        image: "/category3.png",
      },
      {
        id: "wearable",
        name: "Wearables",
        image: "/category4.png",
      },
    ],
  },
  {
    id: "footwear",
    name: "Footwear",
    image: "/category3.png",
    children: [
      {
        id: "sneakers",
        name: "Sneakers",
        image: "/category1.png",
      },
      {
        id: "sandals",
        name: "Sandals",
        image: "/category2.png",
      },
      {
        id: "boots",
        name: "Boots",
        image: "/category3.png",
      },
    ],
  },
];

const AllCategories = () => {
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState<Parent>(CATEGORIES[0]);

  const filteredParents = useMemo(() => {
    const q = query.toLowerCase();
    return CATEGORIES.filter((p) => p.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="min-h-screen w-full p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-[32px] font-semibold">All Category</h1>
          <p className="text-[16px] font-normal text-[#A1A1A1]">
            Browse all categories & subcategories
          </p>
        </div>
        <div>
          <AddCategory />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-3">
          <div className="relative mb-4.5">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search in category"
              className="w-full rounded-xl border border-white/20 bg-white/10 px-10 py-2 text-sm backdrop-blur-xl placeholder:text-white/70 focus-visible:ring-2"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/70" />
          </div>
          <div className="space-y-3">
            {filteredParents.map((p) => {
              const active = current.id === p.id;
              return (
                <LiquidGlass
                  key={p.id}
                  borderRadius="12px"
                  shadowIntensity="xxs"
                  className="cursor-pointer w-[260px]"
                >
                  <button
                    onClick={() => setCurrent(p)}
                    className={cn(
                      "w-[260px] relative flex items-center gap-6 rounded-xl p-4 text-left overflow-hidden"
                    )}
                  >
                    {active && (
                      <svg
                        width="261"
                        height="125"
                        viewBox="0 0 261 125"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-full object-cover -z-10"
                      >
                        <g filter="url(#filter0_f_758_11327)">
                          <ellipse
                            cx="130.5"
                            cy="108"
                            rx="130.5"
                            ry="44"
                            fill="#FFB13F"
                            fillOpacity="0.4"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_f_758_11327"
                            x="-100"
                            y="-36"
                            width="461"
                            height="288"
                            filterUnits="userSpaceOnUse"
                            colorInterpolationFilters="sRGB"
                          >
                            <feFlood
                              floodOpacity="0"
                              result="BackgroundImageFix"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="BackgroundImageFix"
                              result="shape"
                            />
                            <feGaussianBlur
                              stdDeviation="50"
                              result="effect1_foregroundBlur_758_11327"
                            />
                          </filter>
                        </defs>
                      </svg>
                    )}
                    <LiquidGlass
                      borderRadius="12px"
                      shadowIntensity="xxs"
                      className="flex items-center justify-center "
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className=" w-24 h-24 object-contain"
                      />
                    </LiquidGlass>
                    <div className="flex-1">
                      <div className="font-medium">{p.name}</div>
                    </div>
                  </button>
                </LiquidGlass>
              );
            })}
          </div>
        </aside>

        {/* Content */}
        <section className="col-span-9">
          <h2 className="text-[28px] font-semibold mb-4">Sub Categories</h2>
          <div className="grid grid-cols-3 gap-5">
            {current.children.map((c) => (
              <Link href={`/dashboard/categories/products`} key={c.id}>
                <CategoryCard
                  category={{
                    id: Number(c.id),
                    name: c.name,
                    image: c.image,
                  }}
                />
              </Link>
            ))}
            {current.children.map((c) => (
              <Link href={`/dashboard/categories/products`} key={c.id}>
                <CategoryCard
                  category={{
                    id: Number(c.id),
                    name: c.name,
                    image: c.image,
                  }}
                />
              </Link>
            ))}
            {current.children.map((c) => (
              <Link href={`/dashboard/categories/products`} key={c.id}>
                <CategoryCard
                  category={{
                    id: Number(c.id),
                    name: c.name,
                    image: c.image,
                  }}
                />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllCategories;
