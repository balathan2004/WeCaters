
import { firestore } from "@/components/firebase_config";
import type { NextApiRequest, NextApiResponse } from 'next'
import { setDoc, getDoc, doc } from "firebase/firestore";
import { userAuthResponse,userInterface } from "@/components/interfaces/shared";
export default async (req:NextApiRequest, res:NextApiResponse<userAuthResponse>) => {
  
  const uid=req.cookies.caters_client_id
  
  if (uid) {
    try {
      console.log("route requested")
      var document = await getDoc(doc(firestore, "users", uid));
      var docData = document.data() as userInterface
      res.json({ status: 200, message: "details fetched" ,userCredentials:docData});
    } catch (e) {
      console.log(e);
      res.json({status:400, message: "error caught" });
    }
  } else {
    res.json({ status: 400, message: " Account Not Found" });
  }
};
