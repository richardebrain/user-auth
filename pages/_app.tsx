import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '../components/layouts/layout';
import { wrapper } from '@utils/store';
import { Provider } from 'react-redux';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
export default function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest)
  const { pageProps } = props
  useEffect(() => {
    NProgress.configure({ showSpinner: false })
    Router.events.on('routeChangeStart', () => NProgress.start())
    Router.events.on('routeChangeComplete', () => NProgress.done())
    Router.events.on('routeChangeError', () => NProgress.done())


  }, [Router])

  return (
   
      < Provider store={store}>
        <Layout >    
          <Component {...pageProps} />
        </Layout>
      </Provider>
  

  )

}
