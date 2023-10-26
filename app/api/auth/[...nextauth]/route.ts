import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

// 어댑터 추가
import prisma from "@/lib/prismadb";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    // GoogleProvider({
    //   clientId: process.env.AUTH_GOOGLE_ID ?? "",
    //   clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    // }),
    // email , pw 로 DB 사용
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });
        return user;
      },
    }),
  ],
};

// export default NextAuth(authOptions);

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
