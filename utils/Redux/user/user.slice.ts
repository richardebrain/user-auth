import { cookiesKey, decodeToken } from "@helpers/methods";
import { UserProps } from "@helpers/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@utils/store";
import { getCookie, deleteCookie } from "cookies-next";
import { HYDRATE } from "next-redux-wrapper";

const userToken = getCookie(cookiesKey.token);
// console.log('token',userToken)
const decodedToken = decodeToken(userToken?.toString() as string);
console.log(decodedToken);
const initialState: { user: UserProps | null } = {
  user: null,
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginUser: (state, action: PayloadAction<UserProps>) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    updateUserProfile: (state, action: PayloadAction<UserProps>) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.user,
      };
    },
  },
});
export const { loginUser, logout, updateUserProfile } = userSlice.actions;

export const selectUser = (state: AppState) => state.user.user;
const userSelector = createSelector(selectUser, (user) => user);

export default userSlice.reducer;
