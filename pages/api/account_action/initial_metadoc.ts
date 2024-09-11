import { firestore_admin } from "@/config/firebase_admin";
import { NextApiRequest, NextApiResponse } from "next";
import { FieldValue } from "firebase-admin/firestore";
import { metadata, ResponseConfig } from "@/components/interfaces/shared";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  
    console.log(req.body);

    const { meta_req_id } = req.body

  const reqProfCheck = firestore_admin
    .collection("professional_account")
    .doc(meta_req_id);

  const reqPersonalCheck = firestore_admin
    .collection("personal_account")
    .doc(meta_req_id);

  const reqProfExist = (await reqProfCheck.get()).exists;
  const reqPersonalExist = (await reqPersonalCheck.get()).exists;

  if (reqProfExist) {
    const data=(await reqProfCheck.get()).data()
    const definedData: metadata = {
      cred: {
        email: data?.email,
        uid: data?.uid,
        createdAt: "",
      },
      userConnections: {
        following: [],
        followers: [],
        followingCount: 0,
        followersCount: 0,
      },
    };
await firestore_admin.collection("professional_account_meta").doc(meta_req_id).set(definedData)
res.json({status:200,message:"professional account"})
  } else if(reqPersonalExist) {
    const data=(await reqPersonalCheck.get()).data()
    const definedData: metadata = {
      cred: {
        email: data?.email,
        uid: data?.uid,
        createdAt: "",
      },
      userConnections: {
        following: [],
        followers: [],
        followingCount: 0,
        followersCount: 0,
      },
    };
    await firestore_admin.collection("personal_account_meta").doc(meta_req_id).set(definedData)

    res.json({status:200,message:"professional account"})
  }
}
