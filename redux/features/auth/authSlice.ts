import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TPermission = {
  name: string;
};

export type TUSerRole = {
  role: {
    name: string;
    permissions: TPermission[];
    id?: number;
  };
};

export type TAuthUSer = {
  id: number;
  name: string;
  email: string;
  avatar_secure_url: string | null;
  roles: TUSerRole[];
};

export type TAuthState = {
  user: null | TAuthUSer;
  token: null | string;
};

const initialState: TAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TAuthUSer>) => {
      state.user = action.payload;
    },
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setToken, logOut } = authSlice.actions;
export default authSlice.reducer;
