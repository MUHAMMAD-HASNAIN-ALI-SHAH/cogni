import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export default auth((req) => {
  if (!req.auth && req.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  if (req.auth && req.nextUrl.pathname === "/signin") {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
