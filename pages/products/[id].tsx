import axios from "axios";
import { GetStaticPaths, GetStaticProps, PreviewData } from "next";
import ProductList from "@components/products/product-list";
import { IProduct } from "@helpers/types";
import { ParsedUrlQuery } from "querystring";
import Layout from "@components/layouts/layout";
import { ReactElement } from "react";

const ProductPage = ({ data }: { data: IProduct[] }) => {
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mx-auto">
      <ProductList product={data} />
    </div>
  );
};

export default ProductPage;
export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await axios.get("http://fakestoreapi.com/products");
  const paths = data.map((product: { category: any }) => {
    return {
      params: { id: product.category },
    };
  });
  return {
    paths,
    fallback: false,
  };
};
export const getStaticProps: GetStaticProps = async (ctx: {
  params?: ParsedUrlQuery;
}) => {
  const res = await axios.get(
    ` https://fakestoreapi.com/products/category/${ctx.params?.id}`
  );
  const data = res.data;
  return {
    props: {
      data,
    },
  };
};
