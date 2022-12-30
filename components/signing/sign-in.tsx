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
  const handleFormSubmit = async ({ email, password }: IForm) => {
    try {
      await signInWithEmailAndPassword(auth, email, password).then(res => {
        setIsLoading(true)
        router.push('/')
      })
    }
    catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Firebase: Error (auth/user-not-found).') {
          setError('User not found')
        } else if (error.message === 'Firebase: Error (auth/wrong-password).') {
          setError('wrong password')

        }
        console.log(error.message)
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
    <div className={`flex flex-col items-center gap-3`}>
      <div className='flex items-center gap-4 ' >
        <hr className=' w-32 text-gray-900 border-t-2' />
        <h2 className=' font-bold text-2xl '>Sign in to your existing account</h2>
        <hr className=' w-32 text-gray-900 border-t-2' />
      </div>
      <div className=' flex flex-col gap-4 w-[40%] '  >
        <h3 className='text-center'>Welcome Back!</h3>
        <form className='flex flex-col gap-6 ' onSubmit={handleSubmit(handleFormSubmit)}>
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
            <div className='h-16 flex flex-col'>

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
              {/* error */}
              {error && <span className='text `-red-500 mb-0 text-center'>{error}</span>}
            </div>
          </div>
          <Button type='submit' >{isLoading ? <Spinner width="20" fill="white" className="animate-spin text-center" /> : 'Sign In'}</Button>

        </form>
        {/* other properties */}
        <div className='flex gap-2 flex-col'>
          {/* forget password */}
          <Link href={routes.RESETPASSWORD} className='text-blue-400 hover:text-blue-800 cursor-pointer w-fit'>Forgot Password ?</Link>
          <p className=' text-black font-bold'>Don&apos;t have an account ?</p>
          <Link href={`${routes.SignUp}`} className='text-blue-900 font-bold hover:text-blue-700 w-fit'>Sign up now</Link>
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