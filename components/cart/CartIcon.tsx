import { useAppSelector } from '@helpers/redux.hooks'
import { toggleCartView } from '@utils/Redux/cart/cart.slice'
import React from 'react'
import { useDispatch } from 'react-redux'
import CartLogo from '../../public/images/shopping-bag.svg'

const CartIcon = () => {
    const dispatch = useDispatch()
    const { cartItems } = useAppSelector(state => state.cart)
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0)
    return (
        <div className='cursor-pointer relative flex justify-center items-center' onClick={() => dispatch(toggleCartView())}>
            <CartLogo className='h-8 w-8' />
            <span className='absolute top-[0.6rem] text-sm font-thin'>
                {count}
            </span>


        </div>
    )
}

export default CartIcon