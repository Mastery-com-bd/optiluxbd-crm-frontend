export interface TSettings {
  id: number;
  site_name: string;
  site_logo_url?: string;
  site_logo_public_id?: string;
  site_favicon_url?: string;
  contact_email?: string;
  contact_phone?: string;
  address?: string;
  facebook_url: string[];
  twitter_url: string[];
  instagram_url: string[];
  linkedin_url: string[];
  maintenance_mode: boolean;
  created_at: Date;
  updated_at: Date;
}
