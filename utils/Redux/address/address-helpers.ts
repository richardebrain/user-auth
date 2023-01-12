import { AddressProps, AddressStateProps } from "@helpers/types";

export const addAddressbyId = (address: AddressProps[], addressToAdd: AddressProps) => {
       const existingAddress = address.find((item) => item.id === addressToAdd.id);
       if(existingAddress){
           return address.map((item) => item.id === addressToAdd.id ? {...item, ...addressToAdd} : item)
       }
         return [...address, addressToAdd]

}

export const removeAddressById = (address: AddressProps[], addressToRemove: AddressProps) => {
    return address.filter((item) => item.id !== addressToRemove.id)

}

export const editAddressById = (address: AddressProps[], addressToEdit: AddressProps) => {
    const existingAddress = address.find((item) => item.id === addressToEdit.id);
    if(existingAddress){
        return address.map((item) => item.id === addressToEdit.id ? {...item, ...addressToEdit} : item)
    }
    return [...address, addressToEdit]
}