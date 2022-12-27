import { ActionNames, ActionsType, IProduct, ProductItem, UserProps } from "@helpers/types"
export const incrementCartAction = () => {
    return {
        type: ActionNames.INCREMENT_CART
    }
}

export const decrementCartAction = () => {
    return {
        type: ActionNames.DECREMENT_CART
        
    }
}

export const AddtoCartAction = (product:IProduct): ActionsType<IProduct> => {
    return {
        type: ActionNames.ADD_TO_CART,
        payload: product
    }
}

export const LoginUserAction = (user: UserProps): ActionsType<UserProps> => {
    return {
        type: ActionNames.LOGIN_USER,
        payload: (user)
    }
}
    