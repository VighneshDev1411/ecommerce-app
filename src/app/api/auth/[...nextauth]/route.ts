import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "../../../../lib/mongodb";
import authOptions from "../../../../lib/auth";

export const authConfig = {
  // providers: [
  //   CredentialsProvider({
  //     name: "Credentials",
  //     credentials: {
  //       email: { label: "Email", type: "email" },
  //       password: { label: "Password", type: "password" },
  //     },
  //     async authorize(credentials) {
  //       try {
  //         const { email, password } = credentials ?? {};

  //         if (!email || !password) {
  //           throw new Error("Missing email or password");
  //         }

  //         const client = await clientPromise;
  //         const db = client.db("VOLT_DB");

  //         // Find user and their profile in a single query using lookup
  //         const userAggregate = await db.collection("users").aggregate([
  //           { $match: { email } },
  //           {
  //             $lookup: {
  //               from: "users_profile",
  //               localField: "_id",
  //               foreignField: "userId",
  //               as: "profile"
  //             }
  //           },
  //           { $unwind: { path: "$profile", preserveNullAndEmptyArrays: true } }
  //         ]).toArray();

  //         const user = userAggregate[0];
  //         if (!user) {
  //           throw new Error("User not found");
  //         }

  //         const isValid = await bcrypt.compare(password, user.password);
  //         if (!isValid) {
  //           throw new Error("Invalid password");
  //         }

  //         return {
  //           id: user._id.toString(),
  //           email: user.email,
  //           name: user.name,
  //           hasProfile: !!user.profile?.profileComplete
  //         };
  //       } catch (err) {
  //         console.error("Authentication error:", err);
  //         return null;
  //       }
  //     },
  //   }),
  // ],
  pages: {
    signIn: "/login",
    newUser: "/profile" // New users will be redirected here
  },
  // callbacks: {
  //   async jwt({ token, user }:any) {
  //     if (user) {
  //       token.id = user.id;
  //       token.email = user.email;
  //       token.name = user.name;
  //       token.hasProfile = user.hasProfile;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }:any) {
  //     session.user.id = token.id;
  //     session.user.email = token.email;
  //     session.user.name = token.name;
  //     session.user.hasProfile = token.hasProfile;
  //     return session;
  //   },
  //   async redirect({ url, baseUrl }:any) {
  //     // Allows relative callback URLs
  //     if (url.startsWith("/")) return `${baseUrl}${url}`;
  //     // Allows callback URLs on the same origin
  //     else if (new URL(url).origin === baseUrl) return url;
  //     return baseUrl;
  //   }
  // },
  session: {
    strategy: "jwt", // Recommended for better security
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };