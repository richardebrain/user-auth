import AddressCard from '@components/address/AddressCard'
import { formatstateOrCountry } from '@helpers/methods'
import { useAppSelector } from '@helpers/redux.hooks'
import { routes } from '@helpers/routes'
import { AddressProps } from '@helpers/types'
import EditIcon from '@public/images/edit.svg'
import Link from 'next/link'

import React from 'react'

type Props = {
  defaultAddress: AddressProps | undefined
}

const AccountOverview = ({ defaultAddress }: Props) => {

  const { user: { user } } = useAppSelector(state => state)
  return (
    <div className=''>
      <h1 className='h-12 py-2 border-b font-semibold px-4 text-xl'>
        Account Overview
      </h1>
      <div className='flex flex-col justify-between gap-4 px-4 xs:flex-row'>
        <div className=' flex border h-56 flex-1 mt-4 flex-col rounded-md'>
          <h1 className='border-b flex items-center h-12 px-4'>ACCOUNT DETAILS</h1>
          <div className='flex-1 flex flex-col font-extralight py-4 px-4 gap-2'>
            <span className='font-thin'>
              {user?.firstName} {user?.lastName}
            </span>
            <span className='text-gray-500 text-sm'>
              {user?.email}
            </span>
          </div>

        </div>
        <div className='flex-1 flex border h-56 mt-4 flex-col rounded-md' >
          <div className='border-b h-12 px-4  flex items-center justify-between '>
            <h1 className=' '>ADDRESS BOOK</h1>
            <Link href={`${routes.MYACCOUNT}address/edit/${defaultAddress?.id!}`} className='hover:bg-orange-200 rounded-full text-orange-400 h-10 w-10 flex items-center justify-center'>
              <EditIcon className='w-6 h-6' />
            </Link>
          </div>
          <div className='flex-1 flex flex-col font-extralight py-4 px-4 gap-2'>
            <span>Your default shipping address :</span>
            <div className='flex flex-col text-gray-500'>

              <span className=' '>{defaultAddress?.firstName} {defaultAddress?.lastName}</span>
              <span className='text-sm'>{defaultAddress?.address}</span>
              <span className='text-sm'>{defaultAddress?.city}, {formatstateOrCountry(defaultAddress?.state!).name}</span>
              <span className='text-sm mb-1'>{formatstateOrCountry(defaultAddress?.country!).name}</span>
              <span className='text-sm'>{defaultAddress?.phone}{defaultAddress?.phone && ` / ${defaultAddress?.phone}`}</span>
            </div>
          </div>

        </div>
      </div>
    </div >
  )
}

export default AccountOverview

