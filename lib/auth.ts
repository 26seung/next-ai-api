"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function auth() {
  // next-auth :: server
  const session = await getServerSession(authOptions);
  return {
    userId: session?.user?.name!,
    userEmail: session?.user?.email!,
  };
}
