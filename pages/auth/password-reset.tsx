import ForgetModal from '@components/auth/forget-modal'
import { routes } from '@helpers/routes'
import Link from 'next/link'
import React, { ReactElement } from 'react'

const ResetPasswordPage = () => {
    return (
        <div className='flex flex-col shadow-md bg-white w-[90%] xs:w-[30%] rounded-md justify-between gap-6 mx-auto mt-40'>
            <div className='flex items-center w-full h-20 flex-col  '>
                <h1 className='border-b w-full text-center font-bold text-3xl py-6'>Forgot Password</h1>

            </div>
            <div className='text-center px-6 w-fit '>
                <p className='text-sm w-fit bg-gray-100 px-4 py-4 text-gray-500'>Can&apos;t remember your login credentials? Enter your details below and we&apos;ll send instructions if your account exists.</p>
            </div>
            <ForgetModal/>
            <div className=' flex items-center flex-col border-t py-3 bg-gray-100 gap-2 px-6'>
                <p className='text-gray-500'>I remember my password </p>
                <Link className='border-gray-400 hover:border-black py-2 border w-full text-center font-bold' href={routes.SignIn}>Login</Link>
            </div>
        </div>
    )
}

ResetPasswordPage.getLayout = function getLayout(page: ReactElement) {
    return (
      <>
        {page}
      </>
    )
  }
export default ResetPasswordPage