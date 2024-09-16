import style from "/styles/new.module.css";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import {
  NavBarProvider,
  ReplyProvider,
  LoaderProvider,
  UserCredProvider,
} from "@/pages/_app";
import LoginBox from "@/components/auth/login";
import { userAuthResponse } from "@/components/interfaces/shared";

export default function Login() {
  const navi = useRouter();
  const { dirs, setDirs } = useContext(NavBarProvider);
  const [response, setResponse] = useState<userAuthResponse | undefined>(
    undefined
  );
  const { userData, setUserData } = useContext(UserCredProvider);

  useEffect(() => {
    if (response && response.status == 200) {
      setUserData(response.userCredentials);
      localStorage.setItem(
        "login_cred",
        JSON.stringify(response.userCredentials)
      );

      if (response.userCredentials?.account_type == "professional") {
        setDirs([
          { route: "/blog", name: "blog" },
          { route: "/professional/search", name: "search" },
          { route: "/professional/create", name: "create" },
          { route: "/about", name: "about" },
          { route: "/professional/account", name: "account" },
        ]);
      } else if (response.userCredentials?.account_type == "personal") {
        setDirs([
          { route: "/blog", name: "blog" },
          { route: "/search", name: "search" },
          { route: "/about", name: "about" },
          { route: "/personal/account", name: "account" },
        ]);
      }
      navi.push("/blog");
    } else if (response?.status == 400) {
      console.log(response);
    }
  }, [response]);

  return (
    <div className="container">
      <div className={style.inner_container}>
        <LoginBox responseState={setResponse} />
      </div>
    </div>
  );
}
