import { configureStore } from "@reduxjs/toolkit";
import agentProfileSlice from "./features/agent/agentProfileSlice";
import userSettingReducer from "./features/settings/userSettingsSlice";
import comboReducer from "./features/combo/comboSlice";
import addressReducer from "./features/address/addressSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      agentProfile: agentProfileSlice,
      userSettings: userSettingReducer,
      combo: comboReducer,
      address: addressReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
