import { TSettings } from "@/components/pages/dashboard/settings/settings.types";
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<TSettings> = {};

type SocialLinks = {
  facebook_url?: string[];
  twitter_url?: string[];
  instagram_url?: string[];
  linkedin_url?: string[];
};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
    setSocialLinks: (state, action: PayloadAction<SocialLinks>) => {
      return { ...state, ...action.payload };
    },
    setSiteName: (state, action: PayloadAction<string>) => {
      state.site_name = action.payload;
    },
    setLogoUrl: (state, action: PayloadAction<string>) => {
      state.site_logo_url = action.payload;
    },
    setLogoId: (state, action: PayloadAction<string>) => {
      state.site_logo_public_id = action.payload;
    },
    setFavIcon: (state, action: PayloadAction<string>) => {
      state.site_favicon_url = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.contact_email = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.contact_phone = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    setFacebook: (state, action: PayloadAction<string>) => {
      if (!state.facebook_url) state.facebook_url = [];
      state.facebook_url.push(action.payload);
    },
    setTwitter: (state, action: PayloadAction<string>) => {
      if (!state.twitter_url) state.twitter_url = [];
      state.twitter_url.push(action.payload);
    },
    setInstagram: (state, action: PayloadAction<string>) => {
      if (!state.instagram_url) state.instagram_url = [];
      state.instagram_url.push(action.payload);
    },
    setLinkedIn: (state, action: PayloadAction<string>) => {
      if (!state.linkedin_url) state.linkedin_url = [];
      state.linkedin_url.push(action.payload);
    },
    deleteFacebook: (state) => {
      if (state.facebook_url && state.facebook_url.length > 0) {
        state.facebook_url.pop();
      }
    },
    deleteTwitter: (state) => {
      if (state.twitter_url && state.twitter_url.length > 0) {
        state.twitter_url.pop();
      }
    },
    deleteInstagram: (state) => {
      if (state.instagram_url && state.instagram_url.length > 0) {
        state.instagram_url.pop();
      }
    },
    deleteLinkedIn: (state) => {
      if (state.linkedin_url && state.linkedin_url.length > 0) {
        state.linkedin_url.pop();
      }
    },
    setMaintenanceMode: (state, action: PayloadAction<boolean>) => {
      state.maintenance_mode = action.payload;
    },
    resetSettings: () => initialState,
  },
});

export const {
  setSocialLinks,
  setSiteName,
  setLogoUrl,
  setLogoId,
  setFavIcon,
  setEmail,
  setPhone,
  setAddress,
  resetSettings,
  setFacebook,
  setTwitter,
  setInstagram,
  setLinkedIn,
  deleteFacebook,
  deleteTwitter,
  deleteInstagram,
  deleteLinkedIn,
  setMaintenanceMode,
} = settingsSlice.actions;
export default settingsSlice.reducer;
export const currentSettings = (state: RootState) => state.settings;
