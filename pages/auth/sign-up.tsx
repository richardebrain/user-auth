import Layout from "@components/layouts/layout";
import SignUp from "@components/auth/sign-up";
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

