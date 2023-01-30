import Layout from '@components/layouts/layout'
import SignUp from '@components/signing/sign-up'
import { GetServerSideProps } from 'next'
import React, { ReactElement } from 'react'

const SignInAndUpPage = () => {
    return (
        <div className='mx-auto flex gap-8 flex-col'>
            <SignUp />

            {/* <SignIn /> */}
        </div >
    )
}
SignInAndUpPage.getLayout = function getLayout(page: ReactElement) {
    return (
      <Layout>
        {page}
      </Layout>
    )
  }
export default SignInAndUpPage

export const getServerSideProps:GetServerSideProps = async (context) => {
    const { req } = context
    if (!req.headers.cookie) return{ props: {
        cookies: null
    }}
    const cookies = req.headers.cookie
    if (cookies) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {}
    }
}