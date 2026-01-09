"use client";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import AddCategory from "../addCategory";
import CategoryCard from "../category-card";
import PageHeader from "../../shared/pageHeader";
import { Input } from "@/components/ui/input";

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
    <div className="min-h-screen w-full ">
      <div className="flex items-center justify-between mb-6">
        <PageHeader title="All Category" description="Browse and manage All Category" />
        <div>
          <AddCategory />
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-3">
          <div className="relative mb-4.5">
            <Input
              icon={<Search />}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search in category"
            />
          </div>
          <div className="space-y-3">
            {filteredParents.map((p) => {
              const active = current.id === p.id;
              return (
                <div
                  key={p.id}
                  className="w-[260px] rounded-[12px] effect cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <button
                    onClick={() => setCurrent(p)}
                    className={cn(
                      "w-[260px] relative cursor-pointer flex items-center gap-6 rounded-xl p-4 text-left overflow-hidden "
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
                    <div
                      className="flex items-center justify-center cursor-pointer effect rounded-[12px] overflow-hidden bg-transparent!"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className=" w-24 h-24 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{p.name}</div>
                    </div>
                  </button>
                </div>
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
