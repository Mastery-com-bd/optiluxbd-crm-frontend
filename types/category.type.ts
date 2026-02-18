export type TCategories = {
  id: number;
  organizationId: number;
  name: string;
  slug: string;
  description: string;
  created_at: string;
  updated_at: string;
};

export type TSubCategories = {
  id: number;
  categoryId: number;
  organizationId: number;
  name: string;
  description: string;
  slug: string;
  created_at: string;
  updated_at: string;
};
