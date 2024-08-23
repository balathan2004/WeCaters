import { firestore } from "@/components/firebase_config";
import { NextApiRequest,NextApiResponse } from "next";
import { postInterface, userInterface, userProfileResponse } from "@/components/interfaces/shared";
import { doc, getDoc,getDocs, collection, query, where } from "firebase/firestore";
export default async function (req:NextApiRequest, res:NextApiResponse<userProfileResponse>) {
  let userId :unknown= req.query.user;
  const uid=userId as string

  try {
    if(userId){
        const usersData = doc(firestore, "professional_account",uid);
        const postData = collection(firestore, "post");
        const specifiedUser= await getDoc(usersData) ;
        const fetchedSpecifiedUser = specifiedUser.data()
        const userFound:unknown=fetchedSpecifiedUser
        const finalUser:userInterface=userFound as userInterface
        //specified single uid account details
     
        //specific uid posts doc
        const specificPost = await getDocs(
          query(postData, where("username", "==", uid))
        );
        // specific uid posts data
        const userPosts = specificPost.docs.map((doc) => doc.data()as postInterface);
    
        res.json({
            status:200,
          message: "success",
         userData:{ userDetails: finalUser, userPosts: userPosts,}
        });
    }
 
   

    //const userFetchedData = await getDocs(usersData); // get docs from users collection

    //all usernames
    //const allUserData = userFetchedData.docs.map((doc) => doc.data().username);

   
  } catch (err:unknown) {
    res.json({ status:400,message: JSON.stringify(err) });
  }
}

/*
  const allPosts = await getDocs(postData);
  const userDocPosts = allPosts.docs.filter(
    (doc) => doc.data().username == uid
  );
  const userPosts = userDocPosts.map((doc) => doc.data());
  console.log(userPosts);
  */
