import React, { FC } from "react";
import { parse } from "cookie";
import style from "/styles/blog.module.css";
import blogStyle from "/styles/blog.module.css";
import SideBar from "@/components/blog/sideBar";
import { defaultImage } from "@/components/blog/smallComponents";
import { GetServerSidePropsContext } from "next";
import {
  postInterface,
  userInterface,
  userProfileResponse,userInterfaceCount
} from "@/components/interfaces/shared";
import CompleteProfile from "@/components/account/complete_profile";

interface props {
  userData: userInterface;
  userPosts: postInterface[];
}

const Profile: FC<props> = ({ userData, userPosts }) => {
  const userDetails = userData;
  
  const count = Math.floor(
    (Object.keys(userData).length / userInterfaceCount) * 100
  );

  const AccountBox: FC = () => {
    return (
      <>
        <div className={style.left}>
          <img
            className={style.profileImage}
            src={
              userDetails.profile_url
                ? userDetails.profile_url
                : defaultImage(userDetails.username)
            }
          ></img>
        </div>
        <div className={style.right}>
          <div className={style.topContainer}>
            <div className={style.namespace}>
              <span className={style.displayName}>
                {userDetails.username
                  ? userDetails.username
                  : userDetails.display_name}
              </span>
            </div>
          </div>
          <div className={style.infos}>
            <h3>{userDetails.display_name}</h3>
            <span className={style.userposts}>
              {userPosts.length}
              <label>posts</label>
            </span>
            <span className={style.followers}>
              10<label>following</label>{" "}
            </span>
          </div>

          <div className={style.contact}>
            <span>contact - {userDetails.email}</span>
            <span>
              {userDetails.phone_number
                ? `contact - ${userDetails.phone_number}`
                : null}
              <span></span>
            </span>
          </div>
          <button className={style.follow}>+ Follow</button>
        </div>
      </>
    );
  };

  return (
    <div className="container">
      <div className={blogStyle.inner}>
        <div className={blogStyle.sideBar}>
          <SideBar data={[]} />
        </div>
        <div className={blogStyle.blog}>
          <div className={style.profile}>
            <div className={style.account}>
{count==100?<AccountBox/>:<CompleteProfile data={userDetails}/>}
              
            </div>

            <ul className={style.posts}>
              {userPosts.map((post, index) => {
                return (
                  <li className={style.item} key={index}>
                    <a href={`/posts/${post.post_name}`}>
                      <img src={post.photo_url ? post.photo_url[0] : ""}></img>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookies = context.req.headers.cookie;
  const parsedCookies = cookies ? parse(cookies) : {};
  const uid = parsedCookies.caters_client_id;

  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://caters.vercel.app/api/profile/my_profile?userid=${uid}`
      : `http://localhost:3000/api/profile/my_profile?userid=${uid}`;
  const response = await fetch(apiUrl);
  const res: userProfileResponse = await response.json();

  return {
    props: {
      userData: res.userData?.userDetails,
      userPosts: res.userData?.userPosts,
    },
  };
};
