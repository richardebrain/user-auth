import Head from 'next/head'
import axios from 'axios'
import { IProduct } from '@helpers/types'
import ProductList from '@components/product-list'

export default function Home({data}:{data:IProduct[]}) {
  console.log(data)
  const firstThreeofCategory = (category:string) => {
    return data.filter((product:IProduct) => product.category === category).slice(0,3)
  }
  console.log(firstThreeofCategory("electronics"))
  return (
    <div className=''>
      <Head>
        <title>User Auth</title>
      </Head>
      <ProductList product={data}/>

    
    </div>
  )
}

export const getStaticProps = async () => {
    const res = await axios.get('https://fakestoreapi.com/products?limit=8')
    const data = await res.data
    return {
        props: {
            data
        }
    }
}
