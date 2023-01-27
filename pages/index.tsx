import Head from 'next/head'
import axios from 'axios'
import { IProduct } from '@helpers/types'
import ProductList from '@components/products/product-list'
import { productByCategory } from '@helpers/methods'


export default function Home({ data }: { data: IProduct[] }) {
 
  if (!data) return <div>loading...</div>
 const products = productByCategory(data)
  return (
    <div className=''>
      <Head>
        <title>User Auth</title>
      </Head>
      <ProductList product={data} />


    </div>
  )
}

export const getStaticProps = async () => {
  const res = await axios.get('https://fakestoreapi.com/products')
  const data = await res.data
  return {
    props: {
      data
    }
  }
}
