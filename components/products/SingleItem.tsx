import { shortenTitle } from "@helpers/methods";
import { IProduct, ProductItem } from "@helpers/types";
import Image2 from "next/image";
import CartIcon from '@public/images/icon-cart.svg'
import IconMinus from '@public/images/icon-minus.svg'
import IconPlus from '@public/images/icon-plus.svg'
import { useAppSelector } from "@helpers/redux.hooks";
import { addTocCart, removeCart } from "@utils/Redux/cart/cart.slice";
import { useDispatch } from "react-redux";
import ImageLoader from "@components/ImageLoader";

const SingleItem = ({ product }: ProductItem) => {
    const { title, price, image, description } = product;

    const dispatch = useDispatch()
    const {cartItems} = useAppSelector(state => state.cart)
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
    const isLast = getSpecificProduct(product) === 0

    return (

        <div className='bg-White px-4 mb-10 py-4 flex flex-col xs:flex-row items-center gap-20 mt-20 font-kumbh justify-center w-[90%] mx-auto xs:w-full'>
            <Image2
                src={image}
                loader={ImageLoader}
                alt={title}
                width={200}
                blurDataURL={image.toString()}
                height={200}
                priority
                className='w-auto h-auto'
            />
            <div className="flex justify-between gap-5 flex-col max-w-md tracking-wide">
                <h2 className='text-xl font-bold text-Orange'>Richard&apos;s Decko</h2>
                <h1 className='text-Black font-bold text-4xl'>{shortenTitle(title, 310)}</h1>
                <p className=" text-DGB font-kumbh">{description}</p>
                <div className="flex justify-between text-Black">
                    <span className=' font-bold text-3xl text-black '>${price}</span>
                </div>
                <div className="cart flex items-center xs:gap-8 gap-4 justify-center">
                    <div className="flex bg-GB h-12 flex-1 w-20 rounded-md sm:px-4  justify-between  items-center">
                        <button onClick={decrement} className={`cursor-pointer ${isLast && 'disabled:cursor-not-allowed'} h-full w-8 px-4`} >
                            <IconMinus />
                        </button>
                        <span className="text-Black font-bold text-2xl">{getSpecificProduct(product)}</span>
                        <button className="cursor-pointer h-full pl-1 w-8 text-center" onClick={increment}>
                            <IconPlus />
                        </button>

                    </div>
                    <button className="flex items-center justify-center gap-4 bg-Orange text-White h-12 xs:w-52 w-48  rounded-md " onClick={()=> dispatch(addTocCart(product))}>
                        <CartIcon />
                        <span>Add to cart</span>
                    </button>

                </div>

            </div>

        </div >
    );
}

export default SingleItem;
