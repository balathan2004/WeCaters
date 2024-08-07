import { ResponseConfig ,userAuthResponse} from "./../interfaces/shared";


interface Props {
  route: string;
  data: any;
  contentType?: "application/json" | "multipart/form-data";
  stringify?: boolean;
}

type availInterfaces=ResponseConfig | userAuthResponse

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
      headers: {
        "content-type": contentType,
      },
    };
   
    const response = await fetch(route, reqConfig);
    if(route=="api/auth/login"){
      
      const res: userAuthResponse = await response.json();
      return res;
    } else if(route=="api/post_action/fetch_comments"){
   
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
