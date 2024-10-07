import { setDoc, doc } from "firebase/firestore";
import { firestore } from "@/components/firebase_config";
import formidable, { IncomingForm } from "formidable";
import uploadVideo from "@/components/server/uploadVideo";
import moment from "moment";
import { inngestClient } from "@/worker/workLoad";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseConfig } from "@/components/interfaces/shared";
import { postVideoInterface } from "@/components/interfaces/shared";
const fs = require("fs");

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<ResponseConfig>
) {
  const caters_client_id = req.cookies.caters_client_id;
  console.log("post create request");
  const caters_account_type = req.cookies.caters_account_type;
  if (
    req.method == "POST" &&
    caters_client_id &&
    caters_account_type == "professional"
  ) {
    post(req, caters_client_id);
  }
  res.json({ status: 200, message: "OK" });
}

const post = async (req: NextApiRequest, uid: string) => {
  const form = new IncomingForm();

  try {
    form.parse(req, async (err, fields, files) => {
      console.log(files);
      var urls = [];
      var postName = `${uid}-${timer()}`;
      const filesKeysone: unknown = Object.keys(files);
      var filesKey: number[] = filesKeysone as number[];
      var caption = fields.caption ? fields.caption[0] : "";
      var username = fields.username ? fields.username[0] : "";

      if (files.file) {
        console.log(files.file[0]);
        var info: postVideoInterface = {
          post_name: postName,
          caption: caption,
          video_url: null,
          username: username,
          uid: uid,
          time: setDate(),
          numeric_time: new Date().getTime(),
        };
        info.video_url = await saveFile(files.file[0], uid);

         await setDoc(doc(firestore, "reels", postName), info);
      }
    });
  } catch (e) {
    console.log(e);
  }
};

const setDate = () => {
  var nowDate = new Date();
  var newDate = moment(nowDate).format("DD-MM-YYYY hh:mm a");
  return newDate;
};

export async function saveFile(file: formidable.File, uid: string) {
  const data = fs.readFileSync(file.filepath);

  var newFileName = `${uid}-${timer()}`;
  var imageUrl = await uploadVideo({
    file: data,
    path: "/reels",
    fileName: newFileName,
  });
  return imageUrl;
}

const timer = () => {
  var timerId = new Date().getTime();
  return timerId;
};
