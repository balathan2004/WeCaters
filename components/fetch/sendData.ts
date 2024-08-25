import { userInterface } from "../auth/signup";
import { ResponseConfig ,userAuthResponse, usernameSuggestInterface} from "./../interfaces/shared";


interface dataProps{
 data:userInterface,
}

interface Props {
  route: string;
  data: any;
  contentType?: "application/json" | boolean;
  stringify?: boolean;
}

type availInterfaces=ResponseConfig | userAuthResponse |usernameSuggestInterface

const SendData = async ({
  route,
  data,
  contentType = "application/json",
  stringify = true,
}: Props):Promise<availInterfaces|undefined> => {
  try {


   

    const reqConfig: RequestInit = {
      body: stringify ? JSON.stringify(data) : data,
      method: "POST",
  
    };
   
    const response = await fetch(route, reqConfig);
    if(route=="/api/auth/login"){
      
      const res: userAuthResponse = await response.json();
      return res;
    } else if(route=="/api/post_action/fetch_comments"){
   
      const res: userAuthResponse = await response.json();
      return res;
    }
    else{
      const res: ResponseConfig = await response.json();
      return res;
    }
   
  } catch (error) {
    console.log(error);
  }
};

export default SendData;
