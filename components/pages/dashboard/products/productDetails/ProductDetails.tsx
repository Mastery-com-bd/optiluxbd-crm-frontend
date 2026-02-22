/* eslint-disable @next/next/no-img-element */
import { TProduct } from "@/types/products/product.type";
import {  
  Package, 
  Barcode, 
  Calendar, 
  TrendingUp,
  Weight,
  Ruler,
  Box,
  Star,
} from "lucide-react";
import PageHeader from "../../shared/pageHeader";
import { Badge } from "@/components/ui/badge";

const ProductDetails = ({ product }: { product: TProduct }) => {
  console.log("product->", product);

  const colors = product.color ? [...product.color] : [];
  const sizes = product.size ? [...product.size] : [];

  const discountPercent = product.discountPrice 
    ? Math.round((1 - Number(product.discountPrice) / Number(product.price)) * 100)
    : 0;

  return (
    <div className=" text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <PageHeader title="Product details page" description="view product details" />

        {/* Content */}
        <div className="flex gap-6 mt-10 items-start">
          {/* Left Image Panel */}
          <div className="w-full md:w-1/3 effect p-6 rounded-xl    ">
            <img
              src={product.image_url || ""}
              alt={product.name}
              className="rounded-[12px] object-cover w-full h-auto"
            />
            {/* Thumbnails */}
            <div className="flex justify-between w-full mt-4 gap-2">
              {[1, 2, 3].map((_, i) => (
                <img
                  key={i}
                  src={product.image_url || ""}
                  alt="thumb"
                  className="w-40 h-20 object-cover rounded-[12px] border border-white/20"
                />
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-full md:w-2/3 rounded-2xl effect p-6 shadow-lg space-y-4">
            {/* Title & Status */}
            <div className="flex items-start justify-between">
              <h2 className="text-2xl font-semibold flex-1">{product.name}</h2>
              <div className="flex gap-2">
                <Badge variant={product.is_active ? "default" : "secondary"}>
                  {product.is_active ? "Active" : "Inactive"}
                </Badge>
                {product.is_featured && (
                  <Badge variant="outline" className="border-yellow-500 text-yellow-500">
                    <Star className="w-3 h-3 mr-1" fill="currentColor" />
                    Featured
                  </Badge>
                )}
              </div>
            </div>

            {/* Brand & Category */}
            <div className="flex gap-4 text-sm text-gray-300">
              {product.brand && (
                <span>
                  <strong>Brand:</strong> {product.brand}
                </span>
              )}
              <span>
                <strong>Category:</strong> {product.subCategory?.name}
              </span>
            </div>

            {/* Price Section */}
            <div className="flex items-center gap-3 text-lg my-6">
              <span className="text-white font-semibold text-3xl">
                ${product.discountPrice || product.price}
              </span>
              {product.discountPrice && (
                <>
                  <span className="line-through text-gray-400">
                    ${Number(product.price).toFixed(2)}
                  </span>
                  <span className="text-rose-400 text-sm">
                    ({discountPercent}% Off)
                  </span>
                </>
              )}
            </div>

            {/* Stock Status & SKU */}
            <div className="grid grid-cols-2 gap-4 my-4">
              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                <Package className="w-5 h-5 text-blue-400" />
                <div>
                  <p className="text-xs text-gray-400">Stock Status</p>
                  <p className={`text-sm font-semibold ${
                    product.stock_status === "IN_STOCK" ? "text-green-400" : 
                    product.stock_status === "LOW_STOCK" ? "text-yellow-400" : 
                    "text-red-400"
                  }`}>
                    {product.stock_status.replace(/_/g, " ")}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                <Barcode className="w-5 h-5 text-purple-400" />
                <div>
                  <p className="text-xs text-gray-400">SKU</p>
                  <p className="text-sm font-semibold">{product.sku}</p>
                </div>
              </div>
            </div>

            {/* Colors & Sizes */}
            {(colors.length > 0 || sizes.length > 0) && (
              <div className="flex gap-8 my-6 p-4 rounded-lg bg-white/5 border border-white/10">
                {colors.length > 0 && (
                  <div>
                    <p className="text-sm mb-2 font-semibold">Available Colors</p>
                    <div className="flex gap-2">
                      {colors.map((color, i) => (
                        <span
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {sizes.length > 0 && (
                  <div>
                    <p className="text-sm mb-2 font-semibold">Available Sizes</p>
                    <div className="flex gap-2">
                      {sizes.map((size) => (
                        <span
                          key={size}
                          className="text-sm px-3 py-1 rounded-md bg-white text-black font-medium"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Inventory & Pricing Details */}
            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-green-400" />
                  <p className="text-xs text-gray-400">Stock Quantity</p>
                </div>
                <p className="text-xl font-bold">{product.stock}</p>
              </div>

              {product.costPrice && (
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Cost Price</p>
                  <p className="text-xl font-bold text-orange-400">${product.costPrice}</p>
                </div>
              )}

              {product.discountType && product.discountValue && (
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <p className="text-xs text-gray-400 mb-1">Discount</p>
                  <p className="text-xl font-bold text-rose-400">
                    {product.discountValue}{product.discountType === "PERCENTAGE" ? "%" : "$"}
                  </p>
                </div>
              )}
            </div>

            {/* Dimensions & Weight */}
            {(product.weight || product.height || product.width || product.dimensions) && (
              <div className="my-4 p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-sm font-semibold mb-3">Product Specifications</p>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {product.weight && (
                    <div className="flex items-center gap-2">
                      <Weight className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">Weight: <strong>{product.weight}</strong></span>
                    </div>
                  )}
                  {product.height && (
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">Height: <strong>{product.height}</strong></span>
                    </div>
                  )}
                  {product.width && (
                    <div className="flex items-center gap-2">
                      <Ruler className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">Width: <strong>{product.width}</strong></span>
                    </div>
                  )}
                  {product.dimensions && (
                    <div className="flex items-center gap-2">
                      <Box className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">Dimensions: <strong>{product.dimensions}</strong></span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Description */}
            <div className="my-6 p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm font-semibold mb-2">Description</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                {product.description || "No description available"}
              </p>
            </div>

            {/* Tags */}
            {product.tags && product.tags.length > 0 && (
              <div className="my-4">
                <p className="text-sm font-semibold mb-2">Tags</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Timestamps */}
            <div className="flex gap-6 text-xs text-gray-400 pt-4 border-t border-white/10">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Created: {new Date(product.created_at).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>Updated: {new Date(product.updated_at).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;