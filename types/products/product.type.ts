import { TSubCategory } from "../category.type";

export interface ProductCreatePayload {
    name: string;
    description?: string;
    sku: string;
    price: number;
    stock: number;
    subCategoryId: number;
    brand?: string;
    public_id: string;
    secure_url: string;
    isActive: boolean;
    size?: string[];
    color?: string[];
}

export type ProductStatus = "ACTIVE" | "INACTIVE" | "DRAFT" | "ARCHIVED";
export type StockStatus = "IN_STOCK" | "OUT_OF_STOCK" | "LOW_STOCK" | "DISCONTINUED";

export interface TProduct {
    id: number;
    organizationId: number;
    name: string;
    description: string | null;
    price: string; // Decimal as string
    costPrice: string | null;
    discountPrice: string | null;
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
    tags: string[];
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
    subCategoryId: number;
    subCategory: TSubCategory;
}

export type TProductsList = TProduct[];