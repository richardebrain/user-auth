import React from 'react'
import { IProduct } from '@helpers/types'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@helpers/routes'
import { shortenTitle } from '@helpers/methods'

const ProductItem = ({ product }: { product: IProduct }) => {
    return (
        <Link className='shadow-lg bg-White w-64  h-60 mb-10 py-2 flex flex-col items-center cursor-pointer justify-between' href={`${routes.SINGLEPRODUCT}/${product.category}/${product.id}`}>
            <Image
                src={product.image}
                alt={product.title}
                width={80}
                height={80}
                priority
                className='w-auto h-auto'
            />
            <div className='flex flex-col gap-2 items-start '>

                <h1 className='text-Black font-medium text-xl'>{shortenTitle(product.title, 18)}</h1>
                <span className='text-Black font-medium text-md'>${product.price}</span>
            </div>

        </Link>
    )
}

export default ProductItem