import { inngestClient } from "./workLoad";
const fs = require("fs");
import uploadImage from "@/component/uploadImage";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/config";

export const tester = inngestClient.createFunction(
  { id: "post-handler", name: "create blog post" },
  { event: "test/post-handler" },
  async ({ event, step }) => {
    var { info, files } = event.data;

    const { postName, uid } = info;

    // deconstruct file keys

    var fileKeys = Object.keys(files);

    const promiseUrl = fileKeys.map(async (key) => {
      var singleUrl = await saveFile(files[key][0], uid);
      return singleUrl;
    });

    var resolvedUrl = await Promise.all(promiseUrl);

    info.photoUrl = resolvedUrl;

    await setDoc(doc(firestore, "post", postName), info);
  }
);

export async function saveFile(file, uid) {
  const data = fs.readFileSync(file.filepath);
  var newFileName = `${uid}-${timer()}`;
  var imageUrl = await uploadImage(data, "/post", newFileName);
  return imageUrl;
}

const timer = () => {
  var timerId = new Date().getTime();
  return timerId;
};
