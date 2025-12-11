/* eslint-disable @next/next/no-img-element */
import { Product } from "@/types/product";
import { BadgePercent, Tag } from "lucide-react";

interface ProductDetailsProps {
  product?: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = () => {
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
      "https://i.ibb.co.com/KxJvdpz3/t-shirt.jpg",
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

  const colors = ["#667085", "#fcd34d", "#ffffff", "#000000", "#10b981"];
  const sizes = ["S", "M", "L", "XL", "XXL"];

  const discountPercent = Math.round(
    (1 - Number(product.discountPrice) / Number(product.price)) * 100
  );

  return (
    <div className="min-h-screen text-white p-10 ]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-3xl font-bold">Product Details</h3>
          <p className="text-sm text-gray-400">View product details</p>
        </div>

        {/* Content */}
        <div className="flex gap-6  mt-10">
          {/* Left Image Panel */}
          <div className="w-full md:w-1/3 bgGlass p-6  flex flex-col items-center shadow-lg justify-between">
            <img
              src={product.image_url}
              alt={product.name}
              className="rounded-3xl  object-cover w-full h-auto "
            />
            {/* Thumbnails */}
            <div className="flex justify-between w-full mt-4 ">
              {[1, 2, 3].map((_, i) => (
                <img
                  key={i}
                  src={product.image_url}
                  alt="thumb"
                  className="w-24 h-24 object-cover rounded-lg border border-white/20"
                />
              ))}
            </div>
          </div>

          {/* Right Content Area */}
          <div className="w-full md:w-2/3 bgGlass rounded-lg p-6 shadow-lg space-y-4">
            <h2 className="text-2xl font-semibold">{product.name}</h2>

            <div className="flex items-center gap-3 text-lg my-6">
              <span className="text-white font-semibold text-3xl">
                ${product.discountPrice.toFixed(2)}
              </span>
              <span className="line-through text-gray-400">
                ${Number(product.price).toFixed(2)}
              </span>
              <span className="text-rose-400 text-sm">
                ({discountPercent}% Off)
              </span>
            </div>

            {/* Colors & Sizes */}
            <div className="flex gap-8 my-6">
              <div>
                <p className="text-sm mb-1 ">Available Colors</p>
                <div className="flex gap-2">
                  {colors.map((color, i) => (
                    <span
                      key={i}
                      className="w-6 h-6 rounded-full border-2 border-white"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm mb-1 ">Available Size</p>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <span
                      key={size}
                      className="text-sm p-2 rounded-sm bg-white text-black "
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Quantity */}
            <p className="text-sm my-6">
              <strong>Quantity:</strong> {product.stock}
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
                    instant discount on Bank Debit Cards, up to $30 on orders
                    of $50 and above
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <Tag className="text-green-400 w-4 h-4 mt-0.5" />
                  <span className="text-sm text-gray-300">
                    <span className="text-yellow-600">Bank Offer</span>{" "}
                    Get 20% off your next purchase! Exclusive deal ends soon!
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;