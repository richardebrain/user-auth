
import React, { ReactElement } from 'react'
import { useAppSelector } from '@helpers/redux.hooks'
import { AddressProps } from '@helpers/types'
import { GetServerSideProps } from 'next'
import AccountLayout from '@components/layouts/account-layout'
import { NextPageWithLayout } from '@pages/_app'
import Layout from '@components/layouts/layout'
import AccountOverview from '@components/my-account/AccountOverview'


const MyAccount: NextPageWithLayout = () => {
    const { address } = useAppSelector(state => state.address)
    const defaultAddress = address.find((item: AddressProps) => item.isDefault === true)

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
export const getServerSideProps: GetServerSideProps = async (context) => {

    const { req,res } = context
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
        props: {
            cookies

        }
    }
}