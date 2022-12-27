import { cookiesKey, decodeToken } from "@helpers/methods";
import { UserProps } from "@helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";



const userToken = getCookie(cookiesKey.token);
const decodedToken = decodeToken(userToken?.toString() as string);
const initialState: { user: UserProps } = {
    user: decodedToken ? decodedToken : null,
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
        }
    }
})
export const { loginUser, logout } = userSlice.actions
export default userSlice.reducer

