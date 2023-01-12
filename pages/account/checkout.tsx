import { useAppSelector } from '@helpers/redux.hooks'
import React from 'react'

const Checkout = () => {
    const { cartItems } = useAppSelector(state => state.cart)
    return (
        <div>Checkout</div>
    )
}

export default Checkout

