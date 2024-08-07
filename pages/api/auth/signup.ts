import { app, firestore } from "@/components/firebase_config";
const fs = require("fs");
import { IncomingForm } from "formidable";
import { Fields } from "formidable";
import { NextApiRequest, NextApiResponse } from "next";
import { getAuth } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import uploadImage from "@/components/server/uploadImage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setCookie } from "cookies-next";
import { ResponseConfig, userInterface } from "@/components/interfaces/shared";
import { generateUsername } from "unique-username-generator";
import PersistentFile from "formidable/PersistentFile";

export const config = {
  api: {
    bodyParser: false,
  },
};

export interface FieldsValues {
  account_type: "personal" | "professional";
  display_name: string;
  email: string;
  phone_number: string;
  password: string;
  username?: string;
  profile_url?: string;
  company_name?: string;
  district?: string;
  state?: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) => {
  try {
    const form_data = (await post(req)) as signupUserInterface;

    //const uid:string = await signUp(form_data.email, form_data.password);
    //delete form_data.password;
    /**
    * 
    *  await setDoc(doc(firestore, "users", uid), {
      ...form_data,
      uid: uid,
    });
    */

    // await navigation(req, res, form_data);
  } catch (e) {
    res.json({ message: JSON.stringify(e), status: 400 });
  }
};

const post = async (req: NextApiRequest) => {
  const form = new IncomingForm();
  let form_data = await new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (files.file) {
        //  const profile_url = await saveFile(files.file[0]);
        resolve({ ...ObjectParsing(fields) });
      } else {
        const form_data = { ...ObjectParsing(fields) } as signupUserInterface;
        const profile_url = `https://ui-avatars.com/api/?name=${form_data.display_name}&size=200&background=random&color=fff&bold=true`;
        if (form_data.hasOwnProperty("username")) {
          return;
        } else {
          form_data.username = generateUsername(
            "-",
            5,
            20,
            form_data.display_name
          );
        }
        resolve({ ...form_data, profile_url: profile_url });
      }
    });
  });

  return form_data;
};

function ObjectParsing(obj: Fields<string>): FieldsValues {
  const result: Partial<FieldsValues> = {};

  Object.keys(obj).forEach((key) => {
    if (obj[key] && obj[key].length > 0) {
      switch (key) {
        case "account_type":
          if (obj[key][0] == "professional") {
            result.account_type = obj[key][0] as "personal" | "professional";
          } else {
            result.account_type = "personal";
          }

          break;
        case "display_name":
          result.display_name = obj[key][0];
          break;
        case "email":
          result.email = obj[key][0];
          break;
        case "phone_number":
          result.phone_number = obj[key][0];
          break;
        case "password":
          result.password = obj[key][0];
          break;
        case "username":
          result.username = obj[key][0];
          break;
        case "profile_url":
          result.profile_url = obj[key][0];
          break;
        case "company_name":
          result.company_name = obj[key][0];
          break;
        case "district":
          result.district = obj[key][0];
          break;
        case "state":
          result.state = obj[key][0];
          break;
        default:
          break;
      }
    }
  });
  return result;
}

async function signUp(email, password) {
  const auth = getAuth(app);
  let uid = await new Promise(async (resolve, reject) => {
    await createUserWithEmailAndPassword(auth, email, password).then((user) => {
      resolve(user.user.uid);
    });
  });
  return uid;
}

/**
 * 
 * 
 * 
export async function saveFile(file:PersistentFile, uid:string) {
  const data = fs.readFileSync(file.filepath);
  var imageUrl = await uploadImage(data, "/profile", uid);
  return imageUrl;
}

async function navigation(req, res, user_data) {
  setCookie("caters_client_id", user_data.uid, {
    req,
    res,
    maxAge: new Date(Date.now() + 900000),
    httpOnly: false,
    sameSite: "none",
    secure: "true",
  });

  setCookie("caters_account_type", user_data.account_type, {
    req,
    res,
    maxAge: new Date(Date.now() + 900000),
    httpOnly: false,
    sameSite: "none",
    secure: "true",
  });
  res.json({
    status: 200,
    message: "Account Created",
    data: user_data,
  });
}

 * 
 */
