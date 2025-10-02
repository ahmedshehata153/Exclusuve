import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register" ||
      request.nextUrl.pathname === "/forgetpassword" ||
      request.nextUrl.pathname === "/resetcode" ||
      request.nextUrl.pathname === "/resetpassword"
    ) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register" ||
    request.nextUrl.pathname === "/forgetpassword" ||
    request.nextUrl.pathname === "/resetcode" ||
    request.nextUrl.pathname === "/resetpassword"
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/cart",
    "/login",
    "/register",
    "/wishlist",
    "/checkout",
    "/profile/changepassword",
    "/resetcode",
    "/resetpassword",
    "/forgetpassword",
  ],
};
