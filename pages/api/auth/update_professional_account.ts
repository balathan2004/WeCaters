import { firestore } from "@/components/firebase_config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import {
  userAuthResponse,
  userInterface,
  userMetaInterface,
} from "@/components/interfaces/shared";
import GetMetaDoc from "@/components/server/get_meta_doc";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<userAuthResponse>
) => {
  var userData = JSON.parse(req.body);
  try {
    const { uid } = userData;
    var docRef = await getDoc(doc(firestore, "professional_account", uid));
    var document = docRef.data();
    console.log(userData)

    if (document !== userData) {
      await updateDoc(
        doc(firestore, "professional_account", uid),
        userData
      )
      const metadata=await GetMetaDoc(userData)
      const mergedData={...userData, metadata} 
      res.json({
        status: 200,
        message: "changes made",
        userCredentials: mergedData,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: 400, message: "Error Cought" });
  }
};
