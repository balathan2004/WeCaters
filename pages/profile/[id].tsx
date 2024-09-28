import React, { FC, useContext, useEffect, useState } from "react";
import style from "/styles/blog.module.css";
import SideBar from "@/components/blog/sideBar";
import { defaultImage } from "@/components/blog/smallComponents";
import { ParsedUrlQuery } from "querystring";
import { GetServerSidePropsContext } from "next";
import Rating from "@/components/front/rating";
import {
  postInterface,
  profileUserInterface,
  userInterface,
  userProfileResponse,
} from "@/components/interfaces/shared";
import SendData from "@/components/fetch/sendData";
import { analytics } from "@/components/firebase_config";
import { logEvent } from "firebase/analytics";
import { useSelector } from "react-redux";

interface props {
  userDetails: profileUserInterface;
  userPosts: postInterface[];
}

const Profile: FC<props> = ({ userDetails, userPosts }) => {
  const  userData  = useSelector((state:any)=>state.USERCRED.value)
  const [connections, setConnections] = useState({
    followers: userDetails.followers,
    followersCount: userDetails.followersCount,
  });
  const [isFollower, setIsFollower] = useState(false);
  const [isReviewed, setIsReviewed] = useState(false);

  const startFollow = async () => {
    if (userData && userData.uid != userDetails.uid) {
      const res = await SendData({
        route: "/api/account_action/follow",
        data: {
          authorId: userDetails.uid,
          requestorId: userData.uid,
          requestor_accountType: userData.account_type,
          isFollower: isFollower,
        },
      });
      setIsFollower((prev) => !prev);
      if (res && res.message == "follow_added") {
        setConnections((prev) => {
          return {
            followers: [...prev.followers, userDetails.uid],
            followersCount: prev.followersCount + 1,
          };
        });
      } else {
        setConnections((prev) => {
          return {
            followers: prev.followers.filter((user) => user != userData.uid),
            followersCount: prev.followersCount - 1,
          };
        });
      }
    } else {
      alert("login first");
    }
  };

  useEffect(() => {
    if (userData) {
      setIsFollower(() => {
        return userDetails.followers.includes(userData.uid) ? true : false;
      });
      setIsReviewed(() => {
        return (
          userDetails.reviews?.some((review) => review.from == userData.uid) ||
          false
        );
      });

      if (analytics) {
        console.log("triggered analytics");
        logEvent(analytics, "view_item", {
          name: "light",
        });
      }
    }
  }, [userData]);

  return (
    <div className="container">
      <div className={style.inner}>
        <div className={style.sideBar}>
          <SideBar data={[]} />
        </div>
        <div className={style.blog}>
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
                    {userDetails.followingCount}
                    <label>following</label>{" "}
                  </span>
                  <span className={style.followers}>
                    {connections.followersCount}
                    <label>followers</label>{" "}
                  </span>
                </div>
                <div>
                  <p>{userDetails.bio}</p>
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
                {userData && userData.uid !== userDetails.uid ? (
                  <>
                    {" "}
                    <button className={style.follow} onClick={startFollow}>
                      {isFollower ? "Following" : "Follow"}
                    </button>
                    {!isReviewed ? (
                      <Rating
                        changeTrigger={setIsReviewed}
                        userData={userData}
                        toID={userDetails.uid}
                      />
                    ) : null}
                  </>
                ) : null}
              </div>
            </div>

            <ul className={style.posts}>
              {userPosts.length > 0
                ? userPosts.map((post, index) => {
                    return (
                      <li className={style.item} key={index}>
                        <a href={`/posts/${post.post_name}`}>
                          <img
                            src={post.photo_url ? post.photo_url[0] : ""}
                          ></img>
                        </a>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

export async function getServerSideProps(
  context: GetServerSidePropsContext<ParsedUrlQuery>
) {
  const { query } = context;

  const { id } = query;
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `https://we-caters.vercel.app/api/profile/get-profile?user=${id}`
      : `http://localhost:3000/api/profile/get-profile?user=${id}`;
  const response = await fetch(apiUrl);
  const res: userProfileResponse = await response.json();
  if (response.status === 200) {
    return {
      props: {
        userDetails: res.userData?.userDetails,
        userPosts: res.userData?.userPosts,
      },
    };
  } else {
    return {
      props: null,
    };
  }
}
