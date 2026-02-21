import { TSubCategory } from "../category.type";

export interface ProductCreatePayload {
    name: string;
    description: string;
    sku: string;
    price: number;
    costPrice: number;
    discountType: "PERCENTAGE" | "FIXED_AMOUNT";
    discountValue: number | undefined;
    stock: number;
    subCategoryId: number;
    brand: string | undefined;
    weight: number | undefined;
    hight: number | undefined;
    width: number | undefined;
    size: string[];
    color: string[];
    is_active: boolean;
    is_featured: boolean;
    tags: string | undefined,
}

export type ProductStatus = "ACTIVE" | "INACTIVE" | "DRAFT" | "ARCHIVED";
export type StockStatus = "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK" | "DISCONTINUED";
export type DiscountType = "PERCENTAGE" | "FIXED" | "NONE";

export interface TProduct {
    id: number;
    name: string;
    description: string | null;
    price: string; // Decimal as string
    costPrice: string | null;
    discountPrice: string | null;
    discountType: DiscountType | null;
    discountValue: string | null;
    sku: string;
    stock: number;
    brand: string | null;
    image_url: string | null;
    image_public_id: string | null;
    is_active: boolean;
    is_featured: boolean;
    status: ProductStatus;
    stock_status: StockStatus;
    weight: string | null;
    dimensions: string | null;
    height: string | null;
    width: string | null;
    tags: string[];
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
    subCategoryId: number;
    size: string | null;
    color: string | null;
    subCategory: TSubCategory;
}

export type TProductsList = TProduct[];