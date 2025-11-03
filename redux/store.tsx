import { configureStore } from "@reduxjs/toolkit";
import agentProfileSlice from "./features/agent/agentProfileSlice";
export const store = configureStore({
  reducer: {
    agentProfile: agentProfileSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
