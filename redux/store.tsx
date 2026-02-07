import { configureStore } from "@reduxjs/toolkit";
import agentProfileSlice from "./features/agent/agentProfileSlice";
import settingReducer from "./features/settings/settingsSlice";
import comboReducer from "./features/combo/comboSlice";
import addressReducer from "./features/address/addressSlice";

export const store = configureStore({
  reducer: {
    agentProfile: agentProfileSlice,
    settings: settingReducer,
    combo: comboReducer,
    address: addressReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
