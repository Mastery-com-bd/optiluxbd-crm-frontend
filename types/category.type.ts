export type TSubCategory = {
  id: number;
  category: { name: string, id: number }
  categoryId: number;
  organizationId: number;
  name: string;
  description: string;
  slug: string;
  created_at: string;
  updated_at: string;
  image_public_id: string | null;
  image_url: string | null;
};

export type TCategory = {
  id: number;
  organizationId: number;
  name: string;
  slug: string;
  subCategories: TSubCategory[];
  description: string;
  created_at: string;
  updated_at: string;
  image_public_id: string | null;
  image_url: string | null;
};

export type TCategories = TCategory[];
export type TSubCategories = TSubCategory[];