import { NextApiRequest,NextApiResponse } from "next";
import { inngestClient } from "@/worker/workLoad";


export default async function(req:NextApiRequest,res:NextApiResponse){


    inngestClient.send({
        name:"tester",
        data:{sender:"light"}
    })


    res.json({message:"Hello"})


}

