"use client";
import React, { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Search, Plus, Image as ImageIcon, ChevronDown, X } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
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
  const [categoryImage, setCategoryImage] = useState<File | null>(null);

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

        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-xl"
            >
              <Plus className="size-4" />
              Create New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-0 overflow-hidden">
            <div className="p-6 space-y-3">
              <DialogHeader className="px-0 pt-0 text-left">
                <DialogTitle className="text-xl font-semibold text-white">
                  Add New Category
                </DialogTitle>
              </DialogHeader>

              {/* Category Name */}
              <div className="space-y-2 mt-3">
                <span className="text-[16px] font-normal text-white mb-4">
                  Category Name
                </span>
                <div className="relative mt-1.5">
                  <input
                    placeholder="Enter Category name"
                    className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                  />
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-white/50" />
                </div>
              </div>

              {/* Category Image */}
              <div className="space-y-2">
                <label className="text-[16px] font-normal text-white">
                  Category Image
                </label>
                <div
                  className={`relative flex flex-col items-center justify-center border border-dashed border-white rounded-2xl ${
                    categoryImage ? "py-3" : "py-6"
                  } bg-white/20 text-center mt-1.5 cursor-pointer hover:bg-white/25 transition-colors`}
                  onClick={() => {
                    const input = document.createElement("input");
                    input.type = "file";
                    input.accept = "image/png, image/jpeg";
                    input.onchange = (e) => {
                      const file = (e.target as HTMLInputElement).files?.[0];
                      if (file) {
                        setCategoryImage(file);
                      }
                    };
                    input.click();
                  }}
                >
                  {categoryImage ? (
                    <div>
                      <span
                        className="absolute top-3 right-3 border border-white p-1 rounded-full bg-rose-500 cursor-pointer z-50"
                        onClick={() => setCategoryImage(null)}
                      >
                        <X className="w-4 h-4 text-white" />
                      </span>
                      <img
                        src={URL.createObjectURL(categoryImage)}
                        alt="Category preview"
                        className="w-32 h-32 object-cover rounded-xl mb-3"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="size-10 rounded-full bg-white/5 flex items-center justify-center mb-3 border border-white/10">
                        <ImageIcon className="size-5 text-white/70" />
                      </div>
                      <p className="text-sm text-white/90 mb-1">
                        Upload your Category image.
                      </p>
                      <p className="text-[10px] text-white/40">
                        Only PNG, JPG format allowed.
                      </p>
                      <p className="text-[10px] text-white/40">
                        500x500 pixels are recommended.
                      </p>
                    </>
                  )}
                </div>
              </div>

              {/* Sub Category Name */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-[16px] font-normal text-white">
                    Sub Category Name
                  </label>
                  <button className="size-6 rounded-md bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors border border-white/10">
                    <Plus className="size-4 text-white/70" />
                  </button>
                </div>

                <div className="space-y-3 -mt-1.5">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex gap-3">
                      <div className="relative flex-1">
                        <input
                          placeholder="Enter Category name"
                          className="w-full h-11 rounded-xl bg-white/5 border border-white/10 px-4 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
                        />
                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-white/50" />
                      </div>
                      <div className="w-[88px] h-11 border border-dashed border-white rounded-xl flex flex-col items-center justify-center gap-0.5 cursor-pointer">
                        <ImageIcon className="size-3 text-white" />
                        <span className="text-[8px] text-white">
                          Upload Img
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-2">
                <DialogClose>
                  <Button
                    asChild
                    variant="outline"
                    className=" h-11 rounded-xl bg-none bg-transparent text-white hover:bg-white/5 hover:text-white"
                  >
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  style={{
                    backgroundImage: "url('/svg/button-background.svg')",
                  }}
                  className="w-[142px] h-12 rounded-xl bg-transparent"
                >
                  Add
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                            fill-opacity="0.4"
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
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
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
              <CategoryCard
                key={c.id}
                category={{
                  id: Number(c.id),
                  name: c.name,
                  image: c.image,
                }}
              />
            ))}
            {current.children.map((c) => (
              <CategoryCard
                key={c.id}
                category={{
                  id: Number(c.id),
                  name: c.name,
                  image: c.image,
                }}
              />
            ))}
            {current.children.map((c) => (
              <CategoryCard
                key={c.id}
                category={{
                  id: Number(c.id),
                  name: c.name,
                  image: c.image,
                }}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllCategories;
