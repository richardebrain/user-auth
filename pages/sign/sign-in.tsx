import SignIn from '@components/signing/sign-in'
import { GetServerSideProps } from 'next'
import React from 'react'

const SignInPage = () => {
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
  console.log(cookies)
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