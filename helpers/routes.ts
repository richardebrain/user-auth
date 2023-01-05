export const routes = {
    HOME: '/',
    PRODUCT: '/products',
    CART: '/cart',
    SignUp: '/sign/sign-up',
    SignIn: '/sign/sign-in',
    LOGOUT: '/api/firebase/logout',
    CATEGORY: {
        ELECTRONICS: '/products/electronics',
        MENSCLOTHING: '/products/men\'s clothing',
        WOMENSCLOTHING: '/products/women\'s clothing',
        JEWELERY: '/products/jewelery',
    },
    ORDERS: '/orders',
    MYACCOUNT: '/account/my-account',
    SINGLEPRODUCT: '/products/category',
    RESETPASSWORD: '/sign/password-reset',

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
