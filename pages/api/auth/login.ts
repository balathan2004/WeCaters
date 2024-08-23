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
      console.log(error);
      if (error.code == "auth/invalid-credential") {
        res.json({ status: 400, message: "auth/invalid-credential" });
      } else {
        res.json({ status: 400, message: "Error to login" });
      }
    }
  }
}

async function userDocSearch(uid: string) {
  try{
    var document = await getDoc(doc(firestore, "/professional_account", uid));
    const docData = document.data() as userInterface;
    return docData;
  }catch(err){
    var document = await getDoc(doc(firestore, "/personal_account", uid));
  const docData = document.data() as userInterface;
  return docData;
  }
  
}

async function Login(email: string, password: string) {
  const auth = getAuth(app);
  const uid: string = await new Promise(async (resolve, reject) => {
    await signInWithEmailAndPassword(auth, email, password).then(
      async (cred) => {
        console.log(cred.user.uid);
        var { uid } = cred.user;
        resolve(uid);
      }
    );
  });
  return uid;
}
