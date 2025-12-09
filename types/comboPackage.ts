import { Product } from "./product";

export type TComboItem = {
  productId: number;
  quantity: number;
  product: {
    id: number;
    name: string;
  };
};

export type TComboPack = {
  name: string;
  description: string;
  sku: string;
  discountPrice: number;
  is_featured: boolean;
  tags?: string | string[];
  items: TComboItem[];
};

export interface TComboPackage extends TComboPack {
  id: number;
  packagePrice: string;
  savingsAmount: string;
  savingsPercent: string;
  is_active: boolean;
  created_at: string;
  image_url: string | null;
  image_public_id: string | null;
}

export interface TProduct extends Product {
  discountPrice: number;
}

export interface TComboPackageItem {
  id: number;
  packageId: number;
  productId: number;
  quantity: number;
  created_at: string;
  product: TProduct;
}
export interface TCombo {
  id: number;
  name: string;
  sku: string;
  description: string;
  tags: string[];
  packagePrice: string;
  discountPrice: number;
  savingsAmount: string;
  savingsPercent: string;
  is_active: boolean;
  is_featured: boolean;
  image_url: string | null;
  image_public_id: string | null;
  created_at: string;
  items: TComboPackageItem[];
}
