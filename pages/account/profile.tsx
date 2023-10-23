import AccountLayout from '@components/layouts/account-layout'
import Layout from '@components/layouts/layout'
import { AccountDetails } from '@components/my-account/AccountDetails'
import { GetServerSideProps } from 'next'
import React, { ReactElement } from 'react'

const ProfilePage = () => {
    return (
        <div>
            <AccountDetails/>
        </div>
    )
}

ProfilePage.getLayout = (page: ReactElement) => (
    <Layout>
        <AccountLayout>
            {page}
        </AccountLayout>
    </Layout>
)

export default ProfilePage


export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req } = context
    const cookies = req.headers.cookie
    if (!cookies) {
        return {
            redirect: {
                destination: '/auth/sign-in',
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