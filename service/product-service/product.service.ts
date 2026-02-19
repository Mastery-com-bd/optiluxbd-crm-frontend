/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductCreatePayload } from "@/types/products/product.type";
import { createData, uploadFile } from "../apiService/crud";


export async function addProduct(
    data: ProductCreatePayload,
    img?: File | null
) {
    try {
        const productRes = await createData<ProductCreatePayload>(
            "/products",
            "/dashboard/admin/products",
            data
        );

        if (!productRes.success) {
            console.log(productRes);
            return productRes;
        }

        if (img && productRes?.data?.id) {
            const formData = new FormData();
            formData.append("product_image", img);

            const imageRes = await uploadFile(
                `/products/${productRes.data.id}/image`,
                "/dashboard/admin/products",
                formData
            );

            if (imageRes.success) {
                console.log(imageRes);
                return {
                    success: true,
                    message: "Product and image uploaded successfully",
                    data: {
                        ...productRes.data,
                        imageUploaded: true
                    }
                };
            }

            return {
                success: true,
                message: "Product created but image upload failed",
                data: {
                    ...productRes.data,
                    imageUploaded: false
                }
            };
        }

        return {
            success: true,
            message: "Product created successfully (no image)",
            data: productRes.data
        };

    } catch (error: any) {
        console.error("Error adding product:", error);
        return {
            success: false,
            message: error.message || "Failed to add product"
        };
    }
}   