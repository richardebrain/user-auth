import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "@utils/store";
import { HYDRATE } from "next-redux-wrapper";


export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        modal: false,
        accountBar: true,
    },
    reducers: {
        toggleModal: (state) => {
             state.modal = !state.modal
        },
        toggleAccountBar: (state) => {
            state.accountBar = !state.accountBar
        }

    },
    extraReducers:{
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.modal
            }
        }

    }
})

export const { toggleModal,toggleAccountBar } = modalSlice.actions;
export const selectModal = (state: AppState) => state.modal;
export default modalSlice.reducer;