export const routes = {
    HOME: '/',
    PRODUCT: '/products',
    CART: '/cart',
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    CATEGORY: {
        ELECTRONICS: '/products/electronics',
        MENSCLOTHING: '/products/men\'s clothing',
        WOMENSCLOTHING: '/products/women\'s clothing',
        JEWELERY: '/products/jewelery',
    },
    ORDERS: '/orders',
    MYACCOUNT: '/account/my-account',

}

export const headerTabs = [
    {
        name: 'Mens',
        route: routes.CATEGORY.MENSCLOTHING,
        id:'mens-clothing'

    }, {
        name: 'Womens',
        route: routes.CATEGORY.WOMENSCLOTHING,
        id:'womens-clothing'
    },
    {
        name: 'Jewelery',
        route: routes.CATEGORY.JEWELERY,
        id:'jewelery'
    }, {
        name: 'Electronics',
        route: routes.CATEGORY.ELECTRONICS,
        id:'electronics'
    }

]
