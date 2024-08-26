import {
  auth_admin,
  firestore_admin,
} from "@/components/firebase-contents/firebase_admin";
import { NextApiRequest, NextApiResponse } from "next";
import { personalUserInterface ,userAuthResponse} from "@/components/interfaces/shared";
import { setCookie } from "cookies-next";
export default async (req: NextApiRequest, res: NextApiResponse<userAuthResponse>) => {
  const userdata = JSON.parse(req.body) as personalUserInterface;

  const value = await auth_admin.getUserByEmail(userdata.email);

  if (value) {
    if (userdata.account_type == "professional") {
      await firestore_admin
        .collection("professional_account")
        .doc(userdata.uid)
        .set({userdata});
    } else {
      await firestore_admin
        .collection("personal_account")
        .doc(userdata.uid)
        .set(userdata);
    }
  }

  setCookie("caters_client_id", userdata.uid, {
    req,
    res,
    maxAge: 900000,
    httpOnly: false,
    sameSite: "none",
    secure: true,
  });
  setCookie("caters_account_type", userdata.account_type, {
    req,
    res,
    maxAge: 900000,
    httpOnly: false,
    sameSite: "none",
    secure: true,
  });
  res.json({status: 200, message:"login successful",userCredentials:userdata})
};
