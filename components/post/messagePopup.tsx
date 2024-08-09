import React, { useState,FC } from "react";
import style from "/styles/popup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";


interface Props{

    message: string;

}
const MessagePopup:FC<Props>=({ message }) =>{
  return (
    <div className={style.message}>
      <div className={style.remove}>
        <FontAwesomeIcon icon={faX} className={style.icon} />
      </div>
      <div className={style.header}>
        <h1>Welcome </h1>
        <span>{message}</span>
      </div>

      <div className={style.content}>
        <span>Redirecting to Login Page</span>
      </div>
    </div>
  );
}


export default MessagePopup