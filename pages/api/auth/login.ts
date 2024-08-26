import { app, firestore } from "@/components/firebase_config";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { getDoc, doc } from "firebase/firestore";
import {
  userAuthResponse,
  userInterface,
} from "@/components/interfaces/shared";
import { partial } from "lodash";
export default async function (
  req: NextApiRequest,
  res: NextApiResponse<userAuthResponse>
) {
  if (req.method === "POST") {
    try {
      const { email, password } = JSON.parse(req.body);
      const uid: string = await Login(email, password);
      const userCred: userInterface = await userDocSearch(uid);
      setCookie("caters_client_id", userCred.uid, {
        req,
        res,
        maxAge: 900000,
        httpOnly: false,
        sameSite: "none",
        secure: true,
      });
      setCookie("caters_account_type", userCred.account_type, {
        req,
        res,
        maxAge: 900000,
        httpOnly: false,
        sameSite: "none",
        secure: true,
      });

      res.json({
        status: 200,
        message: "Login Successful",
        userCredentials: userCred,
      });
    } catch (error: any) {

      if (error.message == "auth/invalid-credential") {
        res.json({ status: 400, message: "auth/invalid-credential" });
      } else {
        res.json({ status: 400, message: "Error to login" });
      }
    }
  }
}

export async function userDocSearch(uid: string) {
  try {
    let document = await getDoc(doc(firestore, "/professional_account", uid));
    let docData = document.data() as userInterface;

    if (!docData) {
      document = await getDoc(doc(firestore, "/personal_account", uid));
      docData = document.data() as userInterface;

      if (!docData) {
        throw new Error("User not found");
      }
    }

    return docData;
  } catch (err: any) {
    throw err;
  }
}

async function Login(email: string, password: string) {
  try {
    const auth = getAuth(app);
    const cred = await signInWithEmailAndPassword(auth, email, password);
    return cred.user.uid;
  } catch (err: any) {
    if (err.code == "auth/invalid-credential") {
      throw new Error("auth/invalid-credential");
    }else{
      throw err
    }
  }
}
