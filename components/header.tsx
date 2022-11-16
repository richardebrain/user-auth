import Link from 'next/link'
import React from 'react'
import HeaderLogo from '../public/images/logo.svg'
import CartLogo from '../public/images/icon-cart.svg'
import { useUser } from '@auth0/nextjs-auth0';
import Image from 'next/image'
import { headerTabs, routes } from '@helpers/routes';

const Header = () => {
    const { user, error, isLoading } = useUser();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const userProfileDropdown = () => {
        setIsMenuOpen(prev => !prev);
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
                <div className='cursor-pointer'>
                    <CartLogo />
                </div>
                {
                    user && user !== undefined ? (
                        <div onClick={userProfileDropdown} className='cursor-pointer'>
                            <Image
                                src={user?.picture || ''}
                                alt="Picture of the user"
                                width={60}
                                height={60}
                                className='rounded-full'
                                priority
                            />
                        </div>
                    ) : (
                        <div>
                            <Link href={routes.LOGIN} legacyBehavior><a className={`text-GB  font-medium ${hoverStyles}`}>Login</a></Link>
                        </div>
                    )
                }
                {
                    user && user !== undefined && isMenuOpen && (
                        <div className='absolute top-20 right-4 bg-white w-40 h-40 rounded-lg shadow-lg'>
                            <div className='flex flex-col gap-4 p-4 '>
                                <div className='flex flex-col gap-2 font-medium text-GB'>
                                    <Link href={routes.MYACCOUNT} className={`${hoverStyles}`} >My Account</Link>
                                    <Link href='/my-orders' className={`${hoverStyles}`}>My Orders</Link>
                                    <Link href='my-wishlist' className={`${hoverStyles}`}>My Wishlist</Link>
                                    <Link href={routes.LOGOUT} className={`${hoverStyles}`}>Logout</Link>
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

const hoverStyles = 'hover:text-Black'