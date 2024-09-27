import style from "/styles/comments.module.css";
import React, { useState, useRef, FC } from "react";
import SendData from "../fetch/sendData";
import { v4 } from "uuid";
import { getPostTime } from "../blog/smallComponents";
import { userInterface, CommentsInterface } from "../interfaces/shared";

interface Props {
  setReply: React.Dispatch<React.SetStateAction<string|false>>;
  userData: userInterface | null;
  post_name: string;
  setCommentData: React.Dispatch<
    React.SetStateAction<[] | CommentsInterface[]>
  >;
}

const CommentBox: FC<Props> = ({
  setReply,
  userData,
  post_name,
  setCommentData,
}) => {
  const [comment, setComment] = useState("");
  const commentArea = useRef<HTMLTextAreaElement>(null);
  //const [showCommentBox, setShowCommentBox] = useState(false);
  const [height, setHeight] = useState("auto");

  const sendComment = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (userData) {
      var data: CommentsInterface = {
        post_name: post_name,
        comment: comment,
        comment_id: v4(),
        comment_user: userData ? userData.username : "anonymous",
        comment_time: getPostTime(),
        has_replies: [],
      };
      setCommentData((prev) => [...prev, data]);
      console.log(data);
      const response = await SendData({
        route: "/api/post_action/add_comment",
        data: data,
      });
      if (response && response.status == 200) {
        if (commentArea.current) {
          commentArea.current.value = "";
          setReply("Comment Added");
        }
      }
    } else {
      setReply("login first");
    }
  };

  const handleToggler = () => {
    //setShowCommentBox((prev) => !prev);
  };

  const cancelComment = () => {
    if (commentArea.current) {
      commentArea.current.value = "";
      setHeight("auto");
    }
  };

  const commentFetching = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    var commentValue = event.target.value;
    if (commentValue.length < 1000 && commentValue.length > 0) {
      setHeight("auto"); // Reset height to auto to recalculate the height based on content
      setHeight(event.target.scrollHeight + "px");
      setComment(commentValue);
    } else if (commentValue.length < 10) {
      setHeight("auto");
    } else if (commentValue.length > 1000) {
      setComment((prev) => prev);
      setReply("character limit exceeded");
    }
  };

  return (
    <div className={style.comment}>
      <form className={style.commentBox} onSubmit={sendComment}>
        <span>Leave a Comment</span>
        <textarea
          onChange={commentFetching}
          required
          ref={commentArea}
          style={{ height }}
          placeholder="Add your comment"
        ></textarea>
        <button type="submit">Comment</button>
        <button onClick={cancelComment} type="button">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CommentBox;

/**
 * 92   <span className={style.toggler} onClick={handleToggler}>
        Show Comments
      </span>
 * 
 * 
 */
