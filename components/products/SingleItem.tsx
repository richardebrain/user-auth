import { shortenTitle } from "@helpers/methods";
import { IProduct, ProductItem } from "@helpers/types";
import Image2 from "next/image";
import CartIcon from '@public/images/icon-cart.svg'
import IconMinus from '@public/images/icon-minus.svg'
import IconPlus from '@public/images/icon-plus.svg'
import { useAppDispatch, useAppSelector } from "@helpers/redux.hooks";
import { incrementCart, decrementCart, addTocCart, removeCart } from "@utils/Redux/cart/cart.slice";

const SingleItem = ({ product }: ProductItem) => {
    const { title, price, image, description } = product;

    const dispatch = useAppDispatch()
    const {cartItems,count} = useAppSelector(state => state.cart)
    const decrement = () => {
        if (getSpecificProduct(product) > 0) {
            dispatch(removeCart(product))
        }

    }
    const increment = () => {
        dispatch(addTocCart(product))
    }
    const getSpecificProduct = (product: IProduct) => {
        const index = cartItems.find((item: IProduct) => item.id === product.id)
        return index?.quantity!! || 0
    }
    const islast = count === 0;

    return (

        <div className='bg-White px-4 mb-10 py-4 flex items-center gap-20 mt-20 font-kumbh justify-center'>
            <Image2
                src={image}
                alt={title}
                width={200}
                height={200}
                priority
                className='w-auto h-auto'
            />
            <div className="flex justicy-between gap-5 flex-col max-w-md tracking-wide">
                <h2 className='text-xl font-bold text-Orange'>Richard&apos;s Decko</h2>
                <h1 className='text-Black font-bold text-4xl'>{shortenTitle(title, 310)}</h1>
                <p className=" text-DGB font-kumbh">{description}</p>
                <div className="flex justify-between text-Black">
                    <span className=' font-bold text-3xl text-black '>${price}</span>
                </div>
                <div className="cart flex items-center gap-8 justify-center">
                    <div className="flex bg-GB h-12 flex-1 rounded-md px-4 justify-between ter items-center">
                        <button onClick={decrement} className={`cursor-pointer ${islast && 'disabled:cursor-not-allowed'} h-full`} >
                            <IconMinus />
                        </button>
                        <span className="text-Black font-bold text-2xl">{getSpecificProduct(product)}</span>
                        <button className="cursor-pointer h-full" onClick={increment}>
                            <IconPlus />
                        </button>

                    </div>
                    <button className="flex items-center justify-center gap-4 bg-Orange text-White h-12 w-60 rounded-md " onClick={()=> dispatch(addTocCart(product))}>
                        <CartIcon />
                        <span>Add to cart</span>
                    </button>

                </div>

            </div>

        </div >
    );
}

export default SingleItem;
