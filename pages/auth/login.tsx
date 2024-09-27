import style from "/styles/new.module.css";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import LoginBox from "@/components/auth/login";
import { userAuthResponse } from "@/components/interfaces/shared";
import { useDispatch, UseDispatch } from "react-redux";
import {
  ProfessionalUserNavFun,
  PersonalUserNavFun,
} from "@/components/features/navbar";
import {
  ReplyContextType,
  ReplyContext,
} from "@/components/providers/reply_provider";
import { updateUserCred } from "@/components/features/user";
export default function Login() {
  const navi = useRouter();
  const [response, setResponse] = useState<userAuthResponse | undefined>(
    undefined
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (response && response.status == 200) {
      console.log(response.userCredentials);
      if (response.userCredentials?.account_type == "professional") {
        dispatch(ProfessionalUserNavFun());
        dispatch(updateUserCred({ ...response.userCredentials }));
      } else if (response.userCredentials?.account_type == "personal") {
        dispatch(PersonalUserNavFun());
        dispatch(updateUserCred({ ...response.userCredentials }));
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
