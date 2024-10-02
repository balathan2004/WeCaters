import { firestore } from "@/components/firebase_config";
import { NextApiRequest, NextApiResponse } from "next";
import { getDocs, collection, doc } from "firebase/firestore";
import {
  postVideoInterface,
  reelsResponseInterface,
  LikesInterface,
  userInterface,
  reelVideoInterface,
} from "@/components/interfaces/shared";
export default async function (
  req: NextApiRequest,
  res: NextApiResponse<reelsResponseInterface>
) {
  try {
    const collectionData = collection(firestore, "reels");
    const userCollectionData = collection(firestore, "professional_account");

    const reelDocData: postVideoInterface[] = (
      await getDocs(collectionData)
    ).docs.map((doc) => {
      return doc.data() as postVideoInterface;
    });

    const userData: userInterface[] =  (
      await getDocs(userCollectionData)
    ).docs.map((doc) => doc.data() as userInterface);

    const requiredUserData = userData.map((user) => {
      return {
        display_name: user.display_name,
        uid: user.uid,
        profile_url: user.profile_url,
      };
    });

    const finalReelData:reelVideoInterface[]=reelDocData.map(reel=>{
      const findUser=requiredUserData.find(user=>user.uid===reel.uid)

      return {
        ...reel,profile_url:findUser?.profile_url||"",display_name:findUser?.display_name || ""
      }
    })


    res.json({ status: 200, reelsData: finalReelData, message: "success" });
  } catch (err) {
    console.log(err);
  }
}
