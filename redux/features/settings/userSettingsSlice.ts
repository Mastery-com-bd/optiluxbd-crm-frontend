import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GeneralInfo,
  SocialLinks,
  SystemConfiguration,
  SystemMaintance,
  userSettingsState,
} from "./settingsSlice.type";
import {
  TBackupFrequency,
  TBackupStorageType,
} from "@/types/settings/userSettings.types";

const initialState: userSettingsState = {
  generalInfo: {
    site_name: "",
    address: "",
    currency: "",
    timezone: "",
    contact_email: "",
    contact_phone: "",
  },
  systemInfo: {
    backup_storage_type: "LOCAL",
    backup_frequency: "MANUAL",
    local_backup_path: "",
    pusher_app_id: "",
    pusher_app_key: "",
    pusher_app_secret: "",
    pusher_app_cluster: "",
  },
  SystemMaintance: {
    maintenance_mode: false,
    backup_enabled: false,
  },
  socialLinks: {
    facebook_url: [],
    twitter_url: [],
    instagram_url: [],
    linkedin_url: [],
  },
};

const userSettingsSlice = createSlice({
  name: "userSettings",
  initialState: initialState,
  reducers: {
    setGeneralInfo: (state, action: PayloadAction<Partial<GeneralInfo>>) => {
      state.generalInfo = { ...state.generalInfo, ...action.payload };
    },
    setSiteName: (state, action: PayloadAction<string>) => {
      state.generalInfo.site_name = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.generalInfo.address = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.generalInfo.currency = action.payload;
    },
    setTimezone: (state, action: PayloadAction<string>) => {
      state.generalInfo.timezone = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.generalInfo.contact_email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.generalInfo.contact_phone = action.payload;
    },
    setSystemInfo: (
      state,
      action: PayloadAction<Partial<SystemConfiguration>>,
    ) => {
      state.systemInfo = { ...state.systemInfo, ...action.payload };
    },
    setBackupStorage: (state, action: PayloadAction<TBackupStorageType>) => {
      state.systemInfo.backup_storage_type = action.payload;
    },
    setBackupFrequency: (state, action: PayloadAction<TBackupFrequency>) => {
      state.systemInfo.backup_frequency = action.payload;
    },
    setBackupPath: (state, action: PayloadAction<string>) => {
      state.systemInfo.local_backup_path = action.payload;
    },
    setPusherAppId: (state, action: PayloadAction<string>) => {
      state.systemInfo.pusher_app_id = action.payload;
    },
    setPusherAppKey: (state, action: PayloadAction<string>) => {
      state.systemInfo.pusher_app_key = action.payload;
    },
    setPusherAppSecret: (state, action: PayloadAction<string>) => {
      state.systemInfo.pusher_app_secret = action.payload;
    },
    setAppCluster: (state, action: PayloadAction<string>) => {
      state.systemInfo.pusher_app_cluster = action.payload;
    },

    setSystemMaintainance: (
      state,
      action: PayloadAction<Partial<SystemMaintance>>,
    ) => {
      state.SystemMaintance = { ...state.SystemMaintance, ...action.payload };
    },
    setMaintainceMode: (state, action: PayloadAction<boolean>) => {
      state.SystemMaintance.maintenance_mode = action.payload;
    },
    setBackupEnebled: (state, action: PayloadAction<boolean>) => {
      state.SystemMaintance.backup_enabled = action.payload;
    },
    setSocialLinks: (state, action: PayloadAction<Partial<SocialLinks>>) => {
      state.socialLinks = { ...state.socialLinks, ...action.payload };
    },

    addSocialLink: (
      state,
      action: PayloadAction<{ platform: keyof SocialLinks; url: string }>,
    ) => {
      const { platform, url } = action.payload;

      const links = state.socialLinks[platform] ?? [];

      if (links.length < 5) {
        links.push(url);
        state.socialLinks[platform] = links;
      }
    },

    removeSocialLink: (
      state,
      action: PayloadAction<{ platform: keyof SocialLinks; index: number }>,
    ) => {
      const { platform, index } = action.payload;

      const links = state.socialLinks[platform] ?? [];

      state.socialLinks[platform] = links.filter((_, i) => i !== index);
    },

    updateSocialLink: (
      state,
      action: PayloadAction<{
        platform: keyof SocialLinks;
        index: number;
        url: string;
      }>,
    ) => {
      const { platform, index, url } = action.payload;

      const links = state.socialLinks[platform] ?? [];

      if (links[index] !== undefined) {
        links[index] = url;
      }
    },
  },
});

export const {
  setGeneralInfo,
  setSiteName,
  setAddress,
  setCurrency,
  setTimezone,
  setEmail,
  setPhone,
  setSystemInfo,
  setBackupStorage,
  setBackupFrequency,
  setBackupPath,
  setPusherAppId,
  setPusherAppKey,
  setPusherAppSecret,
  setAppCluster,
  setSystemMaintainance,
  setMaintainceMode,
  setBackupEnebled,
  setSocialLinks,
  addSocialLink,
  removeSocialLink,
  updateSocialLink,
} = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
export const currentGeneralSettings = (state: RootState) =>
  state.userSettings.generalInfo;

export const currentSystemSettings = (state: RootState) =>
  state.userSettings.systemInfo;

export const currentSystemMaintainance = (state: RootState) =>
  state.userSettings.SystemMaintance;

export const currentSocialLinks = (state: RootState) =>
  state.userSettings.socialLinks;
