import React from 'react'
import { IProduct } from '@helpers/types'
import ProductItem from './product-item'

const ProductList = ({ product }: { product: IProduct[] }) => {
    if (!product) {
        return <div>Loading...</div>
    }
    return (
        <div className='flex flex-col xs:flex-wrap xs:gap-8 xs:justify-start xs:flex-row mx-auto items-center'>
            {
                product.map((product: IProduct) => {
                    return (
                        <div key={product.id} >
                            <ProductItem product={product} />
                        </div>
                    )
                })
            }

        </div>
    )
}

export default ProductList