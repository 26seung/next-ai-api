import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

// drizzle :: get chat messages
export async function POST(req: Request) {
  try {
    const { chat_id } = await req.json();

    if (!chat_id) {
      return NextResponse.json([]);
    }

    const _messages = await db
      .select()
      .from(messages)
      .where(eq(messages.chatId, chat_id));

    return NextResponse.json(_messages);
  } catch (error) {
    console.error("[DB_GET_MESSAGES_ERROR] : ", error);
    return new NextResponse("DB_GET_MESSAGES_ERROR", { status: 500 });
  }
}
