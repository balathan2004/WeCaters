import React, { Component, FC, useState, useRef } from "react";
import {
  postVideoInterface,
  reelVideoInterface,
  userInterface,
} from "../interfaces/shared";
import style from "@/styles/reels.module.css";
import Link from "next/link";
interface Props {
  //userData:userInterface,
  reelsData: reelVideoInterface[];
}

const ReelContainer: FC<Props> = ({ reelsData }) => {
  const [count, setCount] = useState(0);
  const [currentVideo, setCurrentVideo] = useState(reelsData[count]);
  const videoRef = useRef<HTMLVideoElement>(null);

  const pauseVideo = () => {
    if (videoRef.current) {
      if (!videoRef.current.paused) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
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
        ></video>
      </div>
      <div className={style.video_details}>
        <div className={style.video_details_bottom}>
          <img src={currentVideo.profile_url}/>
        <Link href={`/profile/${currentVideo.uid}`}>{currentVideo.display_name}</Link>
        <button>Follow</button>
        
        </div>
        
      </div>
    </div>
  );
};

export default ReelContainer;
