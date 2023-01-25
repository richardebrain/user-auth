export const routes = {
    HOME: '/',
    PRODUCT: '/products',
    CART: '/cart',
    SignUp: '/sign/sign-up',
    SignIn: '/sign/sign-in',
    CATEGORY: {
        ELECTRONICS: '/products/electronics',
        MENSCLOTHING: '/products/men\'s clothing',
        WOMENSCLOTHING: '/products/women\'s clothing',
        JEWELERY: '/products/jewelery',
    },
    ORDERS: '/account/orders',
    MYACCOUNT: '/account/',
    SINGLEPRODUCT: '/products/category',
    RESETPASSWORD: '/sign/password-reset',
    CHECKOUT: '/account/checkout',
    ADDRESS: '/account/address/',
    CREATE_ADDRESS: '/account/address/create',
    WISHLIST: '/account/wishlist'

}
export type HeaderTabs = {
    name: string,
    route: string,
    id: string
}
export const headerTabs: HeaderTabs[] = [
    {
        name: 'Mens',
        route: routes.CATEGORY.MENSCLOTHING,
        id: 'mens-clothing'

    }, {
        name: 'Womens',
        route: routes.CATEGORY.WOMENSCLOTHING,
        id: 'womens-clothing'
    },
    {
        name: 'Jewelery',
        route: routes.CATEGORY.JEWELERY,
        id: 'jewelery'
    }, {
        name: 'Electronics',
        route: routes.CATEGORY.ELECTRONICS,
        id: 'electronics'
    }

]


export const accountBarNav = [
    {
        name: 'Account Overview',
        path: `${routes.MYACCOUNT}my-account`

    },
    {
        name: 'Address Book',
        path: `${routes.MYACCOUNT}address`

    },
    {
        name: 'My Orders',
        path: `${routes.MYACCOUNT}orders`
    },
    {
        name: 'My Wishlist',
        path: `${routes.MYACCOUNT}wishlist`
    },
    {
        name: 'Account Details',
        path: `${routes.MYACCOUNT}profile`
    },
]