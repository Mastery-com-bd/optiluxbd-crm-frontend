import { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAddressInitialState = {
  division: string;
  city: string;
  thana: string;
  post: string;
  street: string;
};

const initialState: Partial<TAddressInitialState> = {};

const addressSlice = createSlice({
  name: "address",
  initialState: initialState,
  reducers: {
    setDivission: (state, action: PayloadAction<string>) => {
      state.division = action.payload;
    },
    setCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setThana: (state, action: PayloadAction<string>) => {
      state.thana = action.payload;
    },
    setPost: (state, action: PayloadAction<string>) => {
      state.post = action.payload;
    },
    setStreet: (state, action: PayloadAction<string>) => {
      state.street = action.payload;
    },
    resetAddress: () => initialState,
  },
});

export const {
  setDivission,
  setCity,
  setThana,
  setPost,
  setStreet,
  resetAddress,
} = addressSlice.actions;
export default addressSlice.reducer;
export const currentAddress = (state: RootState) => state.address;
