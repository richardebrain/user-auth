import React, { useState } from 'react'
import CustomInput from '../forms/input'
import { useForm } from 'react-hook-form'
import Button from '../shared/Button'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import  { useRouter } from 'next/router'
import Spinner from '../Spinner'
import { auth, createUserProfileDocument } from '@utils/firebase'
import Link from 'next/link'
import { routes } from '@helpers/routes'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Eye from '../../public/images/eyes.svg'

interface IForm {
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    password: string,
    confirmPassword: string
}

const SignUp = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const userSchema = yup.object().shape({
        firstname: yup.string().required('First name is required'),
        lastname: yup.string().required('Last name is required'),
        username: yup.string().required('Username is required'),
        email: yup.string().email('Email is invalid').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match')
    })
    const { register, handleSubmit, formState: { errors } } = useForm<IForm>({
        resolver: yupResolver(userSchema)
    });

    const useHandleFormSubmit = async ({ email, password, firstname, lastname, username }: IForm) => {
        try {
            const {user} = await createUserWithEmailAndPassword(auth, email, password)
            await createUserProfileDocument(user, { displayName: username, firstName: firstname, lastName: lastname })
            setIsLoading(true)
            router.push('/')

        } catch (error) {
            if (error instanceof Error) {
                if (error.message === 'Firebase: Error (auth/email-already-in-use).')
                setError('email already in use')
                console.log(error.message)
            }

        }
    }


    return (
        <div className=' flex flex-col items-center gap-8 w-full'>
            <div className='flex items-center gap-4 ' >
                <hr className=' w-32 text-gray-700 border-t-2 hidden xs:block' />
                <h2 className=' font-bold text-2xl text-black'>Create A New Account Today</h2>
                <hr className=' w-32 text-gray-700 border-t-2 hidden xs:block' />
            </div>
            <div className=' text-gray-500 flex flex-col gap-4 w-72 xs:w-[40%]' >
                <form className='flex flex-col gap-6 ' onSubmit={handleSubmit(useHandleFormSubmit)}>
                    {/* first and lastname */}
                    <div className="flex flex-col gap-5 xs:flex-row  w-full">
                        <CustomInput
                            type='text'
                            placeholder='firstname'
                            required
                            register={register}
                            name='firstname'
                            error={errors.firstname?.message}
                            className='w-full'
                            label='First Name'

                        />
                        <CustomInput
                            type='text'
                            placeholder='lastname'
                            required
                            register={register}
                            name='lastname'
                            error={errors.lastname?.message}
                            className='w-full'
                            label='Last Name'

                        />

                    </div>
                    {/* username */}
                    <CustomInput
                        type='text'
                        placeholder='username'
                        required
                        register={register}
                        name='username'
                        error={errors.username?.message}
                        label='Username'

                    />
                    {/* email */}
                    <CustomInput
                        type='email'
                        placeholder='email'
                        required
                        register={register}
                        name='email'
                        error={errors.email?.message}
                        label='Email'

                    />
                    {/* password */}
                    <CustomInput
                        type='password'
                        placeholder='password'
                        required
                        register={register}
                        name='password'
                        error={errors.password?.message}
                        icon={<Eye />}
                        label='Password'

                    />
                    {/* confirm password */}

                    <CustomInput
                        type='password'
                        placeholder='confirm password'
                        required
                        register={register}
                        name='confirmPassword'
                        error={errors.confirmPassword?.message}
                        icon={<Eye />}
                        label='Confirm Password'

                    />
                    {/* error */}
                    {error &&
                        <p className='text-red-500 text-center'>{error}</p>
                    }

                    <Button type='submit'>
                        {isLoading ? <Spinner width="20" fill="white" className="animate-spin" /> : 'Sign Up'}
                    </Button>
                </form>
                <div className=' flex  gap-4 items-center'>
                    <p  className='w-fit font-semibold text-black'>User Exist ?</p>
                    <Link href={`${routes.SignIn}`}  className='text-blue-900 font-bold hover:text-blue-700 w-fit'>Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default SignUp