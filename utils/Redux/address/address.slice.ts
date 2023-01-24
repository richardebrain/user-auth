import { AddressProps, AddressStateProps } from "@helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addAddressbyId, editAddressById, removeAddressById, setDefault } from "./address-helpers";

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
            state.address = state.address.filter((item) => item.id !== action.payload.id)
        },
        editAddress: (state, action: PayloadAction<AddressProps>) => {
            state.address = editAddressById(state.address, action.payload)
        },
        setAsDefault: (state, action: PayloadAction<AddressProps>) => {
            state.address = setDefault(state.address, action.payload)
        }

    }
})

export const { setAddress, removeAddress, editAddress, setAsDefault } = addressSlice.actions
export default addressSlice.reducer
