import SignUpBox from "@/components/auth/signup";
import React, { useState, useEffect, useContext } from "react";
import { NavBarProvider, ReplyProvider, LoaderProvider } from "@/pages/_app";
import style from "/styles/signup.module.css";
import { useRouter } from "next/router";
import { userAuthResponse } from "@/components/interfaces/shared";
export default function clientSignup() {
  const navi = useRouter();
  const {dirs, setDirs} = useContext(NavBarProvider);
  const [response, setResponse] = useState<userAuthResponse| null>(
    
  );

  useEffect(() => {
    if (response && response.status == 200) {
      console.log(response);
      var jsonData = JSON.stringify(response.userCredentials);
      localStorage.setItem("login-cred", jsonData);

      if (response.userCredentials?.account_type == "professional") {
        setDirs([
          { route: "blog", textName: "blog" },
          { route: "/client/services", textName: "services" },
          { route: "/client/create", textName: "create" },
          { route: "/about", textName: "about" },
          { route: "/account", textName: "account" },
        ]);
        navi.push("./professional/account");
      } else {
        setDirs([
          { route: "blog", textName: "blog" },
          { route: "/about", textName: "about" },
          { route: "/account", textName: "account" },
        ]);
        navi.push("/personal/account");
      }
    } else  {
      console.log(response);
    }
  }, [response]);

  return (
    <div className="container">
      <div className={style.signup_container}>
        <SignUpBox responseState={setResponse} />
      </div>
    </div>
  );
}
