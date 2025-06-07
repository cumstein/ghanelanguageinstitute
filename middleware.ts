import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = (await getToken({ req })) as JWT | null;
  const pathname = req.nextUrl.pathname;

  const isAuth = !!token;
  const mustChangePassword = token?.mustChangePassword;
  const isChangingPassword = pathname === "/change-password";


  if (isAuth && mustChangePassword && !isChangingPassword) {
    return NextResponse.redirect(new URL("/change-password", req.url));
  }

  if (isAuth && !mustChangePassword && isChangingPassword) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }


  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|login|register|favicon.ico).*)"],
};