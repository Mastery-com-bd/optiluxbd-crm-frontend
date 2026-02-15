export type TUserSettings = {
  site_name: string;
  site_logo_url: string | null;
  site_logo_public_id: string | null;
  site_favicon_url: string | null;
  site_favicon_public_id: string | null;
  contact_email: string;
  contact_phone: string;
  address: string;
  currency: string;
  timezone: string;
  backup_frequency: "manual" | "daily" | "weekly" | "monthly";
  backup_storage_type: "local" | "cloud";
  local_backup_path: string | null;
  pusher_app_id: string;
  pusher_app_key: string;
  pusher_app_secret: string;
  facebook_url: string[];
  instagram_url: string[];
  linkedin_url: string[];
  twitter_url: string[];
  maintenance_mode: boolean;
  backup_enabled: boolean;

  pusher_app_cluster: string;
  last_backup_at: string | null;
  created_at: string;
  id: number;
};
