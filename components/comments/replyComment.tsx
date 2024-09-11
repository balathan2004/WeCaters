import style from "/styles/comments.module.css";
import moment from "moment";
import React, { useState, useRef, FC } from "react";
import SendData from "../fetch/sendData";
import { CommentsInterface, userInterface } from "../interfaces/shared";

interface ReplyCommentProps {
  commentData: Omit<CommentsInterface, "post_name">;
  userData: userInterface | null;
  setReply: React.Dispatch<React.SetStateAction<string>>;
  updateChildComments: React.Dispatch<
    React.SetStateAction<Omit<CommentsInterface, "post_name">[]>
  >;
  post_name: string;
  removeShowBox: React.Dispatch<React.SetStateAction<boolean>>;
}

const ReplyComment: FC<ReplyCommentProps> = ({
  commentData,
  userData,
  removeShowBox,
  setReply,
  updateChildComments,
  post_name,
}) => {
  const { comment_id, comment_user } = commentData;
  const commentArea = useRef<HTMLTextAreaElement>(null);
  const [commentText, setCommentText] = useState("");
  const [height, setHeight] = useState("auto");

  const commentFetching = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    var commentValue = event.target.value;
    setHeight("auto"); // Reset height to auto to recalculate the height based on content
    setHeight(event.target.scrollHeight + "px");
    console.log(event.target.scrollHeight);
    setCommentText(commentValue);
  };

  const sendComment = async function (event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (commentText.trim() && userData) {
      const time = new Date();
      const modifiedTime = moment(time).format("DD-MM-YYYY hh:mm a");

      const replyCommentData: CommentsInterface = {
        comment: commentText,
        comment_id: comment_id,
        comment_user: userData.username ? userData.username : "anonymous",
        comment_time: modifiedTime,
        comment_reply: comment_user,
        post_name: post_name,
      };

      console.log(replyCommentData);

      const response = await SendData({
        route: "/api/post_action/reply_comment",
        data: replyCommentData,
      });
      if (response && response.status == 200) {
        setReply(response.message);
        updateChildComments((prev) => [...prev, replyCommentData]);
        removeShowBox(false);
      }
    } else {
      setReply("please type a comment");
    }
  };

  return (
    <>
      <form className={style.commentBox} onSubmit={sendComment}>
        <span>Replying to {comment_user}</span>
        <textarea
          onChange={commentFetching}
          required
          ref={commentArea}
          style={{ height }}
          placeholder="Add your comment"
        ></textarea>
        <button type="submit">Comment</button>
        <button type="button" onClick={() => removeShowBox(false)}>
          Cancel
        </button>
      </form>
    </>
  );
};

export default ReplyComment;
