import {  firestore_admin } from "@/config/firebase_admin";
import { NextApiRequest, NextApiResponse } from "next";
import { LikesInterface, ResponseConfig } from "@/components/interfaces/shared";
import { FieldValue } from 'firebase-admin/firestore';

interface Props {
  post_name: string;
  uid: string;
  post_author: string;
}

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
    const { post_name, uid ,post_author} = JSON.parse(req.body)  as Props
    const docRef= firestore_admin.collection("likes").doc(post_name)
    const snap=await docRef.get()

    console.log("like request from ",req.body)

    if(snap.exists){

      const data= snap.data() as LikesInterface
      const matchingUid=data.liked_by.find(userid=>userid==uid)


      if(!matchingUid){
        await docRef.update({
          ["liked_by"]:FieldValue.arrayUnion(uid),
          ["likes_count"]:FieldValue.increment(1)
         })
         res.json({ status: 200, message: "liked" });
      }else{
        //const removed=data.liked_by.filter(user=>user==uid)
        await docRef.update({
          ["liked_by"]:FieldValue.arrayRemove(uid),
          ["likes_count"]:FieldValue.increment(-1)
        })
        res.json({ status: 300, message: "already liked" });
      }

      
    }else{

      const data:LikesInterface={
        post_author:post_author,post_name:post_name, liked_by:[uid], likes_count:1
      }
        await docRef.create(data)
    }

    res.json({ status: 200, message: "Liked!" });

  } catch (err) {
    console.log(err);
  }
}
