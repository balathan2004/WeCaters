//import SignUpBox from "@/components/auth/signup";
import React, { useState, useEffect, useContext } from "react";
import { NavBarProvider, ReplyProvider, LoaderProvider } from "@/pages/_app";
import style from "/styles/signupform.module.css";
import { useRouter } from "next/router";
import { ResponseConfig } from "@/components/interfaces/shared";
import SingleForm from "@/components/auth/singleForm";
export default function clientSignup() {
  const navi = useRouter();
  const { dirs, setDirs } = useContext(NavBarProvider);
  const [response, setResponse] = useState<ResponseConfig | null>();
  const { reply, setReply } = useContext(ReplyProvider);

  useEffect(() => {
    if (response) {
      if (response.status == 200) {
        setReply("Navigating to login page");
        navi.push("/auth/login");
      } else {
        setReply(response.message);
      }
    }
  }, [response]);

  return (
    <div className="container">
      <div className={style.signup_container}>
        <SingleForm responseState={setResponse} />
      </div>
    </div>
  );
}
