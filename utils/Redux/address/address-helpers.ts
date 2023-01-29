import { AddressProps, AddressStateProps } from "@helpers/types";
import { toast } from "react-toastify";

export const addAddressbyId = (address: AddressProps[], addressToAdd: AddressProps) => {
    const existingAddress = address.find((item) => item.id === addressToAdd.id);
    if (address.length === 0) {
        addressToAdd.isDefault = true
    }
    if (existingAddress) {
        return address.map((item) => item.id === addressToAdd.id ? { ...item, ...addressToAdd, isDefault: false } : item)
    }
    return [...address, addressToAdd]

}

export const setLastItemtoDefault = (address: AddressProps[], addressToRemove: AddressProps) => {
    if (address.length === 1) {
        address.map((item) => {
            item.isDefault = true
            return item
        }
        )
    }
    return address

}

export const editAddressById = (address: AddressProps[], addressToEdit: AddressProps) => {
    const existingAddress = address.find((item) => item.id === addressToEdit.id);
    if (existingAddress) {
        return address.map((item) => item.id === addressToEdit.id ? { ...item, ...addressToEdit } : item)
    }
    return [...address, addressToEdit]
}

export const setDefault = (address: AddressProps[], addressToSetAsDefault: AddressProps) => {
    if (address.length === 1) {
        // if there is only one address, set it as default
        address.map((item) => {
            item.isDefault = true
            return item
        }
        )
    } else address.map((item) => {

        if (item.id === addressToSetAsDefault.id) {
            item.isDefault = true
        } else {
            item.isDefault = false
        }
        return item
    })
    return address
    
}

export const deleteAddress = (address: AddressProps[], addressToRemove: AddressProps) => {
   return address.filter((item) => item.id !== addressToRemove.id)
}