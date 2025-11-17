export interface TCustomer {
  id: number;
  customerId: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  district?: string | null;
  thana?: string | null;
  date_of_birth?: string | null;
  profession?: string | null;
  isMarried?: boolean | null;
  gender?: string | null;
  customerLevel: string;
  created_at?: string | null;
  updated_at?: string | null;
}
