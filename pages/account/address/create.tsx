import AddressForm from '@components/address/address-form'
import { routes } from '@helpers/routes'
import { GetServerSideProps } from 'next'
import React from 'react'

const CreateAddress = () => {
    return (
        <AddressForm />
    )
}

export default CreateAddress
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