import { app, firestore } from "@/components/firebase_config";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import { setDoc, doc, FirestoreError } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "cookies-next";
import { ResponseConfig, userInterface } from "@/components/interfaces/shared";
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
    const { display_name, email, password, account_type } = JSON.parse(req.body)

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

    const uid = await signUp(email, password);
    userData.uid = uid;
    delete userData.password;
    if (account_type == "personal") {
      const name = display_name.replace(" ", "");
      userData.username = generateUsername(name, 3, 20, "user-")
      setDoc(doc(firestore, "personal_account", uid), userData);
    } else {
      setDoc(doc(firestore, "professional_account", uid), userData);
    }
    res.json({ message: "account created", status: 200 });
  } catch (e: any) {
    if (e.code == "auth/email-already-in-use") {
      res.json({ message: "auth/email-already-in-use", status: 400 });
    }
  }
};

async function signUp(email: string, password: string): Promise<string> {
  console.log(email, password);
  let uid: string = await new Promise(async (resolve, reject) => {
    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password).then(
        (user) => {
          resolve(user.user.uid);
        }
      );
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
  return uid;
}
