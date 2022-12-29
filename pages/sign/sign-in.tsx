import SignIn from '@components/signing/sign-in'
import { useAppSelector } from '@helpers/redux.hooks'
import { useRouter } from 'next/router'
import React from 'react'

const SignInPage = () => {
  const {user}= useAppSelector(state => state.user )
  const router = useRouter()
  if(user) router.push('/');
  return (
    <SignIn/>
  )
}

export default SignInPage