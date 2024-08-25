import React, { FC } from "react";
import style from "/styles/blog.module.css";
import blogStyle from "/styles/blog.module.css";
import SideBar from "@/components/blog/sideBar";
import { defaultImage } from "@/components/blog/smallComponents";
import { ParsedUrlQuery } from "querystring";
import {  GetServerSidePropsContext } from "next";
import { postInterface, userInterface, userProfileResponse } from "@/components/interfaces/shared";

interface props{
  userData:userInterface,
  userPosts:postInterface[]
}

const  Profile:FC<props>=({ userData, userPosts }) =>{
  const userDetails = userData;

  return (
    <div className="container">
      <div className={blogStyle.inner}>
        <div className={blogStyle.sideBar}>
          <SideBar data={[]} />
        </div>
        <div className={blogStyle.blog}>
          <div className={style.profile}>
            <div className={style.account}>
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
                      {userDetails.username}
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
                    <span>
                     
                    </span>
                  </span>
                </div>
                <button className={style.follow}>+ Follow</button>
              </div>
            </div>

            <ul className={style.posts}>
              {userPosts.length>0?userPosts.map((post, index) => {
                return (
                  <li className={style.item} key={index}>
                    <img src={post.photo_url?post.photo_url[0]:""}></img>
                  </li>
                );
              }):null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile

//

export async function getServerSideProps(context: GetServerSidePropsContext<ParsedUrlQuery>) {
  const { query} =context

  const {id}=query
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://caters.vercel.app/api/profile/get-profile?user=${id}`
      : `http://localhost:3000/api/profile/get-profile?user=${id}`;
  const response = await fetch(apiUrl);
  const res:userProfileResponse = await response.json();
  if(response.status === 200){
    return {
      props: {
        userData: res.userData?.userDetails,
        userPosts: res.userData?.userPosts,
      },
    };
  }
 
}


