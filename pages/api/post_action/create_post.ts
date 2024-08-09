import { IncomingForm } from "formidable";
import moment from "moment";
import { inngestClient } from "@/worker/workLoad";
import { NextApiRequest,NextApiResponse } from "next";
import { ResponseConfig } from "@/components/interfaces/shared";
import { postInterface } from "@/components/interfaces/shared";
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function (req:NextApiRequest, res:NextApiResponse<ResponseConfig>) {
  const caters_client_id = req.cookies.caters_client_id;
  const caters_account_type = req.cookies.caters_account_type;
  if (req.method === "POST" && caters_client_id && caters_account_type) {
    post(req, caters_client_id);
  }
}

const post = async (req:NextApiRequest, uid:string) => {

  const form = new IncomingForm();
  const waiter=new Promise((resolve, reject) => {

try{
  form.parse(req, async (err, fields, files) => {
    console.log(files);
    var urls = [];
    var postName = `${uid}-${timer()}`;
    var filesKey = Object.keys(files);
    var caption = fields.caption[0];
    var username = fields.username[0];

    var info = {
      postName: postName,
      caption: caption,
      photoUrl: [],
      username: username,
      uid: uid,
      time: setDate(),
    };

    inngestClient.send({
      name: "test/post-handler",
      data: { info, files },
    });
  });
} catch(e){
  reject("error")
}



  })
   
};

const timer = () => {
  var timerId = new Date().getTime();
  return timerId;
};

const setDate = () => {
  var nowDate = new Date();
  var newDate = moment(nowDate).format("DD-MM-YYYY hh:mm a");
  return newDate;
};
