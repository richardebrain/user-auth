import { AddressProps, AddressStateProps } from "@helpers/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { addAddressbyId, editAddressById, setLastItemtoDefault, setDefault, deleteAddress } from "./address-helpers";

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
            state.address = deleteAddress(state.address, action.payload)

        },
        editAddress: (state, action: PayloadAction<AddressProps>) => {
            state.address = editAddressById(state.address, action.payload)

        },
        setAsDefault: (state, action: PayloadAction<AddressProps>) => {
            state.address = setDefault(state.address, action.payload)
        },
        setLastToDefault: (state, action: PayloadAction<AddressProps>) => {
            state.address = setLastItemtoDefault(state.address, action.payload)
        },
        setAddressFromServer: (state, action: PayloadAction<AddressProps[]>) => {
            state.address = action.payload
        }

    }
})

export const { setAddress, removeAddress, editAddress, setAsDefault ,setLastToDefault,setAddressFromServer} = addressSlice.actions
export default addressSlice.reducer
