import React, { useState } from 'react'
import CustomInput from '../forms/input'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { routes } from '@helpers/routes'
import Spinner from '../Spinner'
import { useRouter } from 'next/router'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, googleSignIn } from '@utils/firebase'
import Eyes from '../../public/images/eyes.svg'
interface IForm {
  email: string,
  password: string
}
const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const router = useRouter()
  const userSchema = yup.object().shape({
    email: yup.string().email('Email is invalid').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  })
  const { register, handleSubmit, formState: { errors } } = useForm<IForm>({
    resolver: yupResolver(userSchema)
  });
  const handleFormSubmit = ({ email, password }: IForm) => {
    try {
      signInWithEmailAndPassword(auth, email, password).then(res => {
        setIsLoading(true)
        router.push('/')
      })
    }
    catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        console.log('message', error.message)
      }
    }

  }
  const handleGoogleSignIn = async () => {
    try {
      const user = googleSignIn()
      if (user!) {
        setIsLoading(true)
        router.push('/')

      }

    } catch {

    }
  }
  return (
    <div className=' flex flex-col items-center gap-3'>
      <div className='flex items-center gap-4 ' >
        <hr className=' w-32 text-gray-700 border-t-2' />
        <h2 className=' font-bold text-2xl text-gray-500'>Sign in to your existing account</h2>
        <hr className=' w-32 text-gray-700 border-t-2' />
      </div>
      <div className=' text-gray-500 flex flex-col gap-4 w-[40%]' onSubmit={handleSubmit(handleFormSubmit)} >
        <h3>Welcome Back</h3>
        <form className='flex flex-col gap-6 '>
          {/* first and lastname */}
          <div className="flex gap-6 flex-col" >

            {/* email */}
            <CustomInput
              type='email'
              placeholder='Email'
              required
              register={register}
              name='email'
              error={errors.email?.message}
              className=' w-full'

            />
            {/* password */}
            <CustomInput
              type='password'
              placeholder='Password'
              required
              register={register}
              name='password'
              error={errors.password?.message}
              icon={<Eyes />}
              className='w-full'

            />
          </div>
          <Button >{isLoading ? <Spinner width="20" fill="white" className="animate-spin text-center" /> : 'Sign In'}</Button>

        </form>
        <div className='flex gap-4'>
          <p className=' text-black font-bold'>Don&apos;t have an account ?</p>
          <Link href={`${routes.SignUp}`} className='text-blue-900 font-bold hover:text-blue-700'>Sign up now</Link>
        </div>
        <div className='w-full flex flex-col items-center'>
          <p>Or</p>
          <Button isGoogleSignIn onClick={() => handleGoogleSignIn()}>{isLoading ? <Spinner width="20" fill="white" className="animate-spin text-center" /> : 'Sign In with Google'}</Button>

        </div>
      </div>
    </div>
  )
}

export default SignIn