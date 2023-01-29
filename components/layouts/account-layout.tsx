import { useAppDispatch, useAppSelector } from '@helpers/redux.hooks'
import { accountBarNav } from '@helpers/routes'
import { AddressProps } from '@helpers/types'
import address from '@pages/account/address'
import { auth, db } from '@utils/firebase'
import { setAddress } from '@utils/Redux/address/address.slice'
import { getDocs, collection } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement, useEffect } from 'react'

type accountLayoutProps = {
    children: ReactElement
}

const AccountLayout = ({ children }: accountLayoutProps) => {
    const { address: { address } } = useAppSelector((state) => state)
    
    const dispatch = useAppDispatch() 
    useEffect(() => {
        // listen to address changes
        if (address.length > 0 ) return;
        const unSubscribe = async () => {
            if (!auth?.currentUser) return
            const addressSnapshot = await getDocs(collection(db, 'address', `${auth.currentUser.uid}/address`))
            addressSnapshot.forEach((doc) => {
                dispatch(setAddress({
                    ...doc.data() as AddressProps,
                    id: doc.id,
                }))
            })
        }
        return () => {
            unSubscribe()
        }
    }, [address.length,dispatch])
    
    const router = useRouter()
    return (
        <div className='flex justify-between gap-6 font-kumbh px-4'>
            {/* account side bar */}
            <div className='hidden xs:w-[25%] h-[30rem] w-full shadow-md bg-white xs:flex justify-start flex-col first:rounded-t-md ' >

                {
                    accountBarNav.map((nav, index) =>
                        <div key={index} className='flex flex-col gap-2 h-12 w-full  first:rounded-t-md hover:bg-gray-100' >
                            <Link
                                className={`
                                ${router.pathname.includes(nav.path) ? 'bg-gray-100 font-bold' : ''}
                                  h-full w-full flex items-center px-8 justify-start`}
                                href={nav.path}
                            >
                                {nav.name}
                            </Link>
                        </div>
                    )

                }

            </div>

            {/* account content */}
            <main className='flex-1 h-[64rem] shadow-md bg-White rounded-md xs:block '>
                {children}
            </main>

        </div>
    )
}

export default AccountLayout