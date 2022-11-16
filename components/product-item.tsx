import React from 'react'
import { IProduct } from '@helpers/types'
import Image from 'next/image'

const ProductItem = ({ product }: { product: IProduct }) => {
    return (
        <div className='shadow-lg bg-White w-60 px-4 h-60 mb-10 py-4 flex flex-col items-center cursor-pointer'>
            <Image
                src={product.image}
                alt={product.title}
                width={100}
                height={100}
                priority
            />

        </div>
    )
}

export default ProductItem