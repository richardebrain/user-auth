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
import { motion } from "framer-motion";
import { useState } from "react";
import { addItemToCart, auth, removeProductFromServer } from "@utils/firebase";
import { removeItemFromCart } from "@utils/Redux/cart/cart.hellpers";
import { toast } from "react-toastify";
import Spinner from "@components/Spinner";

type SingleItemProps = {
    product: IProduct

}
const SingleItem = ({ product }: SingleItemProps) => {
    const { title, price, image, description } = product;
    const [isAddingOrRemoving, setIsAddingOrRemoving] = useState<boolean>(false)
    const [imageLoading, setImageLoading] = useState<boolean>(true)

    const dispatch = useDispatch()
    const { cartItems } = useAppSelector(state => state.cart)
    const decrement = async () => {
        if (getSpecificProduct(product) == 0) return;
        setIsAddingOrRemoving(true)
        if (getSpecificProduct(product) > 0) {
            await removeProductFromServer(auth?.currentUser!, product).then(() => {
                toast.success('Item removed from cart', {
                    toastId: 'removeItem'
                })
                dispatch(removeCart(product))
                setIsAddingOrRemoving(false)

            })
        }
    }
    const add = async (product: IProduct) => {
        setIsAddingOrRemoving(true)
        await addItemToCart(auth?.currentUser!, product).then(() => {
            toast.success('Item added to cart', {
                // position: toast.POSITION.BOTTOM_LEFT,
                toastId: 'addItem'
            })
            dispatch(addTocCart(product))
            setIsAddingOrRemoving(false)
        })
    }
    const getSpecificProduct = (product: IProduct) => {
        const index = cartItems.find((item: IProduct) => item.id === product.id)
        return index?.quantity!! || 0
    }
    const isLast = getSpecificProduct(product) === 0

    return (

        <div className='bg-White px-4 mb-10 py-4 flex flex-col xs:flex-row items-center gap-20 mt-20 font-kumbh justify-center w-[92%] mx-auto xs:w-full'>
            <div className="flex items-center relative">
                {
                    imageLoading && <div className={`w-60 h-60 bg-gray-200 animate-pulse absolute`} />
                    //     <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
                    //     <div className="animate-pulse flex space-x-4">
                    //         <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                    //         <div className="flex-1 space-y-6 py-1">
                    //             <div className="h-2 bg-slate-700 rounded"></div>
                    //             <div className="space-y-3" >
                    //                 <div className="grid grid-cols-3 gap-4" >
                    //                     <div className="h-2 bg-slate-700 rounded col-span-2" ></div >
                    //                     <div className="h-2 bg-slate-700 rounded col-span-1" ></div >
                    //                 </div >
                    //                 <div className="h-2 bg-slate-700 rounded" ></div >
                    //             </div >
                    //         </div >
                    //     </div >
                    // </div >
                }
                <Image2
                    src={image}
                    loader={ImageLoader}
                    alt={title}
                    width={100}
                    blurDataURL={image.toString()}
                    placeholder='blur'
                    height={100}
                    priority
                    className={`w-60 h-60 z-10`}
                    onLoadingComplete={() => setImageLoading(false)}

                />
            </div>

            <div className="flex justify-between gap-5 flex-col max-w-md  px-4">
                <h2 className='text-xl font-bold text-Orange  tracking-wide'>Richard&apos;s Decko</h2>
                <h1 className='text-Black font-bold text-4xl tracking-wide '>{shortenTitle(title, 310)}</h1>
                <p className=" text-DGB font-kumbh tracking-wide">{description}</p>
                <div className="flex justify-between text-Black">
                    <span className=' font-bold text-3xl text-black '>${price}</span>
                </div>
                {
                    <div className={`cart flex items-center xs:gap-8 gap-6 justify-center `}>
                        <div className="flex bg-GB h-12 w-32 xs:flex-1 xs:w-16 rounded-md sm:px-4  items-center justify-between">
                            <button onClick={decrement} className={`cursor-pointer ${isLast && 'cursor-not-allowed '} h-full w-8 xs:w-12 px-4 `} disabled={isAddingOrRemoving}>
                                <IconMinus />
                            </button>

                            {isAddingOrRemoving ? <Spinner className="text-white w-4 h-4 animate-spin" /> :
                                <span className="text-Black font-bold text-2xl w-4">{getSpecificProduct(product)}</span>
                            }
                            <button className="cursor-pointer h-full pl-1 w-8 xs-w-12 text-center" onClick={() => add(product)} disabled={isAddingOrRemoving}>
                                <IconPlus />
                            </button>

                        </div>

                        <button className="flex items-center justify-center gap-4 bg-Orange text-White h-12 xs:w-52 w-40  rounded-md " onClick={() => add(product)} disabled={isAddingOrRemoving}>

                            <CartIcon />
                            <span>Add to cart</span>
                        </button>


                    </div>
                }

            </div>

        </div >
    );
}

export default SingleItem;
