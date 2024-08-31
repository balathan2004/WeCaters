import { postInterface } from "@/components/interfaces/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisVertical,
  faHeart,
  faComment,
  faPaperPlane,
  faBookmark,
  faCaretLeft,
  faCaretRight,
} from "@fortawesome/free-solid-svg-icons";
import { faHeart as faRegularHeart } from "@fortawesome/free-regular-svg-icons";
import moment from "moment";
import { VerifiedLogo } from "./smallComponents";
import React, { useState, useContext, useEffect, FC } from "react";
import { defaultImage } from "./smallComponents";
import style from "/styles/blog.module.css";
import { useRouter } from "next/router";
import { UserCredProvider, ReplyProvider } from "@/pages/_app";
import MainComment from "../comments/mainComment";
import { userInterface } from "../auth/signup";
import SendData from "../fetch/sendData";

interface Props {
  data: postInterface;
}

const SinglePost: FC<Props> = ({ data }) => {
  const navi = useRouter();
  const postImage = data.photo_url ? data.photo_url : [];
  const [currentImage, setCurrentImage] = useState(postImage[0]);
  const [count, setCount] = useState(0);
  const { userData, setUserData } = useContext(UserCredProvider);
  const [likes, setLikes] = useState<number>(
    data.likes_count ? data.likes_count : 0
  );
  const [isLiked, setIsLiked] = useState<boolean>(
    userData && data.liked_by?.find((user) => user == userData.uid)
      ? true
      : false
  );
  const totalLength = postImage.length;
  const { reply, setReply } = useContext(ReplyProvider);
  const [arrowDecide, setArrowDecide] = useState(
    totalLength > 1 ? true : false
  );

  const [showComment, setShowComment] = useState(false);

  const parsedUserData: userInterface = userData;

  const gotoPost = () => {
    navi.push(`/posts/${data.post_name}`);
  };

  const handleShowComment = () => {
    setShowComment(true);
  };

  const nextImage = () => {
    if (totalLength != 0 && count >= 0 && count < totalLength - 1) {
      setCurrentImage(postImage[count + 1]);
      setCount(() => count + 1);
    } else {
      setCurrentImage(postImage[0]);
      setCount(() => 0);
    }
  };

  const prevImage = () => {
    if (totalLength != 0 && count > 0) {
      setCurrentImage(postImage[count - 1]);
      setCount(() => count - 1);
    } else {
      setCurrentImage(postImage[totalLength - 1]);
      setCount(() => totalLength - 1);
    }
  };

  const add_like = async () => {
    if (userData) {
      const res = await SendData({
        route: "/api/post_action/add_like",
        data: {
          post_name: data.post_name,
          uid: userData.uid,
          post_author: data.uid,
        },
      });
      if (res && res.status == 200) {
        setReply("liked");
        setLikes((prev) => prev + 1);
        setIsLiked(true);
      } else if (res?.status == 300) {
        setLikes((prev) => prev - 1);
        setIsLiked(false);
      }
    }
  };

  const copyToClipboard = () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/posts/${data.post_name}`;
    console.log(apiUrl);
    setReply("Link Copied to clipboard");
    navigator.clipboard.writeText(apiUrl);
  };

  return (
    <div className={style.post} onDoubleClick={gotoPost}>
      <div className={style.post_title}>
        <div className={style.post_left}>
          <div className={style.image}>
            <img
              src={
                data.profile_url
                  ? data.profile_url
                  : defaultImage(data.username)
              }
            />
          </div>
          <div className={style.details}>
            <a href={`/profile/${data.uid}`} className={style.name}>
              {data.username}
            </a>
            {true ? <VerifiedLogo /> : null}
          </div>
        </div>
        <div className={style.post_right}>
          <FontAwesomeIcon className={style.icon} icon={faEllipsisVertical} />
        </div>
      </div>
      <div className={style.post_content}>
        {arrowDecide ? (
          <>
            <FontAwesomeIcon
              icon={faCaretLeft}
              onClick={prevImage}
              className={style.caretLeft}
            />
            <span className={style.hoverText}>
              {count + 1}/{totalLength}{" "}
            </span>
            <img src={postImage.length > 0 ? currentImage : ""} alt="post" />

            <FontAwesomeIcon
              icon={faCaretRight}
              onClick={nextImage}
              className={style.caretRight}
            />
          </>
        ) : (
          <>
            <img src={postImage.length > 0 ? currentImage : ""} alt="post" />
          </>
        )}
      </div>
      <div className={style.post_footer}>
        <div className={style.like_share_comment}>
          <FontAwesomeIcon
            className={style.icon}
            icon={isLiked ? faHeart : faRegularHeart}
            onClick={add_like}
          />

          <FontAwesomeIcon
            className={style.icon}
            onClick={handleShowComment}
            icon={faComment}
          />

          <FontAwesomeIcon
            className={style.icon}
            icon={faPaperPlane}
            onClick={copyToClipboard}
          />
        </div>
        <div className={style.save}>
          <FontAwesomeIcon className={style.icon} icon={faBookmark} />
        </div>
      </div>
      <div className={style.post_footer_content}>
        <span className={style.likes}>{likes} likes</span>
        <p>
          <a href={`/profile/${data.uid}`} className={style.name}>
            {data.username}
          </a>
          {data.caption}
        </p>

        <span className={style.posting_time}>
          {moment(data.time, "DD-MM-YYYY hh-mm a").fromNow()}
        </span>
      </div>
      <div>
        {showComment ? (
          <MainComment
            userData={userData}
            post_name={data.post_name}
            setReply={setReply}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SinglePost;
