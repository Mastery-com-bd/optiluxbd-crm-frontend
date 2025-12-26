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
        <div className=" rounded-[14px] w-full bgGlass p-4  flex flex-col items-center shadow-lg justify-between">
            <div className=" h-[290px] w-full">
                <img
                    src={product.image_url}
                    alt={product.name}
                    // height={290}
                    // width={323}
                    className="rounded-2xl object-cover"
                />
            </div>
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

                    <ButtonComponent
                        varient="green"
                        icon={Pencil}
                        clasName="p-4 "
                    />

                    <ButtonComponent
                        varient="red"
                        onClick={() => {
                            setDeleteProductId(product.id);
                            setDeleteDialogOpen(true);
                        }}
                        icon={Trash}
                        className=" p-4  "
                    />
                </div>
            </div>
        </div>
    );
};

export default ProductCard;