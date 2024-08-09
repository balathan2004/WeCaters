import style from "/styles/new.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import SendData from "../fetch/sendData";
import React, { useContext, useState, FC } from "react";
import GoogleLogin from "./googlePopupLogin";
import { LoaderProvider, ReplyProvider } from "@/pages/_app";
import { userAuthResponse } from "../interfaces/shared";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {
  responseState: React.Dispatch<
    React.SetStateAction<userAuthResponse | undefined>
  >;
}

const LoginBox: FC<Props> = ({ responseState }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const {loader, setLoader} = useContext(LoaderProvider);
  const {reply, setReply} = useContext(ReplyProvider);

  const handler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoader(true);
    var res = await SendData({
      route: "api/auth/login",
      data: loginData,
    })
    console.log(loginData)
    setLoader(false);
    if(res){
      if ( res.status == 200) {
        setReply(res.message);
        responseState(res);
      } else {
        setReply(res.message);
        responseState(res);
      }
    }
   
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    console.log(name, value);
    
    setLoginData((prev) => ({ ...prev, [name]: value }));
    console.log(loginData)
  };

  return (
    <div className={style.login}>
      <div className={style.inner_loginbox}>
        <header>
          <div className={style.header}>
            <span className={style.firstSpan}>Login</span>
          </div>
        </header>
        <div className={style.inner_content}>
          <form className={style.input_container} onSubmit={handler}>
            <article className={style.input_group}>
              <label>Email</label>
              <div className={style.input_box}>
                <FontAwesomeIcon
                  className={style.input_icon}
                  icon={faUser}
                ></FontAwesomeIcon>
                <input
                  placeholder="enter email"
                  required
                  name="email"
                  className={style.input}
                  onChange={handleInput}
                />
              </div>
            </article>
            <article className={style.input_group}>
              <label>Password</label>
              <div className={style.input_box}>
                <FontAwesomeIcon
                  className={style.input_icon}
                  icon={faLock}
                ></FontAwesomeIcon>
                <input
                  placeholder="enter password"
                  required
                  name="password"
                  className={style.input}
                  onChange={handleInput}
                />
              </div>
            </article>

            <div>
              <a href="/forget" className={style.forget}>
                Forget Password ?
              </a>
            </div>
            <div className={style.footer}>
              <button>login</button>
            </div>
          </form>
          <button className={style.google}>
            {" "}
            <FontAwesomeIcon className={style.icon} icon={faGoogle} />
            <span> Continue with Google</span>
          </button>

          <span className={style.signup_text}>
            Don't have a Account <a href="/account_type">Sign up</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginBox

// 103   onClick={() => GoogleLogin(responseState)}
