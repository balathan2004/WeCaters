import { firestore_admin } from "@/config/firebase_admin";
import type { NextApiRequest, NextApiResponse } from "next";
import { setDoc, getDoc, doc } from "firebase/firestore";
import {
  metadata,
  userAuthResponse,
  userInterface,
  userMetaInterface,
} from "@/components/interfaces/shared";

export default async (
  req: NextApiRequest,
  res: NextApiResponse<userAuthResponse>
) => {
  const uid = req.cookies.caters_client_id;
  const account_type = req.cookies.caters_account_type;

  if (uid) {
    try {
      let docData: userMetaInterface;

      if (account_type === "professional") {
        var document = (
          await firestore_admin
            .collection("/professional_account")
            .doc(uid)
            .get()
        ).data() as userInterface;

        var meta_doc = (
          await firestore_admin
            .collection("/professional_account_meta")
            .doc(uid)
            .get()
        ).data() as metadata;

        docData = { ...document, meta_data: meta_doc } as userMetaInterface;
      } else {
        var document = (
          await firestore_admin.collection("/personal_account").doc(uid).get()
        ).data() as userInterface;

        var meta_doc = (
          await firestore_admin
            .collection("/personal_account_meta")
            .doc(uid)
            .get()
        ).data() as metadata;

        docData = { ...document, meta_data: meta_doc } as userMetaInterface;
      }
      res.json({
        status: 200,
        message: "details fetched",
        userCredentials: docData,
      });
    } catch (e) {
      console.log(e);
      res.json({ status: 400, message: "error caught" });
    }
  } else {
    res.json({ status: 400, message: " Account Not Found" });
  }
};
