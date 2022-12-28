
import React from 'react'
import { useAppDispatch, useAppSelector } from '@helpers/redux.hooks'
import { screenArray, Screens } from '@helpers/types'
import { setScreen } from '@utils/Redux/screens/screen.slice'

const MyAccount = () => {
   const {user:{user} , screen:{ currentView}} = useAppSelector(state => state)
   const dispatch = useAppDispatch()
 
   const Component = Screens[currentView]
   console.log('currentView', Component)
  
    return (
        <div className='flex justify-between gap-6' >
            {/* sidebar */}
            <div className='w-[25%] h-[30rem] shadow-md bg-white flex items-center flex-col' > 
                {
                    screenArray.map((screen, index) => 
                        <div key={index} className='flex flex-col gap-2' >
                            <button onClick={() => dispatch(setScreen({currentView: screen}))} >{screen}</button>
                        </div>
                    )

                }
            </div>
            {/* main */}
            <div className='flex-1 h-[45rem] shadow-md bg-White '>
                <h1><Component/></h1>

            </div>
            
        </div>
    )
}

export default MyAccount

// Path: pages\account\my-account.tsx