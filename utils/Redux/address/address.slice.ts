import { AddressProps, AddressStateProps } from "@helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addAddressbyId, editAddressById, removeAddressById } from "./address-helpers";

const initialState: AddressStateProps = {
    address: []
}

export const addressSlice = createSlice({
    name: "address",
    initialState,
    reducers: {
        setAddress: (state, action: PayloadAction<AddressProps>) => {
            state.address = addAddressbyId(state.address, action.payload)
        },
        removeAddress: (state, action: PayloadAction<AddressProps>) => {
            state.address = removeAddressById(state.address, action.payload)
        },
        editAddress: (state, action: PayloadAction<AddressProps>) => {
            state.address = editAddressById(state.address, action.payload)
        }

    }
})

export const { setAddress, removeAddress, editAddress } = addressSlice.actions
export default addressSlice.reducer
