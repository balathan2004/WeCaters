import SinglePost from "@/components/blog/singlePost";
import style from "/styles/blog.module.css";
import { FC, useEffect, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { GetServerSidePropsContext } from "next";
import { getCookie } from "cookies-next";
import { GetRequest } from "@/components/fetch/getRequest";

import {
  postInterface,
  getSinglePostInterface,
  userInterface,
} from "@/components/interfaces/shared";

interface Props {
  data: postInterface | null;
}

const Pages: FC<Props> = ({ data }) => {
  const [userData, setUserData] = useState<userInterface | null>(null);

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

  if (data) {
    return (
      <div className="container">
        <div className={style.inner}>
          <div className={style.sideBar}></div>
          <div className={style.blog}>
            <div className={style.post_wrapper}>
              <SinglePost data={data} userData={userData} />
            </div>
          </div>
          <div className={style.sideBar}></div>
        </div>
      </div>
    );
  } else {
    return <div>Error</div>;
  }
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  try {
    const { query } = context;

    const { id } = query;

    const apiUrl =
      process.env.NODE_ENV === "production"
        ? `https://we-caters.vercel.app/api/post_action/get_single_post?post_name=${id}`
        : `http://localhost:3000/api/post_action/get_single_post?post_name=${id}`;
    const response = await fetch(apiUrl);
    const res: getSinglePostInterface = await response.json();

    if (res.status === 200) {
      return {
        props: { data: res.postData },
      };
    } else {
      return { props: { data: null } };
    }
  } catch (e) {}
};

export default Pages;
