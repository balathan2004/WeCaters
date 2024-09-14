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
import React, { useState, useContext, useEffect, FC, useMemo } from "react";
import { defaultImage } from "./smallComponents";
import style from "/styles/blog.module.css";
import { useRouter } from "next/router";
import { UserCredProvider, ReplyProvider } from "@/pages/_app";
import MainComment from "../comments/mainComment";
import { userInterface } from "@/components/interfaces/shared";
import SendData from "../fetch/sendData";

interface Props {
  data: postInterface;
  userData: userInterface | null;
}

const SinglePost: FC<Props> = ({ data, userData }) => {
  const navi = useRouter();
  const [availData, setAvailData] = useState(data);
  const postImage = availData.photo_url ? availData.photo_url : [];
  const [currentImage, setCurrentImage] = useState(postImage[0]);
  const [count, setCount] = useState(0);
  const [likes, setLikes] = useState<number>(
    availData.likes_count ? availData.likes_count : 0
  );
  const [isLiked, setIsLiked] = useState<boolean>(false);

  const totalLength = postImage.length;
  const arrowDecide = totalLength > 1;
  const { reply, setReply } = useContext(ReplyProvider);

  const [showComment, setShowComment] = useState(false);

  const gotoPost = () => {
    navi.push(`/posts/${availData.post_name}`);
  };

  const handleShowComment = () => {
    setShowComment((prev) => !prev);
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
          post_name: availData.post_name,
          uid: userData.uid,
          post_author: availData.uid,
        },
      });
      if (res && res.status == 200) {
        setReply("liked");
        setAvailData((prev) => ({
          ...prev,
          like_count: prev.likes_count ? prev.likes_count + 1 : 1,
          liked_by: prev.liked_by
            ? [...prev.liked_by, userData.uid]
            : [userData.uid],
        }));
        setLikes((prev) => prev + 1);
        setIsLiked(true);
        console.log("liked");
      } else if (res && res.status == 300) {
        setLikes((prev) => prev - 1);
        setIsLiked(false);
        console.log("not liked");
        setAvailData((prev) => ({
          ...prev,
          like_count: prev.likes_count ? prev.likes_count - 1 : 0,
          liked_by: prev.liked_by
            ? prev.liked_by.filter((ele) => ele != userData.uid)
            : [],
        }));
      }
    } else {
      setReply("Login First");
    }
  };

  const copyToClipboard = () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_DOMAIN_URL}/posts/${availData.post_name}`;
    console.log(apiUrl);

    if (navigator.clipboard) {
      navigator.clipboard.writeText(apiUrl);
      setReply("Link Copied to clipboard");
    } else {
      setReply("Permission denied");
    }
  };

  useEffect(() => {
    if (userData) {
      setIsLiked(() => {
        return data.liked_by?.includes(userData.uid) ? true : false;
      });
    }
  }, [userData]);

  return (
    <div className={style.post} onDoubleClick={gotoPost}>
      <div className={style.post_title}>
        <div className={style.post_left}>
          <div className={style.image}>
            <img
              src={
                availData.profile_url
                  ? availData.profile_url
                  : defaultImage(availData.username)
              }
            />
          </div>
          <div className={style.details}>
            <a href={`/profile/${availData.uid}`} className={style.name}>
              {availData.username}
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
          <a href={`/profile/${availData.uid}`} className={style.name}>
            {availData.username}
          </a>
          {availData.caption}
        </p>

        <span className={style.posting_time}>
          {moment(availData.time, "DD-MM-YYYY hh-mm a").fromNow()}
        </span>
      </div>
      <div>
        {showComment ? (
          <MainComment
            userData={userData}
            post_name={availData.post_name}
            setReply={setReply}
          />
        ) : null}
      </div>
    </div>
  );
};

export default SinglePost;
