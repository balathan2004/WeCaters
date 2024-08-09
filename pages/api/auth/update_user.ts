import { firestore } from "@/components/firebase_config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { NextApiRequest,NextApiResponse } from "next";
import {  userAuthResponse, userInterface } from "@/components/interfaces/shared";

export default async (req:NextApiRequest, res:NextApiResponse<userAuthResponse>) => {
  var userData = req.body
  try {
    const { uid } = userData ;


    var docRef = await getDoc(doc(firestore, "users", uid));
    var document = docRef.data();

    if (document !== userData) {
      await updateDoc(doc(firestore, "users", uid), userData).then(() => {
        res.json({ status: 200, message: "changes made",userCredentials:userData as userInterface });
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ status:200,message: "Error Cought" });
  }
};
