import React, { useContext, useState, useEffect } from "react";
import style from "/styles/account.module.css";
import { deleteCookie } from "cookies-next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import AccountInput from "@/components/account/accountInput";
import SendData from "@/components/fetch/sendData";
import { defaultImage } from "@/components/blog/smallComponents";
import { useRouter } from "next/router";
import { userInterface } from "@/components/interfaces/shared";
import { ReplyContext } from "@/components/providers/reply_provider"
import { LoadingContext } from "@/components/providers/loader_provider";
import { useDispatch, useSelector } from "react-redux";
import { updateUserCred } from "@/components/features/user";
import { InitialUserNavFun ,InitialState} from "@/components/features/navbar";
export default function Account() {
  const navi = useRouter();
  const [loginCred, setLoginCred] = useState<userInterface>({
    display_name: "",
    email: "",
    phone_number: "",
    uid: "",
    username: "",
    profile_url: "",
    account_type: "personal",
  });
  const { setReply } = useContext(ReplyContext);
  const {  setLoading } = useContext(LoadingContext);
  const [image, setImage] = useState<Blob | null>(null);
  const [imageChange, setImageChange] = useState(false);
  const [showImage, setShowImage] = useState("");
  const dispatch=useDispatch()
  const  userData  = useSelector((state:any)=>state.USERCRED.value as userInterface)

  const Logout = () => {
    deleteCookie("catersProfId");
    setReply("Logged out successfully");
    dispatch(InitialUserNavFun())
    dispatch(updateUserCred({...InitialState}))
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
    setLoading(true);
    const response = await SendData({
      route: "/api/auth/update_user",
      data: loginCred,
    });
    console.log(response);
    setLoading(false);
  };

  useEffect(() => {
    if (userData) {
      setLoginCred(userData);
      setShowImage(userData.profile_url);
    }
  }, [userData]);

  useEffect(() => {
    if (imageChange && image) {
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

  if (loginCred) {
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

            <button type="submit">Save Info</button>
            <button onClick={Logout}>Logout</button>
          </div>
        </form>
      </div>
    );
  } else {
    return <div>Invalid creds</div>;
  }
}
