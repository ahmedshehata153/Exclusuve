"use server";

import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getDecode() {
  const encode =
    (await cookies()).get("next-auth.session-token")?.value ||
    (await cookies()).get("__secure-nextauth.session-token")?.value;

  const decodeToken = await decode({
    token: encode,
    secret: process.env.AUTH_SECRET!,
  });
  return decodeToken;
}

export async function getToken() {
  return (await getDecode())?.token;
}
export async function getId() {
  return (await getDecode())?.sub;
}
