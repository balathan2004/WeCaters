import style from "/styles/new.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons";
import SendData from "../fetch/sendData";
import { auth,provider } from "../firebase_config";
import React, { useContext, useState, FC } from "react";
import { signInWithPopup } from "firebase/auth";
import { LoadingContext } from "../providers/loader_provider";
import { ReplyContext } from "../providers/reply_provider";
import { userAuthResponse } from "../interfaces/shared";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

interface Props {
  responseState: React.Dispatch<
    React.SetStateAction<userAuthResponse | undefined>
  >;
}

const LoginBox: FC<Props> = ({ responseState }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const {  setLoading } = useContext(LoadingContext);
  const {  setReply } = useContext(ReplyContext);

  const handler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(loginData)
    setLoading(true);
    var res = await SendData({
      route: "/api/auth/login",
      data: loginData,
    });

    setLoading(false);
    console.log(res);
    if (res) {
      if (res.status == 200) {
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
    setLoginData((prev) => ({ ...prev, [name]: value }));

  };


  const googleLogin = async () => {
    const uid:string = await new Promise(
      (resolve, reject) => {
        signInWithPopup(auth, provider).then(({ user }) => {
          resolve(user.uid);
        });
      }
    );

    const response=await SendData({
      route:"/api/auth/google_uid_login",
      data:{uid:uid}

    }) as userAuthResponse
    if(response &&response.status==200) {
      setReply(response.message)
      responseState(response)
    }
  
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
          <button className={style.google} onClick={googleLogin}>
            {" "}
            <FontAwesomeIcon className={style.icon} icon={faGoogle} />
           Continue with Google
          </button>

          <span className={style.signup_text}>
            Don't have a Account <a href="/signup">Sign up</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;

// 103   onClick={() => GoogleLogin(responseState)}
//105  <a href="/auth/google_login"> Continue with Google</a>