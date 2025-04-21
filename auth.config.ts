import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "./src/lib/mongodb";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise, { databaseName: 'VOLT_DB' }), // Use VOLT_DB
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing email or password");
          return null;
        }

        const email = credentials.email.trim().toLowerCase();  // Lowercase and trim the email
        console.log("Attempting login with email:", email);

        // Connect to the correct database
        const client = await clientPromise;
        const db = client.db();

        // Find user by email
        const user = await db.collection("users").findOne({ email });

        if (!user) {
          console.log("User not found for email:", email);
          return null; // User not found
        }

        // Compare password with hashed password in the database
        const passwordMatch = await bcrypt.compare(credentials.password, user.password);
        if (!passwordMatch) {
          console.log("Incorrect password for email:", email);
          return null; // Password doesn't match
        }

        console.log("User authenticated:", user.name);

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token?.id) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
