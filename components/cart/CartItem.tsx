import { IProduct, ProductItem } from '@helpers/types'
import React from 'react'
import Image2 from 'next/image'
import { getPrice, shortenTitle } from '@helpers/methods'
import DeleteIcon from '@public/images/icon-delete.svg'
import { deleteCart } from '@utils/Redux/cart/cart.slice'
import { useAppDispatch } from '@helpers/redux.hooks'
import { auth, clearCart } from '@utils/firebase'
import { toast } from 'react-toastify'

const CartItem = ({ product }: ProductItem) => {

    const dispatch = useAppDispatch()

    const deleteCartItem = async (product: IProduct) => {
        dispatch(deleteCart(product))
        await clearCart(auth.currentUser!, product).then(() => {
            toast.success('Item deleted from cart')
        })


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
                <p className='gap-2 flex'>$ {product.price} &times; {product.quantity} <span className='font-bold text-Black'>${getPrice(product)}</span></p>

            </div>
            <div>
                <button onClick={() => deleteCartItem(product)}>
                    <DeleteIcon className='w-4 h-4 cursor-pointer' />
                </button>
            </div>

        </div>
    )
}

export default CartItem