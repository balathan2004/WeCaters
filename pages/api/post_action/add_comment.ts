import { firestore } from "@/components/firebase_config";
import { doc, setDoc, arrayUnion, getDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest,NextApiResponse } from "next";
import { CommentsInterface, ResponseConfig } from "@/components/interfaces/shared";
export default async function (req:NextApiRequest, res:NextApiResponse<ResponseConfig>) {
  const commentData:CommentsInterface = req.body 
  const docRef = doc(firestore, "comment", commentData.post_id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    await updateDoc(docRef, {
      comment: arrayUnion(commentData),
    });
  } else {
    await setDoc(docRef, {
      comment: [commentData],
    });
  }

  res.json({ message: "comment added", status: 200 });
}
