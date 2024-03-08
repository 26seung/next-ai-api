import NextAuth, { NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// 어댑터 추가
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
};

// export default NextAuth(authOptions);

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
