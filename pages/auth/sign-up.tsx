import Layout from "@components/layouts/layout";
import SignUp from "@components/auth/sign-up";
import { GetServerSideProps } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";

const SignInAndUpPage = () => {
  return (
    <div className="mx-auto flex gap-8 flex-col">
      <Head>
        <title>User Auth | Sign up</title>
      </Head>
      <SignUp />
    </div>
  );
};

export default SignInAndUpPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  if (!req.headers.cookie)
    return {
      props: {
        cookies: null,
      },
    };
  const cookies = req.headers.cookie;
  if (cookies) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
