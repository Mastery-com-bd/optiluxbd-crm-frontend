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