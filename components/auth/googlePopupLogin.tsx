import { app } from "/config";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";

import SendData from "../sendData";

export default async function GoogleLogin(changeState, userType) {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();

  try {
    signInWithPopup(auth, googleProvider).then(async (data) => {
      let dataToSend = {
        displayName: data.user.displayName,
        email: data.user.email,
        uid: data.user.uid,
        photoUrl: data.user.photoURL,
        phone: "",
        bio: "",
        username: "",
        client: userType == "client" ? true : false,
        user_type: userType,
      };
      var res = await SendData("popupLogin", dataToSend);
      changeState(res);
    });
  } catch (err) {
    changeState(err);
  }
}
