export type TComboPackage = {
  id: number;
  name: string;
  description?: string;
  sku: string;
  totalPrice: number;
  discountPrice?: number;
  savingsAmount?: number;
  savingsPercent?: number;
  is_active: boolean;
  is_featured: boolean;
  image_url?: string;
  image_public_id?: string;
  tags: string[];
  created_at: string | Date;
};
