import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// drizzle :: delete selected chat
export async function POST(req: Request) {
  try {
    const { chat_id } = await req.json();

    if (!chat_id) {
      return new NextResponse("Chat ID not found.", {
        status: 500,
      });
    }
    const response = await db
      .delete(chats)
      .where(eq(chats.id, chat_id))
      .returning({ deletedId: chats.id });
    return NextResponse.json(response);
  } catch (error) {
    console.error("[DB_DELETE_CHATS_ERROR] : ", error);
    return new NextResponse("DB_DELETE_CHATS_ERROR", { status: 500 });
  }
}
