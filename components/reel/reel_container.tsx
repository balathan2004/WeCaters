import React, { useContext, FC, useState, useRef } from "react";
import {
  postVideoInterface,
  reelVideoInterface,
  userInterface,
  userMetaInterface,
} from "../interfaces/shared";
import style from "@/styles/reels.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faComment,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import SendData from "../fetch/sendData";
import { ReplyContext } from "../providers/reply_provider";

interface Props {
  userData: userMetaInterface;
  reelsData: reelVideoInterface[];
}

const ReelContainer: FC<Props> = ({ reelsData, userData }) => {
  const [count, setCount] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(reelsData[count]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { setReply } = useContext(ReplyContext);

  const pauseVideo = () => {
    if (videoRef.current) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      if (videoRef.current.muted) {
        videoRef.current.muted = false;
      }
    }
  };

  const add_like = async () => {
    if (userData && userData.uid != "") {
      console.log('liked')
      const res = await SendData({
        route: "/api/post_action/add_like",
        data: {
          post_name: currentVideo.post_name,
          uid: userData.uid,
          post_author: currentVideo.uid,
        },
      });
      if (res && res.status == 200) {
        setReply("liked");
        setCurrentVideo((prev) => ({
          ...prev,
          like_count: prev.likes_count ? prev.likes_count + 1 : 1,
          liked_by: prev.liked_by
            ? [...prev.liked_by, userData.uid]
            : [userData.uid],
        }));
      } else if (res && res.status == 300) {
        setCurrentVideo((prev) => ({
          ...prev,
          like_count: prev.likes_count ? prev.likes_count - 1 : 0,
          liked_by: prev.liked_by
            ? prev.liked_by.filter((ele) => ele != userData.uid)
            : [],
        }));
      }
    } else {
      setReply("Login First");
    }
  };

  const copyToClipboard = () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/posts/${currentVideo.post_name}`;
    console.log(apiUrl);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(apiUrl);
      setReply("Link Copied to clipboard");
    } else {
      setReply("Permission denied");
    }
  };

  return (
    <div className={style.reel_container}>
      <div className={style.video_container}>
        <video
          onClick={pauseVideo}
          autoPlay
          ref={videoRef}
          src={currentVideo.video_url ? currentVideo.video_url : ""}
          muted
        ></video>
      </div>
      <div className={style.video_details}>
        <div className={style.video_details_bottom}>
          <div className={style.video_details_topbar}>
            <img src={currentVideo.profile_url} />
            <Link href={`/profile/${currentVideo.uid}`}>
              {currentVideo.display_name}
            </Link>
            <button>Follow</button>
          </div>
          <div className={style.video_details_caption}>
            <p>{currentVideo.caption}</p>
          </div>
        </div>
      </div>
      <div className={style.video_interactions}>
        <FontAwesomeIcon onClick={add_like} className={style.icons} icon={faHeart} />
        <FontAwesomeIcon className={style.icons} icon={faComment} />
        <FontAwesomeIcon className={style.icons} icon={faPaperPlane} />
      </div>
    </div>
  );
};

export default ReelContainer;
