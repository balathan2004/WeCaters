import {
  auth_admin,
  firestore_admin,
} from "@/config/firebase_admin";
import { NextApiRequest, NextApiResponse } from "next";
import { metadata, personalUserInterface ,userAuthResponse, userMetaInterface} from "@/components/interfaces/shared";
import { setCookie } from "cookies-next";
export default async (req: NextApiRequest, res: NextApiResponse<userAuthResponse>) => {
  const userdata = JSON.parse(req.body) as personalUserInterface;

  const userRecord = await auth_admin.getUserByEmail(userdata.email);
  const metadata:metadata={
    cred:{
      email:userRecord.email || "",
      uid: userRecord.uid || "",
      createdAt: userRecord.metadata.creationTime || "",
    },
    userConnections:{
      followers: [],
      following: [],
      followersCount: 0,
      followingCount: 0,
    }
  }
  const refinedUserData:userMetaInterface={...userdata,meta_data:metadata}

  if (userRecord) {
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

  });
  setCookie("caters_account_type", userdata.account_type, {
    req,
    res,
    maxAge: 900000,
    httpOnly: false,
    sameSite: "none",

  });
  res.json({status: 200, message:"login successful",userCredentials:refinedUserData})
};
