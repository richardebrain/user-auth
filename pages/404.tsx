import Layout from '@components/layouts/layout'
import React, { ReactElement } from 'react'

const NotFound = () => {
  return (
    <div className='h-[100vh] bg-green-500'>This page does  not exist</div>
  )
}
NotFound.getLayout = function getLayout(page: ReactElement) {
  return (
    <Layout>
      {page}
    </Layout>
  )
}
export default NotFound