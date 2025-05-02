import NextAuth from "next-auth";
import authOptions from "../../../../lib/auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    newUser: "/profile" // New users will be redirected here
  },
  session: {
    strategy: "jwt", // Recommended for better security
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };