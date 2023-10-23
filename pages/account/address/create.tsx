import AddressForm from '@components/address/address-form'
import AccountLayout from '@components/layouts/account-layout'
import Layout from '@components/layouts/layout'
import { routes } from '@helpers/routes'
import { GetServerSideProps } from 'next'
import React, { ReactElement } from 'react'
import BackIcon from '@public/images/icon-previous.svg'
import { useRouter } from 'next/router'

const CreateAddress = () => {
    const router = useRouter()
    return (
        <div className='flex flex-col gap-4'>
             <div className='flex px-8 border-b items-center h-12 gap-6'  >
                <BackIcon onClick={() => router.back()} className=' cursor-pointer w-4'/>
                <h1>Create New Address</h1>

            </div>
            <AddressForm />

        </div>
    )
}

CreateAddress.getLayout = (page: ReactElement) => (
    <Layout>
        <AccountLayout>
            {page}
        </AccountLayout>
    </Layout>
)
export default CreateAddress
