import SignUp from '@components/signing/sign-up'
import { GetServerSideProps } from 'next'
import React from 'react'

const SignInAndUpPage = () => {
    return (
        <div className='mx-auto flex gap-8 flex-col'>
            <SignUp />

            {/* <SignIn /> */}
        </div >
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