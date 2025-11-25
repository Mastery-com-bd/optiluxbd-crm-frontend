export interface TAddress {
    id: string;
    addressId: string | null;
    shipping_address_tag: string | null;
    shipping_address_line1: string | null;
    shipping_address_line2: string | null;
    shipping_address_city: string | null;
    shipping_address_postcode: string | null;
    shipping_address_geo_lat: string | null;
    shipping_address_geo_lng: string | null;
}

export interface TCustomer {
    id: number;
    customerId: string;
    name: string;
    customerLevel: string;
    phone: string;
    gender: string;
    date_of_birth: string;
    profession: string;
    isMarried: boolean;
    created_at: string;
    updated_at: string;
    addresses: TAddress[];
}