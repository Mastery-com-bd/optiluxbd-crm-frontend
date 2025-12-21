/* eslint-disable @next/next/no-img-element */
import GreenSvgForButton from "@/components/svgIcon/GreenSvgForButton";
import { Button } from "@/components/ui/button";
import ButtonComponent from "@/components/ui/ButtonComponent";
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
                        <ButtonComponent
                            buttonName="View Details"
                            varient="yellow"
                            clasName="p-4"
                            icon={Eye}
                        />
                    </Link>

                    <button
                        className=
                        "relative cursor-pointer bg-white/5 rounded-xl py-2 flex items-center justify-center px-4 overflow-hidden"

                    >
                        <div className="pointer-events-none absolute bottom-0 left-1/2 w-[calc(100%-2rem)] -translate-x-1/2 z-20">
                            <span className="block h-[1.5px] w-full bg-[linear-gradient(to_right,transparent_0%,var(--color-success)_50%,transparent_100%)]" />
                        </div>
                        <div className="pointer-events-none">
                            <GreenSvgForButton />
                        </div>
                        <Pencil />
                    </button>

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