import AccountLayout from '@components/layouts/account-layout'
import Layout from '@components/layouts/layout'
import React, { ReactElement } from 'react'

const Wishlist = () => {
  return (
    <div>Wishlist</div>
  )
}

export default Wishlist

Wishlist.getLayout = (page:ReactElement) => (
  <Layout>
    <AccountLayout>
      {page}
    </AccountLayout>
  </Layout>
)