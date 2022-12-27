import React from 'react'
import { IProduct } from '@helpers/types'
import ProductItem from './product-item'

const ProductList = ({ product }: { product: IProduct[] }) => {
    if (!product) {
        return <div>Loading...</div>
    }
    return (
        <div className='flex flex-wrap gap-16 items-center justify-center '>
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