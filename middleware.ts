import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  const isAuth = !!token;
  const mustChangePassword = token?.mustChangePassword;

  const isChangingPassword = req.nextUrl.pathname === "/change-password";

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