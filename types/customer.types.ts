export type TCustomerLevel =
  | "BRONZE_PENDING"
  | "BRONZE"
  | "SILVER_PENDING"
  | "SILVER"
  | "GOLD_PENDING"
  | "GOLD"
  | "DIAMOND_PENDING"
  | "DIAMOND"
  | "PLATINUM_PENDING"
  | "PLATINUM";

export type TGender = "MALE" | "FEMALE" | "OTHER";

export type TCustomer = {
  id: number;
  name: string;
  phone: string;
  customerId: string;
  gender: TGender;
  isMarried: boolean;
  customerLevel: TCustomerLevel;
  customFields?: {
    referredBy?: string;
    marriageAnniversary?: string;
  };
  created_at: string;
  updated_at: string;
};
