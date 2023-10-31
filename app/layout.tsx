import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NextProvider from "@/components/provider/nextProvider";
import QueryProvider from "@/components/provider/queryProvider";

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
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextProvider>
          <QueryProvider>{children}</QueryProvider>
        </NextProvider>
      </body>
    </html>
  );
}
