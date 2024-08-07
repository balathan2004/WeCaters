import { app, firestore } from "@/components/firebase_config";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";
import { getDoc, doc } from "firebase/firestore";
import { userAuthResponse,userInterface } from "@/components/interfaces/shared";
export default async function Login(
  req: NextApiRequest,
  res: NextApiResponse<userAuthResponse>
) {
  const auth = getAuth(app);

  const { email, password } = req.body
  const userCred:userInterface = await new Promise(async (resolve, reject) => {
    await signInWithEmailAndPassword(auth, email, password).then(
      async (cred) => {
        var { uid } = cred.user;
        console.log(uid);
        try {
          var document = await getDoc(doc(firestore, "users", uid));
          const docData = document.data() as userInterface
          resolve(docData)
        } catch (e) {
          console.log(e);
        }
      }
    );
  });

  console.log(userCred)

  setCookie("caters_client_id", userCred.uid, {
    req,
    res,
    maxAge:  900000,
    httpOnly: false,
    sameSite: "none",
    secure: true,
  });
  setCookie("caters_account_type", userCred.account_type, {
    req,
    res,
    maxAge:900000,
    httpOnly: false,
    sameSite: "none",
    secure: true,
  });

  
  res.json({
    status: 200,
    message: "Login Successful",
     userCredentials:userCred
  });


}

/**
 * 
 * 
 * 

 * 
 * 
 */


