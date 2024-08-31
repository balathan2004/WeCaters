import React, { useContext, useState, useEffect } from "react";
import style from "/styles/account.module.css";
import { deleteCookie } from "cookies-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import AccountInput from "@/components/account/accountInput";
import SendData from "@/components/fetch/sendData";
import { GetRequest } from "@/components/fetch/getRequest";
import { LoaderProvider, NavBarProvider, ReplyProvider } from "../_app";
import { defaultImage } from "@/components/blog/smallComponents";
import { useRouter } from "next/router";
import { userInterface } from "@/components/interfaces/shared";
export default function Account() {
  const navi = useRouter();
  const [loginCred, setLoginCred] = useState<userInterface>({
    display_name: "",
    email: "",
    phone_number: "",
    bio: "",
    uid: "",
    username: "",
    profile_url: "",
    account_type: "personal",
  });
  const { reply, setReply } = useContext(ReplyProvider);
  const { dirs, setDirs } = useContext(NavBarProvider);
  const { loader, setLoader } = useContext(LoaderProvider);
  const [image, setImage] = useState<Blob | null>(null);
  const [imageChange, setImageChange] = useState(false);
  const [showImage, setShowImage] = useState("");

  const Logout = () => {
    localStorage.removeItem("login-cred");
    deleteCookie("catersProfId");
    setReply("Logged out successfully");
    setDirs([
      { route: "blog", textName: "blog" },
      { route: "/about", textName: "about" },
      { route: "/welcome", textName: "welcome" },
      { route: "/login", textName: "login" },
    ]);
    navi.push("/welcome");
  };

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      var file = event.target.files[0];
      var urlImage = URL.createObjectURL(file);
      setShowImage(urlImage);
      setImage(file);
      setImageChange((prev) => !prev);
    }
  };

  const errorImageHandler = () => {
    setShowImage(defaultImage(loginCred.username));
  };

  const handler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoader(true);
    const response = await SendData({
      route: "/api/auth/update_user",
      data: loginCred,
    });
    console.log(response);
    setLoader(false);
  };

  const getCred = async () => {
    let res = await GetRequest({ route: "/api/auth/login-cred" });
    if (res && res.status === 200) {
      var message = res.message;
      localStorage.setItem("login-cred", JSON.stringify(message));
      return message;
    }
  };

  useEffect(() => {
    try {
      const getter = localStorage.getItem("login_cred");
      let renderData = JSON.parse(getter ? getter : "");

      if (renderData == "") {
        renderData = getCred();
      } else {
        setLoginCred(renderData);
        setShowImage(renderData.profile_url);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    if (imageChange && image) {
      console.log("image-change");

      var form = new FormData();
      form.append("file", image);

      SendData({
        route: "/api/account/profile_image_change",
        data: form,
        stringify: false,
      });
      setImageChange((prev) => !prev);
    }
  }, [imageChange]);

  return (
    <div className={style.account}>
      <form onSubmit={handler} className={style.card}>
        <h1>Your profile</h1>
        <div className={style.profile_container}>
          <input
            type="file"
            onChange={handleImage}
            id="image"
            accept="image/jpeg, image/png"
            className={style.hideImage}
          />
          <label htmlFor="image">
            <img
              src={showImage ? showImage : defaultImage(loginCred.username)}
              referrerPolicy="no-referrer"
              onError={errorImageHandler}
            ></img>
          </label>

          <FontAwesomeIcon
            icon={faCamera}
            className={style.select_image}
          ></FontAwesomeIcon>
        </div>

        <div className={style.data_container}>
          <div className={style.username}>
            <span>@{loginCred.username}</span>
          </div>
          <AccountInput
            label_name={"display name"}
            variable_name={"display_name"}
            initialValue={loginCred.display_name}
            changeState={setLoginCred}
          />
          <AccountInput
            label_name={"email"}
            initialValue={loginCred.email}
            changeState={setLoginCred}
            editable={false}
          />
          <AccountInput
            label_name={"phone"}
            initialValue={loginCred.phone_number}
            changeState={setLoginCred}
            placeholder="No phone number"
          />
          <AccountInput
            label_name={"bio"}
            initialValue={loginCred.bio ? loginCred.bio : ""}
            changeState={setLoginCred}
            placeholder="Nothing here"
          />

          <button type="submit">Save Info</button>
          <button onClick={Logout}>Logout</button>
        </div>
      </form>
    </div>
  );
}
