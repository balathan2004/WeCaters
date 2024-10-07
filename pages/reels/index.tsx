import {
  postVideoInterface,
  reelsResponseInterface,
  reelVideoInterface,
} from "@/components/interfaces/shared";
import React, { useState, FC } from "react";
import ReelContainer from "@/components/reel/reel_container";
import style from "@/styles/reels.module.css";
import { useSelector } from "react-redux";

interface Props {
  reelsData: reelVideoInterface[];
}

const Reels: FC<Props> = ({ reelsData }) => {

  const userData=useSelector((state:any)=>state.USERCRED.value)

  return (
    <div className="container">
      <div className={style.reel_wrapper}>
        <div className={style.side_content}></div>
        <ReelContainer reelsData={reelsData} userData={userData}></ReelContainer>
        <div className={style.side_content}></div>
      </div>
    </div>
  );
};

export default Reels;

export async function getServerSideProps() {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.DOMAIN_URL}/api/post_action/get_reels`
      : "http://localhost:3000/api/post_action/get_reels";

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  const res: reelsResponseInterface = await response.json();

  return {
    props: {
      reelsData: res.reelsData,
    },
  };
}
