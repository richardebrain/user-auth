import AccountOverview from "@components/my-account/AccountOverview";
import { AccountSideBar, AccountSideBarType } from "@helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import React from "react";

const initialState: AccountSideBarType = {
    currentView: 'Account Overview'
    
}

export const screenSlice = createSlice({
    name: 'screen',
    initialState,
    reducers: {
        setScreen: (state, action: PayloadAction<AccountSideBarType>)=> {
            state.currentView = action.payload.currentView
        },

    }
})
export const { setScreen } = screenSlice.actions
export default screenSlice.reducer