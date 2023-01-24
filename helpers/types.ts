import { AccountDetails } from "@components/my-account/AccountDetails";
import AccountOverview from "@components/my-account/AccountOverview";
import AddressBook from "@components/my-account/AdrdessBook";


export interface IProduct {
    id: number;
    category: string;
    description: string;
    image: string;
    price: number;
    rating: {
        rate: number;
        count: number;
    }
    title: string;
    quantity: number;

}

export type ProductItem = {
    product: IProduct
};


export interface ICart {
    cartItems: IProduct[];
    hidden: boolean;

}

export interface ActionsType<T> {
    type: ActionNames;
    payload: T;

}
export enum ActionNames {
    INCREMENT_CART = 'INCREMENT_CART',
    DECREMENT_CART = 'DECREMENT_CART',
    ADD_TO_CART = 'ADD_TO_CART',
    LOGIN_USER = "LOGIN_USER"
}

export enum AccountSideBar {
    ACCOUNT_OVERVIEW = 'ACCOUNT_OVERVIEW',
    MY_ORDERS = 'MY_ORDERS',
    MY_ADDRESSES = 'MY_ADDRESSES',
    MY_CARDS = 'MY_CARDS',
    LOGOUT = 'LOGOUT'


}

export type AccountSideBarType = {
    currentView: keyof typeof Screens;
}


export const Screens = {
    'Account Overview': AccountOverview,
    'Address Book': AddressBook,
    'Account Detail': AccountDetails,

}
export const screenArray = Object.keys(Screens) as (keyof typeof Screens)[];
export type UserProps = {
    picture?: string;
    id: string;
    displayName: string;
    email: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
    firstName: string;
    lastName: string;
}
export type AddressProps = {
    id: string;
    address: string;
    city: string;
    country: string;
    firstName: string;
    lastName: string;
    phone: string;
    state: string;
    additionalInfo: string;
    userId: string;
    isDefault: boolean;
    additionalPhoneNumber: string;
}
export type AddressStateProps = {
    address: AddressProps[];

}
export type OrderProps = {
    id: string;
    createdAt: {
        seconds: number;
        nanoseconds: number;
    };
    items: IProduct[];
    total: number;
    userId: string;

}
// export interface UserSnapSot {
//     displayName: string;
//     email: string;
//     createdAt: {
//         seconds: number;
//         nanoseconds: number;
//     };
//     firstName: string;
//     lastName: string;
// }

export type AddressForm = {
    firstName: string
    lastname: string
    address: string
    city: string
    state: string
    country: string
    phone: string
    additionalInfo: string
    addressId?: string
    isDefault?: boolean
    additionalPhoneNumber: string


}
