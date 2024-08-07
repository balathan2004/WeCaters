import { firestore } from "@/config";
import { generateUsername } from "unique-username-generator";
import { setCookie } from "cookies-next";
import { setDoc, getDoc, doc } from "firebase/firestore";
export default async (req, res) => {
  var data = JSON.parse(req.body);
  var { uid } = data;
  try {
    var fileInFirestore = doc(firestore, "users", uid);
    var snap = await getDoc(fileInFirestore);
    var userData = snap.data();
    if (snap.exists()) {
      setCookie(data.client ? "catersClientId" : "catersPersonID", uid, {
        req,
        res,
        maxAge: new Date(Date.now() + 900000),
        httpOnly: false,
        sameSite: "none",
        secure: "true",
      });
      res.json({
        authType: 200,
        message: "Login Successfully",
        data: userData,
      });
    } else {
      if (!data.client) {
        var emailName = data.email.split("@")[0];

        var newUsername = generateUsername("-", 5, 20, emailName);

        data.username = newUsername;
        console.log("new username", newUsername);
        delete data.user_type;
        await setDoc(doc(firestore, "users", uid), data);
      }

      setCookie(data.client ? "catersClientId" : "catersPersonID", uid, {
        req,
        res,
        maxAge: new Date(Date.now() + 900000),
        httpOnly: false,
        sameSite: "none",
        secure: "true",
      });
      res.json({
        authType: 200,
        message: "Account Created",
        data: data,
      });
    }
  } catch (e) {
    res.json({ message: "Error", authType: 400 });
  }
};
