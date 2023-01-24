import AddressForm from '@components/address/address-form'
import AccountLayout from '@components/layouts/account-layout'
import Layout from '@components/layouts/layout'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import BackIcon from '@public/images/icon-previous.svg'

const EditPage = () => {
    const router = useRouter()
    return (
        <div className=' flex  flex-col gap-3'>
            <div className='flex px-8 border-b items-center h-12 gap-6'  >
                <BackIcon onClick={() => router.back()} className=' cursor-pointer w-4'/>
                <h1>Edit Address</h1>

            </div>

            <AddressForm />
        </div>
    )
}

export default EditPage

EditPage.getLayout = (page: ReactElement) => {
    return (
        <Layout>
            <AccountLayout>
                {page}
            </AccountLayout>

        </Layout>
    )
}


