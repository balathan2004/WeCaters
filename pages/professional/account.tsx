import React, { useContext, useState, useEffect, useRef, FC } from "react";
import style from "/styles/professional_account.module.css";
import { deleteCookie } from "cookies-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import AccountInput from "@/components/account/accountInput";
import SendData from "@/components/fetch/sendData";
import { GetRequest } from "@/components/fetch/getRequest";
import { LoaderProvider, ReplyProvider, NavBarProvider } from "../_app";
import { defaultImage, VerifiedLogo } from "@/components/blog/smallComponents";
import { useRouter } from "next/router";
import {
  userAuthResponse,
  userInterface,
} from "@/components/interfaces/shared";
import cityData from "@/components/src/new.json";
import ProProfile from "@/components/professional_account/profile";
export default function Account() {
  const navi = useRouter();
  const [loginCred, setLoginCred] = useState<userInterface>({
    account_type: "professional",
    profile_url: "",
    display_name: "",
    email: "",
    phone_number: "",
    uid: "",
    username: "",
    company_name: "",
    district: "",
    state: "tamil nadu",
    isVerified: false,
    bio: "",
  });
  const { reply, setReply } = useContext(ReplyProvider);
  const { dirs, setDirs } = useContext(NavBarProvider);
  const { loader, setLoader } = useContext(LoaderProvider);
  const [image, setImage] = useState<File | null>(null);
  const [imageChange, setImageChange] = useState(false);
  const [showImage, setShowImage] = useState("");
  const cities = cityData;
  const states = Object.keys(cities);
  const [districts, setDistricts] = useState<string[]>([]);


  const Logout = () => {
    localStorage.removeItem("login_cred");
    deleteCookie("cater_account_type");
    deleteCookie("caters_client_id");
    setReply("Logged out successfully");
    setDirs([
      { route: "blog", textName: "blog" },
      { route: "/about", textName: "about" },
      { route: "/welcome", textName: "welcome" },
      { route: "/login", textName: "login" },
    ]);
    navi.push("/welcome");
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setLoginCred((prev) => ({ ...prev, [name]: value }));
  };

 

  const getCred = async () => {
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

  

  useEffect(() => {
    render();
  }, []);

  return (
    <div className={style.account}>
      <main>
        <nav>
          <li>My Profile</li>
          <li>Account Settings</li>
          <li>Analytics</li>
          <li>Report a problem</li>
        </nav>
        <section>
          <article>
          <ProProfile loginCred={loginCred} setLoginCred={setLoginCred}/>
          </article>
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
 */
