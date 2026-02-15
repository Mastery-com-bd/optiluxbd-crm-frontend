import { configureStore } from "@reduxjs/toolkit";
import agentProfileSlice from "./features/agent/agentProfileSlice";
import settingReducer from "./features/settings/settingsSlice";
import comboReducer from "./features/combo/comboSlice";
import addressReducer from "./features/address/addressSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      agentProfile: agentProfileSlice,
      settings: settingReducer,
      combo: comboReducer,
      address: addressReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
