
import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@helpers/redux.hooks'
import { screenArray, Screens } from '@helpers/types'
import { setScreen } from '@utils/Redux/screens/screen.slice'
import { useRouter } from 'next/router'

const MyAccount = () => {

   const {user:{user} , screen:{ currentView}} = useAppSelector(state => state)
   const dispatch = useAppDispatch()
   const Component = Screens[currentView]
   const router = useRouter()
   
   useEffect(() => {
    if (!user) {
      router.push('/sign/sign-in')
    }
  },[user])
     
    return (
        <div className='flex justify-between gap-6 font-kumbh' >
            {/* sidebar */}
            <div className='w-[25%] h-[30rem] shadow-md bg-white flex justify-start flex-col' > 
                {
                    screenArray.map((screen, index) => 
                        <div key={index} className='flex flex-col gap-2 h-12 w-full' >
                            <button onClick={() => dispatch(setScreen({currentView: screen}))} className={`${screen === currentView && 'text-black bg-gray-200 font-semibold'} h-full w-full flex items-center px-8 justify-start`}>{screen}</button>
                        </div>
                    )

                }
            </div>
            {/* main */}
            <div className='flex-1 h-[45rem] shadow-md bg-White '>
                <h1><Component currentView={currentView}/></h1>

            </div>
            
        </div>
    )
}

export default MyAccount

// Path: pages\account\my-account.tsx