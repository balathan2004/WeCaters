
import { NextRequest ,NextResponse} from "next/server";

const middleware = (request:NextRequest) => {
  const { cookies ,nextUrl} = request;

  const clientType=cookies.get("caters_account_type")?.value



if(nextUrl.pathname.includes("/professional")&& clientType!="professional"){
 
    return NextResponse.redirect(new URL('/blog',request.url))
    
}else if(nextUrl.pathname.includes("/personal")&& clientType!="personal"){
 
  return NextResponse.redirect(new URL('/blog',request.url))
  
}



return NextResponse.next()

};

export default middleware;
