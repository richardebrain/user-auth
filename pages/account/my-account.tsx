
import React from 'react'
import { useAppSelector } from '@helpers/redux.hooks'

const MyAccount = () => {
   const user = useAppSelector(state => state.user)
   console.log(user)
    return (
        <div className='flex justify-between gap-6' >
            {/* sidebar */}
            <div className='w-[25%] h-[30rem] shadow-md bg-white' >
                
                <h1>My Richard Decko Account</h1>
            </div>
            {/* main */}
            <div className='flex-1 h-[45rem] shadow-md bg-White '>
                <h1>Account Overview</h1>

            </div>
            
        </div>
    )
}

export default MyAccount

// Path: pages\account\my-account.tsx