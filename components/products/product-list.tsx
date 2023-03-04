import React from 'react'
import { IProduct } from '@helpers/types'
import ProductItem from './product-item'
type ProductListProps = {
    product: IProduct[]

}
const ProductList = ({ product}: ProductListProps) => {
    if (!product) {
        return <div>Loading...</div>
    }
    return (
        <div className='flex flex-col xs:flex-wrap xs:gap-8 xs:justify-start xs:flex-row  items-center '>
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