import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextProvider from "@/components/provider/nextProvider";
import QueryProvider from "@/components/provider/queryProvider";
import { getServerSession } from "next-auth";
import SessionProvider from "@/components/provider/nextProvider";
import { authOptions } from "./api/auth/[...nextauth]/route";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Euseung Next App",
  description: "AI assist",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession();
  // console.log("aa : ", session);
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <NextProvider> */}
        <SessionProvider>
          {/* <SessionProvider session={session}> */}
          <QueryProvider>{children}</QueryProvider>
        </SessionProvider>
        {/* </NextProvider> */}
      </body>
    </html>
  );
}
