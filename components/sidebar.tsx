import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '@helpers/redux.hooks'
import { HeaderTabs, headerTabs, routes } from '@helpers/routes'
import Link from 'next/link'
import { signOut } from 'firebase/auth'
import { auth } from '@utils/firebase'
import { deleteCookie } from 'cookies-next'
import { cookiesKey } from '@helpers/methods'
import { logout } from '@utils/Redux/user/user.slice'
import { useEffect } from 'react'

const Sidebar = () => {
    const { user } = useAppSelector(state => state.user)
    const dispatch = useAppDispatch()
    const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     if (isLoading) {
    //         window.location.reload()
    //         console.log(window.location.pathname)
    //     }
    // }, [isLoading])

    const handleSignOut = async () => {
        await signOut(auth).then(() => {
            deleteCookie(cookiesKey.user)
            dispatch(logout)
            setIsLoading(true)
            window.location.reload()


        })
    }

    return (
        <div className='flex flex-col gap-2'>
            {/* category */}
            <div className='flex flex-col  gap-3 '>
                <div className='flex flex-col gap-1'>
                    {
                     <Link href={user ? routes.MYACCOUNT : routes.SignIn} className='hover:text-white hover:bg-orange-300 h-10 flex items-center px-4'>Account</Link> 
                    }
                    <Link href={routes.ORDERS} className='hover:text-white hover:bg-orange-300 h-10 flex items-center px-4'>Orders</Link>
                    <Link href={routes.PRODUCT} className='hover:text-white hover:bg-orange-300 h-10 flex items-center px-4'>Address</Link>

                </div>
                <div className='category flex flex-col  gap-3 mt-3 border-t border-gray-200'>
                    <div className='flex flex-col gap-1 '>

                        {headerTabs.map((tab: HeaderTabs) =>
                            <Link href={tab.route} key={tab.id} className='hover:text-white hover:bg-orange-300 h-10 flex items-center px-4 w-full'>{tab.name}</Link>
                        )
                        }
                    </div>

                    {
                        user ? <div className='cursor-pointer hover:text-white hover:bg-orange-300 h-10 flex items-center px-4 border-t border-gray-200' onClick={() => handleSignOut()}>Sign out</div> :
                            <Link href={routes.SignIn} className={`hover:text-white hover:bg-orange-300 h-10 flex items-center px-4 `}>Sign In</Link>


                    }

                </div>

                {/* user */}


            </div>

        </div>
    )
}

export default Sidebar