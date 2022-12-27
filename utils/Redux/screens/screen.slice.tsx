import { AccountSideBar, AccountSideBarType } from "@helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    screen: AccountSideBar.ACCOUNT_OVERVIEW,

}

const screenSlice = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        setScreen: (state, action:PayloadAction<AccountSideBarType>) => {
            state.screen = action.payload
        }
    }
})
export const { setScreen } = screenSlice.actions
export default screenSlice.reducer