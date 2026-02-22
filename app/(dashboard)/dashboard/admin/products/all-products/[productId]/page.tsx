import ProductDetails from "@/components/pages/dashboard/products/productDetails/ProductDetails";
import { getSingleProduct } from "@/service/product-service/product.service";

const SingleProduct = async ({ params }: {
    params: Promise<{ productId: string }>
}) => {
    const { productId } = await params;
    const product = await getSingleProduct(productId);
    return (
        <div>
            <ProductDetails product={product.data} />
        </div>
    );
};

export default SingleProduct;