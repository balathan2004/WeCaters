import style from "/styles/comments.module.css";
import moment from "moment";
import React, { useState, useRef,FC } from "react";
import SendData from "../fetch/sendData";
import { defaultImage } from "../blog/smallComponents";
import { TimeSetter } from "../blog/smallComponents";
import ReplyComment from "./replyComment";
import { CommentsInterface, userInterface } from "../interfaces/shared";

interface Props{
    commentData:CommentsInterface;
    userData:userInterface,
    setReply:React.Dispatch<React.SetStateAction<string>>,
    setCommentChild:React.Dispatch<React.SetStateAction<CommentsInterface[]>>,
    post_id:string
}


const  SingleReply:FC<Props>=({
  commentData,
  userData,
  setReply,
  setCommentChild,
  post_id,
})=> {
  const [showReplyBox, setShowReplyBox] = useState(false);

  return (
    <div className={style.reply_comment}>
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
            <p>
              {" "}
              <span className={style.user_mention}>
                {commentData.comment_reply}
              </span>
              {commentData.comment}
            </p>
          </div>

          <div className={style.comment_item_bottom}>
            <div className={style.button_container}>
              <span onClick={() => setShowReplyBox((prev) => !prev)}>
                Reply
              </span>
            </div>
          </div>
        </div>
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


export default SingleReply