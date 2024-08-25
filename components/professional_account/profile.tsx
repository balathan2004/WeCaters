import React, { FC, useContext, useState, useEffect, useRef } from "react";
import { isEqual } from "lodash";
import { LoaderProvider, NavBarProvider, ReplyProvider } from "@/pages/_app";
import { defaultImage, VerifiedLogo } from "@/components/blog/smallComponents";

import SendData from "../fetch/sendData";
import {
  ResponseConfig,
  userAuthResponse,
  userInterface,
} from "../interfaces/shared";
import style from "/styles/professional_profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import cityData from "@/components/src/new.json";

interface Props {
  loginCred: userInterface;
  setLoginCred: React.Dispatch<React.SetStateAction<userInterface>>;
}

const ProProfile: FC<Props> = ({ loginCred, setLoginCred }) => {
  const { reply, setReply } = useContext(ReplyProvider);
  const { dirs, setDirs } = useContext(NavBarProvider);
  const { loader, setLoader } = useContext(LoaderProvider);
  const [image, setImage] = useState<File | null>(null);
  const [imageChange, setImageChange] = useState(false);
  const [showImage, setShowImage] = useState("");
  const [oldLoginCred, setOldLoginCred] = useState<userInterface | null>(null);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const states = Object.keys(cityData);
  const [districts, setDistricts] = useState<string[]>([]);
  const city_data = cityData as { [state: string]: string[] };

  const handler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(loginCred);
    if (oldLoginCred && !isEqual(oldLoginCred, loginCred)) {
      console.log(oldLoginCred);
      console.log(loginCred);
      setLoader(true);

      const response = (await SendData({
        route: "/api/auth/update_professional_account",
        data: loginCred,
      })) as userAuthResponse;
      if (response && response?.status == 200 && response?.userCredentials) {
        localStorage.setItem(
          "login_cred",
          JSON.stringify(response.userCredentials)
        );
        setOldLoginCred(response.userCredentials);
        console.log(response);
      }
      setLoader(false);
    } else {
      console.log("No Changes Made");
    }
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

  async function checkForUsername() {
    const username = usernameRef.current?.value;
    console.log(username);
    if (username && EvaluateUsername(username)) {
      console.log("sending request");
      const response = (await SendData({
        route: "/api/account/username_check",
        data: {
          username: username,
        },
      })) as ResponseConfig;
      console.log(response);
      if (response && response.status === 200) {
        console.log(response);
        setLoginCred((prev) => ({ ...prev, username: username }));
      } else {
        console.log(response);
      }
    }
  }

  const EvaluateUsername = (name: string) => {
    var regex = /^[a-zA-Z_$][a-zA-Z0-9_$.]*$/;
    return regex.test(name);
  };

  const handleProInput = (event: React.ChangeEvent<HTMLSelectElement>) => {
    let { name, value } = event.target;
    setLoginCred((prev) => ({ ...prev, [name]: value }));
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { name, value } = event.target;
    setLoginCred((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (imageChange && image) {
      var form = new FormData();
      form.append("file", image);
      console.log(form);
      SendData({
        route: "/api/account/profile_image_change",
        data: form,
        stringify: false,
      });
      setImageChange((prev) => !prev);
    }
  }, [imageChange]);

  useEffect(() => {
    const userCred = localStorage.getItem("login_cred");
    const oldLoginCred: userInterface = JSON.parse(userCred ? userCred : "");
    setOldLoginCred(oldLoginCred);
  }, []);

  useEffect(() => {
    if (loginCred.state) {
      setDistricts(city_data[loginCred.state]);
      const current=city_data[loginCred.state][0]
      setLoginCred(prev=>({...prev,district:current}))
    }
  }, [loginCred.state]);

  const District: FC<{ districts: string[] }> = ({ districts }) => {
    return (
      <article>
        <label>Select your District</label>
        <select
          onChange={handleProInput}
          value={loginCred.district}
          name="district"
        >
          {districts.map((item, index) => (
            <option value={item} key={index}>
              {item}
            </option>
          ))}
        </select>
      </article>
    );
  };

  return (
    <div className={style.profile}>
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
              src={
                showImage
                  ? showImage
                  : defaultImage(
                      loginCred.username
                        ? loginCred.username
                        : loginCred.display_name
                    )
              }
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
            {loginCred.username ? <span>@{loginCred.username}</span> : null}
          </div>

          {!loginCred.username ? (
            <div className={style.username_container}>
              <label>Create username</label>
              <input
                name="username"
                ref={usernameRef}
                placeholder="Your username"
                type="text"
                required
              ></input>
              <button type="button" onClick={checkForUsername}>
                check
              </button>
            </div>
          ) : null}

          <div className={style.input_container}>
            {" "}
            <label>display name</label>
            <input
              onChange={handleInput}
              placeholder={"display name"}
              name={"display_name"}
              value={loginCred.display_name ? loginCred.display_name : ""}
            />
          </div>
          <div className={style.input_container}>
            {" "}
            <label>email</label>
            <input
              onChange={handleInput}
              placeholder={"email"}
              value={loginCred.email}
              disabled={true}
            />
          </div>
          <div className={style.input_container}>
            {" "}
            <label>phone</label>
            <input
              onChange={handleInput}
              placeholder={"phone"}
              name="phone_number"
              value={loginCred.phone_number ? loginCred.phone_number : ""}
            />
          </div>
          <div className={style.input_container}>
            {" "}
            <label>bio</label>
            <input
              onChange={handleInput}
              placeholder={"bio"}
              name="bio"
              value={loginCred.bio ? loginCred.bio : ""}
            />
          </div>
          <div className={style.input_container}>
            {" "}
            <label>company name</label>
            <input
              onChange={handleInput}
              placeholder={"company name"}
              name="company_name"
              value={loginCred.company_name ? loginCred.company_name : ""}
            />
          </div>
          <div className={style.input_container}>
            {" "}
            <label>Select state</label>
            <select
              onChange={handleProInput}
              value={loginCred.state}
              name="state"
            >
              {states.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className={style.input_container}>
            {" "}
            <District districts={districts} />
          </div>

          <button type="submit">Save Info</button>
        </div>
      </form>
    </div>
  );
};

export default ProProfile;
