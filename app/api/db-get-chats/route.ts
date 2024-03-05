import { dbGetChats, dbGetUserId } from "@/data/data";
import { NextResponse } from "next/server";

// drizzle :: get chat list
export async function POST(req: Request) {
  try {
    const userId = await dbGetUserId();
    if (!userId) {
      return new NextResponse("Not found user ID.", {
        status: 500,
      });
    }
    // 현재 db 저장된 userId 일치하는 모든 채팅을 가져옴
    const response = await dbGetChats(userId);
    return NextResponse.json(response);
  } catch (error) {
    console.error("[DB_GET_CHATS_ERROR] : ", error);
    return new NextResponse("DB_GET_CHATS_ERROR", { status: 500 });
  }
}
