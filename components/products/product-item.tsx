import React from 'react'
import { IProduct } from '@helpers/types'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@helpers/routes'
import { shortenTitle } from '@helpers/methods'
import ImageLoader from '@components/ImageLoader'

const ProductItem = ({ product }: { product: IProduct }) => {
    return (
        <Link className='shadow-lg bg-White w-64 xs:w-72 h-72 xs:h-80 mb-10 py-2 flex flex-col  cursor-pointer gap-6 items-center justify-between ' href={`${routes.SINGLEPRODUCT}/${product.category}/${product.id}`}>
            <div className='flex mt-8'>
                <Image
                    src={product.image}
                    loader={ImageLoader}
                    alt={product.title}
                    blurDataURL={product.image.toString()}
                    width={80}
                    height={80}
                    priority
                    className='w-32 h-40'
                />

            </div>
            <div className='flex flex-col gap-2 items-start '>

                <h1 className='text-Black font-medium text-xl'>{shortenTitle(product.title, 18)}</h1>
                <span className='text-Black font-medium text-md'>${product.price}</span>
            </div>

        </Link>
    )
}

export default ProductItem