import react from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import ProductItem from '@components/product-item';
import ProductList from '@components/product-list';
import { IProduct } from '@helpers/types';
const ProductPage = ({ data }:{data:IProduct[]}) => {
    const route = useRouter();
    console.log(data)
    if (!data) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <ProductList product={data} />
        </div>
    );
}

export default ProductPage;
export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await axios.get('http://fakestoreapi.com/products');

    const paths = data.map((product: { category: any; }) => {
        return {
            params: { id: product.category },
        };
    });
    return {
        paths,
        fallback: false,
    };
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
    console.log(params?.id)
    const res = await axios.get(` https://fakestoreapi.com/products/category/${params?.id}`);

    const data = res.data;

    return {
        props: { data },



    }
}

