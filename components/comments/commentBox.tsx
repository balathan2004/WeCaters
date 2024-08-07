import style from "/styles/comments.module.css";
import React, { useState, useRef ,FC} from "react";
import SendData from "../fetch/sendData";
import { v4 } from "uuid";
import { getPostTime } from "../blog/smallComponents";
import { userInterface,CommentsInterface } from "../interfaces/shared";

interface Props{
  setReply:React.Dispatch<React.SetStateAction<string>>,
  userData:userInterface,
  post_id:string,
  setCommentData: React.Dispatch<React.SetStateAction<[] | CommentsInterface[]>>
}


 const CommentBox:FC<Props>=({
  setReply,
  userData,
  post_id,
  setCommentData,
})=> {
  const [comment, setComment] = useState("");
  const commentArea = useRef<HTMLTextAreaElement>(null);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [height, setHeight] = useState("auto");

  const sendComment = async (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    var data:CommentsInterface = {
      post_id: post_id,
      comment: comment,
      comment_id: v4(),
      comment_user: userData ? userData.username : "anonymous",
      comment_time: getPostTime(),
      has_replies: [],
    };
    setCommentData((prev) => [...prev, data]);
    const response = await SendData(
      {route:"api/post_action/add_comment",data:data}
       );
    if (response && response.message) {
      if(commentArea.current){
        commentArea.current.value=""
        setReply("Comment Added");
      }
   
    }
  };

  const handleToggler = () => {
    setShowCommentBox((prev) => !prev);
  };

  const commentFetching = (event:React.ChangeEvent<HTMLTextAreaElement>) => {
    var commentValue = event.target.value;
    setHeight("auto"); // Reset height to auto to recalculate the height based on content
    setHeight(event.target.scrollHeight + "px");
    console.log(event.target.scrollHeight);
    setComment(commentValue);
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
        <button>Cancel</button>
      </form>
      <span className={style.toggler} onClick={handleToggler}>
        Show Comments
      </span>
    </div>
  );
}


export default CommentBox