import style from "/styles/create-post.module.css";
import React, { useState, useContext, useRef, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileImage,
  faCaretLeft,
  faCaretRight,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { ReplyContext } from "@/components/providers/reply_provider";
import { LoadingContext } from "@/components/providers/loader_provider";
import { userInterface } from "@/components/interfaces/shared";
import MessagePopup from "@/components/post/messagePopup";
import { useRouter } from "next/router";
import { defaultImage, VerifiedLogo } from "@/components/blog/smallComponents";
import SendData from "@/components/fetch/sendData";
import { useSelector, UseSelector } from "react-redux";
import { LegacyRef } from "react";
export default function CreatePost() {
  const { loading, setLoading } = useContext(LoadingContext);
  const { reply, setReply } = useContext(ReplyContext);
  const navi = useRouter();
  const userCred = useSelector(
    (state: any) => state.USERCRED.value as userInterface
  );

  const [videoFile, setVideoFile] = useState<Blob | null>(null);
  const [postVideo, setPostVideo] = useState<string>("");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [caption, setCaption] = useState("");
  const [popupError, setPopupError] = useState("");

  const handleVideo = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      var file = event.target.files[0];
      console.log(file);
      var urlFile = URL.createObjectURL(file);
      setPostVideo(urlFile);
      setVideoFile(file);
    }
  };
  const handleCaption = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value) {
      setCaption(event.target.value);
    }
  };

  const submitPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!loading && videoFile) {
      setLoading(true);
      const dataToServer = new FormData();
      dataToServer.append("caption", caption);

      dataToServer.append(`file`, videoFile);
      dataToServer.append(
        "username",
        userCred.username ? userCred.username : userCred.display_name
      );

      var res = await SendData({
        route: "/api/post_action/create_reel",
        data: dataToServer,
        stringify: false,
      });
      setLoading(false);
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
    //const deleted = postVideo.filter((value, index) => {  index !== count    });
    setPostVideo((prev) => "");
  };

  const videoLenghtFinder = () => {
    if (videoRef) {
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  useEffect(() => {
    if (postVideo && videoFile && videoRef.current) {
      if (videoRef.current.duration > 60) {
        setPostVideo("");
        setVideoFile(null);
      }
    }
  }, [postVideo, videoFile]);

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
                <span className={style.displayName}>
                  {userCred.display_name}
                </span>
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
                    name="file"
                    id="image"
                    onChange={handleVideo}
                    accept="video/mp4,video/quicktime"
                    required
                  />

                  <label htmlFor="image">
                    <FontAwesomeIcon
                      icon={faFileImage}
                      size="2x"
                      className={style.slide}
                    />
                    <h3>Add Video</h3>
                  </label>
                </div>

                <div className={style.img_div}>
                  <video
                    src={postVideo}
                    ref={videoRef}
                    onClick={pauseVideo}
                    autoPlay
                  />
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
