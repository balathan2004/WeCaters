import React, { useContext, useState, useEffect } from "react";
import style from "/styles/professional_account.module.css";
import { deleteCookie } from "cookies-next";

import { useRouter } from "next/router";
import {
  userAuthResponse,
  userInterface,
} from "@/components/interfaces/shared";
import Report from "@/components/professional_account/report";
import ProProfile from "@/components/professional_account/profile";
import { useDispatch, useSelector } from "react-redux";
import { ReplyContext } from "@/components/providers/reply_provider";
import { LoadingContext } from "@/components/providers/loader_provider";
import { InitialUserNavFun } from "@/components/features/navbar";
import { userInitialiser } from "@/components/interfaces/shared";
export default function Account() {
  const navi = useRouter();
  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.USERCRED.value);
  const [loginCred, setLoginCred] = useState<userInterface>(userInitialiser);

  const { setReply } = useContext(ReplyContext);

  const { setLoading } = useContext(LoadingContext);
  const [activeComponent, setActiveComponent] = useState<
    "profile" | "account" | "analytics" | "report"
  >("profile");
  const components = [
    { name: "profile", component: ProProfile },
    { name: "report", component: Report },
  ];

  const Logout = () => {
    localStorage.removeItem("login_cred");
    deleteCookie("cater_account_type");
    deleteCookie("caters_client_id");
    setReply("Logged out successfully");
    dispatch(InitialUserNavFun());
    navi.push("/welcome");
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setLoginCred((prev) => ({ ...prev, [name]: value }));
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case "profile":
        return <ProProfile loginCred={loginCred} setLoginCred={setLoginCred} initialUserData={userData} />;

      case "report":
        return <Report userData={userData} />;
    }
  };

  useEffect(() => {
    if (userData) {
      if (userData.state && userData.state == "") {
        setLoginCred(() => ({ ...userData, state: "tamil nadu" }));
      } else {
        setLoginCred(userData);
      }
    }
  }, [userData]);

  return (
    <div className={style.account}>
      <main>
        <nav>
          <ul>
            <li onClick={() => setActiveComponent("profile")}>My Profile</li>
            <li>Account Settings</li>
            <li>Analytics</li>
            <li onClick={() => setActiveComponent("report")}>
              Report a problem
            </li>
          </ul>
        </nav>
        <section>
          <article>{renderComponent()}</article>
        </section>
      </main>
    </div>
  );
}

//
//  {loginCred.isVerified ? <VerifiedLogo /> : null}

/**
 *
 *  *
 *
 * 
 *   const getCred = async () => {
    let res = (await GetRequest({
      route: "/api/auth/login_cred",
    })) as userAuthResponse;
    if (res && res.status == 200 && res.userCredentials) {
      var userData = res.userCredentials;
      localStorage.setItem("login_cred", JSON.stringify(userData));
      return userData as userInterface;
    } else {
      return null;
    }
  };

  const render = async () => {
    try {
      const jsonData = localStorage.getItem("login_cred");
      let renderData: userInterface | null;
      if (jsonData) {
        renderData = JSON.parse(jsonData) as userInterface;
      } else {
        renderData = await getCred();
      }
      if (renderData) {
        setLoginCred(renderData);
        setShowImage(renderData.profile_url);
      }
    } catch (e) {
      console.log(e);
    }
  };
 * 
 * 
 */
