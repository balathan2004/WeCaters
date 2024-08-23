import { firestore } from "@/components/firebase_config";
import { NextApiRequest,NextApiResponse } from "next";
import { getSinglePostInterface, postInterface } from "@/components/interfaces/shared";
import { getDocs, getDoc, collection, query, where } from "firebase/firestore";
export default async function (req:NextApiRequest, res:NextApiResponse<getSinglePostInterface>) {
  
  console.log("query"+req.query);
  let { post_name } = req.query;


  try {
    const collectionData = collection(firestore, "post");
    const postData = await getDocs(
      query(collectionData, where("post_name", "==", post_name))
    ) 

   
    
  
    const postDataFetched=  postData.docs[0].data() as postInterface
    console.log(postDataFetched)
    res.json({ message: "post", status:200, postData: postDataFetched });
  } catch (err) {
    console.log(err);
    res.json({ message: "error", status:200});
  }
}
