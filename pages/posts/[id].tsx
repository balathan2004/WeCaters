import SinglePost from "@/components/blog/singlePost";
import style from "/styles/blog.module.css";
import { FC } from "react";
import { ParsedUrlQuery } from "querystring";
import {  GetServerSidePropsContext } from "next";

import {
  postInterface,
  getSinglePostInterface,
} from "@/components/interfaces/shared";

interface Props {
  data: postInterface | null;
}

const Pages: FC<Props> = ({ data }) => {

  if (data) {
    return (
      <div className="container">
        <div className={style.inner}>
          <div className={style.sideBar}></div>
          <div className={style.blog}>
            <div className={style.post_wrapper}>
              <SinglePost data={data} />;
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
    
   const {id}=query

    const apiUrl =
      process.env.NODE_ENV === "production"
        ? `https://we-caters.vercel.app/api/post_action/get_single_post?post_name=${id}`
        : `http://localhost:3000/api/post_action/get_single_post?post_name=${id}`;
    const response = await fetch(apiUrl);
    const res: getSinglePostInterface = await response.json();

    return {
      props: { data: res.postData },
    };
  } catch (e) {
    return { props: { data: null } };
  }
};

export default Pages;
