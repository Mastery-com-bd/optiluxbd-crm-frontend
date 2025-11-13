import { TSettings } from "@/components/pages/dashboard/settings/settings.types";
import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<TSettings> = {};

const settingsSlice = createSlice({
  name: "settings",
  initialState: initialState,
  reducers: {
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

    resetSettings: () => initialState,
  },
});

export const {
  setSiteName,
  setLogoUrl,
  setLogoId,
  setFavIcon,
  setEmail,
  setPhone,
  setAddress,
  resetSettings,
} = settingsSlice.actions;
export default settingsSlice.reducer;
export const currentSettings = (state: RootState) => state.settings;
