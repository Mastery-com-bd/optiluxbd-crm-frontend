"use client";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import AddCategory from "../addCategory";
import CategoryCard from "../category-card";
import PageHeader from "../../shared/pageHeader";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { TCategories } from "@/types/category.type";
import ActiveIcon from "@/components/svgIcon/ActiveIcon";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

type TCategoryPageProps = {
  categories: TCategories[];
};

const AllCategories = ({ categories }: TCategoryPageProps) => {
  const [query, setQuery] = useState("");
  const [current, setCurrent] = useState<TCategories>(categories[0]);

  console.log(categories);

  return (
    <div className="min-h-screen w-full space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <PageHeader
            title="All Category"
            description="Browse and manage All Category"
          />
        </div>
        <div className="flex items-center justify-end gap-3 ">
          <AddCategory />
        </div>
      </div>

      <div className="relative flex items-center justify-start">
        <Input
          icon={<Search />}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search in category"
        />
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <aside className="col-span-3 space-y-3">
          <h1 className="text-[28px] font-semibold">Categories</h1>
          <div className="space-y-3">
            {categories.map((p) => {
              const active = current.id === p.id;
              return (
                <div
                  key={p.id}
                  className="w-[260px] rounded-[12px] effect cursor-pointer hover:scale-[1.02] transition-transform"
                >
                  <button
                    onClick={() => setCurrent(p)}
                    className={cn(
                      "w-[260px] relative cursor-pointer flex items-center gap-6 rounded-xl p-4 text-left overflow-hidden ",
                    )}
                  >
                    {active && <ActiveIcon />}
                    <div className="flex items-center justify-center cursor-pointer effect rounded-[12px] overflow-hidden bg-transparent!">
                      <Image
                        src="https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
                        alt={p.name}
                        height={100}
                        width={100}
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
        <section className="col-span-9 space-y-3">
          <div>
            <h2 className="text-[28px] font-semibold ">Sub Categories</h2>
          </div>
          {current?.subCategories.length ? (
            <div className="grid grid-cols-3 gap-5">
              {current?.subCategories.map((c) => (
                <Link href={`/dashboard/admin/categories/products`} key={c.id}>
                  <CategoryCard
                    category={{
                      id: Number(c.id),
                      name: c.name,
                      image:
                        "https://images.unsplash.com/photo-1676195470090-7c90bf539b3b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
                    }}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <Card className="effect">
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  No Sub categories for this category
                </CardTitle>
              </CardHeader>
            </Card>
          )}
        </section>
      </div>
    </div>
  );
};

export default AllCategories;
