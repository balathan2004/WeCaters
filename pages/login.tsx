import style from "/styles/new.module.css";

import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { TextField } from "@mui/material";
import { NavBarProvider, ReplyProvider, LoaderProvider } from "@/pages/_app";
import LoginBox from "@/components/auth/login";
import { userAuthResponse } from "@/components/interfaces/shared";

export default function Login() {
  const navi = useRouter();
  const {dirs, setDirs} = useContext(NavBarProvider);
  const [response, setResponse] = useState<userAuthResponse|undefined>(undefined);

  useEffect(() => {
    if (response && response.status == 200) {

      localStorage.setItem("login_cred", JSON.stringify(response.userCredentials));

      if (response.userCredentials?.account_type == "professional") {
        setDirs([
          { route: "/blog", textName: "blog" },
          { route: "/professional/search", textName: "search" },
          { route: "/professional/create", textName: "create" },
          { route: "/about", textName: "about" },
          { route: "/account", textName: "account" },
        ]);
      } else if (response.userCredentials?.account_type == "personal") {
        setDirs([
          { route: "/blog", textName: "blog" },
          { route: "/search", textName: "search" },
          { route: "/about", textName: "about" },
          { route: "/account", textName: "account" },
        ]);
      }
    console.log(response)
      navi.push("/blog");
    } else if (response?.message) {
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
