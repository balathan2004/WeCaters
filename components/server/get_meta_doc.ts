import { firestore_admin } from "@/config/firebase_admin";
import { metadata,userInterface } from "../interfaces/shared";



export default async function GetMetaDoc(userDoc:userInterface):Promise<metadata>{

  const {uid,account_type}=userDoc

  if (account_type === "professional") {
    

    var meta_doc = (
      await firestore_admin
        .collection("/professional_account_meta")
        .doc(uid)
        .get()
    ).data() as metadata;

    return meta_doc  ;
  } else {


    var meta_doc = (
      await firestore_admin
        .collection("/personal_account_meta")
        .doc(uid)
        .get()
    ).data() as metadata;

    return meta_doc 
  }

}