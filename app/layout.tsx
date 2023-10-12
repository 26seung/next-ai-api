import AuthSession from "@/components/SessionProvider";
import "./globals.css";
import type { Metadata } from "next";
// import { SessionProvider } from "next-auth/react";
// import { SessionProvider } from "../components/SessionProvider";
import { getServerSession } from "next-auth";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Euseung Next App",
  description: "AI Platform",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession();
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSession>
          {/* <SessionProvider session={session}> */}
          {children}
          {/* </SessionProvider> */}
        </AuthSession>
      </body>
    </html>
  );
}
