import { IProduct, ProductItem } from '@helpers/types'
import { useAppSelector } from '@helpers/redux.hooks'
import React from 'react'
import CartItem from './CartItem'

const Cart = () => {
    const cart = useAppSelector(state => state?.cart.cartItems)
    return (
        <div className='flex justify-between flex-col w-80 z-50 bg-white shadow-md'>
            {/* cart header */}
            <div className=' border-b-GB border-b h-12 '>
                <h1>Cart</h1>
            </div>
            {/* cart main */}
            <div className=' flex flex-1 flex-col gap-2 px-4 overflow-y-auto py-2 h-32 justify-center'>
                {cart.length === 0 ? <p className='text-center'>Your cart is empty</p> :
                    cart.map((product: IProduct) => {
                        return <CartItem key={product.id} product={product} />
                    })
                }


            </div>
            {/* cart footer */}
            <div className='flex flex-col h-20 justify-center items-center'>
                <button className='bg-Black text-white w-60 h-10 rounded-md'>Checkout</button>
            </div>
        </div>
    )
}

export default Cart