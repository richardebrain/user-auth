import SignIn from '@components/signing/sign-in'
import { useAppSelector } from '@helpers/redux.hooks'
import { useRouter } from 'next/router'
import React from 'react'
import { useSelector } from 'react-redux'

const SignInPage = () => {
  const {user}= useAppSelector(state => state.user )
  console.log(user)
  const router = useRouter()
  if(user) router.push('/');
  return (
    <SignIn/>
  )
}

export default SignInPage