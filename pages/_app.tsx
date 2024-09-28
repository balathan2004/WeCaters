import "@/styles/globals.css";
import React, {useMemo} from "react";
import Head from "next/head";
import type { AppProps } from "next/app";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import ContextWrapper from "@/components/wrapper/context_wrapper";
import LoadingProvider from "@/components/providers/loader_provider";
import ReplyProvider from "@/components/providers/reply_provider";
import NavBarSlice from "@/components/features/navbar";
import UserCredSlice from "@/components/features/user";
export default function App({ Component, pageProps }: AppProps) {
  
  
  const store = useMemo(() => {
    return configureStore({
      reducer: { NAVCRED: NavBarSlice, USERCRED: UserCredSlice },
    });
  }, []);

  return (
    <>
      <Head>
        <title>WeCaters</title>
      </Head>
      <Provider store={store}>
        <LoadingProvider>
          <ReplyProvider>
            <ContextWrapper>
              <Component {...pageProps} />
            </ContextWrapper>
          </ReplyProvider>
        </LoadingProvider>
      </Provider>
    </>
  );
}
