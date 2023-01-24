import { cookiesKey, decodeToken } from "@helpers/methods";
import { UserProps } from "@helpers/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "@utils/store";
import { getCookie } from "cookies-next";
import { HYDRATE } from "next-redux-wrapper";



const userToken = getCookie(cookiesKey.token);
// console.log('token',userToken)
const decodedToken = decodeToken(userToken?.toString() as string);
const initialState: { user: UserProps } = {
    user: null as any,
}
export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action: PayloadAction<UserProps>) => {
            state.user = action.payload

        },
        logout: (state) => {
            state.user = null as any
        },
        updateUserProfile: (state, action: PayloadAction<{}>) => {
            state.user = {
                ...state.user,
                ...action.payload
            }
        }
    },
    extraReducers:{
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.user
            }
        }
    }
})
export const { loginUser, logout,updateUserProfile } = userSlice.actions

export const selectUser = (state: AppState) => state.user.user
const userSelector = createSelector(selectUser, (user) => user)

export default userSlice.reducer

// Path: utils\Redux\user\user.thunk.ts
// export const updateUserInfo  = (data) =>{

// }
