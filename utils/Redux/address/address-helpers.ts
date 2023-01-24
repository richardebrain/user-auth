import { AddressProps, AddressStateProps } from "@helpers/types";

export const addAddressbyId = (address: AddressProps[], addressToAdd: AddressProps) => {
    const existingAddress = address.find((item) => item.id === addressToAdd.id);
    if (existingAddress) {
        return address.map((item) => item.id === addressToAdd.id ? { ...item, ...addressToAdd } : item)
    }
    return [...address, addressToAdd]

}

export const removeAddressById = (address: AddressProps[], { id }: AddressProps) => {
    return address.filter((item) => item.id !== id)

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