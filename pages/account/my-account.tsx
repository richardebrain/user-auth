
import React, { useEffect } from 'react'
import { useAppSelector } from '@helpers/redux.hooks'
import { screenArray, Screens } from '@helpers/types'
import { setScreen } from '@utils/Redux/screens/screen.slice'
import { useRouter } from 'next/router'
import { selectUser } from '@utils/Redux/user/user.slice'
import { useDispatch, useSelector } from 'react-redux'
import { GetServerSideProps } from 'next'

const MyAccount = () => {

   const {  screen:{ currentView}} = useAppSelector(state => state)
   const user = useSelector(selectUser)
   const dispatch = useDispatch()
   const Component = Screens[currentView]
   const router = useRouter()       
//    useEffect(() => {
//     if (!user) {
//       router.push('/sign/sign-in')
//     }
//   },[user])
     
    return (
        <div className='flex justify-between gap-6 font-kumbh' >
            {/* sidebar */}
            <div className='xs:w-[25%] h-[30rem] w-full shadow-md bg-white flex justify-start flex-col first:rounded-t-md ' > 
                {
                    screenArray.map((screen, index) => 
                        <div key={index} className='flex flex-col gap-2 h-12 w-full  first:rounded-t-md hover:bg-gray-100' >
                            <button onClick={() => dispatch(setScreen({currentView: screen}))} className={`${screen === currentView && 'text-black bg-gray-200 font-semibold'} ${currentView === 'Account Overview' && 'rounded-t-md'} h-full w-full flex items-center px-8 justify-start`}>{screen}</button>
                        </div>
                    )

                }
            </div>
            {/* main */}
            <div className='flex-1 h-[59rem] shadow-md bg-White rounded-md hidden xs:block'>
                <h1><Component currentView={currentView}/></h1>

            </div>
            
        </div>
    )
}

export default MyAccount

// Path: pages\account\my-account.tsx


export const getServerSideProps:GetServerSideProps = async (context) => {
    const { req } = context
    const cookies = req.headers.cookie
    if (!cookies) {
        return {
            redirect: {
                destination: '/sign/sign-in',
                permanent: false
            }
        }
    }

    return {
       props:{
              cookies

       }
    }
}