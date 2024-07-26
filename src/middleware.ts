import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from "next/server";

const publicRoutes = ["/sign-in", "/signup", "/", ""];

const middleware = (req: NextRequest) => {
  const cookieStore = cookies()
  const url = req.nextUrl;

  console.log(url.basePath);
  // if (publicRoutes.includes(pathname)) {
  //   // Allow access to public routes
  //   return NextResponse.next();
  // }

  // const token = req.cookies.get("token")?.value;  
 
  // if (!token) {
  //   // Redirect to sign-in page if no token is found
  //   const url = req.nextUrl.clone();  
  //   url.pathname = "/sign-in";
  //   return NextResponse.rewrite(url);
  // }

  // Add any additional logic for authenticated routes here

  return NextResponse.next();
};

export default middleware;
