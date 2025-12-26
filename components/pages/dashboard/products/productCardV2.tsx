import React from "react";
import Image from "next/image";
import { Eye, SquarePen, Trash2 } from "lucide-react";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";

interface ProductCardV2Props {
  image?: string;
  price?: number | string;
  stock?: number;
  name?: string;
  sku?: string;
  onViewDetails?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const ProductCardV2 = ({
  image = "https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=2080&auto=format&fit=crop", // Placeholder sunglasses image
  price = "99.00",
  stock = 34,
  name = "Product Name Product Name Product Name Product Name Product Name Product Name Product Name Product Name Product Name Product Name ",
  sku = "pro-0988",
  onViewDetails,
  onEdit,
  onDelete,
}: ProductCardV2Props) => {
  return (
    <LiquidGlass
      borderRadius="12px"
      className="relative  overflow-hidden p-5 "
    >
      {/* Product Image */}
      <div className="relative aspect-square  w-[325px] h-[290px] overflow-hidden rounded-[12px] bg-white mb-4">
        <Image
          src={image}
          alt={name}
          width={325}
          height={290}
          className="object-cover object-center"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center justify-between text-white">
          <span className="text-xl font-medium">{price}</span>
          <span className="text-sm font-light text-gray-300">
            Stock {stock}
          </span>
        </div>
        <div className="flex items-center justify-between text-white">
          <h3 className="text-base font-normal truncate max-w-[180px]">{name}</h3>
          <span className="text-sm font-light text-gray-400">Sku : {sku}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {/* View Details Button */}
        <button
          onClick={onViewDetails}
          className="flex-1 group relative flex items-center justify-center gap-2 overflow-hidden py-3 text-white transition-all hover:opacity-90 active:scale-95 border rounded-2xl border-gray-400"
        >
          {/* Gradient overlay for the glow effect */}
          <svg
            width="160"
            height="44"
            viewBox="0 0 160 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute w-[120%] top-1/2 left-[50%] -translate-x-1/2 -translate-y-1/2 -z-10"
          >
            <g filter="url(#filter0_f_1693_11366)">
              <ellipse cx="133.5" cy="39" rx="133.5" ry="9" fill="#FFB13F" />
            </g>
            <defs>
              <filter
                id="filter0_f_1693_11366"
                x="-38.5"
                y="-8.5"
                width="344"
                height="95"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="19.25"
                  result="effect1_foregroundBlur_1693_11366"
                />
              </filter>
            </defs>
          </svg>

          <Eye size={18} />
          <span className="text-sm font-medium">View Details</span>

          {/* Bottom highlight line */}
          <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-orange-300/50 to-transparent" />
        </button>

        {/* Edit Button */}

        <LiquidGlass
          borderRadius="12px"
          onClick={onDelete}
          className="group relative flex h-[46px] w-[46px] items-center justify-center text-red-500 shadow-none active:scale-95 min-w-[65px]"
        >
          {/* Red border Gradient */}
          <div className="absolute inset-0 rounded-xl p-px" />
          <div className="absolute inset-0 rounded-xl" />

          <SquarePen size={18} className="relative z-10" />

          {/* Bottom red glow */}
          <div className="absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-red-500/50 blur-[2px] transition-all group-hover:w-3/4 group-hover:bg-red-400" />
        </LiquidGlass>

        {/* Delete Button */}
        <LiquidGlass
          borderRadius="12px"
          onClick={onDelete}
          className="group relative flex h-[46px] w-[46px] items-center justify-center text-red-500 shadow-none active:scale-95 min-w-[65px]"
        >
          {/* Red border Gradient */}
          <div className="absolute inset-0 rounded-xl p-px" />
          <div className="absolute inset-0 rounded-xl" />

          <Trash2 size={18} className="relative z-10" />

          {/* Bottom red glow */}
          <div className="absolute bottom-0 left-1/2 h-px w-1/2 -translate-x-1/2 bg-red-500/50 blur-[2px] transition-all group-hover:w-3/4 group-hover:bg-red-400" />
        </LiquidGlass>
      </div>
    </LiquidGlass>
  );
};

export default ProductCardV2;
