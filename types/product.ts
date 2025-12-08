export interface Product {
  subCategory: any;
  brand: string;
  category: string;
  created_at: string;
  description?: string;
  dimensions?: string | null;
  id: number;
  image_public_id: string;
  image_url: string;
  is_active: boolean;
  is_featured: boolean;
  name: string;
  price: string;
  sku: string;
  status: string;
  stock: number;
  stock_status: string;
  tags: string[];
  updated_at: string;
  weight?: string | null;
  by: string | "";
  sold: number | null;
  rating: number;
  discountPrice:number;
}
