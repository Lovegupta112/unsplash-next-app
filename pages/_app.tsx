import Header from "@/component/Header";
import { AppContext, AppInitialProps, AppLayoutProps } from "next/app";
import type { NextComponentType } from "next";
import { SessionProvider } from "next-auth/react";

import "@/styles/globals.css";
import type { AppProps } from "next/app";

const MyApp: NextComponentType<AppContext, AppInitialProps, AppLayoutProps> = ({
  Component,
  pageProps,
}: AppLayoutProps) => {
  if (Component.getLayout) {
    return (
      <>
      <SessionProvider session={pageProps.session}>
        {Component.getLayout(<Component {...pageProps} />)}
      </SessionProvider>
      </>
    );
  }
  return (
    <>
    <SessionProvider session={pageProps.session}>
      <Header />
      <Component {...pageProps} />
    </SessionProvider>
    </>
  );
};

export default MyApp;
