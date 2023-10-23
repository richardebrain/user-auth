import Layout from "@components/layouts/layout";
import SignIn from "@components/auth/sign-in";
import { useAppSelector } from "@helpers/redux.hooks";
import { GetServerSideProps } from "next";
import React, { ReactElement, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

const SignInPage = () => {
  const { user } = useAppSelector((state) => state.user);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  return (
    <>
      <Head>
        <title>User Auth | Sign up</title>
      </Head>
      <SignIn />
    </>
  );
};

// SignInPage.getLayout = function getLayout(page: ReactElement) {
//   return <Layout>{page}</Layout>;
// };

export default SignInPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req } = context;
  const { cookies } = req;
  const { user } = cookies;
  if (user) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      cookies,
    },
  };
};
