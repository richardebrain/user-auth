import Button from '@components/Button'
import CustomInput from '@components/forms/input'
import React from 'react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { auth } from '@utils/firebase'
import { sendPasswordResetEmail } from 'firebase/auth'
import Spinner from '@components/Spinner'
import { useRouter } from 'next/router'
import {routes} from '@helpers/routes'
type ForgetModalProps = {
    forgetEmail: string,

}

const ForgetModal = () => {
    const [isLoading, setIsLoading] = React.useState(false)
    const forgetSchema = yup.object().shape({
        forgetEmail: yup.string().email('Email is invalid').required('Email is required'),
    })

    const {resetField ,register, handleSubmit, formState: { errors}, } = useForm<ForgetModalProps>({
        resolver: yupResolver(forgetSchema)
    })
    const router = useRouter()

    const handleForgetPassword = async ({ forgetEmail }: ForgetModalProps) => {
        console.log(forgetEmail)
        try {

            await sendPasswordResetEmail(auth, forgetEmail).then(res => {
                resetField('forgetEmail')
                setIsLoading(true)
                router.push(routes.SignIn)
                alert('Reset link has been sent to your email , check your spam folder if you can not find it')
                
            })
        } catch (error) {
            if (error instanceof Error) {
                console.log(error.message)
            }
        }
    }
    return (
        <div className='flex items-center px-8 py-3'>
            <form  onSubmit={handleSubmit(handleForgetPassword)} className='flex flex-col gap-4 w-full'>
                <CustomInput
                    type='email'
                    placeholder='email'
                    label='Enter your email address'
                    name='forgetEmail'
                    required
                    register={register}
                    error={errors.forgetEmail?.message}
                    className='w-full'
                />
                <Button type='submit'>{isLoading ? <Spinner width="20" fill="white" className="animate-spin text-center" /> : 'Reset Password'}</Button>
            </form>
        </div>
    )
}

export default ForgetModal