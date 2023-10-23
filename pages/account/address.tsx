import React, { ReactElement, useEffect } from 'react'
import { useAppSelector } from '@helpers/redux.hooks'
import Link from 'next/link'
import { routes } from '@helpers/routes'

import { GetServerSideProps } from 'next'

import AddressCard from '@components/address/AddressCard'
import Layout from '@components/layouts/layout'
import AccountLayout from '@components/layouts/account-layout'
import { getAddressCount } from '@helpers/methods'

const AddressBookPage = () => {

  const { address } = useAppSelector(state => state.address)
  const sortedAddress = [...address].sort((a, b) => a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1)

  return (
    <div className='flex flex-col items-center xs:w-full mx-auto font-kumbh gap-4'>

      <h1 className='flex self-start h-12 py-2 border-b font-semibold px-4 text-xl w-full'>
        Address ({getAddressCount(address)})
      </h1>
      <div className='flex flex-col w-full xs:grid md:grid-cols-2 xs:gap-4 px-4'>
        {
          sortedAddress.map((item) => (
            <AddressCard key={item.id} addressCard={item} />
          ))
        }

      </div>
      <div className='w-3/5 flex justify-center bg-white xs:px-4'>
        <Link href={routes.CREATE_ADDRESS} className='bg-Orange w-full rounded-md h-12 text-white flex items-center justify-center hover:bg-orange-500'>
          ADD NEW ADDRESS
        </Link>
      </div>
    </div>
  )
}

AddressBookPage.getLayout = (page: ReactElement) => {
  return (

    <Layout>
      <AccountLayout>
        {page}
      </AccountLayout>
    </Layout>

  )
}

export default AddressBookPage
