import AccountLayout from '@components/layouts/account-layout'
import Layout from '@components/layouts/layout'
import React, { ReactElement } from 'react'

const Orders = () => {
  return (
    <div>Orders</div>
  )
}

Orders.getLayout = (page:ReactElement) => (
  <Layout>
    <AccountLayout>
      {page}
    </AccountLayout>
  </Layout>
)

export default Orders