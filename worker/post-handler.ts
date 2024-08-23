import { inngestClient } from "./workLoad";
const fs = require("fs");
import uploadImage from "@/components/server/uploadImage";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/components/firebase_config";
import formidable from "formidable";

export const tester = inngestClient.createFunction(
  { id: "post-handler", name: "create blog post" },
  { event: "test/post-handler" },
  async ({ event, step }) => {
    console.log("event triggered")
    var { info, files } = event.data;

    const { postName, uid } = info;

    // deconstruct file keys

    var fileKeys = Object.keys(files);

    const promiseUrl = fileKeys.map(async (key) => {
      const file:formidable.Files=files[key]?files[key][0]:null
      var singleUrl = await saveFile(file, uid);
      return singleUrl;
    });

    var resolvedUrl = await Promise.all(promiseUrl);

    info.photoUrl = resolvedUrl;

    await setDoc(doc(firestore, "post", postName), info);
  }
);

export async function saveFile(file: formidable.Files, uid: string) {
  const data = fs.readFileSync(file.filepath);

  var newFileName = `${uid}-${timer()}`;
  var imageUrl = await uploadImage({
    file: data,
    path: "/post",
    fileName: newFileName,
  });
  return imageUrl;
}

const timer = () => {
  var timerId = new Date().getTime();
  return timerId;
};
