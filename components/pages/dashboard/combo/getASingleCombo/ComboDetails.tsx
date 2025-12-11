"use client";
import { LiquidGlass } from "@/components/glassEffect/liquid-glass";
import { Product } from "@/types/product";
import { BadgePercent, Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface ProductDetailsProps {
  product?: Product;
}

const ComboDetails: React.FC<ProductDetailsProps> = () => {
  const [selected, setSelected] = useState(0);
  const product: Product = {
    id: 1,
    name: "Men Black Slim Fit T-shirt",
    brand: "UltraFit",
    category: "Clothing",
    subCategory: { id: 101, name: "T-shirts" },
    price: "100.00",
    discountPrice: 80.0,
    sku: "UTF-TSHIRT-BLK01",
    image_url:
      "https://res.cloudinary.com/dbb6nen3p/image/upload/v1762848442/no_image_s3demz.png",
    image_public_id: "dummy_product_image_id_123456",
    stock: 224,
    stock_status: "in_stock",
    is_active: true,
    is_featured: false,
    status: "Published",
    tags: ["black", "slim-fit", "cotton"],
    description:
      "Top in sweatshirt fabric made from a cotton blend with a soft brushed inside. Relaxed fit with dropped shoulders, long sleeves and ribbing around the neckline, cuffs and hem.",
    dimensions: "30x25x3 cm",
    weight: "400g",
    created_at: "2024-06-01T12:00:00Z",
    updated_at: "2024-06-10T09:32:00Z",
    by: "Admin",
    sold: 12,
    rating: 4,
  };
  const images = [product.image_url, product.image_url, product.image_url];
  const colors = ["#667085", "#fcd34d", "#ffffff", "#000000", "#10b981"];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const discountPercent = Math.round(
    (1 - Number(product.discountPrice) / Number(product.price)) * 100
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6 text-white ">
      {/* Header */}
      <div>
        <h3 className="text-3xl font-bold">Combo Details</h3>
        <p className="text-sm text-gray-400">View Product Combo Details</p>
      </div>

      {/* Content */}
      <div className="flex justify-between gap-6 items-start ">
        {/* Left Image Panel */}
        <LiquidGlass
          glowIntensity="xs"
          shadowIntensity="xs"
          borderRadius="20px"
          className=" w-[34vw]"
          height="100%"
        >
          <div className="w-full p-6 flex flex-col items-center shadow-lg justify-between h-full rounded-[20px] gap-4">
            <Image
              src={images[selected]}
              height={600}
              width={600}
              alt={product.name}
              className=" object-cover w-full rounded-[20px] "
            />
            {/* Thumbnails */}
            <div className="flex justify-between w-full gap-3">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative cursor-pointer"
                  onClick={() => setSelected(i)}
                >
                  <Image
                    src={img}
                    height={400}
                    width={400}
                    alt="thumb"
                    className={`w-24 h-24 object-cover rounded-lg border transition-all duration-200
                  ${selected === i ? "border-[#DE9C3A]" : "border-white/20"}
                `}
                  />

                  {/* DARK OVERLAY on unselected */}
                  {selected !== i && (
                    <div className="absolute inset-0 bg-black/50 rounded-lg" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </LiquidGlass>

        {/* Right Content Area */}
        <LiquidGlass
          glowIntensity="xs"
          shadowIntensity="xs"
          borderRadius="20px"
          height="100%"
        >
          <div className="rounded-[20px] p-6 shadow-lg space-y-4 h-full">
            <h2 className="text-2xl font-semibold">{product.name}</h2>

            <div className="flex items-end gap-3 text-lg">
              <span className="text-white font-semibold text-3xl">
                ${product.discountPrice.toFixed(2)}
              </span>

              <div>
                <span className="line-through text-gray-400 text-sm">
                  ${Number(product.price).toFixed(2)}
                </span>
                <span className="text-rose-400 text-xs">
                  ({discountPercent}% Off)
                </span>
              </div>
            </div>

            {/* Colors & Sizes */}
            <div className="flex gap-8">
              <div className="space-y-2">
                <p className="text-sm ">Available Colors</p>
                <div className="grid grid-cols-3 gap-2">
                  {colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-lg p-2 bg-white/70 flex items-center justify-center"
                    >
                      <span
                        className="w-4 h-4 rounded-full block"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm">Available Size</p>

                <div className="grid grid-cols-3 gap-2">
                  {sizes.map((size, i) => (
                    <div
                      key={i}
                      className="w-9 h-9 rounded-lg bg-white text-black
                   flex items-center justify-center"
                    >
                      <span className="text-sm">{size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity */}
            <p className="font-medium">
              Quantity:{" "}
              <span className="font-normal text-sm">{product.stock}</span>
            </p>

            {/* Description */}
            <div className="my-6">
              <p className="text-sm font-semibold mb-1">Description :</p>
              <p className="text-sm text-gray-300">
                {product.description}{" "}
                <span className="text-yellow-600 cursor-pointer hover:underline">
                  Read More
                </span>
              </p>
            </div>

            {/* Offers */}
            <div className="my-6">
              <p className="text-sm font-semibold mb-1">Available offers :</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <BadgePercent className="text-green-400 w-4 h-4 mt-0.5" />
                  <span className="text-sm text-gray-300">
                    <span className="text-yellow-600">Bank Offer</span> 10%
                    instant discount on Bank Debit Cards, up to $30 on orders of
                    $50 and above
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Tag className="text-green-400 w-4 h-4 mt-0.5" />
                  <span className="text-sm text-gray-300">
                    <span className="text-yellow-600">Bank Offer</span> Get 20%
                    off your next purchase! Exclusive deal ends soon!
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </LiquidGlass>
      </div>
    </div>
  );
};

export default ComboDetails;
