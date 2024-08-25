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
  userProfileResponse,
} from "@/components/interfaces/shared";

interface props {
  userData: userInterface;
  userPosts: postInterface[];
}

const Profile: FC<props> = ({userData,userPosts}) => {
  console.log(userData,userPosts)
  return <div className="container">hwlo</div>;
};

export default Profile;



  
   
      

  export const getServerSideProps=async(context: GetServerSidePropsContext)=> {
    
    const cookies = context.req.headers.cookie;
    const parsedCookies = cookies ? parse(cookies) : {};
    const uid = parsedCookies.caters_client_id;
    
    const apiUrl =
      process.env.NODE_ENV === "production"
        ? `https://caters.vercel.app/api/test/profile?userid=Vvc3r9aDUPXhXdOaTWBgdoqCRHX2`
        : "http://localhost:3000/api/test/profile?userid=Vvc3r9aDUPXhXdOaTWBgdoqCRHX2";
    const response = await fetch(apiUrl);
    const res :userProfileResponse= await response.json();
    
  
    return {
      props: { userData: res.userData?.userDetails, userPosts: res.userData?.userPosts },
    };
  }
     

   
    
    

