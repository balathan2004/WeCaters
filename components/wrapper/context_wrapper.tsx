import React, { ReactNode, useState, useEffect, useContext } from "react";
import { GetRequest } from "@/components/fetch/getRequest";
import {
  userAuthResponse,
  userInterface,
} from "@/components/interfaces/shared";
import Navbar from "@/components/navbar";
import Loading from "@/components/front/loader";
import PopUp from "@/components/front/popup";
import {
  LoadingContext,
  LoadingContextType,
} from "../providers/loader_provider";
import { ReplyContext, ReplyContextType } from "../providers/reply_provider";
import { useDispatch, UseDispatch } from "react-redux";
import { updateUserCred } from "../features/user";
import { ProfessionalUserNavFun, PersonalUserNavFun } from "../features/navbar";
function ContextWrapper({ children }: { children: ReactNode }) {
  const { loading } = useContext<LoadingContextType>(LoadingContext);
  const { reply, setReply } = useContext<ReplyContextType>(ReplyContext);

  const dispatch = useDispatch();

  const getCred = async () => {
    try {
      let res = (await GetRequest({
        route: "/api/auth/login_cred",
      })) as userAuthResponse;
      if (res && res.status == 200) {
        console.log(res);
        if (res.userCredentials?.account_type == "professional") {
          dispatch(ProfessionalUserNavFun());
          dispatch(updateUserCred(res.userCredentials));
        } else if (res.userCredentials?.account_type == "personal") {
          dispatch(PersonalUserNavFun());
          dispatch(updateUserCred(res.userCredentials));
        }
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
      <Navbar />
      {loading ? <Loading /> : null}
      {reply ? <PopUp reply={reply} changeState={setReply} /> : ""}
      {children}
    </>
  );
}

export default ContextWrapper;
