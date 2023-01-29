import React, { useState } from 'react'
import { IProduct } from '@helpers/types'
import Image from 'next/image'
import Link from 'next/link'
import { routes } from '@helpers/routes'
import { shortenTitle } from '@helpers/methods'
import ImageLoader from '@components/ImageLoader'
type ProductItemProps = {
    product: IProduct

}

const ProductItem = ({ product }: ProductItemProps) => {
    const [imageLoading, setImageLoading] = useState<boolean>(true)

    return (
        <Link className='shadow-lg bg-White w-[185px] xs:w-40 h-48 xs:h-40 mb-10 flex flex-col  cursor-pointer gap-2 items-center rounded-md' href={`${routes.SINGLEPRODUCT}/${product.category}/${product.id}`}>

            <div className='flex mt-4 items-center justify-center relative'>
                {
                    imageLoading && <div className={`w-20 h-20 bg-gray-100 animate-pulse absolute`} />

                }
                <Image
                    src={product.image}
                    loader={ImageLoader}
                    placeholder='blur'
                    alt={product.title}
                    blurDataURL={product.image.toString()}
                    width={80}
                    height={80}
                    priority
                    className={`w-20 h-20 z-10  hover:scale-110 transition-all duration-500 ease-in-out `}
                    onLoad={() => setImageLoading(false)}
                />

            </div>
            <div className='flex flex-col gap-1 items-start '>

                <h1 className='text-Black font-medium text-base'>{shortenTitle(product.title, 17).toLocaleLowerCase()}</h1>
                <span className='text-Black font-medium text-md'>${product.price}</span>
            </div>

        </Link>
    )
}

export default ProductItem