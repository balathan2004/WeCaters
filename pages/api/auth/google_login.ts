import {
  auth_admin,
  firestore_admin,
} from "@/components/firebase-contents/firebase_admin";
import { NextApiRequest, NextApiResponse } from "next";
import { personalUserInterface } from "@/components/interfaces/shared";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const userdata = JSON.parse(req.body) as personalUserInterface;
  console.log(userdata.email);

  const value = await auth_admin.getUserByEmail(userdata.email);

  if (value) {
    if (userdata.account_type == "professional") {
      await firestore_admin
        .collection("professional_account")
        .doc(userdata.uid)
        .set(userdata);
    } else {
      await firestore_admin
        .collection("personal_account")
        .doc(userdata.uid)
        .set(userdata);
    }
  }
};
