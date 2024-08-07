import { firestore } from "@/components/firebase_config";
import { getDoc, doc } from "firebase/firestore";
import { NextApiRequest,NextApiResponse } from "next";
import { CommentsResponse,CommentsInterface } from "@/components/interfaces/shared";

export default async function (req:NextApiRequest, res:NextApiResponse<CommentsResponse>) {
  const { post_id } = (req.body);

  try {
    const docRef = doc(firestore, "comment", post_id);

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const docData = docSnap.data();
      const comments:CommentsInterface[]=docData.comment

      res.json({ comments: comments, message:"Comments Fetched",status: 200 });
    } else {
      res.json({ comments: [], message:"Cant Fetch Comments",status: 300 });
    }
  } catch (err) {
    console.log(err);
    res.json({ comments: [], message:"Error Caught",status: 400 });
  }
}
