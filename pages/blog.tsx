import style from "/styles/blog.module.css";
import { GetServerSideProps } from "next";
import SideBar from "@/components/blog/sideBar";
import {
  getPostsInterface,
  userInterface,
} from "@/components/interfaces/shared";
import { useRouter } from "next/router";
import { GetRequest } from "@/components/fetch/getRequest";
import { FC, useState, useEffect } from "react";
import SinglePost from "@/components/blog/singlePost";
import { getCookie } from "cookies-next";

type Props = Omit<getPostsInterface, "status" | "message">;

const Blog: FC<Props> = ({ postData, allUsernames }) => {
  const navi = useRouter();
  const [userData, setUserData] = useState<userInterface | null>(null);

  const sideBarData = allUsernames;

  const getCred = async () => {
    let res = await GetRequest({ route: "/api/auth/login-cred" });
    if (res && res.status === 200) {
      var message = res.message;
      localStorage.setItem("login-cred", JSON.stringify(message));
      return message;
    }
  };

  useEffect(() => {
    try {
      const getter = localStorage.getItem("login_cred");
      let renderData = JSON.parse(getter ? getter : "");
      if (getCookie("caters_client_id") != "") {
        if (renderData == "") {
          renderData = getCred();
        } else {
          setUserData(renderData);
        }
      } else {
        setUserData(null);
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="container">
      <div className={style.inner}>
        <div className={style.sideBar}>
          <SideBar data={sideBarData ? sideBarData : []} />
        </div>
        <div className={style.blog}>
          <div className={style.post_wrapper}>
            {postData
              ? postData.map((value, index) => (
                  <SinglePost data={value} key={index} userData={userData} />
                ))
              : null}
          </div>
        </div>

        <div className={style.suggested}>
          <h3>suggested for you</h3>
          {sideBarData &&
            sideBarData.map((value, index) => {
              return (
                <a key={index} href={`/profile/${value.uid}`}>
                  {value.name}
                </a>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Blog;

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? `${process.env.DOMAIN_URL}/api/post_action/get_posts`
      : "http://localhost:3000/api/post_action/get_posts";
  console.log("url", apiUrl);
  const response = await fetch(apiUrl);
  const res: getPostsInterface = await response.json();

  return {
    props: { postData: res.postData, allUsernames: res.allUsernames },
  };
};
