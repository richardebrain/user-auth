import Link from 'next/link'
import React, { ReactElement, useEffect, useRef, useState } from 'react'
import HeaderLogo from '../public/images/logo.svg'
import Image from 'next/image'
import { headerTabs, routes } from '@helpers/routes';
import Cart from './cart/Cart';

import { useAppDispatch, useAppSelector } from '@helpers/redux.hooks'
import { auth } from '@utils/firebase'
import { signOut } from 'firebase/auth'
import { deleteCookie } from 'cookies-next'
import { cookiesKey } from '@helpers/methods'
import { logout } from '@utils/Redux/user/user.slice'
import CartIcon from './cart/CartIcon'
import { toggleCartView } from '@utils/Redux/cart/cart.slice';

interface RefObject<T> {
    current: T | null;
}


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const ref = useRef() as RefObject<HTMLDivElement>
    const dispatch = useAppDispatch()
    const userProfileDropdown = () => {
        setIsMenuOpen(prev => !prev);
    }
    const { user: { user }, cart: { hidden } } = useAppSelector(state => state)
    useEffect(() => {
        if (isLoading) {
            window.location.reload()
        }
    }, [isLoading])

    // const ClickOutside = (e) => {
    //     if(ref instanceof HTMLElement){
    //         if(ref.current.contains(e.target)){
    //             return
    //         }
    //     }
    // }

    useEffect(() => {
        const checkIfClickOutside = (e: any) => {

            if (!hidden && ref.current && !ref?.current?.contains(e.target)) {
                dispatch(toggleCartView())
            }
        }
        document.addEventListener('mousedown', checkIfClickOutside)
        return () => {
            document.removeEventListener('mousedown', checkIfClickOutside)
        }
    }, [hidden])

    const handleSignOut = async () => {
        await signOut(auth).then(() => {
            deleteCookie(cookiesKey.token)

            dispatch(logout)
            setIsLoading(true)

        })
    }

    return (
        <header className=' h-32 w-[80%] border-b-2 pb-0 flex justify-between  items-center mx-auto font-kumbh'>
            <div className='flex flex-1 gap-20'>

                <div className="nav-item">
                    <Link href="/"><HeaderLogo /></Link>
                </div>
                <div className="nav-item flex justify-between gap-8 text-GB font-kumbh font-medium ">
                    {
                        headerTabs.map((tab) => {
                            return <Link key={tab.name} href={`${tab.route}`}

                                className='hover:text-Black'>{tab.name}</Link>
                        })
                    }

                </div>
            </div>
            <div className="nav-item flex gap-8 items-center">
                <div >
                    <CartIcon />
                    {!hidden &&
                        <div className='top-24 right-32 absolute dropdown' ref={ref}>
                            <Cart />
                        </div>

                    }

                </div>
                {
                    user && user !== undefined ? (
                        <div onClick={userProfileDropdown} className='cursor-pointer  rounded-full border-White'>
                            {user?.picture ?
                                <Image
                                    src={user.picture || ''}
                                    alt="Picture of the user"
                                    width={60}
                                    height={60}
                                    className='rounded-full border-2 hover:border-Orange'
                                    priority
                                /> : <h6 className='flex items-center hover:text-Orange '>Hi ,{user.displayName || 'My Account'}</h6>
                            }
                        </div>
                    ) : (
                        <div>
                            <Link href={routes.SignIn} legacyBehavior ><a className={`text-GB  font-medium ${hoverStyles}`}>Login</a></Link>
                        </div>
                    )
                }
                {
                    user && user !== undefined && isMenuOpen && (
                        <div className='absolute top-20 right-4 bg-white w-40 h-40 rounded-lg shadow-lg '>
                            <div className='flex flex-col gap-4 p-4 '>
                                <div className='flex flex-col gap-2 font-medium text-GB items-start'>
                                    <Link href={routes.MYACCOUNT} className={`${hoverStyles}`} >My Account</Link>
                                    <Link href='/my-orders' className={`${hoverStyles}`}>My Orders</Link>
                                    <Link href='my-wishlist' className={`${hoverStyles}`}>My Wishlist</Link>
                                    <button onClick={() => handleSignOut()} className={`${hoverStyles} cursor-pointer`}>Logout</button>
                                </div>
                            </div>
                        </div>

                    )
                }
            </div>
        </header >
    )
}

export default Header

const hoverStyles = 'hover:text-Orange'