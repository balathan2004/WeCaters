import { arrayUnion } from "firebase/firestore";
import { firestore_admin } from "@/config/firebase_admin";
import { NextApiRequest, NextApiResponse } from "next";
import { FieldValue } from "firebase-admin/firestore";
import { metadata, ResponseConfig } from "@/components/interfaces/shared";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  try {
    const { authorId, requestorId, requestor_accountType,isFollower } = JSON.parse(
      req.body
    );

    if (
      authorId &&
      requestorId &&
      requestor_accountType &&
      authorId != requestorId
    ) {
      const authorDocRef = firestore_admin
        .collection("professional_account_meta")
        .doc(authorId);

      const requestorDocRef = firestore_admin
        .collection(
          requestor_accountType == "professional"
            ? "professional_account_meta"
            : "personal_account_meta"
        )
        .doc(requestorId);

        const authorExits=(await authorDocRef.get()).exists
        const requestorExits=(await requestorDocRef.get()).exists

      if (authorExits && requestorExits) {
        if(!isFollower){
          await authorDocRef.update({
            "userConnections.followers": FieldValue.arrayUnion(requestorId),
            "userConnections.followersCount": FieldValue.increment(1),
          });
  
          await requestorDocRef.update({
            "userConnections.following": FieldValue.arrayUnion(requestorId),
            "userConnections.followingCount": FieldValue.increment(1),
          });
          res.json({ status: 200, message: "follow_added" });
        }else{
          await authorDocRef.update({
            "userConnections.followers": FieldValue.arrayRemove(requestorId),
            "userConnections.followersCount": FieldValue.increment(-1),
          });
  
          await requestorDocRef.update({
            "userConnections.following": FieldValue.arrayRemove(requestorId),
            "userConnections.followingCount": FieldValue.increment(-1),
          });
          res.json({ status: 200, message: "unfollowed" });
        }
       
      } else {
        console.log("doc creating")
       
      }
    } else {
      console.log("error updating");
    }
    //res.json({ status: 200, message: "Success" });
  } catch (e) {
    res.json({ status: 200, message: "Success" });
    console.log(e);
  }
}
