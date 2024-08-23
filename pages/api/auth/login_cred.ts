import { firestore } from "@/components/firebase_config";
import type { NextApiRequest, NextApiResponse } from "next";
import { setDoc, getDoc, doc } from "firebase/firestore";
import {
  userAuthResponse,
  userInterface,
} from "@/components/interfaces/shared";
export default async (
  req: NextApiRequest,
  res: NextApiResponse<userAuthResponse>
) => {
  const uid = req.cookies.caters_client_id;
  const account_type = req.cookies.caters_account_type;


  if (uid) {
    try {
    

      let docData:userInterface

      if (account_type === "professional") {
        var document = await getDoc(doc(firestore, "/professional_account", uid));
         docData = document.data() as userInterface;
      } else{
         document = await getDoc(doc(firestore, "/personal_account", uid));
         docData = document.data() as userInterface;
       
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
