import Layout from '@components/layouts/layout'
import SingleItem from '@components/products/SingleItem'
import { IProduct } from '@helpers/types'
import axios from 'axios'

import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'

import React, { ReactElement } from 'react'

type SingleProductPageProps = {
    product: IProduct
  
}



const SingleProductPage = ({ product }: SingleProductPageProps) => {
    if(!product) return <div>loading...</div>
    return (
        <div className='mx-auto'>
            <Head key={'page2'}>
                <title>{product.title}</title>
            </Head>
            <SingleItem product={product}/>
        </div>
    )
}

export default SingleProductPage


export const getStaticPaths: GetStaticPaths = async () => {
    const res = await axios.get('https://fakestoreapi.com/products');
    const ids = res.data.map((product: { id: number; category: string }) => ({ id: product.id, category: product.category }))
    const paths = ids.map((product: { id: number; category: string }) => ({ params: { id: product.id.toString(), slug: product.category } }))
    return {
        paths,
        fallback: false
    }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await axios.get(`https://fakestoreapi.com/products/${params?.id}`);

  
    const product:IProduct = res.data;

    if (!res.status) {
        // If there is a server error, you might want to
        // throw an error instead of returning so that the cache is not updated
        // until the next successful request.
        throw new Error(`Failed to fetch products, received status ${res.status}`)
      }
    return {
        props: { 
            product,
            
         },
    }


}