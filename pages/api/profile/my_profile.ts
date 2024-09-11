import { NextApiRequest, NextApiResponse } from "next";
import { firestore_admin } from "@/config/firebase_admin";
import { profileUserInterface, userProfileResponse } from "@/components/interfaces/shared";
import {
  doc,
  getDoc,
  query,
  collection,
  getDocs,
  where,
} from "firebase/firestore";
import { firestore } from "@/components/firebase_config";
import { userInterface, postInterface } from "@/components/interfaces/shared";
export default async function (
  req: NextApiRequest,
  res: NextApiResponse<userProfileResponse>
) {
    const {userid}=req.query
    const uid=userid as string

  if (uid) {
    console.log("useridacessed",uid)
    const usersData = doc(firestore, "professional_account", uid);
    const postData = collection(firestore, "post");
    const specifiedUser = await getDoc(usersData);
    const fetchedSpecifiedUser = specifiedUser.data();
    const userFound: unknown = fetchedSpecifiedUser;
    const finalUser = userFound as profileUserInterface;
 
    const specificPost = await getDocs(
      query(postData, where("uid", "==", uid))
    );

    const userPosts = specificPost.docs.map(
      (doc) => doc.data() as postInterface
    );

    res.json({
      status: 200,
      message: "success",
      userData: { userDetails: finalUser, userPosts: userPosts },
    });
  }
}
