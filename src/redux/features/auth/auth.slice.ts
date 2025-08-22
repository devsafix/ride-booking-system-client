import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  _id: string;
  name: string;
  email: string;
  contactNo: string;
  role: "rider" | "driver" | "admin";
}

// Define the shape of the authentication state.
interface IAuthState {
  user: IUser | null;
  token: string | null;
}

const initialState: IAuthState = {
  user: null,
  token: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // The payload type is updated to reflect the 'data' property
    setCredentials: (
      state,
      action: PayloadAction<{ user: { data: IUser }; token: string | null }>
    ) => {
      // The state is now correctly updated with the nested user data.
      state.user = action.payload.user.data;
      state.token = action.payload.token;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

// Selector to easily get the current user's data from the state.
export const selectCurrentUser = (state: { auth: IAuthState }) =>
  state?.auth?.user;

// Selector to get the current user's token.
export const selectCurrentToken = (state: { auth: IAuthState }) =>
  state?.auth?.token;
