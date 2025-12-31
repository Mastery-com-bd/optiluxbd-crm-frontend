import { Card } from "@/components/ui/card";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import ChartComponent from "./AreaChart";

export type TProductdata = {
  name: string;
  image: string;
  price: number;
  status: "Active" | "Offline";
};

const FooterSection = () => {
  const [date, setDate] = useState("All");
  const [filters, setFilters] = useState({
    search: "",
    sortBy: "createdAt",
    order: "desc",
    limit: 10,
    page: 1,
  });
  const productData: TProductdata[] = [
    {
      name: "New Cavoria Perfume Fragrance",
      image:
        "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
      price: 751,
      status: "Active",
    },
    {
      name: "Aurum Luxe Eau De Parfum",
      image:
        "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
      price: 1299,
      status: "Active",
    },
    {
      name: "Midnight Bloom Floral Mist",
      image:
        "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
      price: 899,
      status: "Offline",
    },
  ];

  return (
    <div className=" grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-3 lg:gap-6">
      {/* bar chart component */}
      <Card className="bg-white/10 h-full relative rounded-3xl px-6 py-6 w-full">
        {/* top and bottom border effect */}
        <div className="absolute top-0 left-px inset-5 border-l border-t border-white/10 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-px inset-5 border-r border-b border-white/10 rounded-br-3xl pointer-events-none" />

        {/* main content */}
        <div className=" w-full h-full rounded-3xl space-y-4">
          {/* header section */}
          <h1 className="text-xl text-white/70">Popular Product</h1>
          {/* main content */}
          <div>
            {productData.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>

          <div className="w-full flex items-center relative rounded-3xl bg-white/5">
            <div className="absolute top-0 left-0 inset-4 border-l border-t border-white/40 rounded-tl-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-0 inset-4 border-r border-b border-white/40 rounded-br-3xl pointer-events-none" />

            <Link
              href="/dashboard/admin/products/all-products"
              className="text-[#727272] w-full py-1 px-4 text-center"
            >
              All Products
            </Link>
          </div>
        </div>
      </Card>

      {/* area chart component */}
      <Card className="bg-white/10 h-full relative rounded-3xl px-6 py-4 w-full">
        {/* top and bottom border effect */}
        <div className="absolute top-0 left-px inset-5 border-l border-t border-white/10 rounded-tl-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-px inset-5 border-r border-b border-white/10 rounded-br-3xl pointer-events-none" />

        {/* main content */}
        <div className=" w-full h-full rounded-3xl space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-semibold">Lead Conversion Funnel</h1>
            <div className="flex items-center gap-6">
              {/* status drodpown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <LiquidGlass
                    glowIntensity="xs"
                    shadowIntensity="xs"
                    borderRadius="12px"
                  >
                    <Button
                      variant="default"
                      className="flex items-center text-[14px] font-normal border-none px-3.5 py-2 rounded-[12px] cursor-pointer bg-transparent"
                    >
                      <p className="flex items-center gap-2">
                        <span className="text-[14px]">
                          {date === "All" ? "Select Days" : date}
                        </span>
                        <ChevronDown size={18} />
                      </p>
                    </Button>
                  </LiquidGlass>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="bg-white/5 backdrop-blur-2xl"
                >
                  {["7", "14", "21", "30"].map((item) => (
                    <DropdownMenuItem
                      key={item}
                      onClick={() => {
                        setDate(item);
                        setFilters((prev) => ({
                          ...prev,
                          limit: Number(item),
                          page: 1,
                        }));
                      }}
                      className={item === date ? "font-medium" : ""}
                    >
                      {item}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          <ChartComponent />
        </div>
      </Card>
    </div>
  );
};

export default FooterSection;
