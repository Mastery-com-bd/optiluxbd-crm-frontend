import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
  buttonName?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  buttonName,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        {buttonName ? (
          <Button variant="ghost" className="cursor-pointer">
            {buttonName}
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            title="View Product Details"
          >
            <Eye className="w-4 h-4" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="sm:max-w-[40vw] w-full overflow-y-auto p-6"
      >
        <SheetHeader>
          <SheetTitle className="text-xl font-bold">Product Details</SheetTitle>
          <SheetDescription>
            View details for <strong>{product.name}</strong>
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Product Image */}
          <div className="col-span-1">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto rounded-md border"
            />
          </div>

          {/* Product meta info */}
          <div className="space-y-1 text-sm">
            <p>
              <strong>Name:</strong> {product.name}
            </p>
            <p>
              <strong>Category:</strong> {product.category}
            </p>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>SKU:</strong> {product.sku}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Status:</strong> {product.status}
            </p>
            <p>
              <strong>Stock Status:</strong> {product.stock_status}
            </p>
            <p>
              <strong>Stock:</strong> {product.stock}
            </p>
          </div>
        </div>

        {/* Grid like delivery info section */}
        <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
          <div>
            <strong>Created At:</strong>
            <p>{new Date(product.created_at).toLocaleString()}</p>
          </div>
          <div>
            <strong>Updated At:</strong>
            <p>{new Date(product.updated_at).toLocaleString()}</p>
          </div>
        </div>

        {/* Description */}
        <div className="mt-4 text-sm">
          <strong>Description:</strong>
          <p>{product.description || "N/A"}</p>
        </div>

        {/* Footer */}
        <SheetFooter className="mt-6">
          <SheetClose asChild>
            <Button variant="outline">✕ Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ProductDetails;
