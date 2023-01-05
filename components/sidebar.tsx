import React from 'react'
import { useAppSelector } from '@helpers/redux.hooks'
import { HeaderTabs, headerTabs, routes } from '@helpers/routes'
import Link from 'next/link'

const Sidebar = () => {
    const { user } = useAppSelector(state => state.user)
    return (
        <div className='flex flex-col  px-4 gap-2 py-4'>
            {/* category */}
            <div className='category flex flex-col px-6 gap-3'>
                <h1 className='text-2xl font-bold'>Category</h1>
                <div className='flex flex-col gap-1 px-3'>

                    {headerTabs.map((tab: HeaderTabs) =>
                        <Link href={tab.route} key={tab.id} className='hover:text-Orange'>{tab.name}</Link>
                    )
                    }
                </div>


            </div>
            {/* cart */}
            <div className='flex flex-col px-6 gap-3'>



            </div>
            {/* user */}
            <div className='flex flex-col px-6 gap-3'>
                <h1 className='text-2xl font-bold'>User</h1>
                <div className='flex flex-col gap-1 px-3'>
                    {
                        user ? <Link href={routes.MYACCOUNT} className='hover:text-Orange'>Account</Link> : 
                        <Link href={routes.SignIn} className='hover:text-Orange'>Sign In</Link>
                    }
                    {
                        user && <div className='cursor-pointer'>Sign out</div>
                    }


                </div>


            </div>

        </div>
    )
}

export default Sidebar