import { ResponseConfig ,userAuthResponse} from "../interfaces/shared";


interface Props {
  route: string;
}

export async function GetRequest({ route }: Props) {
  try {
    const reqConfig: RequestInit = {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    };
    const response = await fetch(route, reqConfig);
  if(route!='/api/auth/login_cred'){
    const res: ResponseConfig = await response.json();
    return res;
  }  else if (route=='/api/auth/login_cred'){
    const res: userAuthResponse = await response.json();
    return res;
  }

  } catch (error) {
    console.log(error);
  }
}
