import React, { useState, useEffect, FC } from "react";
import CommentBox from "./commentBox";
import SendData from "../fetch/sendData";
import OneCommentList from "./commentComponents";

import style from "/styles/comments.module.css";
import {
  CommentsResponse,
  CommentsInterface,
  userInterface,
} from "../interfaces/shared";

interface Props {
  userData: userInterface | null;
  setReply: React.Dispatch<React.SetStateAction<string>>;
  post_name: string;
}

const MainComment: FC<Props> = ({ userData, setReply, post_name }) => {
  const [commentData, setCommentData] = useState<CommentsInterface[] | []>([]);
  const [getComments, setGetComments] = useState<boolean>(false);
  const [message, setMessage] = useState("");

  const fetchComments = async function () {
    var data = {
      post_name: post_name,
    };
    console.log(data);
    const response = (await SendData({
      route: "/api/post_action/fetch_comments",
      data: data,
    })) as CommentsResponse;

    if (response && response?.status === 200 && response.comments) {
      console.log(response);
      setCommentData(response.comments);
    } else if (response?.status === 400) {
      console.log(response);
      setMessage("be the first comment");
      setCommentData([]);
    }
  };

  const handleCommentFetch = () => {
    setGetComments((prev) => !prev);
  };

  useEffect(() => {
    if (getComments) {
      fetchComments();
    }
  }, [getComments]);

  return (
    <div className={style.main_comment}>
      <span className={style.view_comment} onClick={handleCommentFetch}>
        {!getComments ? "View Comments" : "Hide Comments"}
      </span>
      <p>{message}</p>
      <CommentBox
        userData={userData}
        setReply={setReply}
        post_name={post_name}
        setCommentData={setCommentData}
      />
      <div className={style.comment_list}>
        {getComments
          ? commentData.map((ele, index) => {
              return (
                <OneCommentList
                  commentData={ele}
                  key={index}
                  userData={userData}
                  setReply={setReply}
                  post_name={post_name}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default MainComment;
