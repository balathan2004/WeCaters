import { firestore } from "@/components/firebase_config";
import { NextApiRequest, NextApiResponse } from "next";
import { getDocs, collection } from "firebase/firestore";
import {
  postInterface,
  getPostsInterface,
  LikesInterface,
} from "@/components/interfaces/shared";
export default async function (
  req: NextApiRequest,
  res: NextApiResponse<getPostsInterface>
) {
  try {
    const collectionData = collection(firestore, "post");
    const userData = collection(firestore, "professional_account");
    const likes = collection(firestore, "likes");

    const data = await getDocs(collectionData);
    const likeData = (await getDocs(likes)).docs.map((doc) =>
      doc.data()
    ) as LikesInterface[];
    const userFetchedData = await getDocs(userData);
    const allDocs: postInterface[] = data.docs.map((doc) => {
      const data = doc.data();

      const post: postInterface = {
        caption: data.caption,
        photo_url: data.photo_url,
        post_name: data.post_name,
        time: data.time,
        uid: data.uid,
        username: data.username,
        likes_count: data.likes_count,
      };

      return post;
    });

    const allUserData = userFetchedData.docs.map((doc) => {
      const data = doc.data();

      return {
        username: data.username ? data.username : data.display_name,
        display_name: data.display_name,
        uid: data.uid,
        profile_url: data.profile_url,
        account_type: data.account_type,
      };
    });

    //const filteredUserData=allUserData.filter(item=>item.account_type!="personal")

    const allUsernames: { name: string; uid: string }[] = allUserData.map(
      (data) => {
        return {
          name: data.username ? data.username : data.display_name,
          uid: data.uid,
        };
      }
    );

    let newRefinedData: postInterface[] = [];

    const finalValue = allDocs.map((doc) => {
      const matchingUser = allUserData.find((user) => user.uid == doc.uid);
      const matchingLike = likeData.find((like) => like.post_name == doc.post_name);

      const tempData = {
        ...doc,
        profile_url: matchingUser?.profile_url,
        likes_count: matchingLike?.likes_count,
        liked_by: matchingLike?.liked_by,
      };
      newRefinedData.push(tempData);
    });

    /**
     * 
     * 
     *   for (let i = 0; i < allDocs.length; i++) {
      for (let j = 0; j < allUserData.length; j++) {
        if (allDocs[i].uid === allUserData[j].uid) {
          var tempData = {
            ...allDocs[i],
            profile_url: allUserData[j].profile_url,
            //   isVerified: allUserData[j].isVerified,
          };
          newRefinedData.push(tempData);
        }
      }
    }
     * 
     * 
     */

    console.log("allusername", allUsernames);
    res.json({
      status: 200,
      message: "fetch success",
      postData: newRefinedData,
      allUsernames: allUsernames,
    });
  } catch (err) {
    res.json({ status: 400, message: "error fetching docs" });
  }
}
