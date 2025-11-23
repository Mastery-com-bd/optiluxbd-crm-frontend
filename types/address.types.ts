export interface IAddress {
  id: number;
  user_id: number;
  customer_id: number | null;
  division: string;
  city: string;
  thana: string;
  post: string;
  street: string;
  geo_lat: number | null;
  geo_lng: number | null;
  zone_id: number | null;
}
