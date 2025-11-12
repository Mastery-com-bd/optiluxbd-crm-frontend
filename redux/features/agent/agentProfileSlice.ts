import { RootState } from "@/redux/store";
import { TStatus } from "@/types/user/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// type TGender = "male" | "female" | "others";
type TProfileInitialState = {
  name: string;
  phone: string;
  profileImage: string | File;
  role: string;
  active: boolean;
  address: string;
  status: TStatus;
};

const initialState: Partial<TProfileInitialState> = {};

const agentProfileSlice = createSlice({
  name: "agentProfile",
  initialState: initialState,
  reducers: {
    setname: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPhone: (state, action: PayloadAction<string>) => {
      state.phone = action.payload;
    },
    setRole: (state, action: PayloadAction<string>) => {
      state.role = action.payload;
    },
    setActive: (state, action: PayloadAction<boolean>) => {
      state.active = action.payload;
    },
    setProfileImage: (state, action: PayloadAction<string | File>) => {
      state.profileImage = action.payload;
    },
    setStatus: (state, action: PayloadAction<TStatus>) => {
      state.status = action.payload;
    },
    setAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
    resetProfile: () => initialState,
  },
});

export const {
  setname,
  setPhone,
  setRole,
  setActive,
  setProfileImage,
  setStatus,
  setAddress,
  resetProfile,
} = agentProfileSlice.actions;
export default agentProfileSlice.reducer;
export const currentuserInfo = (state: RootState) => state.agentProfile;
