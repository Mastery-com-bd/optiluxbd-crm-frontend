export type TBackupFrequency = "DAILY" | "MANUAL" | "WEEKLY" | "MONTHLY";
export type TBackupStorageType = "LOCAL" | "CLOUD" | "S3" | "FTP";

export type TUserSettings = {
  site_logo_url: string | null;
  site_favicon_url: string | null;
  site_logo_public_id: string | null;
  site_favicon_public_id: string | null;

  site_name: string;
  address: string;
  currency: string;
  timezone: string;
  contact_email: string;
  contact_phone: string;
  backup_frequency: TBackupFrequency;
  backup_storage_type: TBackupStorageType;
  local_backup_path: string | null;
  pusher_app_id: string;
  pusher_app_key: string;
  pusher_app_secret: string;
  pusher_app_cluster: string;
  maintenance_mode: boolean;
  backup_enabled: boolean;

  facebook_url: string[];
  instagram_url: string[];
  linkedin_url: string[];
  twitter_url: string[];

  last_backup_at: string | null;
  created_at: string;
  id: number;
};
