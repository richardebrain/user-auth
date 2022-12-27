import SignIn from '@components/signing/sign-in'
import SignUp from '@components/signing/sign-up'
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