export type TFeature = {
  description: string | null;
  id: number;
  key: string;
  name: string;
  planId: number;
  value: string;
  isEnable: boolean;
};

export type TFeatureData = {
  id: number;
  name: string;
  slug: string;
  description: string;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
};

export type TPlan = {
  id: number;
  name: string;
  description: string | null;
  features: TFeature[];
  isActive: boolean;
  isOneTime: boolean;
  isPublic: boolean;
  maxCustomers: number;
  maxInvoices: number;
  maxLocations: number;
  maxProducts: number;
  maxStorage: number;
  maxApiCalls: number | null;
  trialDays: string;
  maxUsers: string;
  priceDaily: string | null;
  priceMonthly: string;
  priceOneTime: string | null;
  priceYearly: string;
  slug: string;
  updatedAt: string;
  createdAt: string;
};
