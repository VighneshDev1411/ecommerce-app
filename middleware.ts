// e.g., /middleware.ts (or server-side check in protected pages)
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import clientPromise from "./src/lib/mongodb";

export async function middleware(req:any) {
  const token = await getToken({ req });
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  const client = await clientPromise;
  const db = client.db("VOLT_DB");

  const user = await db.collection("users").findOne({ email: token.email });

  if (user && !user.hasProfile) {
    return NextResponse.redirect(new URL("/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/"], // whatever routes need checking
};
