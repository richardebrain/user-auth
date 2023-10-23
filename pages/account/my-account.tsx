
import React, { ReactElement, useEffect } from 'react'
import { useAppSelector } from '@helpers/redux.hooks'
import { AddressProps } from '@helpers/types'
import { GetServerSideProps } from 'next'
import AccountLayout from '@components/layouts/account-layout'
import { NextPageWithLayout } from '@pages/_app'
import Layout from '@components/layouts/layout'
import AccountOverview from '@components/my-account/AccountOverview'
import { useRouter } from 'next/router'


const MyAccount: NextPageWithLayout = () => {
    const { address: { address }, user: { user } } = useAppSelector(state => state)
    const defaultAddress = address.find((item: AddressProps) => item.isDefault === true)
    const router = useRouter()
    useEffect(() => {
        if (!user) {
            router.push('/')
        }

    }, [user])


    return (
        <div >
            <AccountOverview defaultAddress={defaultAddress} />
        </div>
    )
}


// Path: pages\account\my-account.tsx
MyAccount.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <AccountLayout >
                {page}
            </AccountLayout>
        </Layout>
    )
}

export default MyAccount
