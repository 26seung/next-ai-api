import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID ?? "",
      clientSecret: process.env.AUTH_GOOGLE_SECRET ?? "",
    }),
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID ?? "",
      clientSecret: process.env.AUTH_KAKAO_SECRET ?? "",
    }),
    NaverProvider({
      clientId: process.env.AUTH_NAVER_ID ?? "",
      clientSecret: process.env.AUTH_NAVER_SECRET ?? "",
    }),
    // ...add more providers here
  ],
};

// export default NextAuth(authOptions);

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
