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
import { auth } from '@utils/firebase'
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
        console.log(res)
        setIsLoading(true)
        router.push('/')
      })
    }
    catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        console.log('message',error.message)
      }
    }

  }
  return (
    <div className=' flex flex-col items-center gap-3'>
      <div className='flex items-center gap-4 ' >
        <hr className=' w-32 text-gray-700 border-t-2' />
        <h2 className=' font-bold text-2xl text-gray-500'>Sign in to your existing account</h2>
        <hr className=' w-32 text-gray-700 border-t-2' />
      </div>
      <div className=' text-gray-500 flex flex-col gap-4 ' onSubmit={handleSubmit(handleFormSubmit)} >
        <h3>Welcome Back</h3>
        <form className='flex flex-col gap-6 '>
          {/* first and lastname */}
          <div className="flex gap-6 flex-col" >

            {/* email */}
            <CustomInput
              type='email'
              placeholder='email'
              required
              register={register}
              name='email'
              error={errors.email?.message}

            />
            {/* password */}
            <CustomInput
              type='password'
              placeholder='password'
              required
              register={register}
              name='password'
              error={errors.password?.message}

            />
          </div>
          <Button >{isLoading ? <Spinner width="20" fill="white" className="animate-spin text-center" /> : 'Sign In'}</Button>

        </form>
        <div>
          <p>Don&apos;t have an account ?</p>
          <Link href={`${routes.SignUp}`} >Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn