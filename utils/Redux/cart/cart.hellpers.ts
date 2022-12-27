import { IProduct } from "@helpers/types";

export const filterCartById = (cartItems: IProduct[], itemToAdd: IProduct) => {
    const existingCartItem = cartItems.find((item) => item.id === itemToAdd.id);

    if (existingCartItem) {
        return cartItems.map((item) =>
            item.id === itemToAdd.id ? { ...item, quantity: item?.quantity! + 1 } : item
        );
    }

    return [...cartItems, { ...itemToAdd, quantity: 1 }];


}
export const removeItemFromCart = (cartItems: IProduct[], itemToRemove: IProduct) => {
    const existingCartItem = cartItems.find((item) => item.id === itemToRemove.id);

    if (existingCartItem?.quantity === 1) {
        return cartItems.filter((item) => item.id !== itemToRemove.id);
    }

    return cartItems.map((item) =>
        item.id === itemToRemove.id ? { ...item, quantity: item?.quantity! - 1 } : item
    );
}

// export const addItemToCart = (cartItems : IProduct[], cartItemToAdd:IProduct) => {
//     const existingCartItem = cartItems.find(
//         cartItem => cartItem.id === cartItemToAdd.id
//     );

//     if (existingCartItem) {
//         return cartItems.map(cartItem =>
//             cartItem.id === cartItemToAdd.id
//                 ? { ...cartItem, quantity: cartItem.quantity + 1 }
//                 : cartItem
//         );
//     }

//     return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
// }
