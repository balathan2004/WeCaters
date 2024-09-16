import { SearchPageResponse, userInterface } from "@/components/interfaces/shared";
import { firestore_admin } from "@/config/firebase_admin";
import { NextApiRequest, NextApiResponse } from "next";
import { SearchableDocs } from "@/components/interfaces/shared";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse<SearchPageResponse>
) {
  const docs = await firestore_admin.collection("professional_account").get();

  const fetchedDocs = docs.docs.map((item) => item.data()) as userInterface[];

  const searchDocs: SearchableDocs[] = fetchedDocs.map((doc) => {
    return {
      uid: doc.uid,
      display_name: doc.display_name,
      state: doc.state?doc.state:"",
      district: doc.district?doc.district:"",
      company_name: doc.company_name?doc.company_name:"" ,
      profile_url: doc.profile_url,
      bio: doc.bio?doc.bio:"",
      username: doc.username,
    };
  });

  res.json({ status: 200, message: "Success" ,resultDocs:searchDocs });
}
