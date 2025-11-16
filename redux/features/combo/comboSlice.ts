import { RootState } from "@/redux/store";
import { TCombo } from "@/types/comboPackage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Partial<TCombo> = {};

const comboSlice = createSlice({
  name: "combo",
  initialState: initialState,
  reducers: {
    setname: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setDiscountPrice: (state, action: PayloadAction<number>) => {
      state.discountPrice = action.payload;
    },
    setFeatured: (state, action: PayloadAction<boolean>) => {
      state.is_featured = action.payload;
    },
    setSku: (state, action: PayloadAction<string>) => {
      const value = `PKG-${action.payload}`;
      state.sku = value;
    },
    setTags: (state, action: PayloadAction<string[]>) => {
      state.tags = action.payload;
    },
    resetCombo: () => initialState,
  },
});

export const {
  setname,
  setDescription,
  setDiscountPrice,
  setFeatured,
  setTags,
  resetCombo,
  setSku,
} = comboSlice.actions;
export default comboSlice.reducer;
export const currentCombo = (state: RootState) => state.combo;
