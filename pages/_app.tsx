import "@/styles/globals.css";
import { GetRequest } from "@/components/fetch/getRequest";
/**


import PopUp from "@/component/popup";
import Loading from "@/component/loading";
 * 
 * 
 */
import Navbar from "@/components/navbar";
import React, { Component, useEffect, useState, useContext } from "react";
import {
  userAuthResponse,
  userInterface,
} from "@/components/interfaces/shared";

import { useRouter } from "next/router";
import { NavbarInterface } from "@/components/interfaces/front";
import PopUp from "@/components/front/popup";
import Head from "next/head";
import type { AppProps } from "next/app";

export const NavBarProvider = React.createContext<any>(null);
export const LoaderProvider = React.createContext<any>(null);
export const ReplyProvider = React.createContext<any>(null);
export const UserCredProvider = React.createContext<any>(null);
export default function App({ Component, pageProps }: AppProps) {
  const [dirs, setDirs] = useState<NavbarInterface[]>([]);
  const [loader, setLoader] = useState(false);
  const [reply, setReply] = useState<string|boolean>(false);
  const [userData, setUserData] = useState<userInterface | undefined>();

  const getCred = async () => {
    try {
      let res = (await GetRequest({
        route: "/api/auth/login_cred",
      })) as userAuthResponse;
      if (res && res.status == 200) {

       
        if (res.userCredentials?.account_type == "professional") {
          setDirs([
            { route: "/blog", name: "blog" },
            { route: "/search", name: "search" },
            { route: "/professional/create", name: "create" },
            { route: "/professional/about", name: "about" },
            { route: "/professional/profile", name: "account" },
          ]);
        } else {
          setDirs([
            { route: "/blog", name: "blog" },
            { route: "/search", name: "search" },
            { route: "/about", name: "about" },
            { route: "/personal/account", name: "account" },
          ]);
        }
        setUserData(res.userCredentials);
        localStorage.setItem("login_cred", JSON.stringify(res.userCredentials));
      } else {
        setDirs([
          { route: "/blog", name: "blog" },
          { route: "/about", name: "about" },
          { route: "/signup", name: "signup" },
          { route: "/login", name: "login" },
        ]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getCred();
  }, []);

  return (
    <>
      <Head>
        <title>WeCaters</title>
      </Head>
      <LoaderProvider.Provider value={{loader, setLoader}}>
        <NavBarProvider.Provider value={{ dirs, setDirs }}>
          <ReplyProvider.Provider value={{reply, setReply}}>
            <UserCredProvider.Provider value={{userData, setUserData}}>
              <Navbar />
              {reply? <PopUp reply={reply} changeState={setReply} />:""}
              <Component {...pageProps} />
            </UserCredProvider.Provider>
          </ReplyProvider.Provider>
        </NavBarProvider.Provider>
      </LoaderProvider.Provider>
    </>
  );
}
