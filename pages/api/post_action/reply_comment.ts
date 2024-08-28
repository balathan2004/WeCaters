import { NextApiRequest,NextApiResponse } from "next";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import {firestore} from '@/components/firebase_config'
import { ResponseConfig } from "@/components/interfaces/shared";
import { CommentsInterface } from "@/components/interfaces/shared";

export default async function (req:NextApiRequest, res:NextApiResponse<ResponseConfig>) {

    const { post_name, comment_id, comment, comment_user, comment_reply, comment_time } =
    JSON.parse(req.body);

  

  const docRef = doc(firestore, "comment", post_name);
  const docData = (await getDoc(docRef)).data() 

  if(docData){
    const docComment :CommentsInterface= docData.comment.find(
      (file:CommentsInterface) => file.comment_id == comment_id
    );
  
    const otherComments:CommentsInterface[] = docData.comment.filter(
      (file:CommentsInterface) => file.comment_id != comment_id
    );
    
  
    const replyData :Omit<CommentsInterface,"post_name">= {
      comment: comment,
      comment_id: comment_id,
      comment_user: comment_user,
      comment_reply: comment_reply,
      comment_time: comment_time,
    };
  
    if (docComment.has_replies && docComment.has_replies.length > 0) {
      (docComment.has_replies as Omit<CommentsInterface, "post_name">[]).push(replyData);
      otherComments.push(docComment);
      await updateDoc(docRef, { comment: otherComments });
    } else {
      docComment.has_replies = [] as Omit<CommentsInterface, "post_name">[];
      docComment.has_replies.push(replyData);
      otherComments.push(docComment);
      console.log(otherComments);
      await updateDoc(docRef, { comment: otherComments });
    }
  
    res.json({ message: "comment added", status: 200 });
  }else{
    res.json({ message: "comment added", status: 200 });
  }

  
   
}
