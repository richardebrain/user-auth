import SingleItem from '@components/products/SingleItem'
import { IProduct, ProductItem } from '@helpers/types'
import axios from 'axios'
import { readv } from 'fs'
import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import React from 'react'

const SingleProductPage = ({ product }: ProductItem) => {
    if(!product) return <div>loading...</div>
    return (
        <div>
            <Head key={'page2'}>
                <title>{product.title}</title>
            </Head>
            <SingleItem product={product} />
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
        fallback: true
    }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
    const res = await axios.get(`https://fakestoreapi.com/products/${params?.id}`);
    const product = res.data;

    if (!res.status) {
        // If there is a server error, you might want to
        // throw an error instead of returning so that the cache is not updated
        // until the next successful request.
        throw new Error(`Failed to fetch posts, received status ${res.status}`)
      }
    return {
        props: { product },
    }


}