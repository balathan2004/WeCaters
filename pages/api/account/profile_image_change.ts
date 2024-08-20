import { IncomingForm } from "formidable";
import uploadImage from "@/components/server/uploadImage";
import { firestore } from "@/components/firebase_config";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseConfig } from "@/components/interfaces/shared";
import PersistentFile from "formidable/PersistentFile";
import formidable from "formidable";

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
  if (req.method === "POST") {
    const uid = req.cookies.caters_client_id;
    const account_type = req.cookies.caters_account_type;
    if (uid && account_type) {
      post(req, uid, account_type);
    }
  }
}

const post = async (
  req: NextApiRequest,
  filename: string,
  accountType: string
) => {
  const form = new IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (files.file) {
      const file = files.file[0];
      await saveFile(file, filename, accountType);
    }
  });
};

async function saveFile(
  file: formidable.File,
  fileName: string,
  account_type: string
) {
  const data = fs.readFileSync(file.filepath);
  var imageUrl = await uploadImage({
    file: data,
    path: "/profile_images",
    fileName: fileName,
  });
  UpdateDocument(imageUrl, fileName, account_type);
}

async function UpdateDocument(url: string, uid: string, accountType: string) {
  if(accountType ==="professional"){
    await updateDoc(doc(firestore, "professional_account", uid), {
        profile_url: url,
      });
  }else{
    await updateDoc(doc(firestore, "personal_account", uid), {
        profile_url: url,
      });
  }
   
}

/**'

 const form = new IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (files.file && fields.name && fields.format) {
      let { name, format } = fields;
      let nameString = name[0];
      let formatString = format[0];
      console.log(nameString, formatString);
      const image = files.file[0];
      const Image = await (await Jimp.read(image.filepath)).quality(80).resize(
      640,360
      ).getBufferAsync(Jimp.MIME_PNG)
      const fileBuffer = fs.readFileSync(image.filepath);
      console.log(fileBuffer);
      FileModel.create({
        filename: nameString,
        contentType: formatString,
        data: Image,
      })
        .then(() => {
          console.log("file created successfully");
        })
        .catch((err) => console.log(err));
    }
  });

  */
