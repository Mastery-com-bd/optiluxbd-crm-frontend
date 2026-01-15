"use client";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import ComboCard from "@/components/ui/ComboCard";
import { CustomScrollbar } from "@/components/ui/CustomScrollbar";
import { TComboPackage } from "@/types/comboPackage";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const CardView = ({ item }: { item: TComboPackage }) => {
  const newPrice = Number(item?.packagePrice) - Number(item?.discountPrice);

  return (
    <ComboCard className="p-5 flex flex-col gap-2 rounded-[20px] effect relative">
      {/* top bottom border */}
      {/* photo section */}
      <div className="relative mx-auto w-full h-[250px] rounded-[20px]">
        <Image
          src={
            item?.image_url ||
            "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png"
          }
          alt={item?.name}
          height={500}
          width={500}
          className="object-cover rounded-[20px] h-full "
        />
        {/* badge section */}
        <div className="absolute top-3 flex items-center justify-between gap-3 px-3 w-full">
          {/* activate */}
          <div
            className={`rounded-[12px] px-2 py-1 ${
              item?.is_active
                ? "border border-[#58E081] bg-green-300 text-green-700"
                : "border border-red-500 bg-red-300 text-red-700 "
            }`}
          >
            {item?.is_active ? "Activate" : "Deactivate"}
          </div>
          {/* offer */}
          <div className="bg-[#FFB13F] rounded-[12px] px-2 py-1 text-white">
            {item?.savingsPercent}% OFF
          </div>
        </div>
      </div>

      {/* details section */}
      <div className="h-full flex-1 space-y-1">
        {/* title section */}
        <div className="flex items-center justify-between ">
          <h1>{item?.name}</h1>
          <div className="flex items-center gap-2">
            <Link
              href={`/dashboard/admin/combo/${item?.id}`}
              className="effect rounded-[12px]"
            >
              <button className=" w-7 h-7 p-1.5   cursor-pointer">
                <Eye size={16} className="text-[#DE9C3A]" />
              </button>
            </Link>

            <button className=" w-7 h-7 p-1.5 rounded-[12px] effect cursor-pointer">
              <SquarePen size={16} className="text-[#58E081]" />
            </button>

            <button className=" w-7 h-7 p-1.5 rounded-[12px] effect cursor-pointer">
              <Trash2 size={16} className="text-[#F50F0F]" />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          {/* categpry section */}
          <p className="h-12 overflow-y-auto">{item?.description}</p>
          <div className="space-y-4 ">
            {/* price section */}
            <div className="flex items-center justify-between text-xs ">
              <p className="line-through text-[#E5B061]  font-medium">
                <span className="text-base">৳</span>
                {item?.packagePrice}
              </p>
              <p className="text-white/90 font-medium">
                <span className="text-base">৳</span> {newPrice}
              </p>
              <h1 className="text-white/50 font-medium">{item?.sku}</h1>
            </div>

            {/* stock section */}
            <div className="border-t border-white/50 text-white/60 flex items-center gap-4">
              <h1>
                Sold: <span className="text-white">45</span>
              </h1>
              <h1>
                Stock: <span className="text-[#DE9C3A]">28</span>
              </h1>
            </div>

            {/* product list */}

            <div className="w-full h-[85px] px-4 py-1 rounded-[20px] space-y-2 overflow-y-auto no-scrollbar effect">
              <h1 className="text-white/60 leading-5">
                Includes {item?.items.length} items:
              </h1>
              <CustomScrollbar>
                <div className="space-y-1">
                  {item?.items.map((product, index) => (
                    <h1 key={index} className="flex items-center gap-1">
                      <span className="w-1 h-1 rounded-full bg-[#DE9C3A] "></span>
                      <Link
                        href={`/dashboard/product/${product?.product.id}`}
                        className="text-white/80 leading-4 text-sm"
                      >
                        {product?.product.name},
                      </Link>
                    </h1>
                  ))}
                </div>
              </CustomScrollbar>
            </div>
          </div>
        </div>
      </div>
    </ComboCard>
  );
};

export default CardView;
