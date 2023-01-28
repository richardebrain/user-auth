import { useRouter } from "next/router";
import { AddressProps, IProduct } from "./types";
// import { getStatesOfCountry } from "country-state-city/lib/state";


var jwt = require('jsonwebtoken');
export function shortenTitle(title: string, maxLength: number) {
    if (title.length > maxLength) {
        return title.slice(0, maxLength) + '...';
    }
    return title;
}

export const cookiesKey = {
    cart: 'cart',
    user: 'user',
    token: 'token'

}

export const decodeToken = (token: string) => {
    const user = jwt.decode(token);
    return user;
}
export const Router = () => {
    const router = useRouter();
    return router;
}

// const findEndpointNode = (startNodeId: number, fromIds: number[], toIds: number[]) => {
//     const fromId = fromIds[startNodeId];
//     const toId = toIds[startNodeId];
//     for (let i = 0; i < fromIds.length; i++) {
//         if (fromId === toIds[i]) {


//             return findEndpointNode(i, fromIds, toIds);
//         }
//         return i;

//     }

//     if (toId === fromIds[i]) {

//         return findEndpointNode(i, fromIds, toIds);
//     }

// }



export const formatValue = (value: string) => {
    const splitValue = value?.split(' ') ?? [];
    return {
        code: splitValue[0],
    }
}

export const formatstateOrCountry = (value: string) => {
    const splitValue = value?.split(' ') ?? [];
    const greaterThan3 = splitValue.length >= 3;
    return {
        name: greaterThan3 ? splitValue.slice(1).join(' ') : splitValue[1],
    }
}


export const mappedState = (value: any) => {
    return value.map((val: any) => ({
        name: val.name,
        code: val.code
    }))
}


export const getAddressCount = (address: AddressProps[]) => (
    address.reduce((acc, curr) => {
        if (curr) {
            acc++
        }
        return acc
    }, 0)

)

export const productByCategory = (products: IProduct[]) => {
    const categories = products.map((product: IProduct) => product.category)
    const uniqueCategories = [...new Set(categories)]
    return uniqueCategories.map((category: string) => {
        return {
            name: category,
            products: products.filter((product: IProduct) => product.category === category)
        }
    })
}

export const getPrice = (product:IProduct) => {
    return (product.price * product.quantity).toFixed(2)
}