import { dbGetMessage } from "@/data/data";
import { NextResponse } from "next/server";

// drizzle :: get chat messages
export async function POST(req: Request) {
  try {
    const { chat_id } = await req.json();

    if (!chat_id) {
      return NextResponse.json([]);
    }
    const messages = await dbGetMessage(chat_id);

    return NextResponse.json(messages);
  } catch (error) {
    console.error("[DB_GET_MESSAGES_ERROR] : ", error);
    return new NextResponse("DB_GET_MESSAGES_ERROR", { status: 500 });
  }
}
