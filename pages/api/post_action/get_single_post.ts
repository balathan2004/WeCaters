import { firestore } from "@/components/firebase_config";
import { NextApiRequest, NextApiResponse } from "next";
import {
  getSinglePostInterface,
  LikesInterface,
  postInterface,
} from "@/components/interfaces/shared";
import { getDocs, getDoc, doc,collection, query, where } from "firebase/firestore";
export default async function (
  req: NextApiRequest,
  res: NextApiResponse<getSinglePostInterface>
) {
  let  post_name = req.query.post_name as string

  try {
    
    const collectionData = collection(firestore, "post");
    const likeDocRef=doc(firestore,"likes",post_name)
    const postData = await getDocs(
      query(collectionData, where("post_name", "==", post_name))
    );

    const postDataFetched = postData.docs[0].data() as postInterface;

    const likeData= (await getDoc(likeDocRef)).data() as LikesInterface
    const finalData:postInterface={...postDataFetched,liked_by:likeData.liked_by,likes_count:likeData.likes_count}



    res.json({ message: "post", status: 200, postData: finalData });
  } catch (err) {
    console.log(err);
    res.json({ message: "error", status: 200 });
  }
}
