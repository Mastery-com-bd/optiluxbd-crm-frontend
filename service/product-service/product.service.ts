/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProductCreatePayload, ProductUpdatePayload } from "@/types/products/product.type";
import { createData, patchData, putData, readData, uploadFile } from "../apiService/crud";
import { Query } from "@/types/shared";


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
        console.log("Product res ->> ", productRes.data.id);

        if (!productRes.success) {
            console.log(productRes);
            return productRes;
        }

        if (img && productRes?.data?.id) {
            const formData = new FormData();
            formData.append("product_image", img);

            const imageRes = await uploadFile(
                `/images/products/${productRes?.data?.id}/image`,
                "/dashboard/admin/products",
                formData
            );
            if (imageRes.success) {
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

export async function updateProduct(
    productId: number,
    data: ProductUpdatePayload,
    img?: File | null
) {
    try {
        const productRes = await putData<ProductUpdatePayload>(
            `/products/${productId}`,
            "/dashboard/admin/products",
            data
        );

        if (!productRes.success) {
            return productRes;
        }

        if (img && productRes?.success) {
            const formData = new FormData();
            formData.append("product_image", img);

            const imageRes = await uploadFile(
                `/images/products/${productId}/image`,
                "/dashboard/admin/products",
                formData
            );
            if (imageRes.success) {
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


export async function getAllProducts(query?: Query) {
    const res = await readData("/products", ["Products"], query);
    return res;
}