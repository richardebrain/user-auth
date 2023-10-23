import { accountBarNav } from '@helpers/routes'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'

type accountLayoutProps = {
    children: ReactElement
}

const AccountLayout = ({ children }: accountLayoutProps) => {
    const router = useRouter()
  
    return (
        <div className='flex justify-between gap-6 font-kumbh px-4'>
            {/* account side bar */}
            <div className='hidden xs:w-[25%] h-[30rem] w-full shadow-md bg-white md:flex justify-start flex-col first:rounded-t-md ' >

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
            <main className='flex-1 h-[64rem] shadow-md bg-White rounded-md'>
                {children}
            </main>

        </div>
    )
}

export default AccountLayout