'use client'
import ProductDetails from "@/components/pages/dashboard/products/productDetails/ProductDetails";
import { useGetProductByIdQuery } from "@/redux/features/products/productsApi";
import { useParams } from "next/navigation";

const SingleProduct = () => {
    const { productId } = useParams();
    const { data } = useGetProductByIdQuery(productId);
    return (
        <div>
            <ProductDetails />
        </div>
    );
};

export default SingleProduct;