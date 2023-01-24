import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CustomInput from '@components/forms/input'
import Button from '@components/Button'
import { useAppDispatch, useAppSelector } from '@helpers/redux.hooks'
import Eyes from '../../public/images/eyes.svg'
import { auth, updateName, updateUserProfileDisplayName, updateUserProfileEmail } from '@utils/firebase'
import { updateEmail, updateProfile, User } from 'firebase/auth'
import Spinner from '@components/Spinner'
import { useRouter } from 'next/router'
import { Router } from '@helpers/methods'
import { routes } from '@helpers/routes'
import { updateUserProfile } from '@utils/Redux/user/user.slice'

type FormValues = {
  firstName: string
  lastName: string
  email: string
  currentPassword: string
  confirmPassword: string
  userName: string
  newPassword: string
}
export const AccountDetails = () => {

  const router = useRouter()
  const dispatch = useAppDispatch()
  const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    email: yup.string().email('Email is invalid').required('Email is required'),
    currentPassword: yup.string().matches(/(?=.*[0-9])/, 'Password must contain a number').matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter').matches(/(?=.*[A-Z])/, 'Password must contain a uppercase letter').matches(/(?=.*[!@#$%^&*.?])/, 'Password must contain a special character').matches(/(?=.*[a-zA-Z])/, 'Password must contain a letter'),
    newPassword: yup.string().when('currentPassword', {
      is: (val: string) => (val && val.length > 0 ? true : false),
      then: yup.string().matches(/(?=.*[0-9])/, 'Password must contain a number').matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter').matches(/(?=.*[A-Z])/, 'Password must contain a uppercase letter').matches(/(?=.*[!@#$%^&*.?])/, 'Password must contain a special character').matches(/(?=.*[a-zA-Z])/, 'Password must contain a letter'),

    }),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword'), null], 'Passwords must match with new password'),

  })
  const { user } = useAppSelector(state => state.user)
  const { register, handleSubmit, reset, getValues, formState: { errors,isSubmitting } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    reValidateMode: 'onSubmit',
    mode: 'onSubmit',

  })
  useEffect(() => {
    const { confirmPassword, newPassword, currentPassword } = getValues()
    if (!currentPassword) {
      schema.fields.confirmPassword = yup.string().optional()
      schema.fields.newPassword = yup.string().optional()
      schema.fields.currentPassword = yup.string().optional()
    }

  }, [getValues, schema.fields, schema.fields.currentPassword])

  useEffect(() => {
    reset({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      userName: user?.displayName

    })
  }, [user?.displayName, user?.email, user?.firstName, user?.lastName])

  const handleFormUpdate = async ({ currentPassword, confirmPassword, email, firstName, userName, lastName, newPassword }: FormValues) => {
    // check if user is updating display name
    if (userName !== user?.displayName) {

      try {

        await updateProfile(auth?.currentUser as User, {
          displayName: userName,

        }).then(() => {
          console.log('updated', auth.currentUser?.displayName)
        }).catch((error) => {
          console.log(error)
        })
        await updateUserProfileDisplayName(auth.currentUser)
        dispatch(updateUserProfile({ displayName: userName }))
        //  router.push(`${routes.MYACCOUNT}my-account`)
      } catch (error) {
        console.log(error)
      }
    }
    // check if its user is updating email
    if (email !== user?.email) {
      try {
        await updateEmail(auth?.currentUser as User, email)
        await updateUserProfileEmail(auth.currentUser)
        dispatch(updateUserProfile({ email }))
      } catch (error) {
        console.log(error)
      }
    }
    // check if its user is updating password
    if (firstName !== user?.firstName || lastName !== user?.lastName) {
      const data = { lastName, firstName }
      try {
        await updateName(auth.currentUser, data)
        dispatch(updateUserProfile({ firstName, lastName }))
      }
      catch (error) {
        console.log(error)
      }


    }
  }

  return (
    <div className='flex flex-col '>
      <h1 className='h-12 py-2 border-b font-semibold px-4 text-xl'>Account Information</h1>
      <div className='w-[80%] mx-auto mt-6'>
        <form className='flex gap-5 flex-col' onSubmit={handleSubmit(handleFormUpdate)}>
          <div className='flex flex-col gap-2 '>
            <CustomInput
              type={'text'}
              placeholder={'Enter your first name'}
              required
              label={'First Name'}
              register={register}
              name={'firstName'}
            />
          </div>
          <div className='flex flex-col gap-2'>
            <CustomInput
              type={'text'}
              placeholder={'Enter your last name'}
              required
              label={'Last Name'}
              register={register}
              name={'lastName'}
            />
            {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <CustomInput
              type={'text'}
              placeholder={'Enter your User name'}
              required
              label={'User Name'}
              register={register}
              name={'userName'}
            />
            {errors.lastName && <p className='text-red-500'>{errors.lastName.message}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <CustomInput
              type={'email'}
              placeholder={'Enter your email address'}
              required
              label={'Email'}
              register={register}
              name={'email'}
            />
            {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <CustomInput
              type={'password'}
              placeholder={''}
              required={false}
              label={'Password'}
              register={register}
              name={'currentPassword'}
              icon={<Eyes />}
            />
            {errors.currentPassword && <p className='text-red-500'>{errors.currentPassword.message}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <CustomInput
              type={'password'}
              placeholder={''}
              required={false}
              label={'New Password'}
              register={register}
              name={'newPassword'}
              icon={<Eyes />}
            />
            {errors.newPassword && <p className='text-red-500'>{errors.newPassword.message}</p>}
          </div>
          <div className='flex flex-col gap-2'>
            <CustomInput
              type={'password'}
              placeholder={''}
              required={false}
              label={'Confirm password'}
              register={register}
              name={'confirmPassword'}
              icon={<Eyes />}
            />
            {errors.confirmPassword && <p className='text-red-500'>{errors.confirmPassword.message}</p>}
          </div>
          <Button type='submit' >
            {isSubmitting ? <Spinner width="20" fill="white" className="text-center animate-spin" /> :
              "Save Changes"
            }
          </Button>

        </form>
      </div>
    </div>
  )
}
