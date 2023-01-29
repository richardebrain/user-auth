import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layouts/layout';
import { wrapper } from '@utils/store';
import { Provider } from 'react-redux';
import Router from 'next/router';
import { ReactElement, ReactNode, useEffect, useState } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { NextPage } from 'next';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}
export default function App({ Component, ...rest }: AppPropsWithLayout) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  useEffect(() => {
    NProgress.configure({ showSpinner: false })
    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())


  }, [])
  const getLayout = Component.getLayout ?? ((page) =>
    <Layout>
      {page}
    </Layout>
  )

  return (

    <>
      <Provider store={store}>

        {getLayout(<Component {...pageProps} />)}
        <ToastContainer autoClose={3000} pauseOnHover={false} pauseOnFocusLoss={false} />
      </Provider>
    </>


  )

}
