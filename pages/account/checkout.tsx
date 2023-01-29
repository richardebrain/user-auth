import CheckoutAddress from '@components/checkout/Checkout-Address'
import AccountLayout from '@components/layouts/account-layout'
import Layout from '@components/layouts/layout'
import StepperContainer from '@components/stepper/Stepper'
import { useAppSelector } from '@helpers/redux.hooks'
import { routes } from '@helpers/routes'
import { AddressProps } from '@helpers/types'
import { GetServerSideProps } from 'next'
import React, { ReactElement } from 'react'
import dynamic from 'next/dynamic'


const Checkout = () => {
    const { address: { address }, cart: { cartItems } } = useAppSelector(state => state)
    const defaultAddress = address.find((item: AddressProps) => item.isDefault === true)
    const StepperComponent = dynamic(() => import('@components/stepper/Stepper'), { ssr: false })
    return (
        <div className='flex gap-2 flex-col'>
            <h1 className=' text-GB'>
                Checkout
            </h1>
            {/* default address */}
            <StepperComponent/>
            <div className='h-52 bg-white' >
                <CheckoutAddress defaultAddress={defaultAddress!} />
            </div>
        </div>
    )
}

// Checkout.getLayout = (page: ReactElement) => (

//     <Layout >
//         <AccountLayout>
//             {page}
//         </AccountLayout>
//     </Layout >)

export default Checkout

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context
    const { cookies } = req
    const { user } = cookies
    if (!user) {
        return {
            redirect: {
                destination: routes.SignIn,
                permanent: false,
            },
        }
    }
    return {
        props: {},
    }
}
