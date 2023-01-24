import Link from 'next/link'
import React, { useEffect, useState } from 'react'
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
import RefreshHook from '@helpers/hooks/refresh-hook';
import { toggleAccountBar, toggleSidebar } from '@utils/Redux/modals/modal.slice';
import MenuIcon from '../public/images/menu-icon.svg'
import Sidebar from './sidebar';
import CloseIcon from '../public/images/icon-close.svg'
import UserIcon from '../public/images/user.svg'

const Header = () => {
    const [isLoading, setIsLoading] = useState(false)
    // const ref = useRef() as RefObject<HTMLDivElement>
    const dispatch = useAppDispatch()

    const { user: { user }, cart: { hidden }, modal: { accountBar, sidebarView } } = useAppSelector(state => state)
    useEffect(() => {
        if (isLoading) {
            window.location.reload()
        }
    }, [isLoading])
    const { ref: sidebarRef } = RefreshHook({ view: sidebarView, toggleView: toggleSidebar })
    const handleSignOut = async () => {
        await signOut(auth).then(() => {
            deleteCookie(cookiesKey.user)
            dispatch(logout)
            setIsLoading(true)

        })
    }
    useEffect(() => {
        // disable scroll when sidebar is open
        if (!sidebarView) {
            document.body.style.overflow = 'hidden'
        }
        else {
            document.body.style.overflow = 'unset'
        }

    }, [sidebarView])
    return (
        <header className=' h-16 xs:h-32 w-full justify-between px-5 xs:px-0  xs:w-[80%] border-b-2 pb-0 flex  items-center mx-auto font-kumbh'>

            <div className='flex xs:gap-20 overflow-hidden gap-4  items-center'>
                <div className='flex xs:hidden flex-col relative w-6 h-6' onClick={() => dispatch(toggleSidebar())} >
                    {sidebarView ?
                        <MenuIcon className='cursor-pointer h-6 w-6' />
                        :
                        <CloseIcon className='cursor-pointer' />
                    }
                    {/* sidebar */}
                    {
                        <div className={`flex xs:hidden flex-col fixed bg-gray-100 top-[4rem] h-[100vh] ${!sidebarView ? 'animate-left' : '-translate-x-full duration-500 ease-in '} left-0 z-50 w-full  `} ref={sidebarRef}  >
                            <Sidebar />
                        </div>}
                </div>

                <div className="nav-item">
                    <Link href="/"><HeaderLogo /></Link>
                </div>
                <div className="hidden nav-item xs:flex justify-between gap-8 font-kumbh font-medium">
                    {
                        headerTabs.map((tab) => {
                            return <Link key={tab.name} href={`${tab.route}`}

                                className=' hover:text-Orange'>{tab.name}</Link>
                        })
                    }

                </div>
            </div>
            {/* mobile view */}


            {/* desktop view */}
            <div className=" nav-item flex xs:w-56  flex-row-reverse gap-4 xs:justify-between items-center xs:flex-row ">
                <div >
                    <CartIcon />
                    {!hidden &&
                        <div className='xs:top-32 top-16 right-0 xs:right-32 absolute dropdown z-20 ' >
                            <Cart />
                        </div>

                    }

                </div>
                {
                    user && user !== undefined ? (
                        <div onClick={() => dispatch(toggleAccountBar())} className='cursor-pointer  rounded-full border-White hidden xs:block'>
                            {user?.picture ?
                                <Image
                                    src={user.picture || ''}
                                    alt="Picture of the user"
                                    width={60}
                                    height={60}
                                    className='rounded-full border-2 hover:border-Orange'
                                    priority
                                /> :
                                // <h6 className='flex items-center hover:text-Orange '>
                                //     Hi ,{user.displayName || 'My Account'}</h6>
                                <div className={`xs:flex  xs:w-fit xs:hover:bg-gray-200 xs:h-12 rounded-md items-center px-1 ${!accountBar ? 'xs:bg-gray-200 bg-none' : ''}  ${user ? 'text-Orange' : ''} `}>

                                    <UserIcon className={`w-8 h-18 flex items-center `} />
                                    <h2 className='hidden xs:flex xs:w-36 hover:text-Orange'>Hi, {user.displayName}</h2>
                                </div>
                            }
                        </div>
                    ) : (
                        <div>
                            <Link href={routes.SignIn} legacyBehavior ><a className={`text-GB  font-medium ${hoverStyles}`}><UserIcon className='text-black' /></a></Link>
                        </div>
                    )
                }
                {/* account modal */}
                {
                    user && user !== undefined && !accountBar && (
                        <div className='absolute xs:top-32 top-16 xs:right-44 right-0 bg-white w-48 h-40 rounded-lg shadow-lg z-50' >
                            <div className='flex flex-col gap-4 p-4 '>
                                <div className='flex flex-col gap-2 font-medium text-GB items-start'>
                                    <Link href={`${routes.MYACCOUNT}my-account`} className={`${hoverStyles}`} >My Account</Link>
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