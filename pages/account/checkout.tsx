import CheckoutAddress from '@components/checkout/Checkout-Address'
import AccountLayout from '@components/layouts/account-layout'
import Layout from '@components/layouts/layout'
import { useAppSelector } from '@helpers/redux.hooks'
import { routes } from '@helpers/routes'
import { AddressProps } from '@helpers/types'
import { GetServerSideProps, GetStaticProps } from 'next'
import React, { ReactElement } from 'react'
import dynamic from 'next/dynamic'


const Checkout = () => {
    const { address: { address }, cart: { cartItems } } = useAppSelector(state => state)
    const defaultAddress = address.find((item: AddressProps) => item.isDefault === true)
    return (
        <div className='flex gap-2 flex-col'>
            <h1 className=' text-GB'>
                Checkout
            </h1>
            {/* default address */}
            <div className='h-52 bg-white' >
                <CheckoutAddress defaultAddress={defaultAddress!} />
            </div>
        </div>
    )
}


export default Checkout
