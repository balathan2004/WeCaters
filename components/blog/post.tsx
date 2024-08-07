import style from "/styles/blog.module.css";
import React, { useState } from "react";
import { defaultImage, VerifiedLogo } from "./smallComponents";
import { useRouter } from "next/router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
export default function Post({ data }) {
  const navi = useRouter();
  const postImage = data.photoUrl;
  const [currentImage, setCurrentImage] = useState(postImage[0]);
  const [count, setCount] = useState(0);
  const profile = data.profileUrl;
  const { postName } = data;

  const gotoPost = () => {
    navi.push(`/posts/${postName}`);
  };

  const nextImage = () => {
    var len = postImage.length;
    if (len != 0 && count >= 0 && count < len - 1) {
      setCount(() => {
        setCurrentImage(postImage[count + 1]);
        return count + 1;
      });
    } else {
      setCount(() => {
        setCurrentImage(postImage[0]);
        return 0;
      });
    }
  };

  const prevImage = () => {
    var len = postImage.length;
    if (len != 0 && count > 0) {
      setCount(() => {
        setCurrentImage(postImage[count - 1]);
        return count - 1;
      });
    } else {
      setCount(() => {
        setCurrentImage(postImage[len - 1]);
        return len - 1;
      });
    }
  };

  return (
    <div className={style.post} onDoubleClick={gotoPost}>
      <header>
        <img src={profile ? profile : defaultImage(data.username)} />
        <div className={style.username_space}>
          <a href={`/users/${data.username}`}>@{data.username}</a>
          {data.isVerified ? <VerifiedLogo /> : null}
        </div>
      </header>
      <div className={style.content}>
        <div className={style.slideLeft}>
          {" "}
          <FontAwesomeIcon icon={faCaretLeft} size="3x" onClick={prevImage} />
        </div>

        <img src={postImage.length > 0 ? currentImage : null} alt="post" />
        <div className={style.slideRight}>
          {" "}
          <FontAwesomeIcon
            icon={faCaretRight}
            size="3x"
            className={style.slide}
            onClick={nextImage}
          />
        </div>
      </div>
      <footer>
        <span className={style.username}>{data.username}</span>
        <span className={style.caption}>{data.caption}</span>
      </footer>
    </div>
  );
}
