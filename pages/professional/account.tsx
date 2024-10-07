import React, { FC, use, useContext, useEffect } from "react";
import { parse } from "cookie";
import style from "/styles/blog.module.css";
import blogStyle from "/styles/blog.module.css";
import SideBar from "@/components/blog/sideBar";
import { defaultImage } from "@/components/blog/smallComponents";
import { GetServerSidePropsContext } from "next";
import {
  postInterface,
  userInterface,
  userProfileResponse,
  userInterfaceCount,
  profileUserInterface,
  userMetaInterface,
} from "@/components/interfaces/shared";

import CompleteProfile from "@/components/account/complete_profile";
import { useDispatch, useSelector } from "react-redux";

interface props {
  userPosts: postInterface[];
}

const Profile: FC<props> = ({  userPosts }) => {
  //const userDetails = profileData;
  const userData=useSelector((state:any)=>state.USERCRED.value) as userMetaInterface

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
              userData.profile_url
                ? userData.profile_url
                : defaultImage(userData.username)
            }
          ></img>
        </div>
        <div className={style.right}>
          <div className={style.topContainer}>
            <div className={style.namespace}>
              <span className={style.displayName}>
                {userData.username
                  ? userData.username
                  : userData.display_name}
              </span>
            </div>
          </div>
          <div className={style.infos}>
            <h3>{userData.display_name}</h3>
            <span className={style.userposts}>
              {userPosts.length}
              <label>posts</label>
            </span>
            <span className={style.followers}>
              {userData.meta_data.userConnections.followingCount}
              <label>following</label>{" "}
            </span>
            <span className={style.followers}>
              {userData.meta_data.userConnections.followersCount}
              <label>followers</label>{" "}
            </span>
          </div>

          <div className={style.contact}>
            <span>contact - {userData.email}</span>
            <span>
              {userData.phone_number
                ? `contact - ${userData.phone_number}`
                : null}
              <span></span>
            </span>
          </div>
          <a href="/professional/edit-profile">Edit Profile</a>
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
              {count >= 100 ? (
                <AccountBox />
              ) : (
                <CompleteProfile data={userData} />
              )}
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
      ? `https://we-caters.vercel.app/api/profile/my_profile?userid=${uid}`
      : `http://localhost:3000/api/profile/my_profile?userid=${uid}`;
  const response = await fetch(apiUrl);
  const res: userProfileResponse = await response.json();

  return {
    props: {
      userPosts: res.userData?.userPosts,
    },
  };
};
