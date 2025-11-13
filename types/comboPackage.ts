import { Product } from "./product";

export type TComboItem = {
  productId: number;
  quantity: number;
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

export type TComboPackage = {
  id: number;
  name: string;
  description: string;
  sku: string;
  discountPrice: string;
  totalPrice: string;
  savingsAmount: string;
  savingsPercent: string;
  is_active: boolean;
  is_featured: boolean;
  tags?: string[];
  items: TComboItem[];
  created_at: string;
};

export interface TProduct extends Product {
  discountPrice: string;
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
  totalPrice: string;
  discountPrice: number;
  savingsAmount: string;
  savingsPercent: string;
  is_active: boolean;
  is_featured: boolean;
  image_url: string | null;
  image_public_id: string | null;
  created_at: string;
  updated_at: string;
  items: TComboPackageItem[];
}
