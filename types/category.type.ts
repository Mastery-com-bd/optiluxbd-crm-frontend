export type TSubCategories = {
  id: number;
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

export type TCategories = {
  id: number;
  organizationId: number;
  name: string;
  slug: string;
  subCategories: TSubCategories[];
  description: string;
  created_at: string;
  updated_at: string;
  image_public_id: string | null;
  image_url: string | null;
};
