import { createSlice } from "@reduxjs/toolkit";


export const modalSlice = createSlice({
    name: "modal",
    initialState: {
        modal: false,
    },
    reducers: {
        toggleModal: (state) => {
             state.modal = !state.modal
        }
    }
})

export default modalSlice.reducer;
export const { toggleModal } = modalSlice.actions;