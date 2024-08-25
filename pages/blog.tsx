import style from "/styles/blog.module.css";
import { GetServerSideProps } from "next";
import SideBar from "@/components/blog/sideBar";
import { getPostsInterface } from "@/components/interfaces/shared";
import { useRouter } from "next/router";
import { FC } from "react";
import SinglePost from "@/components/blog/singlePost";

type Props = Omit<getPostsInterface, "status" | "message">;

const Blog: FC<Props> = ({ postData, allUsernames }) => {
  const navi = useRouter();

  const sideBarData = allUsernames;
  

  return (
    <div className="container">
      <div className={style.inner}>
        <div className={style.sideBar}>
          <SideBar data={sideBarData?sideBarData:[]} />
        </div>
        <div className={style.blog}>
          <div className={style.post_wrapper}>
            {postData
              ? postData.map((value, index) => {
                  return <SinglePost data={value} key={index} />;
                })
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

export const getServerSideProps:GetServerSideProps=async()=> {
  const apiUrl =
    process.env.NODE_ENV === "production"
      ? "https://we-caters.vercel.app/api/post_action/get_posts"
      : "http://localhost:3000/api/post_action/get_posts";
  const response = await fetch(apiUrl);
  const res: getPostsInterface = await response.json();

  return {
    props: { postData: res.postData, allUsernames: res.allUsernames },
  };
}
