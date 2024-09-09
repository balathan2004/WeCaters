
  import { NextApiRequest, NextApiResponse } from "next";
  import { userAuthResponse} from "@/components/interfaces/shared";
  import { setCookie } from "cookies-next";
import { userDocSearch } from "./login";

  export default async function(req:NextApiRequest,res:NextApiResponse<userAuthResponse>){

const {uid}=JSON.parse(req.body)

if(uid){

    try{
        const userData=await userDocSearch(uid)

        setCookie("caters_client_id", userData.uid, {
            req,
            res,
            maxAge: 900000,
            httpOnly: false,
            sameSite: "none",
         
          });
          setCookie("caters_account_type", userData.account_type, {
            req,
            res,
            maxAge: 900000,
            httpOnly: false,
            sameSite: "none",
         
          });
          res.json({status: 200, message:"login successful",userCredentials:userData})
        
    }catch(err: any){
        console.log(err);
    }

  


}



  }