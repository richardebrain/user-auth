import SignIn from '@components/signing/sign-in'
import { useAppSelector } from '@helpers/redux.hooks'
import { GetServerSideProps } from 'next'
import React, { useEffect } from 'react'

const SignInPage = () => {
  
  const {user} = useAppSelector((state) => state.user)
  useEffect(() => {
    if(user){
      window.location.href = '/'
    }
  
    return () => {
      
    }
  }, [user])
  
  return (
    <SignIn />
  )
}

export default SignInPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context
  if (!req.headers.cookie) return{ props: {
    cookies: null
  }}

  const cookies = req?.headers?.cookie
  if (cookies) {
    return {
      redirect: {
        destination: '/',
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