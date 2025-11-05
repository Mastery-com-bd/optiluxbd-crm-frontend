import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TGender = "male" | "female" | "others";
type TProfileInitialState = {
  name: string;
  phone: string;
  city: string;
  country: string;
  profileImage: string | File;
  dateOfBirth: string;
  gender: TGender;
  bio: string;
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
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setCountry: (state, action: PayloadAction<string>) => {
      state.country = action.payload;
    },
    setProfileImage: (state, action: PayloadAction<string | File>) => {
      state.profileImage = action.payload;
    },
    setDateOfBirth: (state, action: PayloadAction<string>) => {
      state.dateOfBirth = action.payload;
    },
    setGender: (state, action: PayloadAction<TGender>) => {
      state.gender = action.payload;
    },
    setBio: (state, action: PayloadAction<string>) => {
      state.bio = action.payload;
    },
    resetProfile: () => initialState,
  },
});

export const {
  setname,
  setPhone,
  setCity,
  setCountry,
  setProfileImage,
  setDateOfBirth,
  setGender,
  setBio,
  resetProfile,
} = agentProfileSlice.actions;
export default agentProfileSlice.reducer;
export const currentuserInfo = (state: RootState) => state.agentProfile;
