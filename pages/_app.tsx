import '@/styles/globals.css'
/**
 * 
 * 
 * 
import GetRequest from "@/component/getRequest";
import PopUp from "@/component/popup";
import Loading from "@/component/loading";
 * 
 * 
 */
import Navbar from '@/components/navbar';
import React, { Component, useEffect, useState, useContext } from "react";

import { useRouter } from "next/router";
import { NavbarInterface } from '@/components/interfaces';

import Head from "next/head";
import type { AppProps } from 'next/app'

export const NavBarProvider = React.createContext<any>(null);
export const LoaderProvider = React.createContext<any>(null);
export const ReplyProvider = React.createContext<any>(null);
export const UserCredProvider = React.createContext<any>(null);


export default function App({ Component, pageProps }: AppProps) {

  const [dirs, setDirs] = useState<NavbarInterface[]>([]);
  const [loader, setLoader] = useState(false);
  const [reply, setReply] = useState(false);
  const [userData, setUserData] = useState(null);
  


  useEffect(()=>{
setDirs([
  { route: "/blog", name: "blog" },
  { route: "/professional/search", name: "search" },
  { route: "/professional/create", name: "create" },
  { route: "/about", name: "about" },
  { route: "/account", name: "account" },

])
  },[])




  return   <>
  <Head>
    <title>WeCaters</title>
  </Head>
  <LoaderProvider.Provider value={[loader, setLoader]}>
    <NavBarProvider.Provider value={{dirs, setDirs}}>
      <ReplyProvider.Provider value={[reply, setReply]}>
        <UserCredProvider.Provider value={[userData, setUserData]}>
        <Navbar />
          <Component {...pageProps} />
        </UserCredProvider.Provider>
      </ReplyProvider.Provider>
    </NavBarProvider.Provider>
  </LoaderProvider.Provider>
</>
}







