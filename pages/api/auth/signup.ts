import { app, firestore } from "@/components/firebase_config";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth, UserCredential } from "firebase/auth";
import { setDoc, doc, FirestoreError } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "cookies-next";
import { metadata, ResponseConfig, userInterface } from "@/components/interfaces/shared";
import { generateUsername } from "unique-username-generator";

export interface FieldsValues {
  account_type: "personal" | "professional";
  display_name: string;
  email: string;
  username?: string;
  profile_url?: string;
  uid: string;
  password?: string;
  phone_number?: number | null;
  company_name?: string;
  district?: string;
  state?: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) => {
  try {
    const { display_name, email, password, account_type } = JSON.parse(
      req.body
    );

    const userData = {
      display_name: display_name,
      email: email,
      uid: "",
      phone_number: "",
      password: password,
      account_type: account_type,
      profile_url: `https://ui-avatars.com/api/?name=${display_name}&size=200&background=random&color=fff&bold=true`,
      username: "",
    };

    const userCredentials = await signUp(email, password);
    userData.uid = userCredentials.user.uid;

    const metadata:metadata = {
      cred:{
        uid: userCredentials.user.uid,
        email: userCredentials.user.email?userCredentials.user.email:"",
        createdAt: userCredentials.user.metadata.creationTime?userCredentials.user.metadata.creationTime:"",
      },
      userConnections:{
        following:[],
        followingCount:0
      }

   
    };

    delete userData.password;
    if (account_type == "personal") {
      const name = display_name.replace(" ", "");
      userData.username = generateUsername(name, 3, 20, "user-");
      setDoc(doc(firestore, "personal_account", userData.uid), userData);
      setDoc(
        doc(firestore, "personal_account_meta", userData.uid),
        metadata
      );
    } else {
      setDoc(doc(firestore, "professional_account", userData.uid), userData);
      metadata.userConnections.followers=[]
      metadata.userConnections.followersCount=0
      setDoc(
        doc(firestore, "professional_account_meta", userData.uid),
        metadata
      );
    }
    res.json({ message: "account created", status: 200 });
  } catch (e: any) {
    if (e.code == "auth/email-already-in-use") {
      res.json({ message: "auth/email-already-in-use", status: 400 });
    }
  }
};

async function signUp(
  email: string,
  password: string
): Promise<UserCredential> {
  console.log(email, password);
  let userData: UserCredential = await new Promise(async (resolve, reject) => {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password).then(
        (user) => {
          resolve(user);
        }
      );
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

  return userData;
}
