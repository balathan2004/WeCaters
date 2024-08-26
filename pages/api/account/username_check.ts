import { firestore } from "@/components/firebase_config";
import { doc, updateDoc, getDocs, collection } from "firebase/firestore";
import { NextApiRequest,NextApiResponse } from "next";

export default async function (req:NextApiRequest, res:NextApiResponse) {

  const { username } = JSON.parse(req.body);
  console.log(username);
  console.log("username response")

  const users = collection(firestore, "professional_account");
  const allusers = await getDocs(users);
  let check = true;
  const userData = allusers.docs.map((user) => {
    return user.data();
  });
  userData.map((user) => {
    if (user.username === username) {
      console.log("username same")
      check = false;
      res.json({ status: 400, message: "Username already exists" });
    }
  });
  if (check) {
    res.json({ status: 200, message: "Username Available" });
  }
}
