import {
  TBackupFrequency,
  TBackupStorageType,
} from "@/types/settings/userSettings.types";

export type GeneralInfo = {
  site_name: string;
  address: string;
  currency: string;
  timezone: string;
  contact_email: string;
  contact_phone: string;
};

export type SystemConfiguration = {
  backup_storage_type: TBackupStorageType;
  backup_frequency: TBackupFrequency;
  local_backup_path: string;
  pusher_app_id: string;
  pusher_app_key: string;
  pusher_app_secret: string;
  pusher_app_cluster: string;
};

export type SystemMaintance = {
  maintenance_mode: boolean;
  backup_enabled: boolean;
};

export type SocialLinks = {
  facebook_url: string[];
  twitter_url: string[];
  instagram_url: string[];
  linkedin_url: string[];
};

export interface userSettingsState {
  generalInfo: Partial<GeneralInfo>;
  systemInfo: Partial<SystemConfiguration>;
  SystemMaintance: Partial<SystemMaintance>;
  socialLinks: Partial<SocialLinks>;
}
