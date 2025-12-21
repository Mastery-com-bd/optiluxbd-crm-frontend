/* eslint-disable @next/next/no-img-element */
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { Eye, Pencil, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type PropsType = {
    product: Product;
    setDeleteProductId: (id: number) => void;
    setDeleteDialogOpen: (open: boolean) => void;
};

const ProductCard = ({ product, setDeleteProductId, setDeleteDialogOpen }: PropsType) => {
    return (
        <div className="w-[355px]! rounded-[14px] md:w-1/3 bgGlass p-4  flex flex-col items-center shadow-lg justify-between">
            <Image
                src={product.image_url}
                alt={product.name}
                height={290}
                width={323}
                className="rounded-2xl object-cover"
            />
            {/* Thumbnails */}
            <div className="flex flex-col justify-between gap-3 w-full mt-4  text-white">
                <div className="flex w-full justify-between ">
                    <span>{product.price}</span>
                    <span>Stock {product.stock}</span>
                </div>
                <span>{product.name}</span>
                <span>SKU: {product.sku}</span>
                <div className="flex justify-between">
                    <Link href={`/dashboard/admin/products/all-products/${product.id}`}>
                        <Button
                            variant={"yellow"}
                            className="p-6! rounded-xl cursor-pointer text-[14px]!"
                            icon={<Eye />}
                        >
                            View Details
                        </Button>
                    </Link>

                    <Button variant={"green"} className="p-6! rounded-[12px]!">
                        <Pencil />
                    </Button>
                    <Button variant={"red"}
                        onClick={() => {
                            setDeleteProductId(product.id);
                            setDeleteDialogOpen(true);
                        }}
                        className="cursor-pointer p-6! rounded-[12px]!"
                    >
                        <Trash />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;