import style from "/styles/create-post.module.css";
import React, { Component, useState, useEffect, useContext } from "react";
// file not uploaded on production
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faCaretLeft,
  faCaretRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { LoaderProvider, ReplyProvider } from "@/pages/_app";
import { userInterface } from "@/components/interfaces/shared";
import MessagePopup from "@/components/post/messagePopup";
import { useRouter } from "next/router";
import { defaultImage, VerifiedLogo } from "@/components/blog/smallComponents";
import SendData from "@/components/fetch/sendData";
export default function CreatePost() {
  const {loader, setLoader} = useContext(LoaderProvider);
  const {reply, setReply} = useContext(ReplyProvider);
  const navi = useRouter();
  const [userCred, setUserCred] = useState({
    username: "",
    profile_url: "",
    display_name: "",
  });
  console.log(userCred);
  const [image, setImage] = useState<File[]>();
  const [postImage, setPostImage] = useState<string[]>([]);
  const [count, setCount] = useState(0);
  const [caption, setCaption] = useState("");
  const [popupError, setPopupError] = useState("");

  const handleImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      var files = Array.from(event.target.files);
      console.log(files);
      var urlFiles = files.map((file) => {
        return URL.createObjectURL(file);
      });
      setPostImage(urlFiles);
      setImage(files);
    }
  };

  const prevImage = () => {
    if (postImage) {
      var len = postImage.length;
      if (len != 0 && count <= 0) {
        setCount((prev) => prev - 1);
      } else {
      }
    }
  };

  const nextImage = () => {
    if (postImage) {
      var len = postImage.length;
      if (len != 0 && count < len - 1) {
        setCount((prev) => prev + 1);
      } else {
        setCount(0);
      }
    }
  };

  const handleCaption = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value) {
      setCaption(event.target.value);
    }
  };

  const submitPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loader && image ) {
      setLoader(true);
      const dataToServer = new FormData();
      dataToServer.append("caption", caption);
      image.map((file, index) => {
        dataToServer.append(`file${index}`, file);
        dataToServer.append("username", userCred.username?userCred.username:userCred.display_name);
      });

      var res = await SendData({
        route: "/api/post_action/create_post",
        data: dataToServer,
        stringify: false,
      });
      setLoader(false);
      if (res && res.status == 200) {
        setReply(res.message);
        console.log(res);
        navi.push("/blog");
      } else {
        setReply("post Failed");
      }
    }
  };

  const deleteImage = (count: number) => {
    console.log(count);
    //const deleted = postImage.filter((value, index) => {  index !== count    });
    setPostImage((prev) => {
      return prev.filter((value, index) => index !== count);
    });
  };

  const getPage = () => {
    try {
      let renderData = localStorage.getItem("login_cred");
      let tempVar = renderData
        ? (JSON.parse(renderData) as userInterface)
        : null;
      if (tempVar) {
        setUserCred(tempVar);
      }
    } catch (err) {
      setReply("You Need to Login to continue");
      setTimeout(function () {
        navi.push("/welcome");
      }, 5000);
    }
  };

  useEffect(()=>{
    getPage()
  },[])



  return (
    <div className="container">
      {popupError ? <MessagePopup message={popupError} /> : null}

      <div className={style.inner_container}>
        <div className={style.post}>
          <header className={style.header}>
            <h2>Create Post</h2>
            <h3>{reply ? reply : ""}</h3>
          </header>
          <form className={style.content} onSubmit={submitPost}>
            <div className={style.content_header}>
              <img
                referrerPolicy="no-referrer"
                src={
                  userCred && userCred.profile_url
                    ? userCred.profile_url
                    : defaultImage(userCred.display_name)
                }
                className={style.profile}
              ></img>
              <div className={style.namespace}>
                <span className={style.displayName}>{userCred.display_name}</span>
              </div>
            </div>
            <div className={style.content_box}>
              <textarea
                onChange={handleCaption}
                placeholder="Share your experience"
                required
              ></textarea>
            </div>

            <div className={style.inner_box}>
              <div className={style.img_container}>
                <div className={style.hover_div}>
                  <input
                    type="file"
                    multiple
                    name="file"
                    id="image"
                    onChange={handleImage}
                    accept="image/jpeg,image/png"
                  />

                  <label htmlFor="image">
                    <FontAwesomeIcon
                      icon={faFileImage}
                      size="2x"
                      className={style.slide}
                    />
                    <h3>Add Photos / Videos</h3>
                  </label>
                </div>

                <div className={style.img_div}>
                  {postImage.length > 0 ? (
                    <>
                      <div className={style.delete}>
                        <FontAwesomeIcon
                          icon={faTrashCan}
                          onClick={() => deleteImage(count)}
                        />
                      </div>
                      <div className={style.slideLeft}>
                        {" "}
                        <FontAwesomeIcon
                          icon={faCaretLeft}
                          size="2x"
                          onClick={prevImage}
                        />
                      </div>

                      <img src={postImage[count]} alt={``} />
                      <div className={style.slideRight}>
                        {" "}
                        <FontAwesomeIcon
                          icon={faCaretRight}
                          size="2x"
                          className={style.slide}
                          onClick={nextImage}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </div>
              <button>Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

