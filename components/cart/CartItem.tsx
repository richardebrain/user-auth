import { IProduct, ProductItem } from '@helpers/types'
import React from 'react'
import Image2 from 'next/image'
import { shortenTitle } from '@helpers/methods'
import DeleteIcon from '@public/images/icon-delete.svg'
import { useAppDispatch } from '@helpers/redux.hooks'
import { deleteCart } from '@utils/Redux/cart/cart.slice'

const CartItem = ({ product }: ProductItem) => {
    const getPrice = () => {
        return (product.price * product.quantity).toFixed(2)
    }
    const dispatch = useAppDispatch()

    const deleteCartItem = () => {
        dispatch(deleteCart(product))

    }
    return (
        <div className='flex  h-[4rem] justify-between items-center'>
            <div>
                <Image2
                    src={product.image}
                    alt={product.title}
                    width={20}
                    height={20}
                    priority
                    className='w-auto h-auto'
                />
            </div>
            <div className='flex flex-col text-VDB font-medium w-48'>
                <p>{shortenTitle(product.title, 21)}</p>
                <p className='gap-2 flex'>$ {product.price} &times; {product.quantity} <span className='font-bold text-Black'>${getPrice()}</span></p>

            </div>
            <div>
                <button onClick={deleteCartItem}>
                    <DeleteIcon className='w-4 h-4 cursor-pointer' />
                </button>
            </div>

        </div>
    )
}

export default CartItem