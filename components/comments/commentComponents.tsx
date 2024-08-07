import style from "/styles/comments.module.css";
import moment from "moment";
import React, { useState, FC } from "react";
import SendData from "../fetch/sendData";
import { defaultImage } from "../blog/smallComponents";
import { TimeSetter } from "../blog/smallComponents";
import { CommentsInterface ,userInterface} from "../interfaces/shared";
import ReplyComment from "./replyComment";
import SingleReply from "./singleReply";

interface Props{
  commentData:CommentsInterface,
  userData:userInterface,
  setReply:React.Dispatch<React.SetStateAction<string>>,
  post_id:string
}


const OneCommentList:FC<Props>=({ commentData, userData, setReply, post_id })=> {
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [isCommentShow, setIsCommentShow] = useState(false);
  const [commentChild, setCommentChild] = useState(
    commentData.has_replies ? commentData.has_replies : []
  );

  const commentHandler = () => {
    setIsCommentShow((prev) => !prev);
  };

  const showBox = () => {
    setShowReplyBox((prev) => !prev);
  };

  return (
    <div className={style.comment_item}>
      <div className={style.comment_item_top}>
        <div className={style.left}>
          <img src={defaultImage(commentData.comment_user)}></img>
        </div>
        <div className={style.right}>
          <div className={style.right_top}>
            <span>{commentData.comment_user}</span>
            <span className={style.comment_time}>
              {TimeSetter(commentData.comment_time)}
            </span>
            <p>{commentData.comment}</p>
          </div>
          <div className={style.comment_item_bottom}>
            <div className={style.button_container}>
              <span onClick={showBox}>{!showReplyBox ? "Reply" : "Hide"} </span>
              {commentChild.length > 0 ? (
                <span onClick={commentHandler}>
                  {isCommentShow ? "hide replies" : "see all comments"}
                </span>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div>
        {isCommentShow
          ? commentChild.map((ele, index) => {
              return (
                <SingleReply
                  commentData={ele}
                  key={index}
                  userData={userData}
                  setReply={setReply}
                  setCommentChild={setCommentChild}
                  post_id={post_id}
                />
              );
            })
          : null}
      </div>
      {showReplyBox ? (
        <ReplyComment
          commentData={commentData}
          userData={userData}
          setReply={setReply}
          updateChildComments={setCommentChild}
          post_id={post_id}
          removeShowBox={setShowReplyBox}
        />
      ) : null}
    </div>
  );
}

export default OneCommentList